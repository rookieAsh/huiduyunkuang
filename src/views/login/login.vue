<template>
  <div class="loginPage">
    <div class="k60"></div>
    <div class="loginBox margin0">
      <div class="title text-center">欢迎登录灰度云矿</div>
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
      <div class="tabShow">
        <input
          type="text"
          placeholder="请输入手机号"
          v-if="tabCurrent === 0"
          v-model="loginForm.phone"
        />
        <input
          type="text"
          placeholder="请输入邮箱"
          v-if="tabCurrent === 1"
          v-model="loginForm.phone"
        />
      </div>
      <div class="tabShow">
        <input
          type="password"
          placeholder="请输入登录密码"
          v-model="loginForm.pwd"
        />
      </div>

      <div class="loginBtn text-center" @click="loginBtn()">登录</div>

      <div class="link flex-between align-center">
        <div class="regBnt">
          还没有账号？<span @click="navigate('../register')">免费注册</span>
        </div>
        <div class="forget" @click="navigate('../forget')">忘记密码？</div>
      </div>
    </div>
    <!-- <div class="appDownLoad margin20">
            <img src="../../assets/imgs/download.png" alt="">
        </div> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      tabCurrent: 0,
      loginForm: {
        phone: "",
        pwd: ""
      }
    };
  },
  created() {},
  methods: {
    ...mapMutations(["login"]),
    changeTab(index) {
      this.tabCurrent = index;
    },
    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    loginBtn() {
      if (this.tabCurrent == 0) {
        if (!this.loginForm.phone) {
          return this.$message("请输入手机号");
        }
      } else {
        if (!this.loginForm.email) {
          return this.$message("请输入邮箱");
        }
      }
      if (!this.loginForm.pwd) {
        return this.$message("请输入登录密码");
      }
      let param = new URLSearchParams();
      param.append("address", this.loginForm.phone);
      param.append("password", this.loginForm.pwd);
      this.$axios.post("/register/login", param).then(res => {
        let result = res.data.data;
        console.log(result);
        if (result.state == 0) {
          this.$message.success(result.message);
          // sessionStorage.setItem('token',res.data.token);
          // sessionStorage.setItem('userId',result.data[0].userid);
          // sessionStorage.setItem('address',result.data[0].address);
          console.log(res.data.token);
          sessionStorage.setItem("token", res.data.token);
          this.login(result.data[0]);
          this.$router.push({
            path: "./home"
          });
          this.reload();
        } else {
          this.$message(result.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginPage {
  width: 100%;
  height: 580px;
  background: #101838;
  // padding-top: 50px;
  .loginBox {
    width: 400px;
    height: 360px;
    background: #fff;
    border-radius: 10px;
    margin-top: 50px;
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
        margin-top: 20px;
        border: 1px solid #dde2e9;
        border-radius: 5px;
      }
      input::-webkit-input-placeholder {
        color: #999 !important;
        font-size: 16px !important;
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
    .link {
      padding: 15px 0;
      span {
        color: #ff8e06;
        cursor: pointer;
      }
      .forget {
        cursor: pointer;
      }
    }
  }
  .appDownLoad {
    width: 400px;
    height: 86px;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
