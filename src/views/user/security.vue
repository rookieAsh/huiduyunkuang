<template>
  <div class="securityPage">
    <div class="k60"></div>
    <div class="content flex">
      <div class="item" @click="show = true">
        <div class="name">登录密码</div>
        <div class="tip">用于账户登录</div>
        <div class="btn text-center">确定</div>
      </div>
      <div class="item" @click="show1 = true">
        <div class="name">交易密码</div>
        <div class="tip">用于交易，提现，划转等安全设置验证</div>
        <div class="btn text-center">确定</div>
      </div>
    </div>
    <div class="popup" v-if="show">
      <div class="cnt">
        <div class="title text-center">登录密码</div>
        <input type="password" placeholder="请输入原登录密码" v-model="pwd" />
        <input type="password" placeholder="请输入登录密码" v-model="newPwd" />
        <input
          type="password"
          placeholder="请再次输入登录密码"
          v-model="reNewPwd"
        />
        <div class="btns">
          <div class="btn" @click="show = false">取消</div>
          <div class="btn" @click="setLoginPwd()">确定</div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="show1">
      <div class="cnt">
        <div class="title text-center">设置交易密码</div>
        <input
          type="password"
          placeholder="请设置交易密码"
          v-model="tradePwd"
        />
        <input
          type="password"
          placeholder="请再次输入交易密码"
          v-model="reTradePwd"
        />
        <div class="flex">
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <div class="code" @click="sendCode()">{{ remain }}</div>
        </div>

        <div class="btns">
          <div class="btn" @click="show1 = false">取消</div>
          <div class="btn" @click="setTradePwd()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show1: false,
      remain: "发送验证码",
      countDown: 60,
      isSend: false,
      timer: null,
      tradePwd: "",
      reTradePwd: "",
      code: "",
      pwd: "",
      newPwd: "",
      reNewPwd: ""
    };
  },
  methods: {
    setLoginPwd() {
      if (!this.pwd) {
        return this.$message("请输入原登录密码");
      }
      if (this.newPwd.length < 8 || this.newPwd.length > 20) {
        return this.$message("登录密码的长度必须为8——20位");
      }
      if (this.newPwd != this.reNewPwd) {
        return this.$message("两次登录密码输入不一致");
      }
      let param = new URLSearchParams();
      let userId = sessionStorage.getItem("userId");
      param.append("userId", userId);
      param.append("oldpassword", this.pwd);
      param.append("password", this.newPwd);
      param.append("passwordrep", this.reNewPwd);
      this.$axios.post("/register/updatePassword", param).then(res => {
        let result = res.data;
        console.log(result);
        if (result.state == 0) {
          this.show = false;
          this.$message.success("修改成功");
          this.$router.push({
            path: "./home"
          });
        } else {
          this.$message(result.message);
        }
      });
    },
    setTradePwd() {
      if (!this.tradePwd) {
        return this.$message("请输入交易密码");
      }
      if (this.tradePwd.length != 6) {
        return this.$message("交易密码长度位6");
      }
      if (this.tradePwd != this.reTradePwd) {
        return this.$message("两次交易密码输入不一致");
      }
      if (!this.code) {
        return this.$message("请输入验证码");
      }
      let param = new URLSearchParams();
      let userId = sessionStorage.getItem("userId");
      param.append("userId", userId);
      param.append("jypassword", this.tradePwd);
      param.append("jypasswordrep", this.reTradePwd);
      param.append("code", this.code);
      this.$axios.post("/register/addJYpassword", param).then(res => {
        let result = res.data;
        console.log(result);
        if (result.state == 0) {
          this.show1 = false;
          this.$message.success("设置成功");
        } else {
          this.$message(result.message);
        }
      });
    },
    // 发送验证码
    sendCode() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      if (this.isSend) return;
      this.isSend = true;
      this.$axios.post("/register/sendSmsSendMessage", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.isSend = true;
          this.$message.success(result.message);
          this.remain = this.countDown + "S后重新获取";
          this.timer = setInterval(() => {
            this.countDown--;
            this.remain = this.countDown + "S后重新获取";
            if (this.countDown == 0) {
              clearInterval(this.timer);
              this.remain = "发送验证码";
              this.countDown = 60;
              this.isSend = false;
            }
          }, 1000);
        } else {
          this.$message(result.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  padding: 180px 0;
  .item {
    width: 316px;
    background: #ffffff;
    box-shadow: 0px 9px 21px 0px rgba(29, 39, 53, 0.1);
    border-radius: 10px;
    padding: 30px;
    margin-right: 20px;
    .name {
      color: #666;
      font-size: 24px;
      font-weight: 500;
    }
    .tip {
      padding: 10px 0;
    }
    .btn {
      width: 100%;
      height: 38px;
      background: #7e66f0;
      box-shadow: 0px 7px 8px 1px rgba(65, 79, 98, 0.08);
      border-radius: 5px;
      line-height: 38px;
      font-size: 20px;
      color: #ffffff;
      margin: 20px auto 0;
      cursor: pointer;
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
      border: #7e66f0 1px solid;
      padding-left: 10px;
      border-radius: 5px;
    }
    .code {
      width: 180px;
      color: #7e66f0;
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
        color: #7e66f0;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .content {
    width: 100%;
    margin: 0 auto;
    padding: 90px 0;
    .item {
      width: 166px;
      background: #ffffff;
      box-shadow: 0px 9px 21px 0px rgba(29, 39, 53, 0.1);
      border-radius: 10px;
      padding: 20px;
      margin-right: 20px;
      margin-left: 20px;
      .name {
        color: #666;
        font-size: 20px;
        font-weight: 500;
      }
      .tip {
        height: 85px;
        font-size: 16px;
        padding: 10px 0;
      }
      .btn {
        width: 70%;
        height: 30px;
        background: #7e66f0;
        box-shadow: 0px 7px 8px 1px rgba(65, 79, 98, 0.08);
        border-radius: 5px;
        line-height: 30px;
        font-size: 14px;
        color: #ffffff;
        margin: 20px auto 0;
        cursor: pointer;
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
      width: 300px;
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
        border: #7e66f0 1px solid;
        padding-left: 10px;
        border-radius: 5px;
      }
      .code {
        width: 180px;
        color: #7e66f0;
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
          color: #7e66f0;
        }
      }
    }
  }
}
</style>
