<template>
  <div class="footerPage">
    <div class="footContainer margin0 flex-between">
      <div class="line">
        <div class="logo">
          <img src="../assets/imgs/logo.png" alt="" />
        </div>
        <div class="td">联系我们 656034864@qq.com</div>
        <div class="td">关于我们 www.ASDFA.COM</div>
        <div class="flex">
          <div class="login" @click="navigate('/login')" v-if="!token">
            登录
          </div>
          <div class="login" @click="logout()" v-else>退出</div>
          <div class="reg" @click="navigate('/register')">注册</div>
        </div>
      </div>
      <div class="line">
        <div class="th">关注我们</div>
        <div class="td"></div>
      </div>
      <div class="line">
        <div class="th">挖矿产品</div>
        <div class="td">BTC挖矿</div>
        <div class="td">ETH挖矿</div>
        <div class="td">FIL挖矿</div>
      </div>
      <div class="line">
        <div class="th">其他产品</div>
        <div class="td">闪兑</div>
        <div class="td">计算器</div>
        <div class="td">邀请好友</div>
      </div>
      <div class="line text-right">
        <div class="th">支持</div>
        <div class="td">帮助中心</div>
        <div class="td">用户条款</div>
        <div class="td">隐私协议</div>
        <div class="td">法律声明</div>
        <div class="td">关于我们</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      token: ""
    };
  },
  created() {
    this.getToken();
  },

  methods: {
    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    getToken() {
      this.token = sessionStorage.getItem("token");
    },
    logout() {
      let param = new URLSearchParams();
      param.append("token", this.token);
      this.$axios.post("/register/exitLogin", param).then(res => {
        console.log(res);
        let result = res.data;
        if (result.state == 0) {
          this.$message.success(result.message);
          sessionStorage.removeItem("token");
          this.getToken();
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
.footerPage {
  width: 100%;
  height: 320px;
  background: #7a68f3;
  .footContainer {
    width: 1200px;
    height: 320px;
    padding: 80px 0;
    .line {
      width: 17%;
      .logo {
        width: 120px;
        height: 32px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .contact {
        color: #ffffff;
      }
      .th {
        color: #fff;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .login {
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: #ffb165;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
      }
      .reg {
        cursor: pointer;
        width: 100px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #ffffff;
        color: #fff;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
        margin-left: 10px;
      }
      .td {
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
    .line:nth-child(1) {
      width: 32%;
    }
  }
}
</style>
