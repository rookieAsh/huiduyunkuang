<template>
  <div class="payContent margin0">
    <div class="k60"></div>
    <div class="cost text-center" v-if="active == 1">
      {{ (cost / coinPrice) | number(6) }}USDT
    </div>
    <div class="cost text-center" v-else>￥{{ cost | number(6) }}</div>
    <div class="item margin50 flex-between align-center" @click="changeAct(1)">
      <div class="flex align-center">
        <img
          src="../../assets/imgs/usdt.png"
          style="width: 40px; height: 40px"
        />
        <span>USDT支付</span>
      </div>
      <div
        class="icon el-icon-circle-check"
        :class="{ active: active == 1 }"
      ></div>
    </div>
    <!-- <div class="item margin0 flex-between align-center" @click="changeAct(2)">
      <div class="flex align-center">
        <img
          src="../../assets/imgs/card.png"
          style="width: 36px; height: 36px"
        />
        <span>银行卡支付</span>
      </div>
      <div
        class="icon el-icon-circle-check"
        :class="{ active: active == 2 }"
      ></div>
    </div> -->

    <div class="cnt" v-if="active == 2">
      <h5>账户信息</h5>
      <div class="li flex-between">
        <div class="th">账户名</div>
        <div class="td">杭州爱挖云科技有限公司</div>
      </div>
      <div class="li flex-between">
        <div class="th">开户行</div>
        <div class="td">宁波银行杭州海创园小微企业专营支行</div>
      </div>
      <div class="li flex-between">
        <div class="th">账号</div>
        <div class="td">71230122000139088</div>
      </div>
      <h5>支付信息</h5>
      <div class="li flex-between">
        <div class="th">真实姓名</div>
        <input type="text" placeholder="请输入您的真实姓名" v-model="name" />
      </div>
      <div class="li flex-between">
        <div class="th">开户行</div>
        <input
          type="text"
          placeholder="请输入您的银行卡开户行"
          v-model="backName"
        />
      </div>
      <div class="li flex-between">
        <div class="th">账号</div>
        <input
          type="text"
          placeholder="请输入您的银行卡卡号"
          v-model="backNumber"
        />
      </div>
      <el-upload
        class="upload-demo"
        action="#"
        multiple
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-exceed="handlexceed"
        :on-change="handleChange"
        :http-request="httpRequest"
        :limit="1"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传凭证</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>

    <div class="btn" @click="pop()" v-if="active == 1">确定支付</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cost: "",
      active: 1,
      addressKey: "",
      using: "",
      coinPrice: "",
      id: "",
      quantity: "",
      mallAddress: "",
      backNumber: "",
      backName: "",
      name: "",
      // isUpload:false,
      // img:''
      fileList: []
    };
  },
  created() {
    this.webUrl = this.$axios.defaults.baseURL;
    this.cost = this.$route.query.cost;
    this.id = this.$route.query.id;
    this.quantity = this.$route.query.quantity;
    this.mallAddress = this.$route.query.mallAddress;
    this.getUsing();
  },
  methods: {
    //   handleChange(fileList) {//上传文件变化时
    //    this.fileList.push(fileList)
    //    console.log(this.fileList)
    //  },

    //   httpRequest(param) {
    //     const formData = new FormData()
    //     let address = sessionStorage.getItem("address");
    //     let file = param.file // 相当于input里取得的files
    //     console.log(file)
    //     formData.append('file', file)
    //     formData.append('address', address)
    //     formData.append('number', this.quantity)
    //     formData.append('type', this.active)
    //     formData.append('productId', this.id)
    //     formData.append('money', this.cost)
    //     formData.append('backNumber', this.backNumber)
    //     formData.append('name', this.name)
    //     formData.append('backName', this.backName)
    //     this.$axios.post(this.webUrl + '/MartianOrePool/payment',formData).then((res)=>{
    //       console.log(res)
    //     })
    // },
    changeAct(index) {
      this.active = index;
    },
    getUsing() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/custody/selectWellatByCoinFlash", param).then(res => {
        let result = res.data.data;
        result.forEach(item => {
          if (item.coin == "USDT") {
            this.addressKey = item.addressKey;
            this.using = item.balance;
            this.coinPrice = item.CNY;
          }
        });
      });
    },
    pop() {
      this.$prompt("请输入交易密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password"
      })
        .then(({ value }) => {
          console.log(value);
          this.payByUsdt(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    upload() {
      this.isUpload = true;
    },
    handleFileChange(event) {
      let files = event.target.files[0]; //获取文件
      let formData = new FormData();
      formData.append("file", files);
      console.log(formData);
    },
    payByUsdt(value) {
      if (!value) return this.$message("请输入交易密码");
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      param.append("addressKey", this.addressKey);
      param.append("jypassword", value);
      param.append("type", this.active);
      param.append("number", this.quantity);
      param.append("productId", this.id);
      param.append("money", this.cost / this.coinPrice);
      param.append("toAddressKey", this.mallAddress);
      param.append("backNumber", "");
      param.append("name", "");
      param.append("backName", "");
      this.$axios.post("/MartianOrePool/payment", param).then(res => {
        console.log(res);
        let result = res.data;
        console.log(result);
        if (result.state == 0) {
          this.$message.success("购买成功");
        } else {
          this.$message(result.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.payContent {
  width: 1200px;
  .cost {
    font-size: 30px;
    color: #ffab57;
    padding-top: 120px;
  }
  .item {
    width: 600px;
    height: 80px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
    span {
      color: #000;
      font-size: 26px;
      padding-left: 20px;
    }
    .icon {
      font-size: 28px;
    }
    .active {
      color: #ffab57;
    }
  }
  .btn {
    width: 400px;
    height: 60px;
    line-height: 60px;
    background: linear-gradient(180deg, #ff9b48, #ffc99b);
    margin: 80px auto 80px;
    text-align: center;
    border-radius: 30px;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
  }
  .btn1 {
    width: 200px;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(180deg, #ff9b48, #ffc99b);
    margin: 60px auto;
    text-align: center;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
  }
  .cnt {
    width: 600px;
    height: 500px;
    margin: 0 auto;
    h5 {
      color: #000;
      padding: 30px 0;
      font-size: 20px;
    }
    .li {
      line-height: 50px;
    }
    .th {
      color: #000;
      font-size: 16px;
    }
    .td {
      color: #999;
      font-size: 16px;
    }
    input {
      border: none;
      flex: 1;
      text-align: right;
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 16px !important;
    }
  }
  .isUpload {
    width: 520px;
    height: 250px;
    box-shadow: 0px 2px 4px 0px rgba(173, 179, 204, 0.39);
    color: rgb(51, 51, 51);
    border-radius: 15px;
    background: #fff;
    line-height: 1;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding-top: 50px;
    // input {
    //     width: 100px;
    //     height: 100px;
    // }
  }
}
</style>
