<template>
  <div class="walletPage">
    <div class="k60"></div>
    <div class="content">
      <div class="assets">
        <div class="flex">
          <div class="name">账户总资产</div>
          <div class="num">￥{{ assets | number(8) }}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="th flex">
        <div class="li">币种</div>
        <div class="li">可用</div>
        <div class="li">冻结</div>
        <div class="li">操作</div>
      </div>
      <div class="td flex margin20" v-for="(item, index) in list" :key="index">
        <div class="li">{{ item.coin }}</div>
        <div class="li">{{ item.validMoney | number(8) }}</div>
        <div class="li">{{ item.freezeMoney | number(8) }}</div>
        <div class="li flex-between align-center text-center">
          <div class="cell1" @click="showCharge(item)">充币</div>
          <div class="cell2" @click="showWithdraw(item)">提币</div>
          <div class="cell3" @click="showTransfer(item)">划转</div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="ChargeShow">
      <div class="cnt">
        <div class="title text-center">{{ coin }}充值</div>
        <div class="qrCode">
          <img
            class="image"
            v-if="img != ''"
            :src="img"
            :style="{ width: size + 'px', height: size + 'px' }"
          />
        </div>
        <div class="link">
          充值地址：{{ val }}
          <i
            class="el-icon-copy-document"
            v-clipboard:copy="val"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></i>
        </div>
        <div class="cancle text-center" @click="ChargeShow = false">确认</div>
        <!-- <div class="cle" @click="hidePop2()">取消</div> -->
      </div>
    </div>
    <div class="popup" v-if="WithdrawShow">
      <div class="cnt">
        <div class="title text-center">{{ coin }}提现</div>
        <div class="inpDiv flex ">
          <div class="lable">提现地址</div>
          <input type="text" placeholder="请输入提现地址" v-model="address" />
        </div>
        <div class="inpDiv flex ">
          <div class="lable">数量</div>
          <input type="text" placeholder="请输入提现数量" v-model="quantity" />
        </div>
        <div class="inpDiv flex">
          <div class="lable">手续费</div>
          <div class="val">{{ withdraw_service }}</div>
        </div>
        <div class="inpDiv flex" style="height:100px">
          <div class="lable">备注</div>
          <textarea placeholder="请输入备注" v-model="remark"></textarea>
        </div>
        <div class="inpDiv flex ">
          <div class="lable">交易密码</div>
          <input
            type="password"
            placeholder="请输入交易密码"
            v-model="tradePwd"
          />
        </div>
        <div class="flex" style="padding:0 40px">
          <div class="cancle text-center" @click="withdrawBtn()">确认</div>
          <div class="cle" @click="hidePop()">取消</div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="TransferShow">
      <div class="cnt">
        <div class="title text-center">{{ coin }}提现</div>
        <div class="tabs flex-between">
          <div class="tab"><span>从</span>{{ name1 }}</div>
          <div class="icon" @click="exchange(name1)">
            <img src="../../assets/imgs/huazhuan.png" alt="" />
          </div>
          <div class="tab"><span>到</span>{{ name2 }}</div>
        </div>
        <div class="inpDiv flex ">
          <div class="lable">数量</div>
          <input type="text" placeholder="请输入划转数量" v-model="quantity" />
        </div>
        <div class="inpDiv flex ">
          <div class="lable">交易密码</div>
          <input
            type="password"
            placeholder="请输入交易密码"
            v-model="tradePwd"
          />
        </div>
        <div class="flex" style="padding:0 40px">
          <div class="cancle text-center" @click="transferBtn()">确认</div>
          <div class="cle" @click="hidePop1()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QR from "../../common/qrcode/qrcode.js";

