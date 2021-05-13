<template>
  <div class="headerPage fixed" :class="{ topScrool: top > 60 }">
    <div class="header margin0 flex-between align-center">
      <div class="header_left flex align-center">
        <div class="logo" @click="navigate('../home')">
          <img src="../assets/imgs/logo.png" alt="" />
        </div>
        <div class="tabs flex align-center">
          <div
            class="tab"
            :class="{
              current: $route.path.indexOf('home') > 0 || $route.path == '/'
            }"
            @click="navigate('../home')"
          >
            首页
          </div>
          <div
            class="tab"
            :class="{
              current:
                $route.path.indexOf('market') > 0 ||
                $route.path.indexOf('order') > 0 ||
                $route.path.indexOf('usdtPay') > 0
            }"
            @click="navigate1('../market', 0)"
          >
            矿机
          </div>
          <div
            class="tab"
            :class="{
              current:
                $route.path.indexOf('power') > 0 ||
                $route.path.indexOf('payMsg') > 0
            }"
            @click="navigate('../power')"
          >
            云算力
          </div>
          <div
            class="tab"
            :class="{
              current: $route.path.indexOf('transfer') > 0
            }"
            @click="navigate('../transfer')"
            v-if="token"
          >
            闪兑
          </div>
          <!-- <div
            class="tab"
            :class="{ current: $route.path.indexOf('service') > 0 }"
            @click="navigate('../service')"
          >
            大客户服务
          </div> -->
          <div
            class="tab"
            :class="{ current: $route.path.indexOf('help') > 0 }"
            @click="navigate('../help')"
          >
            挖矿小指南
          </div>
        </div>
      </div>
      <div class="header_right flex align-center">
        <el-dropdown v-if="token">
          <img
            src="../assets/imgs/user_icon.png"
            style="width:30px;height:30px;cursor: pointer;marginTop:4px"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="navigate('./security')"
              >账户安全</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigate('./orders')"
              >我的订单</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigate('./invite')"
              >邀请好友</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigate('./certification')"
              >实名认证</el-dropdown-item
            >
            <el-dropdown-item @click.native="loginOut()"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <div class="address" style="padding:0 20px 0 5px" v-if="token">
          {{ address }}
        </div>
        <div
          class="login text-center"
          @click="navigate('../login')"
          v-if="!token"
        >
          登录
        </div>
        <el-dropdown v-if="token">
          <div class="download text-center el-dropdown-link">
            钱包<i class="arrow el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="text-center">
            <el-dropdown-item @click.native="navigate('./wallet')"
              >钱包账户</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigate('./wkWallet')"
              >挖矿账户</el-dropdown-item
            >
            <el-dropdown-item @click.native="navigate('./record')"
              >USDT流水</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>

        <div class="register text-center" @click="navigate('../register')">
          注册
        </div>
        <el-dropdown>
          <div class="download text-center el-dropdown-link">
            下载<i class="arrow el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" class="text-center">
            <img
              src="../assets/imgs/appDownLoad.png"
              alt=""
              style="width:100px;height:100px;"
            /><br />
            <span style="color:#000">APP下载</span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  inject: ["reload"],
  data() {
    return {
      top: 0,
      token: "",
      address: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin
    })
  },
  created() {
    this.getToken();
    console.log(this.$route.path.indexOf("home"));
  },
  methods: {
    ...mapMutations(["logout"]),
    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    navigate1(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    scrollToTop() {
      this.top = document.documentElement.scrollTop;
    },
    getToken() {
      this.token = sessionStorage.getItem("token");
      this.address = sessionStorage.getItem("address");
    },
    loginOut() {
      let param = new URLSearchParams();
      param.append("token", this.token);
      this.$axios.post("/register/exitLogin", param).then(res => {
        console.log(res);
        let result = res.data;
        if (result.state == 0) {
          this.$message.success(result.message);
          this.logout();
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

<style lang="less">
.headerPage {
  width: 100%;
  height: 60px;
  z-index: 99;
  top: 0;
  left: 0;
  background: url("../assets/imgs/headerVue.png") no-repeat;
  background-size: 100% 100%;
  .header {
    width: 1200px;
    height: 60px;
    .header_left {
      height: 60px;
      .logo {
        width: 130px;
        height: 32px;
        img {
          width: 100%;
          height: 100%;
        }
        cursor: pointer;
      }
      .tabs {
        margin-left: 40px;
        .tab {
          margin-right: 20px;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
        .tab:hover {
          color: #fff;
        }
        .current {
          color: #fff;
          font-weight: 700;
        }
      }
    }
    .header_right {
      .login,
      .register {
        width: 80px;
        height: 32px;
        line-height: 32px;
        background: #ffffff;
        color: #815ff5;
        font-size: 20px;
        cursor: pointer;
      }
      .address {
        font-size: 16px;
        color: #fff;
      }
      .register {
        background: transparent;
        color: rgba(255, 255, 255, 0.5);
      }
      .register:hover {
        color: #fff;
      }
      .login {
        box-shadow: 2px 3px 5px 0px rgba(23, 0, 120, 0.26),
          2px 3px 6px 0px rgba(99, 53, 255, 0.14);
        border-radius: 4px;
        font-weight: 700;
        margin-right: 20px;
      }
      .download {
        color: rgba(255, 255, 255, 0.5);
        font-size: 20px;
        cursor: pointer;
        .arrow {
          margin-left: 5px;
        }
      }
      .download:hover {
        color: #fff;
      }
    }
  }
}
.topScrool {
  background: url("../assets/imgs/headerVue.png") no-repeat;
  background-size: 100% 100%;
}
</style>
