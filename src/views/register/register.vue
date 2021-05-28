<template>
  <div class="registerPage">
    <div class="k60"></div>
    <div class="registerBox margin0">
      <div class="title text-center">欢迎注册灰度云矿</div>
      <div class="tabs flex">
        <div
          class="tab"
          :class="{ active: tabCurrent === 0 }"
          @click="changeTab(0)"
        >
          手机号
          <div class="activeBar"></div>
        </div>
        <div
          class="tab"
          :class="{ active: tabCurrent === 1 }"
          @click="changeTab(1)"
        >
          邮箱
          <div class="activeBar"></div>
        </div>
      </div>
      <div class="tabShow margin10">
        <input
          type="text"
          placeholder="请输入手机号"
          v-if="tabCurrent === 0"
          v-model="registerForm.phone"
        />
        <input
          type="text"
          placeholder="请输入邮箱"
          v-if="tabCurrent === 1"
          v-model="registerForm.email"
        />
      </div>
      <div class="tabShow">
        <input
          type="password"
          placeholder="请输入登录密码"
          v-model="registerForm.pwd"
        />
      </div>
      <div class="tabShow">
        <input
          type="password"
          placeholder="请再次输入登录密码"
          v-model="registerForm.rePwd"
        />
      </div>
      <div class="tabShow flex-between  align-center">
        <input
          type="text"
          class="textCode"
          placeholder="请输入验证码"
          v-model="registerForm.code"
        />
        <div
          class="code text-center"
          :class="{
            isColor:
              registerForm.phone.length == 11 || registerForm.email.length > 8
          }"
          @click="sendCode()"
        >
          {{ remain }}
        </div>
      </div>
      <div class="tabShow">
        <input
          type="text"
          placeholder="请输入邀请码（选填）"
          v-model="registerForm.inviteCode"
        />
      </div>

      <div class="checkbox">
        <el-checkbox v-model="checked">我已阅读并同意</el-checkbox>
        <span>服务协议</span>
        <span>隐私协议</span>
      </div>

      <div class="loginBtn text-center" @click="regBtn()">注册</div>
      <div class="link flex-between align-center">
        <div class="regBnt">
          已有账号？<span @click="navigate('../login')">去登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabCurrent: 0,
      checked: true,
      registerForm: {
        phone: "",
        email: "",
        pwd: "",
        rePwd: "",
        code: "",
        inviteCode: ""
      },
      remain: "发送验证码",
      countDown: 60,
      isSend: false,
      timer: null
    };
  },
  methods: {
    changeTab(index) {
      this.tabCurrent = index;
      this.registerForm.phone = "";
      this.registerForm.email = "";
    },
    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    // 发送验证码
    sendCode() {
      if (this.tabCurrent == 0) {
        if (!this.registerForm.phone) {
          return this.$message("请输入手机号");
        }
      } else {
        if (!this.registerForm.email) {
          return this.$message("请输入邮箱");
        }
      }
      let param = new URLSearchParams();
      param.append(
        "address",
        this.tabCurrent == 0 ? this.registerForm.phone : this.registerForm.email
      );
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
    },
    regBtn() {
      if (this.tabCurrent == 0) {
        if (!this.registerForm.phone) {
          return this.$message("请输入手机号");
        }
      } else {
        if (!this.registerForm.email) {
          return this.$message("请输入邮箱");
        }
      }
      if (!this.registerForm.pwd) {
        return this.$message("请设置登录密码");
      }
      if (this.registerForm.pwd != this.registerForm.rePwd) {
        return this.$message("两次密码输入不一致");
      }
      if (!this.registerForm.code) {
        return this.$message("请输入验证码");
      }
      let param = new URLSearchParams();
      param.append("password", this.registerForm.pwd);
      param.append(
        "address",
        this.tabCurrent == 0 ? this.registerForm.phone : this.registerForm.email
      );
      param.append("passwordrep", this.registerForm.rePwd);
      param.append("invitationcode", this.registerForm.inviteCode);
      param.append("code", this.registerForm.code);
      this.$axios.post("/register/registerPhoneOrEmail", param).then(res => {
        console.log(res);
        let result = res.data;
        if (result.state == 0) {
          this.$message(result.message);
          this.$router.push({
            path: "./login"
          });
        } else if (result.state == 1) {
          this.$message(result.message);
          this.$router.push({
            path: "./login"
          });
        } else {
          this.$message(result.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.registerPage {
  width: 100%;
  background: #101838;
  padding-top: 50px;
  padding-bottom: 100px;
  .registerBox {
    width: 400px;
    height: 520px;
    background: #fff;
    border-radius: 10px;
    padding: 0 40px;
    .title {
      color: #333;
      font-size: 18px;
      font-weight: 600;
      padding: 20px 0;
    }
    .tabs {
      .tab {
        color: #333;
        font-size: 16px;
        margin-right: 20px;
        cursor: pointer;
      }
      .active {
        color: #ff8e06;
        font-weight: 600;
      }
    }
    .tabShow {
      width: 100%;
      input {
        width: 100%;
        height: 42px;
        padding-left: 10px;
        font-size: 16px;
        margin-top: 10px;
        border: 1px solid #dde2e9;
        border-radius: 5px;
      }

      input::-webkit-input-placeholder {
        color: #999 !important;
        font-size: 16px !important;
      }
      .code {
        width: 160px;
        height: 42px;
        line-height: 42px;
        background: #f2f4fb;
        margin-left: 20px;
        border-radius: 5px;
        margin-top: 10px;
        color: #333;
        cursor: pointer;
      }
      .isColor {
        background: #ff8e06;
        color: #fff;
      }
    }
    .tip {
      font-size: 14px;
      color: #eb3d45;
      padding: 8px 0;
    }
    .loginBtn {
      width: 100%;
      height: 48px;
      line-height: 48px;
      color: #fff;
      background: linear-gradient(
        21deg,
        rgba(255, 155, 71, 0.7),
        rgba(255, 201, 155, 0.7),
        rgba(255, 201, 155, 0.7)
      );
      box-shadow: -1px 12px 21px 0px rgba(29, 39, 53, 0.16);
      font-size: 18px;
      border-radius: 5px;
      margin-top: 30px;
      font-weight: 600;
      cursor: pointer;
    }
    .checkbox {
      color: #333;
      margin-top: 15px;
      span {
        color: #ff8e06;
        cursor: pointer;
      }
    }
    .link {
      padding: 15px 0;
      span {
        color: #ff8e06;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .registerPage {
    width: 100%;
    background: #101838;
    padding-top: 25px;
    padding-bottom: 50px;
    .registerBox {
      width: 250px;
      height: 100%;
      background: #fff;
      border-radius: 5px;
      padding: 20px 20px;
      .title {
        color: #333;
        font-size: 16px;
        font-weight: 600;
        padding: 10px 0;
      }
      .tabs {
        .tab {
          color: #333;
          font-size: 14px;
          margin-right: 10px;
          cursor: pointer;
        }
        .active {
          color: #ff8e06;
          font-weight: 600;
        }
      }
      .tabShow {
        width: 100%;
        .textCode {
          width: 50%;
        }
        input {
          width: 80%;
          height: 30px;
          padding-left: 5px;
          font-size: 12px;
          margin-top: 10px;
          border: 1px solid #dde2e9;
          border-radius: 5px;
        }
        input::-webkit-input-placeholder {
          color: #999 !important;
          font-size: 12px !important;
        }
        .code {
          width: 100px;
          height: 20px;
          line-height: 20px;
          background: #f2f4fb;
          margin-left: 0px;
          border-radius: 5px;
          margin-top: 10px;
          font-size: 12px;
          color: #333;
          cursor: pointer;
        }
        .isColor {
          background: #ff8e06;
          color: #fff;
        }
      }
      .tip {
        font-size: 12px;
        color: #eb3d45;
        padding: 4px 0;
      }
      .loginBtn {
        width: 80%;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: linear-gradient(
          21deg,
          rgba(255, 155, 71, 0.7),
          rgba(255, 201, 155, 0.7),
          rgba(255, 201, 155, 0.7)
        );
        box-shadow: -1px 12px 21px 0px rgba(29, 39, 53, 0.16);
        font-size: 14px;
        border-radius: 8px;
        // margin-top: 15px;
        margin: 15px auto;
        font-weight: 600;
        cursor: pointer;
      }
      .checkbox {
        color: #333;
        margin-top: 14px;
        font-size: 14px;
        span {
          color: #ff8e06;
          cursor: pointer;
        }
      }
      .link {
        padding: 8px 0;
        font-size: 14px;
        span {
          color: #ff8e06;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
