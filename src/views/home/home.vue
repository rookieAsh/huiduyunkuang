<template>
  <div class="homePage">
    <!-- banner部分 -->
    <div class="banner">
      <div class="k60"></div>
      <div class="banner_inner margin0">
        <h1>一站式挖矿服务</h1>
        <h2>灰度云矿</h2>
        <h2>助你轻松挖矿！</h2>
        <div class="swiper margin50">
          <el-carousel :interval="3000" type="card" height="300px">
            <el-carousel-item v-for="item in lunList" :key="item.id">
              <img :src="item.url" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="calculation margin30 flex align-center">
          <div
            class="selectCoin text-center relative"
            @mouseenter="isSelect = true"
            @mouseleave="isSelect = false"
          >
            {{ coinName }} <i class="el-icon-arrow-down"></i>
            <div class="selectBox absolute" v-if="isSelect">
              <div
                class="item text-center"
                v-for="(item, index) in coinList"
                :key="index"
                @click="select(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="sudu flex align-center">
            <input
              v-model="inputVal"
              type="quantity"
              placeholder="0.00000000"
            />
            <div v-if="this.coinName == 'BTC'" class="val">TH/s</div>
            <div v-if="this.coinName == 'ETH'" class="val">MH/s</div>
            <div v-if="this.coinName == 'CHIA'" class="val">PH/s</div>
          </div>
          <div class="btn text-center" @click="handleCount">收益计算</div>
          <div class="show flex-column flex-between">
            <div>24小时预估值</div>
            <div v-if="this.coinName == 'BTC'">
              {{ multiplyHashrate }} BTC (${{ multiply }})
            </div>
            <div v-if="this.coinName == 'ETH'">
              {{ multiplyHashrate }} ETH (${{ multiply }})
            </div>
            <div v-if="this.coinName == 'CHIA'">
              {{ multiplyHashrate }} CHIA (${{ multiply }})
            </div>
          </div>
        </div>

        <div class="hint margin30">
          <img src="../../assets/imgs/icon_hint.png" alt="" />
          <div class="hint_swiper">
            <el-carousel
              height="42px"
              direction="vertical"
              :autoplay="true"
              indicator-position="none"
            >
              <el-carousel-item v-for="item in hintList" :key="item.noticeId">
                <div class="medium">
                  {{ item.subtitle }}
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>

    <!-- 市场热销 -->
    <div class="section_hot_sell margin0">
      <div class="titleBox">
        <div class="title">市场热销</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
        <!-- <img src="hotObj.image" class="title_bg" /> -->
      </div>

      <div class="flex">
        <div class="hot_sell_left flex-column flex-between">
          <div class="subTtitle flex">
            <div class="coin">{{ hotObj.cmc_subarea }}</div>
            <div class="time">现货开挖</div>
          </div>
          <div>
            <div class="name">{{ hotObj.name }}</div>
          </div>

          <div class="pruduction">
            {{ hotObj.earnings }} <span>{{ hotObj.cmc_subarea }}/日产出</span>
          </div>

          <div class="price">
            ￥{{ hotObj.activity_price }} <del>￥{{ hotObj.mill_cost }}</del>
          </div>
        </div>

        <div class="hot_sell_right">
          <img :src="hotObj.image" alt="" />
          <!-- <img
            v-if="hotObj.productId == 3"
            src="../../assets/imgs/kangjiblack.png"
          />
          <img
            v-if="hotObj.productId == 5"
            src="../../assets/imgs/kuangji3.png"
          /> -->
        </div>
      </div>

      <div class="market flex-between margin30">
        <div
          class="marketLi flex"
          v-for="(item, index) in hotList"
          :key="item.productId"
          :class="{ active: cureent == index }"
          @click="select1(item, index)"
        >
          <!-- {{ item }} -->
          <img :src="item.image" alt="" />
          <!-- <img
            v-if="item.productId == 3"
            src="../../assets/imgs/kangjiblack.png"
          />
          <img
            v-if="item.productId == 5"
            src="../../assets/imgs/kuangji3.png"
          /> -->

          <div class="key1">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- 灰度挖矿 -->
    <div class="mining margin0">
      <div class="titleBox">
        <div class="title">灰度挖矿</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="miningBox flex">
        <div class="miningLi">
          <div class="icon">
            <img src="../../assets/imgs/icon_btc.png" alt="" />
          </div>
          <h4 @click="navigate('./power', 0)">云算力</h4>
          <h6 @click="navigate('./market', 0)">联合挖矿</h6>
        </div>
        <div class="miningLi">
          <div class="icon">
            <img src="../../assets/imgs/icon_eth.png" alt="" />
          </div>
          <h4 @click="navigate('./power', 1)">云算力</h4>
          <h6 @click="navigate('./market', 1)">联合挖矿</h6>
        </div>
        <div class="miningLi">
          <div class="icon">
            <img src="../../assets/imgs/chiaImg.png" alt="" />
          </div>
          <h4 @click="navigate('./power', 2)">云算力</h4>
          <h6 @click="navigate('./market', 2)">联合挖矿</h6>
        </div>
        <!-- <div class="miningLi">
          <div class="icon">
            <img src="../../assets/imgs/chiaImg.png" alt="" />
          </div>
          <h4 @click="navigate('./power', 2)">云算力</h4>
          <h6 @click="navigate('./market', 2)">联合挖矿</h6>
        </div> -->
      </div>
    </div>

    <!-- 如何加入 -->
    <div class="about margin0">
      <div class="titleBox">
        <div class="title">如何加入</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="aboutContent">
        <!-- <div class="aboutC">
          <div class="aboutLi"></div>
          <div class="name text-center">注册</div>
          <div class="dec">
            通过邮箱或者手机轻松注册灰度云矿账号，即可开启挖矿之旅
          </div>
        </div> -->
        <div class="aboutC">
          <div class="aboutLi">
            <img src="../../assets/imgs/reg.png" alt="" />
          </div>
          <div class="name text-center">注册</div>
          <div class="dec">
            通过邮箱或者手机轻松注册灰度云矿账号，即可开启挖矿之旅。
          </div>
        </div>

        <!-- <div class="aboutC">
          <div>
            <div class="aboutLi1"></div>
            <div class="name text-center">购买</div>
            <div class="dec">
              灰度云矿提供了丰富的BTC，ETH,
              FIL矿机组合产品，高性价比，高收益，高回报是你财富增值的最佳选择
            </div> -->
        <!-- </div> -->
        <!-- <div>
            <div class="box1">矿机运维托管</div>
            <div class="box2">矿池分配收益</div>
          </div> -->
        <!-- </div> -->

        <div class="aboutC">
          <div class="aboutLi">
            <img src="../../assets/imgs/buy.png" alt="" />
          </div>
          <div class="name">购买</div>
          <div class="dec">
            灰度云矿提供了丰富的BTC，ETH,
            FIL矿机组合产品，高性价比，高收益，高回报是你财富增值的最佳选择。
          </div>
        </div>
        <!-- 
        <div class="aboutC">
          <div class="aboutLi">
            <img src="../../assets/imgs/tuoguan.png" alt="" />
          </div>
          <div class="name">托管</div>
          <div class="dec">
            灰度云矿为您提供一站式辅助服务，矿机运维托管。
          </div>
        </div> -->
        <div class="aboutC1">
          <div class="aboutLi1">
            <img src="../../assets/imgs/tuoguanshouyi.png" alt="" />
          </div>
          <div class="name">托管/收益</div>
          <div class="dec">
            灰度云矿进行定制，物流上架，集中托管，矿机运维，派发收益，维护管理等服务，让您无忧挖矿。
          </div>
        </div>
        <div class="aboutC">
          <div class="aboutLi">
            <img src="../../assets/imgs/huoli.png" alt="" />
          </div>
          <div class="name">获利</div>
          <div class="dec">
            灰度云矿为您提供一站式辅助服务，让你坐享收益，挖矿可以很简单！
          </div>
        </div>
      </div>
    </div>

    <!-- 我们的服务 -->
    <div class="serve margin0">
      <div class="titleBox">
        <div class="title">我们的服务</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="serveContent">
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/kjcg.png" style="width:105px" />
          </div>
          <div class="name text-center">矿机采购</div>
          <div class="dec text-center">权威厂家</div>
          <div class="dec text-center">专业矿机订购</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/ysbs.png" style="width:105px" />
          </div>
          <div class="name text-center">运输部署</div>
          <div class="dec text-center">快速搬运</div>
          <div class="dec text-center">及时上架开挖</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/yxwx.png" style="width:105px" />
          </div>
          <div class="name text-center">运行维护</div>
          <div class="dec text-center">轮班监控</div>
          <div class="dec text-center">安全稳定运行</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/jqql.png" style="width:105px" />
          </div>
          <div class="name text-center">机器清理</div>
          <div class="dec text-center">快速搬运</div>
          <div class="dec text-center">及时上架开挖</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/yjhb.png" style="width:105px" />
          </div>
          <div class="name text-center">一键换币</div>
          <div class="dec text-center">随时随地</div>
          <div class="dec text-center">兑换各种币种</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/gzdf.png" style="width:105px" />
          </div>
          <div class="name text-center">故障代发</div>
          <div class="dec text-center">运行异常</div>
          <div class="dec text-center">安排发货返修</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/dfjn.png" style="width:105px" />
          </div>
          <div class="name text-center">电费缴纳</div>
          <div class="dec text-center">电费代缴</div>
          <div class="dec text-center">快捷又省心</div>
        </div>
        <div class="conLi">
          <div class="icon">
            <img src="../../assets/imgs/zxkf.png" style="width:105px" />
          </div>
          <div class="name text-center">专项客服</div>
          <div class="dec text-center">一对一</div>
          <div class="dec text-center">随时为您服务</div>
        </div>
      </div>
    </div>

    <!-- 生态合作伙伴-->
    <div class="partner margin0">
      <div class="titleBox">
        <div class="title">生态合作伙伴</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="partnerImg">
        <!-- <img :src="imgurl" class="imgUrl" /> -->
        <div class="boxImg" v-for="(item, id) in partnerList">
          <img class="imgUrl" :src="item.url" alt="" />
          <div class="imgName">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSelect: false,
      coinList: ["BTC", "ETH", "CHIA"],
      coinName: "",
      inputVal: "",
      lunList: [],
      hintList: [],
      hotList: [],
      hotObj: {},
      cureent: 0,
      multiply: "",
      multiplyHashrate: "",
      // imgurl: "https://mclouds.huoxing24.com/build/organl-e953533f.png"
      // 合作伙伴图标
      partnerList: []
    };
  },
  created() {
    this.coinName = this.coinList[0];
    this.getLun();
    this.getHint();
    this.getHot();
    this.getPartnersMsg();
  },
  methods: {
    // 收益计算
    handleCount() {
      let param = new URLSearchParams();
      param.append("coin", this.coinName);
      param.append("hashrate", this.inputVal);
      this.$axios.post("/MartianOrePool/windowsCalculator", param).then(res => {
        const result = res.data.data;
        this.multiply = result.multiply;
        this.multiplyHashrate = result.multiplyHashrate;
      });
    },
    // 合作伙伴
    getPartnersMsg() {
      let param = new URLSearchParams();
      param.append("type", 8);
      this.$axios.post("/index/getBannerList", param).then(res => {
        const result = res.data.data;
        console.log("resultresultresult", result);
        this.partnerList = result;
      });
    },
    navigate(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    },
    select(name) {
      this.coinName = "";
      this.inputVal = "";
      this.multiply = "";
      this.multiplyHashrate = "";
      this.coinName = name;
      this.isSelect = false;
    },
    getLun() {
      let param = new URLSearchParams();
      param.append("type", 2);
      this.$axios.post("/index/getBannerList", param).then(res => {
        console.log(res);
        this.lunList = res.data.data;
      });
    },
    getHint() {
      this.$axios.post("/notice/selectNoticeAll", {}).then(res => {
        console.log(res);
        this.hintList = res.data.data;
      });
    },
    getHot() {
      this.$axios.post("/MartianOrePool/selectMillAllByHost", {}).then(res => {
        console.log(res);
        this.hotList = res.data.data;
        console.log("this.hotList", this.hotList);
        this.hotObj = this.hotList[0];
        console.log("this.hotObj", this.hotObj);
      });
    },
    select1(item, index) {
      this.cureent = index;
      this.hotObj = item;
    }
  }
};
</script>

