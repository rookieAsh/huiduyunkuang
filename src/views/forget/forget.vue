<template>
  <div class="registerPage">
    <div class="k60"></div>
    <div class="registerBox margin0">
      <div class="title">找回密码</div>

      <div class="tip">提示：重置密码成功后，24小时不可提现</div>

      <div class="tabShow margin10">
        <input type="text" placeholder="请输入手机号" v-if="tabCurrent === 0" />
        <input type="text" placeholder="请输入邮箱" v-if="tabCurrent === 1" />
      </div>
      <div class="tabShow">
        <input type="password" placeholder="请输入新登录密码" />
      </div>
      <div class="tabShow">
        <input type="password" placeholder="请再次输入新登录密码" />
      </div>
      <div class="tabShow flex-between  align-center">
        <input type="password" placeholder="请输入验证码" />
        <div class="code text-center">发送验证码</div>
      </div>

      <div class="loginBtn text-center" @click="submit()">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabCurrent: 0,
      checked: true
    };
  },
  methods: {
    changeTab(index) {
      this.tabCurrent = index;
    },
    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    regBtn() {
      alert("找回密码");
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
    height: 420px;
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
    }
    .tip {
      font-size: 12px;
      color: #999;
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
  }
}
</style>