export default {
  data() {
    return {
      ChargeShow: false,
      WithdrawShow: false,
      TransferShow: false,
      val: "",
      img: "",
      size: 180,
      list: [],
      coin: "",
      address: "",
      quantity: "",
      remark: "",
      tradePwd: "",
      withdraw_service: "",
      assets: "",
      name1: "钱包账户",
      name2: "挖矿账户",
      type: 1
    };
  },
  created() {
    this.init();
  },
  methods: {
    exchange(name) {
      var name = name;
      this.name1 = this.name2;
      this.name2 = name;
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    init() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/custody/selectWellatByCoinFlash", param).then(res => {
        let result = res.data.data;
        console.log(result);
        this.list = result;
        this.list.forEach(item => {
          if (item.balanceCNY) {
            item.balanceCNY = Number(item.balanceCNY);
            this.assets = this.assets + item.balanceCNY;
            this.assets = Number(this.assets);
          }
        });
      });
    },
    creatQrcode() {
      let val = String(this.val);
      if (val == "") {
        return false;
      }
      let img = QR.createQrCodeImg(val, {
        size: parseInt(this.size)
      });
      this.img = img;
    },
    onCopy: function(e) {
      this.$message.success("复制成功");
    },
    onError: function(e) {
      this.$message("复制失败");
    },
    showCharge(item) {
      this.ChargeShow = true;
      this.coin = item.coin;
      this.val = item.addressKey;
      this.creatQrcode();
    },
    showWithdraw(item) {
      this.WithdrawShow = true;
      this.coin = item.coin;
      this.withdraw_service = item.withdraw_service;
      this.addressKey = item.addressKey;
    },
    showTransfer(item) {
      this.TransferShow = true;
      this.coin = item.coin;
      this.addressKey = item.addressKey;
    },
    withdrawBtn() {
      if (!this.quantity) {
        this.$u.toast("请输入划转数量");
      }
      if (!this.tradePwd) {
        this.$u.toast("请输入交易密码");
      }
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      param.append("value", this.quantity);
      param.append("comment", this.remark);
      param.append("jypassword", this.tradePwd);
      param.append("withdraw_service", this.withdraw_service);
      param.append("addressKey", this.addressKey);
      param.append("toAddress", this.address);
      this.$axios.post("/custody/coinWithdraw", param).then(res => {
        let result = res.data.data;
        console.log(result);
      });
    },
    hidePop() {
      if (this.WithdrawShow) {
        this.WithdrawShow = false;
      }
    },
    hidePop1() {
      if (this.TransferShow) {
        this.TransferShow = false;
      }
    },
    // hidePop2() {
    //   if (this.ChargeShow) {
    //     this.ChargeShow = false;
    //   }
    // },
    transferBtn() {
      if (!this.quantity) {
        this.$u.toast("请输入划转数量");
      }
      if (!this.tradePwd) {
        this.$u.toast("请输入交易密码");
      }
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      param.append("fromAddressKey", this.addressKey);
      param.append("toAddressKey", this.addressKey);
      param.append("coin", this.coin);
      param.append("value", this.quantity);
      param.append("type", this.type);
      this.$axios.post("/custody/transfer", param).then(res => {
        let result = res.data.data;
        console.log(result);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  padding: 80px 0;
  margin: 0 auto;
  .assets {
    width: 100%;
    height: 80px;
    display: flex;
    line-height: 80px;
    .name {
      color: #000;
      font-size: 28px;
      font-weight: 600;
    }
    .num {
      color: #999;
      font-size: 28px;
      padding-left: 20px;
    }
  }
  .line {
    width: 1200px;
    height: 5px;
    background: #fff5ed;
  }
  .th {
    width: 100%;
    margin-top: 40px;
    .li {
      width: 20%;
      font-size: 20px;
    }
    .li:nth-child(4) {
      width: 40%;
      text-align: center;
    }
  }
  .td {
    height: 80px;
    border-bottom: 1px solid #dbdbdb;

    .li {
      width: 20%;
      font-size: 20px;
      line-height: 80px;
      .cell1 {
        width: 120px;
        height: 48px;
        background: #7e66f0;
        border-radius: 5px;
        line-height: 48px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
      .cell2 {
        width: 120px;
        height: 48px;
        background: #ff9915;
        border-radius: 5px;
        line-height: 48px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
      .cell3 {
        width: 120px;
        height: 48px;
        background: #000000;
        border-radius: 5px;
        line-height: 48px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .li:nth-child(4) {
      width: 40%;
    }
  }
}
.popup {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .cnt {
    width: 605px;
    background: #ffffff;
    box-shadow: 0px 16px 43px 0px rgba(29, 39, 53, 0.16);
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    .title {
      color: #000;
      font-size: 26px;
    }
    .qrCode {
      width: 180px;
      height: 180px;
      margin: 20px auto;
    }
    .link {
      color: #333;
      font-size: 16px;
      text-align: center;
      padding-top: 20px;
    }
    .cancle {
      width: 304px;
      height: 40px;
      background: #7e66f0;
      border-radius: 10px;
      line-height: 40px;
      color: #fff;
      font-size: 20px;
      margin: 30px auto;
      cursor: pointer;
    }
    .cle {
      width: 100px;
      height: 40px;
      background: #ececec;
      line-height: 40px;
      margin: 30px auto;
      text-align: center;
      border-radius: 10px;
      cursor: pointer;
      color: #fff;
    }
    .inpDiv {
      width: 420px;
      height: 40px;
      margin: 20px auto 0;
      align-items: center;
      input {
        display: block;
        flex: 1;
        height: 36px;
        color: #333;
        font-size: 18px;
        outline: none;
        border: none;
        border-bottom: 1px solid #999;
        margin-left: 20px;
      }
      textarea {
        flex: 1;
        margin-left: 20px;
        height: 100px;
        color: #333;
        font-size: 18px;
        outline: none;
        border: none;
        border: 1px solid #999;
        padding: 10px;
        resize: none;
      }
      .val {
        padding-left: 20px;
        color: #8d8d8d;
        font-size: 20px;
      }
      .lable {
        width: 80px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: 18px;
      }
    }
    .tabs {
      padding: 0 100px;
      margin-bottom: 30px;
      margin-top: 30px;
      .tab {
        color: #333;
        font-size: 20px;
        span {
          padding-right: 10px;
          font-size: 16px;
        }
      }
    }
    .icon {
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 767px) {
  .content {
    width: 100%;
    padding: 40px 20px;
    margin: 0 auto;
    .assets {
      width: 100%;
      height: 40px;
      display: flex;
      line-height: 40px;
      .name {
        color: #000;
        font-size: 14px;
        font-weight: 600;
      }
      .num {
        color: #999;
        font-size: 14px;
        padding-left: 10px;
      }
    }
    .line {
      width: 100%;
      height: 5px;
      background: #fff5ed;
    }
    .th {
      width: 100%;
      margin-top: 20px;
      .li {
        width: 25%;
        font-size: 12px;
      }
      .li:nth-child(4) {
        width: 30%;
        text-align: center;
      }
    }
    .td {
      height: 40px;
      border-bottom: 1px solid #dbdbdb;
      .li {
        width: 100%;
        font-size: 12px;
        line-height: 40px;
        .cell1 {
          width: 120px;
          height: 24px;
          background: #7e66f0;
          border-radius: 5px;
          line-height: 24px;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
        }
        .cell2 {
          width: 120px;
          height: 24px;
          margin: 0 5px;
          background: #ff9915;
          border-radius: 5px;
          line-height: 24px;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
        }
        .cell3 {
          width: 120px;
          height: 24px;
          background: #000000;
          border-radius: 5px;
          line-height: 24px;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .li:nth-child(4) {
        width: 30%;
      }
    }
  }
  .popup {
    width: 100%;
    // height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .cnt {
      width: 300px;
      background: #ffffff;
      box-shadow: 0px 16px 43px 0px rgba(29, 39, 53, 0.16);
      border-radius: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 0px;
      .title {
        color: #000;
        font-size: 16px;
        margin-top: 10px;
      }
      .qrCode {
        width: 100%;
        // height: 100%;
        margin: 30px auto;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .link {
        width: 100%;
        color: #333;
        font-size: 12px;
        text-align: center;
        padding-top: 0px;
      }
      .cancle {
        width: 60%;
        height: 30px;
        line-height: 30px;
        background: #7e66f0;
        border-radius: 15px;
        color: #fff;
        font-size: 12px;
        margin: 10px auto;
        cursor: pointer;
      }
      .cle {
        width: 50px;
        height: 30px;
        line-height: 30px;
        background: #ececec;
        margin: 10px auto;
        text-align: center;
        font-size: 12px;
        border-radius: 15px;
        cursor: pointer;
        color: #fff;
      }
      .inpDiv {
        width: 210px;
        height: 20px;
        margin: 10px auto 0;
        align-items: center;
        input {
          display: block;
          flex: 1;
          height: 20px;
          color: #333;
          font-size: 12px;
          outline: none;
          border: none;
          border-bottom: 1px solid #999;
          margin-left: 10px;
        }
        textarea {
          flex: 1;
          margin-left: 10px;
          height: 50px;
          color: #333;
          font-size: 12px;
          outline: none;
          border: none;
          border: 1px solid #999;
          padding: 5px;
          resize: none;
        }
        .val {
          padding-left: 10px;
          color: #8d8d8d;
          font-size: 12px;
        }
        .lable {
          width: 40px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #000000;
        }
        input::-webkit-input-placeholder {
          color: #999;
          font-size: 12px;
        }
      }
      .tabs {
        padding: 0 50px;
        margin-bottom: 15px;
        margin-top: 15px;
        .tab {
          color: #333;
          font-size: 14px;
          span {
            padding-right: 5px;
            font-size: 12px;
          }
        }
      }
      .icon {
        cursor: pointer;
      }
    }
  }
}
</style>