<style lang="less" scoped>
//  banner部分
.banner {
  width: 100%;
  background: url("../../assets/imgs/home_banner.png") no-repeat;
  background-size: cover;
  .banner_inner {
    width: 1200px;
    padding-bottom: 50px;
    h1 {
      color: #fff;
      font-size: 40px;
      font-weight: 700;
      padding: 50px 0 0 20px;
    }
    h2 {
      font-size: 26px;
      color: #fff;
      font-weight: 600;
      padding: 20px 0 0 20px;
    }
    .swiper {
      width: 1200px;
      padding: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .calculation {
      width: 1160px;
      height: 110px;
      background: #fff;
      border-radius: 10px;
      padding: 0 60px;
      .selectCoin {
        width: 154px;
        height: 60px;
        line-height: 60px;
        background: url("../../assets/imgs/input_bg.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        .selectBox {
          width: 154px;
          background: #fff;
          height: 150px;
          bottom: -150px;
          border-radius: 10px;
          box-shadow: 0px 2px 4px 0px rgba(173, 179, 204, 0.39);
          .item {
            width: 100%;
            height: 50px;
            line-height: 50px;
            color: #000;
            font-weight: 500;
          }
          .item:hover {
            background: #815ff5;
            color: #fff;
            border-radius: 10px;
          }
        }
      }
      .sudu {
        width: 370px;
        height: 60px;
        line-height: 60px;
        background: url("../../assets/imgs/input_bg2.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 40px;
        input {
          width: 280px;
          background: transparent;
          outline: none;
          border: none;
          color: #fff;
          font-size: 24px;
          padding-left: 30px;
        }
        .val {
          flex: 1;
          text-align: right;
          color: #fff;
          font-size: 24px;
          padding-right: 30px;
        }
      }
      .btn {
        width: 186px;
        height: 60px;
        line-height: 60px;
        background: url("../../assets/imgs/input_bg2.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        cursor: pointer;
      }
      .show {
        flex: 1;
        height: 60px;
        padding-left: 40px;
        font-size: 20px;
        color: #815ff5;
        font-weight: 500;
      }
    }
    .hint {
      width: 780px;
      height: 42px;
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 42px;
      }
      .hint_swiper {
        flex: 1;
        height: 42px;
        line-height: 42px;
        .medium {
          width: 100%;
          color: #815ff5;
          font-size: 24px;
          padding-left: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

// 热销部分
.section_hot_sell {
  width: 1200px;
  padding: 50px 0;
  // background: pink;
  .titleBox {
    width: 180px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 34px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .hot_sell_left {
    width: 600px;
    padding-left: 150px;
    height: 375px;
    margin-top: 50px;
    padding-top: 30px;
    .subTtitle {
      width: 188px;
      height: 44px;
      line-height: 44px;
      background: url("../../assets/imgs/subtitle.png") no-repeat;
      background-size: 100% 100%;
      .coin {
        width: 70px;
        font-weight: 500;
        color: #ffffff;
        font-size: 24px;
        text-align: center;
      }
      .time {
        width: 118px;
        text-align: center;
        font-weight: 400;
        color: #323232;
        font-size: 24px;
      }
    }
    .name {
      color: #333;
      font-weight: 700;
      font-size: 32px;
    }
    .pruduction {
      color: #333;
      font-size: 20px;
      span {
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .price {
      color: #815ff5;
      font-size: 42px;
      padding-bottom: 40px;
      del {
        font-size: 26px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .hot_sell_right {
    flex: 1;
    height: 375px;
    margin-top: 50px;
    img {
      width: 500px;
      height: 375px;
    }
  }
  .market {
    width: 1200px;
    height: 160px;
    flex-wrap: wrap;
    overflow: hidden;
    padding-left: 80px;
    .marketLi {
      width: 300px;
      height: 150px;
      background: linear-gradient(29deg, #7763fb, #bfb5fe);
      border-radius: 20px;
      cursor: pointer;
      margin-bottom: 50px;
      img {
        width: 150px;
        height: 100px;
        transform: translateX(-60px);
        margin-top: 25px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgb(172, 170, 170);
      }
      .key1 {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        line-height: 150px;
        transform: translateX(-40px);
      }
    }
    .active {
      background: linear-gradient(
        21deg,
        rgba(255, 155, 71, 0.6),
        rgba(255, 201, 155, 0.6)
      );
    }
  }
}

// 灰度挖矿部分
.mining {
  width: 1200px;
  padding: 50px 0;
  // background: pink;
  .titleBox {
    width: 180px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 34px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .miningBox {
    width: 100%;
    height: 400px;
    margin-top: 80px;

    .miningLi {
      width: 460px;
      height: 400px;
      background: url("../../assets/imgs/mining.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      cursor: pointer;
      h4 {
        width: 142px;
        height: 50px;
        line-height: 50px;
        background: linear-gradient(
          21deg,
          rgba(255, 155, 71, 0.6),
          rgba(255, 201, 155, 0.6)
        );
        border-radius: 25px;
        color: #fff;
        font-size: 22px;
        text-align: center;
        margin: 150px auto 0;
      }
      h6 {
        width: 142px;
        height: 50px;
        line-height: 50px;
        background: linear-gradient(
          21deg,
          rgba(255, 155, 71, 0.6),
          rgba(255, 201, 155, 0.6)
        );
        border-radius: 25px;
        color: #fff;
        font-size: 22px;
        text-align: center;
        margin: 30px auto 0;
        transform: translateX(-20px);
      }
      .icon {
        width: 50px;
        height: 80px;
        position: absolute;
        right: 50px;
        top: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .miningLi:hover {
      transform: scale(1.05);
    }
  }
}

// 如何加入
.about {
  width: 1200px;
  padding: 50px 0;
  .titleBox {
    width: 180px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 34px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }

  .aboutContent {
    width: 90%;
    // height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
    margin: 0 auto;
    .aboutC {
      width: 30%;
      height: 300px;
      margin-top: 50px;
      .name {
        color: #000;
        font-weight: 600;
        text-align: center;
        font-size: 24px;
        padding-top: 20px;
      }
      .dec {
        width: 85%;
        margin: auto;
        color: #815ff5;
        font-size: 14px;
        padding: 20px 0 0 0;
      }
      img {
        width: 170px;
        height: 150px;
      }
      .aboutLi {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
    .aboutC1 {
      width: 30%;
      height: 300px;
      margin-top: 50px;
      padding-top: 10px;
      img {
        width: 300px;
      }
      .name {
        color: #000;
        font-weight: 600;
        text-align: center;
        font-size: 24px;
        padding-top: 20px;
      }
      .dec {
        width: 85%;
        margin: auto;
        color: #815ff5;
        font-size: 14px;
        padding: 20px 0 0 0;
      }
    }
  }
}

//我们的服务
.serve {
  width: 1200px;
  padding: 50px 0;
  // background: pink;
  .titleBox {
    width: 200px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 34px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .serveContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 100px 50px 50px;
    .conLi {
      width: 25%;
      height: 320px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 50px 0;
      .icon {
        width: 105px;
        height: 105px;
        margin: 0 auto;
      }
      .name {
        color: #000;
        font-size: 24px;
        font-weight: 600;
        padding-top: 10px;
      }
      .dec {
        color: #815ff5;
        font-size: 18px;
      }
    }
  }
}

// 生态合作伙伴
.partner {
  width: 1200px;
  padding: 50px 0;
  height: 500px;
  .titleBox {
    width: 250px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 34px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .partnerImg {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 60px;
    .boxImg {
      width: 18%;
      margin: 10px;
    }
    .imgUrl {
      width: 120px;
      height: 80px;
    }
    .imgName {
      font-size: 14px;
      color: #000;
      font-weight: 500;
    }
  }
}
</style>
