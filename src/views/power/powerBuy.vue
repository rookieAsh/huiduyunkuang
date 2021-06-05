<template>
  <div class="content margin0 ">
    <div class="flex-between">
      <div class="leftContent">
        <div class="title">
          图灵T6por
          <div>高性能</div>
        </div>
        <div class="title2 flex-between">
          <div>购买份额</div>
          <div class="dayWidth">{{ number }}</div>
        </div>
        <div class="title2 flex-between">
          <div>金额</div>
          <div v-if="this.active == 0" class="dayWidth">{{ amount }} USDT</div>
          <div v-if="this.active == 1" class="dayWidth">￥{{ amounts }}</div>
        </div>
        <div class="title2">支付方式</div>
        <div class="pay">
          <div
            class="usdt"
            :class="{ active: active === 0 }"
            @click="usdtClick(1)"
          >
            <img src="../../assets/imgs/usdt.png" alt="" />
            <div class="usdtPay">usdt支付</div>
          </div>
          <div
            class="zfb"
            :class="{ active: active === 1 }"
            @click="yhkClick(2)"
          >
            <img src="../../assets/imgs/yhk.png" alt="" />
            <div class="zfbPay">银行卡支付</div>
          </div>
        </div>
        <div class="balance" v-if="this.active == 0">
          <div class="balValue">账户余额：{{ balance }}</div>
          <div class="btn" @click="chongzhi()">充值</div>
        </div>
        <div v-if="this.active == 1">
          <div class="title2">转账信息</div>
          <div
            v-for="(item, index) in bankcardDate"
            :key="index"
            :class="{ bankcardClass: index >= 1 }"
          >
            <div class="flex-between heightTit">
              <div class="title3">账户名</div>
              <div class="titleContent">{{ item.accountName }}</div>
            </div>
            <div class="flex-between">
              <div class="title3">电费天数</div>
              <div class="titleContent">{{ item.bank_of_deposit }}</div>
            </div>
            <div class="flex-between heightTit">
              <div class="title3">账号</div>
              <div class="titleContent">{{ item.corporate_account }}</div>
            </div>
          </div>
          <div class="title2">支付信息</div>
          <div class="flex-between heightTit">
            <div class="title3">真实姓名</div>
            <div>
              <el-input v-model="index1" size="large" clearable></el-input>
            </div>
          </div>
          <div class="flex-between heightTit">
            <div class="title3">银行卡卡号</div>
            <div>
              <el-input v-model="index2" size="large" clearable></el-input>
            </div>
          </div>
          <div class="flex-between heightTit">
            <div class="title3">银行开户行</div>
            <div>
              <el-input v-model="index3" size="large" clearable></el-input>
            </div>
          </div>
          <!-- <div class="flex-between heightTit">
            <div class="title3">上传成功凭证截图显示</div>
            <div class="credential">
              <img :src="imageUrl" alt="" />
            </div>
          </div> -->
        </div>
      </div>
      <div class="rightContent">
        <img src="../../assets/imgs/pic.png" alt="" />
      </div>
    </div>
    <div>
      <div v-if="this.active == 0" class="footerBtn" @click="pop()">
        确定支付
      </div>
      <div
        v-if="this.active == 1"
        class="footerBtn"
        @click="handleCredentials()"
      >
        上传支付凭证截图
      </div>
    </div>
    <!-- <div class="footerBtn" style="display:none">上传成功</div> -->

    <el-dialog
      title="上传截图凭证"
      :visible.sync="creVisible"
      :before-close="handleClose"
    >
      <!-- <el-upload
        class="avatar-uploader"
        action=""
        :data="Aliyun"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-progress="handleProgress"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
      <div style="font-size:20px">
        <input type="file" id="doc" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="creVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPay">确定</el-button>
      </span>
    </el-dialog>

    <!-- 充值 -->
    <el-dialog
      title="充值"
      :visible.sync="czVisible"
      :before-close="handleCloseCz"
    >
      <div class="qrCode">
        <img
          class="image"
          v-if="img != ''"
          :src="img"
          :style="{ width: size + 'px', height: size + 'px' }"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="czVisible = false">取 消</el-button>
        <el-button type="primary" @click="czVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 凭证截图展示 -->
    <el-dialog
      title="截图凭证展示"
      :visible.sync="screenshotVisible"
      center
      :before-close="handleScreenshot"
    >
      <div class="credential">
        <img :src="imageUrl" alt="" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="screenshotComfig">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Oss from "ali-oss";
