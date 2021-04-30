<template>
  <div class="powerPage">
    <div class="k60"></div>
    <div class="banner margin0 flex-between">
      <div class="left">
        <div class="name" v-if="this.id == 16">BTC云算力</div>
        <div class="name" v-if="this.id == 15">ETH云算力</div>
        <div class="pic" style="marginTop:120px">
          <img v-if="this.id == 16" src="../../assets/imgs/pic.png" alt="" />
          <img v-if="this.id == 15" src="../../assets/imgs/ethImg.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="starTime">云算力总量：{{ obj.cloud_hashrate }}T</div>
        <div class="th flex">
          <div class="th_li">算力周期</div>
          <div class="th_li">算力总量</div>
          <div class="th_li">
            单{{ obj.cmc_subarea == "BTC" ? "T" : "M" }}售价
          </div>
          <!-- <div class="th_li">购买T数</div> -->
        </div>
        <div class="td flex">
          <div class="td_li">{{ obj.period }}</div>
          <div class="td_li">
            {{ obj.cloud_hashrate }}{{ obj.cmc_subarea == "BTC" ? "T" : "M" }}
          </div>
          <div class="td_li">￥{{ obj.activity_price }}</div>
          <!-- <div class="td_li">10</div> -->
        </div>
        <div class="th flex" style="margin-top:30px">
          <div class="th_li">矿机机型</div>
          <div class="th_li">电费</div>
          <!-- <div class="th_li">收益结算</div> -->
          <div class="th_li">平台管理费</div>
        </div>
        <div class="td flex">
          <div class="td_li">{{ obj.name }}</div>
          <!-- <div class="td_li">03-01</div> -->
          <div class="td_li">{{ obj.electric_charge }}元/KW*h</div>
          <div class="td_li">{{ obj.administrative_fee }}%</div>
        </div>
        <div class="th">总价 ￥{{ this.price }} （不包含电费）</div>

        <div class="number flex-between align-center">
          <div class="pre" @click="handleSub">-</div>
          <div class="num">{{ number }}</div>
          <div class="plus" @click="handleAdd">+</div>
        </div>

        <el-checkbox v-model="checked"
          >我已阅读并同意<span class="span"
            >矿机租赁/购买协议</span
          ></el-checkbox
        >
        <div class="btn" @click="handleBuy()">购买</div>
      </div>
    </div>
    <div class="content margin0">
      <div class="titleBox">
        <div class="title">市场热销</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="text" v-html="obj.description">
        1月20日下午，比特小鹿CEO孟晓妮受邀出席“币世界年度数字资产投资策略论坛”，与矿圈大佬一起，探讨行业现状，分享2021年挖矿投资的掘金机会。
        新年伊始，比特币一骑绝尘，以前所未有的上涨速度冲破4万美元，刷新史上最高价格，挖矿市场情绪高涨。受比特币疯牛行情刺激，一边是矿机市场断货严重，供不应求，一边是二级市场囤币惜售，持币待涨。对于当下“一机难求”现状，孟晓妮给出了三个解释：
        从供给端，矿机厂商控制投片导致产能不足。孟晓妮认为，去年黑天鹅事件让很多企业深刻地认识到风险管理和现金流管理的重要性，大规模的产能对应的就是大规模的投片，也需要大量的资金投入，在20年上半年风险不是很明朗的时候，很多矿机厂商做了相对理性的投片控制。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
      checked: true,
      obj: {},
      id: "",
      price: "", //   总价
      activityPrice: "", //   单价
      totalNumber: "" //算力总量
    };
  },
  created() {
    // this.id = this.$route.query.productId;
    // this.getDetail(this.id);
    this.getData();
  },
  watch: {
    $route(to, from) {
      this.getData();
      this.coupons = "";
      this.number = 1;
    }
  },
  methods: {
    getData() {
      this.id = this.$route.query.productId;
      this.getDetail(this.id);
    },
    //减法
    handleSub() {
      if (this.number <= 1) {
        this.$message.warning("最小值为1");
        this.price = this.activityPrice;
      } else {
        this.number = --this.number;
        this.price = this.number * this.activityPrice;
      }
    },
    //加法
    handleAdd() {
      const p = ++this.number;
      this.price = p * this.activityPrice;
    },
    // 购买
    handleBuy() {
      if (this.number < 5) {
        this.$message.warning("至少购买5台矿机");
        return;
      }
      this.$router.push({
        path: "/payMsg",
        query: {
          number: this.number,
          price: this.activityPrice,
          amount: this.price,
          totalNumber: this.totalNumber,
          productId: this.$route.query.productId
        }
      });
    },

    navigate(path) {
      this.$router.push({
        path: path
      });
    },
    getDetail(id) {
      let param = new URLSearchParams();
      param.append("productId", id);
      this.$axios.post("/MartianOrePool/selectMillAllById", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.obj = result.data[0];
          this.activityPrice = this.obj.activity_price;
          this.price = this.activityPrice;
          this.totalNumber = this.obj.cloud_hashrate;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  width: 1200px;
  padding: 100px 0 0 30px;
  .name {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
  }
  .countDown {
    margin: 30px 0 120px 0;
  }
  .border {
    width: 40px;
    height: 40px;
    border: 1px solid #ffab57;
    border-radius: 5px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 700;
    color: #ffab57;
    text-align: center;
  }
  span {
    color: #989898;
    font-size: 16px;
    padding: 0 10px;
  }
  .pic {
    width: 320px;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    padding-left: 40px;
    .starTime {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999;
    }
    .th {
      width: 100%;
      margin-top: 50px;
      font-size: 20px;
      font-weight: bold;
      color: #000000;
      .th_li {
        width: 25%;
      }
    }
    .td {
      width: 100%;
      margin-top: 10px;
      font-size: 20px;
      color: #999;
      .td_li {
        width: 25%;
      }
    }
    .number {
      width: 100%;
      height: 75px;
      background: rgba(0, 0, 0, 0.05);
      margin-top: 20px;
      padding: 0 20px;
      .pre,
      .plus {
        cursor: pointer;
        color: #000;
        font-size: 36px;
      }
      .num {
        color: #000;
        font-size: 36px;
      }
    }
    .span {
      color: #f16c00;
      font-size: 14px;
    }
    .el-checkbox {
      margin-top: 20px;
    }
    .btn {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: linear-gradient(180deg, #ff9b48, #ffc99b);
      margin: 80px auto;
      text-align: center;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
.content {
  width: 1200px;
  padding-bottom: 100px;
  .titleBox {
    width: 180px;
    height: 50px;
    position: relative;
    .title {
      color: #815ff5;
      font-size: 38px;
    }
    .title_bg {
      width: 130px;
      height: 32px;
      position: absolute;
      right: 0;
      bottom: -10px;
    }
  }
  .text {
    font-size: 18px;
    font-weight: 400;
    color: #000000;
    line-height: 36px;
    padding: 30px 0;
  }
}
</style>
