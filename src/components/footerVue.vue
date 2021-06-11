<template>
  <div class="footerPage footerPages">
    <!-- 电脑 -->
    <div class="footContainer margin0 flex-between footerHide">
      <div class="line">
        <!-- <div class="logo">
          <img src="../assets/imgs/logo.png" alt="" />
        </div> -->
        <!-- <div class="td">联系我们 656034864@qq.com</div> -->
        <!-- <div class="td">关于我们 www.ASDFA.COM</div> -->
        <div class="erCode">
          <!-- <div class="logo1">
            <img class="img1" src="../assets/imgs/wx.png" alt="" />
            <div class="gfwx">微信公众号</div>
          </div>
          <div class="logo2">
            <img class="img2" src="../assets/imgs/kf.png" alt="" />
            <div class="kfwx">客服微信号</div>
          </div> -->
          <div class="logo">
            <div v-if="navIcon == 1">
              <el-tooltip :content="content" placement="bottom" effect="dark">
                <img :src="srcUrl" alt="" />
              </el-tooltip>
            </div>
            <div v-else><img :src="srcUrl" alt="" /></div>
            <div class="gfwx">{{ imageMsg }}</div>
          </div>
          <div class="flex navIcon">
            <div
              class="wxIcon"
              :class="{ wxIconActive: navIcon == 0 }"
              @click="handleNavIcon(0)"
            ></div>
            <div
              class="wxIcon"
              :class="{ wxIconActive: navIcon == 3 }"
              @click="handleNavIcon(3)"
            ></div>
            <div
              class="qqIcon"
              :class="{ qqIconActive: navIcon == 1 }"
              @click="handleNavIcon(1)"
            >
              <!-- <img  src="../assets/images/qq.png" alt="" /> -->
            </div>
            <div
              class="wbIcon"
              :class="{ wbIconActive: navIcon == 2 }"
              @click="handleNavIcon(2)"
            >
              <!-- <img src="../assets/images/weibo.png" alt="" /> -->
            </div>
          </div>
        </div>
        <!-- <div class="qq">客服QQ：2715231790</div> -->
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
        <div class="td">
          <a
            target="_blank"
            href="https://weibo.com/u/7575599257?refer_flag=1001030103_"
            >微博</a
          >
        </div>

        <div class="td">
          <a
            target="_blank"
            href=" https://www.huoxing24.com/userCenter/35272edfa3944eb0bf99b3f531ce7e96"
            >火星号</a
          >
        </div>
        <div class="td">
          <a target="_blank" href="https://0.plus/graycloud888">
            电报号
          </a>
        </div>
        <div class="td">
          <a target="_blank" href="https://bihu.com/people/1045398140">币乎</a>
        </div>
      </div>
      <div class="line">
        <div class="th">挖矿产品</div>
        <div class="td" @click="navigate('/market', 0)">BTC挖矿</div>
        <div class="td" @click="navigate('/market', 1)">ETH挖矿</div>
        <div class="td" @click="navigate('/market', 2)">CHIA挖矿</div>
      </div>
      <div class="line">
        <div class="th">其他产品</div>
        <div class="td" @click="navigate('/transfer')">闪兑</div>
        <div class="td" @click="handleCalculator">计算器</div>
        <div class="td" @click="yaoqing('copy')">
          邀请链接
        </div>
        <div class="yaoqing" id="copy">
          https://www.graycloud.top/dl.html
        </div>
      </div>
      <div class="line ">
        <div class="th">友情链接</div>
        <div class="td">
          <a target="_blank" href="https://www.f2pool.com">鱼池</a>
        </div>
        <div class="td">
          <a target="_blank" href="https://cobo.com/custody">COBO</a>
        </div>
        <div class="td">
          <a
            target="_blank"
            href="https://www.huobi.ms/topic/invited/?invite_code=j2uh3"
          >
            火币
          </a>
        </div>
        <div class="td">
          <a target="_blank" href="https://www.poolin.com">币印矿池</a>
        </div>
        <div class="td">
          <a target="_blank" href="https://www.jinse.com/member?id=796392"
            >金色财经</a
          >
        </div>
        <div class="td">
          <a target="_blank" href="https://tokenview.com/cn/">Tokenview</a>
        </div>
      </div>
      <div class="line">
        <div class="th">支持</div>
        <div class="td" @click="handleHelp">帮助中心</div>
        <div class="td" @click="handleUser">用户条款</div>
        <div class="td" @click="handlePrivacy">隐私协议</div>
        <div class="td" @click="handleLaw">法律声明</div>
        <div class="td" @click="handleAbout">关于我们</div>
      </div>
    </div>

    <!-- 手机 -->
    <div class="footContainer margin0  flex footerHidePhone">
      <div class="line">
        <div class="th">关注我们</div>
        <div class="td">
          <a
            target="_blank"
            href=" https://www.huoxing24.com/userCenter/35272edfa3944eb0bf99b3f531ce7e96"
            >火星号</a
          >
        </div>
        <div class="td">
          <a target="_blank" href="https://0.plus/graycloud888">
            电报号
          </a>
        </div>
        <div class="td">
          <a
            target="_blank"
            href="https://weibo.com/u/7575599257?refer_flag=1001030103_"
            >微博</a
          >
        </div>
        <div class="td">
          <a target="_blank" href="https://bihu.com/people/1045398140">币乎</a>
        </div>
      </div>
      <div class="line">
        <div class="th">挖矿产品</div>
        <div class="td" @click="navigate('/market', 0)">BTC挖矿</div>
        <div class="td" @click="navigate('/market', 1)">ETH挖矿</div>
        <div class="td" @click="navigate('/market', 2)">CHIA挖矿</div>
        <div class="td" @click="yaoqing('copy')">邀请链接</div>
        <div class="td" @click="handleCalculator">计算器</div>
        <div class="td" @click="navigate('/transfer')">闪兑</div>
        <div class="yaoqing" id="copy">
          https://www.graycloud.top/dl.html
        </div>
      </div>
      <!-- <div class="line">
        <div class="th">其他产品</div>
        <div class="td" @click="navigate('/transfer')">闪兑</div>
        <div class="td" @click="handleCalculator">计算器</div>
        <div class="td" @click="yaoqing('copy')">
          邀请链接
        </div>
        <div class="yaoqing" id="copy">
          https://www.graycloud.top/dl.html
        </div>
      </div> -->
      <div class="line">
        <div class="th">友情链接</div>
        <div class="td">
          <a target="_blank" href="https://www.poolin.com">币印矿池</a>
        </div>
        <div class="td">
          <a target="_blank" href="https://www.jinse.com/member?id=796392"
            >金色财经</a
          >
        </div>
        <div class="td">
          <a target="_blank" href="https://tokenview.com/cn/">Tokenview</a>
        </div>
        <div class="td">
          <a target="_blank" href="https://www.f2pool.com">鱼池</a>
        </div>
        <div class="td">
          <a target="_blank" href="https://cobo.com/custody">COBO</a>
        </div>
        <div class="td">
          <a
            target="_blank"
            href="https://www.huobi.ms/topic/invited/?invite_code=j2uh3"
          >
            火币
          </a>
        </div>
      </div>
      <div class="line">
        <div class="th">支持</div>
        <div class="td" @click="handleHelp">帮助中心</div>
        <div class="td" @click="handleUser">用户条款</div>
        <div class="td" @click="handlePrivacy">隐私协议</div>
        <div class="td" @click="handleLaw">法律声明</div>
        <div class="td" @click="handleAbout">关于我们</div>
      </div>
      <div class="line">
        <div>
          <div class="logo">
            <div v-if="navIcon == 1">
              <el-tooltip :content="content" placement="bottom" effect="dark">
                <img :src="srcUrl" alt="" />
              </el-tooltip>
            </div>
            <div v-else><img :src="srcUrl" alt="" /></div>
            <div class="gfwx">{{ imageMsg }}</div>
          </div>
          <div class="flex navIcon">
            <div
              class="wxIcon"
              :class="{ wxIconActive: navIcon == 0 }"
              @click="handleNavIcon(0)"
            ></div>
            <div
              class="wxIcon"
              :class="{ wxIconActive: navIcon == 3 }"
              @click="handleNavIcon(3)"
            ></div>
            <div
              class="qqIcon"
              :class="{ qqIconActive: navIcon == 1 }"
              @click="handleNavIcon(1)"
            ></div>
            <div
              class="wbIcon"
              :class="{ wbIconActive: navIcon == 2 }"
              @click="handleNavIcon(2)"
            ></div>
          </div>
        </div>
        <div class="flex-center">
          <div class="login" @click="navigate('/login')" v-if="!token">
            登录
          </div>
          <div class="login" @click="logout()" v-else>退出</div>
          <div class="reg" @click="navigate('/register')">注册</div>
        </div>
      </div>
    </div>

    <!-- 计算器 -->
    <el-dialog center :visible.sync="dialog" :before-close="handleClose">
      <template slot="title">
        <div class="hearderTitle">计算器</div>
      </template>
      <div class="page">
        <div class="placeholder30"></div>
        <div class="tabDiv margin0 flex">
          <div
            class="tab"
            :class="{ active: tabDivCurrent == 0 }"
            @click="changeTabDiv(0, 'BTC')"
          >
            BTC
          </div>
          <div
            class="tab"
            :class="{ active: tabDivCurrent == 1 }"
            @click="changeTabDiv(1, 'ETH')"
          >
            ETH
          </div>
          <!-- <div class="tab" :class="{active:tabDivCurrent==2}" @click="changeTabDiv(2,'FIL')">FIL</div> -->
        </div>

        <div class="listItem margin50">
          <div class="price flex align-center margin30">
            <div class="name">矿机价格</div>
            <div class="line"></div>
            <input
              type="text"
              placeholder="0.0000"
              placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
              v-model="price"
            />
            <div class="key">￥</div>
          </div>

          <div class="quantity flex align-center margin30">
            <div class="number">矿机数量</div>
            <div class="line"></div>
            <input
              type="number"
              placeholder="1"
              placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
              v-model="quantity"
              min="1"
            />
            <div class="key">台</div>
          </div>
        </div>

        <div class="item margin30 flex align-center padding-row20">
          <div class="name">算&nbsp&nbsp&nbsp&nbsp&nbsp力</div>
          <div class="line"></div>
          <input
            type="text"
            placeholder="请输入当前算力"
            placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
            v-model="force"
          />
          <div class="key">&nbsp{{ tabDivCurrent == 0 ? "T" : "M" }}H/S</div>
        </div>

        <div class="item margin30 flex align-center padding-row20">
          <div class="name">币&nbsp&nbsp&nbsp&nbsp&nbsp价</div>
          <div class="line"></div>
          <input
            type="text"
            :placeholder="placeholder"
            placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
            v-model="coinPrice"
          />
          <div class="key">&nbsp&nbsp&nbsp&nbsp￥&nbsp&nbsp</div>
        </div>

        <div class="item margin30 flex align-center padding-row20">
          <div class="name">电&nbsp&nbsp&nbsp&nbsp&nbsp费</div>
          <div class="line"></div>
          <input
            type="text"
            placeholder="请输入电费"
            placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
            v-model="bill"
          />
          <div class="key">&nbsp￥/度</div>
        </div>

        <div class="item margin30 flex align-center padding-row20">
          <div class="name">功&nbsp&nbsp&nbsp&nbsp&nbsp耗</div>
          <div class="line"></div>
          <input
            type="text"
            placeholder="请输入功耗"
            placeholder-style="color:rgba(0,0,0,0.35);font-size:28px;"
            v-model="power"
          />
          <div class="key">KW/h</div>
        </div>

        <div class="btn margin50 text-center" @click="submit()">收益计算</div>

        <div class="tabBox margin30 flex">
          <div
            class="tab"
            :class="{ active: tabBoxCurrent == 1 }"
            @click="changetabBox(1)"
          >
            日收益
          </div>
          <div
            class="tab"
            :class="{ active: tabBoxCurrent == 2 }"
            @click="changetabBox(2)"
          >
            月收益
          </div>
          <div
            class="tab"
            :class="{ active: tabBoxCurrent == 3 }"
            @click="changetabBox(3)"
          >
            年收益
          </div>
        </div>

        <div class="circle">{{ obj.BackToMoney }}<text>天</text></div>
        <div class="tip text-center">回报周期</div>

        <div class="infoBox flex">
          <div class="infiLi flex-column flex-between text-left">
            <div class="coinNum" style="color: #F16C00;">
              {{ obj.multiplyHashrate | number(4) }} {{ coin }}
            </div>
            <div class="rmb">≈ ￥{{ obj.dailyEarnings | number(4) }}</div>
            <div class="key">收益</div>
          </div>
          <div class="infiLi flex-column flex-between text-left">
            <div class="coinNum">
              {{ obj.energyChargeCoin | number(4) }} {{ coin }}
            </div>
            <div class="rmb">≈￥{{ obj.energyCharge | number(4) }}</div>
            <div class="key">电费</div>
          </div>
          <div class="infiLi flex-column flex-between text-left">
            <div class="coinNum">
              {{ obj.subtractYieldCoin | number(4) }} {{ coin }}
            </div>
            <div class="rmb">≈ ￥{{ obj.subtractYield | number(4) }}</div>
            <div class="key">净收益</div>
          </div>
        </div>
      </div>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      token: "",
      dialog: false,
      navIcon: 0,
      srcUrl: require("../assets/imgs/wx.png"),
      content: "",
      imageMsg: "微信公众号",
      // 计算机
      tabDivCurrent: 0,
      tabBoxCurrent: 1,
      price: "",
      quantity: "",
      force: "",
      coinPrice: "",
      bill: "",
      power: "",
      coin: "BTC",
      obj: {
        BackToMoney: 0,
        multiplyHashrate: 0.0,
        dailyEarnings: 0.0,
        energyChargeCoin: 0.0,
        energyCharge: 0.0,
        subtractYieldCoin: 0.0,
        subtractYield: 0.0
      },
      list: [],
      placeholder: ""
    };
  },
  created() {
    this.getToken();
    this.init();
  },

  methods: {
    // 底部图标变换
    handleNavIcon(index) {
      this.navIcon = index;
      if (this.navIcon == 0) {
        this.srcUrl = require("../assets/imgs/wx.png");
        this.imageMsg = "微信公众号";
      }
      if (this.navIcon == 1) {
        this.srcUrl = require("../assets/imgs/qqImg.jpg");
        this.imageMsg = "联系QQ";
        this.content = "QQ：551095174";
      }
      if (this.navIcon == 3) {
        this.srcUrl = require("../assets/imgs/kf.png");
        this.imageMsg = "客服公众号";
      }
      if (this.navIcon == 2) {
        this.srcUrl = require("../assets/imgs/weiboImg.png");
        this.imageMsg = "微博";
      }
    },
    navigate(path, id) {
      if (this.$route.path.indexOf("market") > 0) return;
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    yaoqing(copy) {
      this.invite(copy);
    },
    // 复制邀请链接
    invite(copy) {
      const range = document.createRange();
      range.selectNode(document.getElementById(copy));
      const selection = window.getSelection();
      if (selection.rangeCount > 0) selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      this.$message.success("复制成功");
    },
    handleHelp() {
      this.$router.push("/supportHelp");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleUser() {
      this.$router.push("/supportUser");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handlePrivacy() {
      this.$router.push("/supportPrivacy");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleLaw() {
      this.$router.push("/supportLaw");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleAbout() {
      this.$router.push("/supportAbout");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    handleCalculator() {
      this.dialog = true;
    },
    handleClose() {
      this.dialog = false;
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
    },

    // 计算器

    init() {
      // uni.showLoading({
      // 	title:"加载中...",
      // 	icon:"loading"
      // })
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/custody/selectWellatByCoinFlash", param).then(res => {
        this.list = res.data.data;
        console.log("this.list", this.list);
        this.list.forEach(item => {
          if (item.coin == "BTC") {
            this.placeholder = item.CNY;
          }
        });
      });
    },
    getEthinfo() {
      // uni.showLoading({
      // 	title:'计算中...'
      // })
      if (!this.price) {
        return this.$message.warning("请输入矿机价格");
      }
      // if(!this.coinPrice) {
      // 	return this.$u.toast("请输入币价")
      // }
      if (!this.force) {
        return this.$message.warning("请输入当前算力");
      }
      if (!this.bill) {
        return this.$message.warning("请输入电费");
      }
      if (!this.power) {
        return this.$message.warning("请输入功耗");
      }
      let param = new URLSearchParams();
      param.append("coin", this.coin);
      param.append("price", this.price);
      param.append("coinCny", this.coinPrice || this.placeholder);
      param.append("number", this.quantity || 1);
      param.append("hashrate", this.force);
      param.append("energy", this.bill);
      param.append("power", this.power);
      param.append("type", this.tabBoxCurrent);
      this.$axios.post("/MartianOrePool/ethCalculator", param).then(res => {
        if (res.data.state == 0) {
          // uni.hideLoading();
          this.obj = res.data.data[0];
        } else {
          // uni.hideLoading();
        }
      });
      // {
      //   coin: this.coin,
      //   price: this.price,
      //   coinCny: this.coinPrice || this.placeholder,
      //   number: this.quantity || 1,
      //   hashrate: this.force,
      //   energy: this.bill,
      //   power: this.power,
      //   type: this.tabBoxCurrent
      // },
    },
    submit() {
      if (this.tabDivCurrent == 0) {
        this.getBtcinfo();
      } else {
        this.getEthinfo();
      }
    },
    changeTabDiv(index, coin) {
      this.tabDivCurrent = index;
      this.tabBoxCurrent = 1;
      this.coin = coin;
      this.price = "";
      this.quantity = "";
      this.force = "";
      this.coinPrice = "";
      this.bill = "";
      this.power = "";
      (this.obj = {
        BackToMoney: 0,
        multiplyHashrate: 0.0,
        dailyEarnings: 0.0,
        energyChargeCoin: 0.0,
        energyCharge: 0.0,
        subtractYieldCoin: 0.0,
        subtractYield: 0.0
      }),
        this.list.forEach(item => {
          if (item.coin == coin) {
            this.placeholder = item.CNY;
            // if(index==0){
            // 	this.getBtcinfo()
            // }else{
            // 	this.getEthinfo()
            // }
          }
        });
    },
    changetabBox(index) {
      this.tabBoxCurrent = index;
      this.submit();
    },
    getBtcinfo() {
      // uni.showLoading({
      // 	title:'计算中...'
      // })
      if (!this.price) {
        return this.$message.warning("请输入矿机价格");
      }
      if (!this.force) {
        return this.$message.warning("请输入当前算力");
      }
      if (!this.bill) {
        return this.$message.warning("请输入电费");
      }
      if (!this.power) {
        return this.$message.warning("请输入功耗");
      }
      let param = new URLSearchParams();
      param.append("coin", this.coin);
      param.append("price", this.price);
      param.append("number", this.quantity || 1);
      param.append("hashrate", this.force);
      param.append("energy", this.bill);
      param.append("power", this.power);
      param.append("type", this.tabBoxCurrent);
      param.append("coinCny", this.coinPrice || this.placeholder);
      this.$axios.post("/MartianOrePool/calculator", param).then(res => {
        console.log("resresresres", res);
        if (res.data.state == 0) {
          // uni.hideLoading();
          this.obj = res.data.data[0];
          this.$message.warning("计算成功");
        } else {
          // uni.hideLoading();
          this.$message.warning("计算失败");
        }
      });
      // {
      //   coin: this.coin,
      //   price: this.price,
      //   number: this.quantity || 1,
      //   hashrate: this.force,
      //   energy: this.bill,
      //   power: this.power,
      //   type: this.tabBoxCurrent,
      //   coinCny: this.coinPrice || this.placeholder
      // },
    }
  }
};
</script>

<style lang="less" scoped>
.footerPage {
  width: 100%;
  height: 320px;
  background: #7a68f3;
  // background: #e8e8e8;
  .footContainer {
    width: 1200px;
    height: 320px;
    padding: 50px 0;
    .line {
      width: 17%;
      .erCode {
        padding-left: 20px;
      }
      .logo {
        width: 100px;
        height: 120px;
        margin: 10px 0 0 40px;
        .gfwx {
          text-align: center;
          margin: 0px 0 0 0;
        }
        img {
          width: 100%;
          height: 100px;
          box-shadow: 0 0 10px #ccc;
        }
      }
      .navIcon {
        .wxIcon {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/weixin.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
        }
        .wxIconActive {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/weixin2.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
        }
        .qqIcon {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/qq.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
        }
        .qqIconActive {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/qq2.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
        }
        .wbIcon {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/weibo.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
        }
        .wbIconActive {
          width: 32px;
          height: 32px;
          margin: 10px 5px 15px 5px;
          background: url(../assets/images/weibo2.png) no-repeat;
          background-size: 32px 32px;
          cursor: pointer;
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
      .yaoqing {
        position: absolute;
        z-index: -1000;
      }
      .td {
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 10px;
        a {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
        }
        a:hover {
          color: #fff;
          text-decoration: underline;
        }
      }
      .td:hover {
        color: #fff;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .line:nth-child(1) {
      width: 32%;
    }
  }
  .el-dialog__header {
    .hearderTitle {
      font-size: 24px;
    }
  }
  .el-dialog__body {
    .tabDiv,
    .tabBox {
      width: 480px;
      height: 80px;
      background: #fff3e7;
      border-radius: 33px;
      cursor: pointer;
      .tab {
        width: 33.333%;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.3);
        line-height: 80px;
        text-align: center;
      }
      .active {
        height: 80px;
        background: #ffd8b1;
        box-shadow: 2px 3px 6px 0px rgba(196, 98, 0, 0.27);
        border-radius: 33px;
        font-weight: 600;
        color: #000;
      }
    }
    .tabDiv {
      width: 400px;
      .tab {
        width: 50%;
      }
    }
    .tabBox {
      width: 450px;
    }

    .listItem,
    .item {
      width: 550px;
      height: 80px;
      .price,
      .quantity {
        width: 400px;
        background: #fff3e7;
        border-radius: 33px;
        padding: 0 20px;
        .name {
          color: #606266;
          font-size: 18px;
        }
        .line {
          width: 1px;
          height: 20px;
          background-color: rgba(0, 0, 0, 0.23);
          margin-left: 20px;
        }
        input {
          flex: 1;
          color: #000;
          font-size: 16px;
          // text-align: center;
          padding-left: 30px;
          margin: 0 50px;
        }
        .key {
          color: #606266;
          font-size: 18px;
        }
      }
      .quantity {
        width: 400px;
      }
    }

    .listItem {
      width: 550px;
      height: 180px;
      .price,
      .quantity {
        width: 550px;
        height: 80px;
        font-size: 18px;
      }
      input {
        flex: 1;
        height: 50px;
        color: #000;
        font-size: 16px;
        padding-left: 30px;
        margin: 0 50px;
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: 16px;
      }
    }

    .item {
      background: #fff3e7;
      border-radius: 33px;
      padding: 0 30px;
      font-size: 18px;
      .line {
        width: 1px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.23);
        margin-left: 20px;
      }
      input {
        flex: 1;
        height: 50px;
        color: #000;
        font-size: 16px;
        padding-left: 30px;
        margin: 0 50px;
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: 16px;
      }
    }

    .btn {
      width: 560px;
      height: 90px;
      background: url("../assets/imgs/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 72px;
      color: #fff;
      font-size: 36px;
      font-weight: 500;
      cursor: pointer;
    }

    .circle {
      font-size: 48px;
      font-weight: bold;
      color: #f16c00;
      text-align: center;
      padding: 25px 0 0px;
      text {
        font-size: 24px;
        padding-left: 5px;
      }
    }

    .tip {
      font-size: 24px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.5);
      margin-bottom: 40px;
    }

    .infoBox {
      width: 550px;
      height: 140px;
      background: #fff3e7;
      margin: 0 auto 50px;
      .infiLi {
        width: 33.3333%;
        padding: 16px 0;
        padding-left: 30px;
        font-weight: 500;
        .coinNum {
          font-size: 22px;
          color: #000;
        }
        .rmb {
          font-size: 22px;
          color: #000;
        }
        .key {
          font-size: 22px;
          color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}

@media screen and (min-width: 767px) {
  .footerHidePhone {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .footerPages {
    width: 100%;
    height: 100%;
    background: #7a68f3;
    .footerHide {
      display: none;
    }
    .footContainer {
      width: 100%;
      height: 200px;
      // flex-wrap: wrap;
      flex: 1;
      padding: 10px 10px;
      .line {
        text-align: center;
        width: 33.33%;
        margin: 5px 0;
        .logo {
          width: 100%;
          height: 70px;
          margin: 10px 0 0 0px;
          text-align: center;
          .gfwx {
            width: 100%;
            font-size: 10px;
            margin: 0px 0 0 0;
          }
          img {
            width: 50px;
            height: 50px;
            box-shadow: 0 0 5px #ccc;
          }
        }
        .navIcon {
          width: 100%;
          margin: 0px 0;
          justify-content: center;
          align-content: center;
          .wxIcon {
            width: 16px;
            height: 16px;
            margin: 2px 2px 7px 3px;
            background: url(../assets/images/weixin.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
          .wxIconActive {
            width: 16px;
            height: 16px;
            margin: 3px 3px 7px 3px;
            background: url(../assets/images/weixin2.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
          .qqIcon {
            width: 16px;
            height: 16px;
            margin: 3px 3px 7px 3px;
            background: url(../assets/images/qq.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
          .qqIconActive {
            width: 16px;
            height: 16px;
            margin: 3px 3px 7px 3px;
            background: url(../assets/images/qq2.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
          .wbIcon {
            width: 16px;
            height: 16px;
            margin: 3px 3px 7px 3px;
            background: url(../assets/images/weibo.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
          .wbIconActive {
            width: 16px;
            height: 16px;
            margin: 3px 3px 7px 3px;
            background: url(../assets/images/weibo2.png) no-repeat;
            background-size: 16px 16px;
            cursor: pointer;
          }
        }
        .login {
          width: 45px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          background: #ffb165;
          border-radius: 5px;
          color: #fff;
          font-size: 8px;
          cursor: pointer;
          margin-left: 5px;
        }
        .reg {
          cursor: pointer;
          width: 45px;
          height: 15px;
          line-height: 15px;
          border: 1px solid #ffffff;
          color: #fff;
          border-radius: 5px;
          font-size: 8px;
          text-align: center;
          margin-left: 5px;
        }
        .yaoqing {
          position: absolute;
          // left: 1000px;
          z-index: -1000;
        }
        .th {
          color: #fff;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .td {
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          cursor: pointer;
          margin-bottom: 5px;
          a {
            text-decoration: none;
            color: rgba(255, 255, 255, 0.5);
          }

          a:hover {
            color: #fff;
            text-decoration: underline;
          }
        }
        .td:hover {
          color: #fff;
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .line:nth-child(1) {
        width: 33.33%;
        // margin-left: 25px;
      }
      // .line:nth-child(6) {
      //   width: 30%;
      //   margin-left: 20px;
      // }
    }

    .el-dialog__header {
      .hearderTitle {
        font-size: 16px;
      }
    }
    .el-dialog__body {
      .tabDiv,
      .tabBox {
        width: 500px;
        height: 40px;
        background: #fff3e7;
        border-radius: 16px;
        cursor: pointer;
        .tab {
          width: 33.333%;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.3);
          line-height: 40px;
          text-align: center;
        }
        .active {
          height: 40px;
          background: #ffd8b1;
          box-shadow: 2px 3px 6px 0px rgba(196, 98, 0, 0.27);
          border-radius: 16px;
          font-weight: 300;
          color: #000;
        }
      }
      .tabDiv {
        width: 200px;
        .tab {
          width: 50%;
        }
      }
      .tabBox {
        width: 250px;
      }

      .listItem,
      .item {
        width: 230px;
        height: 40px;
        .price,
        .quantity {
          width: 230px;
          background: #fff3e7;
          border-radius: 15px;
          padding: 0 10px;
          .name {
            color: #606266;
            font-size: 12px;
          }
          .line {
            width: 1px;
            height: 10px;
            background-color: rgba(0, 0, 0, 0.23);
            margin-left: 10px;
          }
          input {
            flex: 1;
            color: #000;
            font-size: 12px;
            // text-align: center;
            padding-left: 4px;
            margin: 0 10px;
          }
          .key {
            color: #606266;
            font-size: 9px;
          }
        }
        .quantity {
          width: 230px;
        }
      }

      .listItem {
        width: 230px;
        height: 90px;

        .price,
        .quantity {
          width: 230px;
          height: 40px;
          font-size: 9px;
        }
        input {
          flex: 1;
          width: 100%;
          height: 25px;
          color: #000;
          font-size: 6px;
          padding-left: 0px;
          padding: 0px;
          margin: 0 0px;
        }
        input::-webkit-input-placeholder {
          color: #999;
          font-size: 8px;
        }
      }

      .item {
        background: #fff3e7;
        border-radius: 16px;
        padding: 0 15px;
        font-size: 9px;
        .line {
          width: 1px;
          height: 10px;
          background-color: rgba(0, 0, 0, 0.23);
          margin-left: 10px;
        }
        input {
          flex: 1;
          width: 100%;
          height: 25px;
          color: #000;
          font-size: 12px;
          padding-left: 4px;
          margin: 0 10px;
        }
        input::-webkit-input-placeholder {
          color: #999;
          font-size: 12px;
        }
      }

      .btn {
        width: 100%;
        height: 45px;
        background: url("../assets/imgs/btn_bg.png") no-repeat;
        background-size: 100% 100%;
        line-height: 36px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
      }

      .circle {
        font-size: 24px;
        font-weight: bold;
        color: #f16c00;
        text-align: center;
        padding: 12px 0 0px;
        text {
          font-size: 12px;
          padding-left: 2px;
        }
      }

      .tip {
        font-size: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 20px;
      }

      .infoBox {
        width: 100%;
        height: 70px;
        background: #fff3e7;
        margin: 0 auto 50px;
        .infiLi {
          width: 33.3333%;
          padding: 8px 0;
          padding-left: 15px;
          font-weight: 500;
          .coinNum {
            font-size: 12px;
            color: #000;
          }
          .rmb {
            font-size: 12px;
            color: #000;
          }
          .key {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
}
</style>