import loginVue from "../login/login.vue";
import QR from "../../common/qrcode/qrcode.js";

export default {
  data() {
    return {
      flagPay: false,
      screenshotVisible: false, //截图
      czVisible: false,
      creVisible: false,
      urlAddressKey: "",
      active: 0,
      radio: "",
      index1: "",
      index2: "",
      index3: "",
      address: "",
      img: "",
      size: 180,
      balance: "",
      addressKey: "", //钱包地址
      type: 1, //类型
      productId: "", //矿机ID
      number: "", //矿机数量
      amount: "", //usdt总价
      amounts: "", //人民币总价
      res: {}, // 存签名信息
      imageUrl: "",
      fileMsg: "",
      bankcardDate: []
    };
  },
  created() {
    this.getBalance();
    this.productId = this.$route.query.productId;
    this.number = this.$route.query.number;
    this.amount = (this.$route.query.amount / 6.62).toFixed(4);
    this.amounts = this.$route.query.amount;
    // this.getWellatAddress();
    this.getBankcardData();
  },

  watch: {
    $route(to, from) {
      this.getBalance();
      this.getData();
    }
  },
  methods: {
    // handleProgress(res, file) {
    //   console.log(12345678);
    //   this.getAliyunMsg();
    // },
    // 获得银行卡的信息
    async getBankcardData() {
      await this.$axios.post("/MartianOrePool/selectReceiptBank").then(res => {
        this.bankcardDate = res.data.data;
      });
    },
    // 获取阿里云数据
    async getClientData() {
      await this.$axios.post("/Autnentication/sts").then(res => {
        this.res = res.data;
      });
    },
    // 获得页面传来的数据
    getData() {
      this.productId = this.$route.query.productId;
      this.number = this.$route.query.number;
      this.amount = (this.$route.query.amount / 6.62).toFixed(4);
      this.amounts = this.$route.query.amount;
    },
    // 关掉充值按钮
    handleClose() {
      this.creVisible = false;
    },
    // usdt确定支付 输入密码
    screenshotComfig() {
      this.screenshotVisible = false;
      //   this.popCard();
      this.cloudPay();
    },
    pop() {
      this.$prompt("请输入交易密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password"
      })
        .then(({ value }) => {
          this.payByUsdt(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    // 银行卡确定支付 输入密码
    // popCard() {
    //   this.$prompt("请输入交易密码", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputType: "password"
    //   })
    //     .then(({ value }) => {
    //       this.cloudPay(value);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "取消输入"
    //       });
    //     });
    // },
    // usdt 支付
    payByUsdt(value) {
      if (!value) return this.$message("请输入交易密码");
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/custody/selectWellatByCoinFlash", param).then(res => {
        const result = res.data.data;
        result.forEach(item => {
          if (item.coin == "USDT") {
            this.addressKey = item.addressKey;
            this.payUsdtComfig(address, value, this.addressKey);
          }
        });
      });
    },
    // usdt支付确定
    payUsdtComfig(address, value, addressKey) {
      let param = new URLSearchParams();
      param.append("address", address);
      param.append("addressKey", addressKey);
      param.append("jypassword", value);
      param.append("type", this.type);
      param.append("productId", this.productId);
      param.append("money", this.amount);
      param.append("number", this.number);
      //   param.append("backNumber", "");
      //   param.append("backName", "");
      //   param.append("name", "");
      //   param.append("file", "");
      this.$axios.post("MartianOrePool/cloudPayment", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.$message.success("购买成功");
        } else {
          this.$message(result.message);
        }
      });
    },
    // 上传凭证
    handleCredentials() {
      if (this.index1 == "" || this.index2 == "" || this.index3 == "") {
        this.$message.warning("请先完善支付信息");
        return;
      }
      this.getClientData();
      this.creVisible = true;
    },
    // 银行卡确定上传截图
    async confirmPay() {
      await this.getClientData();
      const client = new Oss({
        region: "oss-cn-beijing",
        accessKeyId: this.res.accessKeyId,
        accessKeySecret: this.res.accessKeySecret,
        stsToken: this.res.securityToken,
        bucket: "zhaoxuefei-image",
        secure: true
      });
      const docObj = document.getElementById("doc");
      const file = docObj.files[0];
      this.fileMsg = file;
      const val = docObj.value;
      //   const fileSize = files.size;
      //   const size = fileSize / 1024;
      //   const fileMaxSize = 500;
      //   if (size > fileMaxSize) return this.$message.error("图标不得大于500k");
      const now = new Date().getTime();
      const suffix = "img_" + this.getDate(now) + val.substr(val.indexOf("."));
      const result = await client.multipartUpload(suffix, file);
      this.imageUrl = result.res.requestUrls[0];
      this.creVisible = false;
      this.screenshotVisible = true;
    },
    usdtClick(value) {
      this.active = 0;
      this.type = value;
    },
    yhkClick(value) {
      this.active = 1;
      this.getBalance();
      this.type = value;
      this.index1 = "";
      this.index2 = "";
      this.index3 = "";
      this.imageUrl = "";
    },
    // 取消充值
    handleCloseCz() {
      this.czVisible = false;
    },
    // 截图弹窗关闭
    handleScreenshot() {
      this.screenshotVisible = false;
    },
    //  银行卡支付
    cloudPay(value) {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      //   param.append("addressKey", addressKey);
      //   param.append("jypassword", value);
      param.append("type", this.type);
      param.append("productId", this.productId);
      param.append("money", this.amounts);
      param.append("number", this.number);
      param.append("name", this.index1);
      param.append("backNumber", this.index2);
      param.append("backName", this.index3);
      param.append("file", this.fileMsg);
      this.$axios.post("MartianOrePool/cloudPayment", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.$message.success("上传凭证成功，请等待审核");
          this.index1 = "";
          this.index2 = "";
          this.index3 = "";
        } else {
          this.$message(result.message);
          this.index1 = "";
          this.index2 = "";
          this.index3 = "";
        }
      });
    },
    // 生成二维码
    creatQrcode(val) {
      //   let val = String(this.val);
      if (val == "") {
        return false;
      }
      let img = QR.createQrCodeImg(val, {
        size: parseInt(this.size)
      });
      this.img = img;
    },
    // 账户余额
    getBalance() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("custody/selectWellatByCoinFlash", param).then(res => {
        let result = res.data.data;
        result.map(item => {
          if (item.coin == "USDT") this.urlAddressKey = item.addressKey;
          this.balance = item.balance;
        });
      });
    },
    // 充值
    chongzhi() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.czVisible = true;
      this.$axios.post("custody/selectWellatByCoinFlash", param).then(res => {
        let result = res.data.data;
        result.map(item => {
          if (item.coin == "USDT") this.urlAddressKey = item.addressKey;
          this.creatQrcode(this.urlAddressKey);
          this.balance = item.balance;
        });
      });
    },
    // 时间处理
    getDate(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month =
        date.getMonth() < 10 ? date.getMonth() + 1 : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      const nowTime =
        year + "-" + month + "-" + day + "_" + hh + "-" + mm + "-" + ss;
      return nowTime;
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  padding: 100px 0 0 30px;
  .leftContent {
    width: 100%;
    .title {
      // height: 49px;
      font-size: 48px;
      font-weight: 800;
      color: #000000;
      line-height: 60px;
    }
    .title2 {
      // height: 35px;
      font-size: 36px;
      font-weight: bold;
      color: #000000;
      line-height: 32px;
      margin: 40px 0;
      .dayWidth {
        width: 600px;
      }
    }
    .pay {
      font-size: 26px;
      font-weight: bold;
      color: #000000;

      .usdt {
        width: 266px;
        height: 78px;
        line-height: 78px;
        margin-right: 63px;
        text-align: center;
        display: inline-block;
        border-radius: 10px;
        border: 1px solid rgb(255, 201, 155);
        .usdtPay {
          display: inline-block;
        }
        img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
          margin-bottom: 10px;
        }
      }
      .zfb {
        width: 266px;
        height: 78px;
        line-height: 78px;
        text-align: center;
        display: inline-block;
        border-radius: 10px;
        border: 1px solid rgb(255, 201, 155);
        .zfbPay {
          display: inline-block;
        }
        img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
          margin-bottom: 6px;
        }
      }
      .active {
        // width: 266px;
        // height: 78px;
        // line-height: 78px;
        // text-align: center;
        // display: inline-block;
        // border-radius: 10px;
        color: #ffffff;
        background-color: rgb(255, 201, 155);
        // border: 1px solid rgb(255, 201, 155);
      }
    }
    .balance {
      width: 521px;
      height: 83px;
      line-height: 83px;
      margin: 40px 0 0 0;
      border: 0;
      background-color: #f2f2f2;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      opacity: 0.5;
      .balValue {
        display: inline-block;
        margin: 0 120px 0 20px;
      }
      .btn {
        width: 117px;
        height: 48px;
        border-radius: 10px;
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 48px;
        font-weight: 500;
        color: #fff;
        background: linear-gradient(121deg, #ff9b47, #ffc99b);
      }
    }
    .title3 {
      font-size: 26px;
      font-weight: 400;
      color: #000000;
      opacity: 0.61;
    }
    .bankcardClass {
      border-top: 1px solid #ccc;
    }
    .titleContent {
      font-size: 28px;
      font-weight: 500;
      color: #000000;
    }
    .heightTit {
      margin: 20px 0;
    }
    .el-input {
      width: 500px;
      font-size: 24px;
    }
    .credential {
      width: 500px;
      img {
        width: 100%;
      }
    }
  }
  .rightContent {
    width: 500px;
    img {
      width: 320px;
      height: 220px;
    }
  }
  .footerBtn {
    width: 568px;
    height: 89px;
    line-height: 89px;
    text-align: center;
    margin: 0 auto;
    margin-top: 170px;
    margin-bottom: 180px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border-radius: 50px;
    background: linear-gradient(121deg, #ff9b47, #ffc99b);
  }
}
.el-dialog__body .qrCode {
  display: flex;
  justify-content: center;
  align-content: center;
}
@media screen and (max-width: 767px) {
  .content {
    width: 100%;
    padding: 100px 0 0 15px;
    .leftContent {
      width: 85%;
      .title {
        // height: 49px;
        font-size: 20px;
        font-weight: 800;
        color: #000000;
        line-height: 30px;
      }
      .title2 {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        font-weight: bold;
        color: #000000;
        margin: 20px 0;
        .dayWidth {
          width: 190px;
        }
      }
      .pay {
        font-size: 13px;
        font-weight: bold;
        color: #000000;

        .usdt {
          width: 133px;
          height: 39px;
          line-height: 39px;
          margin-right: 32px;
          text-align: center;
          display: inline-block;
          border-radius: 5px;
          border: 1px solid rgb(255, 201, 155);
          .usdtPay {
            display: inline-block;
          }
          img {
            width: 25px;
            height: 25px;
            vertical-align: middle;
            margin-bottom: 5px;
          }
        }
        .zfb {
          width: 133px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          display: inline-block;
          border-radius: 5px;
          border: 1px solid rgb(255, 201, 155);
          .zfbPay {
            display: inline-block;
          }
          img {
            width: 25px;
            height: 25px;
            vertical-align: middle;
            margin-bottom: 3px;
          }
        }
        .active {
          // width: 266px;
          // height: 78px;
          // line-height: 78px;
          // text-align: center;
          // display: inline-block;
          // border-radius: 10px;
          color: #ffffff;
          background-color: rgb(255, 201, 155);
          // border: 1px solid rgb(255, 201, 155);
        }
      }
      .balance {
        width: 260px;
        height: 46px;
        line-height: 46px;
        margin: 20px 0 0 0;
        border: 0;
        background-color: #f2f2f2;
        font-size: 12px;
        font-weight: 500;
        color: #000000;
        opacity: 0.5;
        .balValue {
          display: inline-block;
          margin: 0 60px 0 10px;
        }
        .btn {
          width: 60px;
          height: 24px;
          border-radius: 5px;
          display: inline-block;
          cursor: pointer;
          text-align: center;
          line-height: 24px;
          font-weight: 500;
          color: #fff;
          background: linear-gradient(121deg, #ff9b47, #ffc99b);
        }
      }
      .title3 {
        display: block;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        font-weight: 400;
        color: #000000;
        opacity: 0.61;
      }

      .titleContent {
        font-size: 14px;
        line-height: 30px;
        font-weight: 500;
        color: #000000;
      }
      .heightTit {
        margin: 10px 0;
      }
      .el-input {
        width: 200px;
        font-size: 12px;
      }
      .credential {
        width: 250px;
        img {
          width: 100%;
        }
      }
    }
    .rightContent {
      width: 20%;
      position: absolute;
      left: 200px;
      img {
        width: 160px;
        height: 110px;
      }
    }
    .footerBtn {
      width: 280px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin: 0 auto;
      margin-top: 40px;
      margin-bottom: 40px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      border-radius: 25px;
      background: linear-gradient(121deg, #ff9b47, #ffc99b);
    }
  }
  .el-dialog__body .qrCode {
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
</style>
