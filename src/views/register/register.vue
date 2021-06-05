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
        <span @click="handleAgreement()">
          <span>服务协议</span> <span>隐私协议</span>
        </span>
      </div>

      <div class="loginBtn text-center" @click="regBtn()">注册</div>
      <div class="link flex-between align-center">
        <div class="regBnt">
          已有账号？<span @click="navigate('../login')">去登录</span>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="agreementVisible" class="agreementCon">
      <h1 class="title">服务隐私协议</h1>
      <div>
        <div class="content">
          我们尊重用户和网站访问者（统称为“您”）的隐私，并承诺尽力保护您的在线隐私。本隐私政策概述了杭州爱挖云科技有限公司及其关联实体（以下称为“灰度云矿”或“我们”）管理、收集、维护和处理用户个人数据的流程。我们可能不时更新本隐私政策。我们会在此页面上发布新的隐私政策来通知您任何变更。我们建议您定期查看此隐私政策来了解变更。本隐私政策的变更自其发布在此网页之时生效。
        </div>
        <h2>1. 信息收集</h2>
        <div class="content">
          我们可能会使用您的个人数据来提供和改进灰度云矿向您提供的矿机共享服务（“服务”），并改善您在本网站上的使用体验。“个人数据”是指与被识别或可识别的人有关的任何信息。当您为使用服务创建帐户时，我们会收集您提供给我们的信息。我们还使用各种技术来收集和存储信息，包括Cookie、像素标签、本地存储（如浏览器网络存储或应用程序数据缓存、数据库和服务器日志）。您使用服务或本网站，即表示您同意我们按照本隐私政策收集和使用信息。除非本隐私政策另有规定，否则本隐私政策中使用的术语与我们的服务协议具有相同的含义。
        </div>
        <div class="title1">1.1 注册</div>
        <div class="content">
          创建账户时，需要您提供数据，包括您的电子邮箱，电话，密码或其他信息。
          如果您拒绝提供上述信息，我们将无法向您提供服务。 1.2 支付信息
          您的支付信息将发送至我们的第三方支付处理商，您的使用视为授权我们可以存储您的加密钱包地址，我们可以通过我们的第三方支付处理商访问并保留用户信息。
        </div>
        <div class="title1">1.3 日志信息</div>
        <div class="content">
          灰度云矿会在您访问我们的网站和登录您的帐户时收集您的浏览器发送的信息（“日志数据”）。此日志数据可能包括以下信息：您的计算机的互联网协议（“IP”）地址、浏览器类型、浏览器版本、您访问的服务的页面、访问时间和日期、在这些页面上花费的时间和其他统计数据。此外，我们可能会使用Google
          Analytics等第三方服务来收集、监控和分析此类信息，以提升我们服务的功能性。这些第三方服务提供商有自己的隐私政策来说明他们如何使用此类信息。这些第三方服务提供商只能在代表我们执行任务所需时查看使用您的个人数据。
        </div>
        <div class="title1">1.4 我们如何使用您的信息</div>
        <div class="content">
          我们可能会使用您提供的个人信息用于下列目的：
          （1）向您展示我们的网站及其内容;; （2）将您识别为我们系统中的用户;;
          （3）处理您的订单;; （4）提供客户服务;; （5）回应您的要求;
          （6）为您提供产品更新; （7）改善我们的网站;
          （8）发送与我们产品相关的新闻通讯，调查，优惠和其他宣传材料;
          （9）与您沟通; （10）管理风险并保护本网站，我们的服务和您免受欺诈;
          （11）遵守所有适用的法律和法规，并执行本网站和灰度云矿服务协议;
          （12）其他征得您同意的目的。 1.5 关于Cookie的信息
          为了使您获得更好的网站访问体验，我们使用“Cookie”来允许本网站识别您的浏览器并存储用户偏好和其他信息。如果您的浏览器或浏览器附加服务允许，您可修改对Cookie的接受程度或拒绝我们的Cookie。有关详情，请参见AboutCookies
        </div>
        <h2>2. 第三方服务提供商</h2>
        <div class="content">
          我们可能会聘请第三方公司为我提供业务相关服务。这些第三方只能在为我们提供服务的期间访问您的个人数据，并且有义务不得透露或将其用于任何其他目的。但我们向三方服务商提供您个人数据的行为，不视为我们对三方服务商的用户信息侵权或隐私侵权行为承担任何法律责任。
        </div>
        <h2>3. 如果您是欧洲经济区（EEA）的居民</h2>
        <div class="content">
          如果您是欧洲经济区（EEA）的居民，根据适用法律法规您拥有一些特定的数据保护权利。我们的目标是采取合理的措施，允许您更正，修改，删除或限制您的个人数据的使用。如果您希望了解我们持有的关于您的个人数据以及您希望将您的个人信息从我们的系统中删除，请与我们联系。但我们不对任何欧洲经济区（EEA）的居民的数据操作行为，承担任何法律责任。
        </div>
        <h2>4. 信息安全</h2>
        <div class="content">
          虽然我们致力于保护我们的网站和服务，但您有责任保护和维护您的个人信息安全，并验证我们维护的有关您的个人信息是否准确和最新。您必须防止未经授权访问您的帐户。使用共享计算机时请务必注销，并且不要向未经授权的人员披露您的帐户密码和任何其他帐户注册信息。
          然而，没有一个通过因特网传输的方法或电子存储方法是100％安全的。因此，在我们尽力保护您的个人信息的同时，我们无法保证其绝对的安全性。我们无法保证您传输到我们网站和/或通过我们的服务的个人信息的安全性。任何个人信息的传输均由您自行承担风险。
        </div>
        <h2>5. 国际数据传输</h2>
        <div class="content">
          通过提交您的信息，您同意您的信息（包括个人数据）可能会传输和保存到您所在国家/地区管辖范围之外的计算机和系统。若发生该等传输，我们会尽力确保您的信息得到和您所在国家/地区规定的程度基本一致的保护。但我们无法对该种保护行为所带来的结果承担任何法律责任。
        </div>
        <h2>6. 第三方链接</h2>
        <div class="content">
          我们的服务可能包含链接指向非我们运营的第三方网站。如果您点击第三方链接，您将被引导至该第三方网站。本隐私政策不适用于其他第三方网站。我们强烈建议您查看所访问的网站的隐私政策。灰度云矿无法管控任何第三方网站或服务的内容和隐私政策，也不承担任何责任。
        </div>
        <h2>7. 儿童隐私</h2>
        <div class="content">
          我们不会故意从16岁以下的人士收集或维护我们网站上的个人数据，并且我们网站的任何部分都不会针对16岁以下的人士。如果您未满16岁或已满16周岁但不以自己的劳动收入为主要收入来源的，请不要以任何方式使用或访问本网站。当我们得知我们无意中收集了16岁以下的人士的个人数据时，我们会根据适用法律法规进行删除或采取其他合适的措施。
        </div>
        <h2>8. 个人数据使用目的变更</h2>
        <div class="content">
          如果我们决定将您的个人数据用于本隐私政策声明以外的任何其他目的，我们将进行通知并为您提供一个有效的退出途径，供您选择不让自己的个人数据用于本隐私政策规定外的其他目的。
          我们可能会向您发送有关新服务和新活动的电子邮件。您可以在我们发送的每封电子邮件中选择“取消订阅”功能来拒绝接收灰度云矿的宣传性电子邮件。但是，您同意使用服务的用户应继续接收与服务相关的其他重要电子邮件。
        </div>
        <h2>9. 信息保存时间</h2>
        <div class="content">
          除非适用法律法规有存留要求，我们只会在达成本政策所述目的所需的期限内保留和存储您的个人信息。在法律允许的情况下，我们可能会存储一定的个人信息用于备案或通过法律途径保障自身的权益。我们的信息存储行为均是按照法律、法规的要求来行使，我们不对信息存储的行为承担任何法律上的责任。
        </div>
        <h2>10. 如何了解，获取，更改或删除您的个人信息</h2>
        <div class="content">
          如果您想确认我们正在处理您的数据，访问我们可能拥有的有关您的个人数据，更正我们收集的您的个人信息，或删除我们收集的您的个人信息，您可以使用本隐私政策规定的联系方式与我们联系。
        </div>
        <h2>11. 如何联系我们 如果您对本隐私政策有任何疑问，请与我们联系。</h2>
      </div>
    </el-dialog>
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
      timer: null,
      agreementVisible: false
    };
  },
  methods: {
    // 协议弹框
    handleAgreement() {
      console.log(3123123123);
      this.agreementVisible = true;
    },
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
  .el-dialog__body {
    h1,
    h2 {
      margin: 20px 0;
      color: #000;
    }
    .title1 {
      font-size: 18px;
      margin: 20px 0;
      font-weight: 600;
      color: #000;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .content {
      line-height: 30px;
      font-size: 18px;
      text-indent: 2em;
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
    .el-dialog__body {
      h1,
      h2 {
        margin: 10px 0;
        color: #000;
      }
      h1 {
        font-size: 16px;
      }
      h2 {
        font-size: 14px;
      }
      .title1 {
        font-size: 14px;
        margin: 10px 0;
        font-weight: 600;
        color: #000;
      }
      .title {
        width: 100%;
        text-align: center;
      }
      .content {
        line-height: 20px;
        font-size: 14px;
        text-indent: 2em;
      }
    }
  }
}
</style>
