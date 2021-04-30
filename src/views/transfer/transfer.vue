<template>
  <div class="transferPage">
    <div class="k60" style="background: #815ff5"></div>
    <div class="box margin0">
      <div class="titleBox">
        <div class="title">支付</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="inpDiv margin30 flex-between align-center">
        <input type="text" placeholder="0.0000" v-model="quantity" />
        <div class="flex align-center" style="cursor: pointer">
          <div class="all" @click="quantity = using">全部</div>
          <div class="line"></div>
          <img :src="icon1" style="width: 60px; heiht: 60px" />
          <div class="coin">{{ coin1 }}</div>
          <el-dropdown class="flex align-center" @command="handleCommand">
            <img
              src="../../assets/imgs/a_down.png"
              style="width: 24px; heiht: 24px"
              class="el-dropdown-link"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item"
                v-for="(item, index) in coins"
                :key="index"
                class="text-center"
              >
                {{ item.coin }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="using margin10">账户余额 {{ using }}{{ coin1 }}</div>
      <div class="titleBox">
        <div class="title">兑换</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="inpDiv margin30 flex-between align-center">
        <input type="text" placeholder="0.0000" v-model="toNum" disabled />
        <div class="flex align-center" style="cursor: pointer">
          <img :src="icon2" style="width: 60px; heiht: 60px" />
          <div class="coin">{{ coin2 }}</div>
          <el-dropdown class="flex align-center" @command="handleCommand1">
            <img
              src="../../assets/imgs/a_down.png"
              style="width: 24px; heiht: 24px"
              class="el-dropdown-link"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item"
                v-for="(item, index) in coins"
                :key="index"
                class="text-center"
              >
                {{ item.coin }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="using flex-between margin10">
        <div>1{{ coin1 }} ≈ {{ exchangeRate }}{{ coin2 }}</div>
        <div class="rate">手续费：{{ service_charge }}%</div>
      </div>

      <div class="popup" v-if="showSubmit">
        <div class="cnt">
          <div class="title text-center">交易密码</div>
          <input
            type="password"
            placeholder="请输入交易密码"
            v-model="tradePwd"
          />
          <div class="btns">
            <div class="btn" @click="showSubmit = false">取消</div>
            <div class="btn" @click="submit()">确定</div>
          </div>
        </div>
      </div>

      <div class="btnSubmit text-center" @click="exchange()">兑换</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: "",
      coins: [],
      coin1: "",
      icon1: "",
      coin2: "",
      icon2: "",
      using: "",
      exchangeRate: "",
      service_charge: "",
      toNum: "",
      pwdStatus: "",
      show: false,
      showSubmit: false,
      remain: "发送验证码",
      countDown: 60,
      isSend: false,
      timer: null,
      tradePwd: "",
      code: ""
    };
  },
  created() {
    this.checkPwd();
    this.init();
  },
  watch: {
    quantity() {
      this.toNum = this.exchangeRate * this.quantity;
    },
    exchangeRate() {
      this.toNum = this.exchangeRate * this.quantity;
    }
  },
  methods: {
    // 校验是否设置交易密码
    checkPwd() {
      let param = new URLSearchParams();
      let userId = sessionStorage.getItem("userId");
      param.append("userId", userId);
      this.$axios.post("/register/checkJymimaZt", param).then(res => {
        this.pwdStatus = res.data.data;
        console.log(this.pwdStatus);
      });
    },

    // 获取币种
    init() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/custody/selectWellatByCoinFlash", param).then(res => {
        this.coins = res.data.data;
        this.coin1 = this.coins[0].coin;
        this.icon1 = this.coins[0].logo;
        this.coin2 = this.coins[1].coin;
        this.icon2 = this.coins[1].logo;
        this.using = this.coins[0].balance;
        this.getInfo();
      });
    },
    handleCommand(item) {
      let coin = this.coin1;
      let icon = this.icon1;
      this.coin1 = item.coin;
      this.icon1 = item.logo;
      this.using = item.balance;
      if (this.coin2 == this.coin1) {
        this.coin2 = coin;
        this.icon2 = icon;
      }
      this.getInfo();
    },
    handleCommand1(item) {
      let coin = this.coin2;
      let icon = this.icon2;
      this.coin2 = item.coin;
      this.icon2 = item.logo;
      if (this.coin1 == this.coin2) {
        this.coin1 = coin;
        this.icon1 = icon;
      }
      this.getInfo();
    },
    getInfo() {
      let param = new URLSearchParams();
      let symbol = this.coin1 + this.coin2;
      param.append("symbol", symbol);
      this.$axios.post("/index/showExchange", param).then(res => {
        this.exchangeRate = res.data.data[0].exchangeRate;
        this.service_charge = res.data.data[0].ervice_charge;
      });
    },

    // 兑换
    exchange() {
      if (!this.quantity) {
        this.$message("请输入数量");
      }
      if (this.pwdStatus == 0) {
        this.$message("用户未设置交易密码");
        this.$router.push({
          path: "./security"
        });
      }
      if (this.pwdStatus == 1) this.showSubmit = true;
    },
    submit() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      param.append("exchangeRate", this.exchangeRate);
      param.append("jypassword", this.tradePwd);
      param.append("service_charge", this.service_charge);
      param.append("exchangeMoney", this.quantity);
      param.append("coin", this.coin2);
      param.append("getCoin", this.coin1);
      this.$axios.post("/index/exchange", param).then(res => {
        let result = res.data.data;
        console.log(result);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 1200px;
  .titleBox {
    width: 100px;
    height: 50px;
    margin-top: 100px;
    position: relative;
    margin-left: 200px;
    .title {
      color: #9d83f3;
      font-size: 38px;
    }
    .title_bg {
      width: 70px;
      height: 24px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .inpDiv {
    width: 800px;
    height: 100px;
    border-bottom: 1px solid #ffd8b7;
    input {
      display: block;
      flex: 1;
      height: 60px;
      outline: none;
      border: none;
      background: transparent;
      font-size: 30px;
    }
    .line {
      width: 1px;
      height: 60px;
      background: #ff9915;
      opacity: 0.34;
      margin: 0 20px;
    }
    .all {
      font-size: 28px;
      font-weight: 500;
      color: #030303;
      line-height: 44px;
      opacity: 0.61;
    }
    .coin {
      color: #000;
      font-size: 30px;
      padding: 0 20px;
    }
  }
  .using {
    width: 800px;
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    .rate {
      font-size: 20px;
      font-weight: 400;
      color: #ff9915;
    }
  }
  .btnSubmit {
    width: 500px;
    height: 60px;
    background: linear-gradient(90deg, #ff9b47, #ffc99b);
    line-height: 60px;
    border-radius: 10px;
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    margin: 100px auto 200px;
    cursor: pointer;
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
    width: 360px;
    // height: 240px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    .title {
      color: #000;
      font-weight: 600;
      font-size: 20px;
      padding-bottom: 20px;
    }
    input {
      display: block;
      width: 100%;
      height: 40px;
      color: #333;
      font-size: 16px;
      margin-top: 10px;
      border: #ffab57 1px solid;
      padding-left: 10px;
      border-radius: 5px;
    }
    .code {
      width: 180px;
      color: #ff9915;
      font-size: 16px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 16px;
    }
    .btns {
      width: 100%;
      height: 38px;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .btn {
        width: 45%;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
      }
      .btn:nth-child(1) {
        font-size: 18px;
      }
      .btn:nth-child(2) {
        font-size: 18px;
        color: #ffab57;
      }
    }
  }
}
</style>
