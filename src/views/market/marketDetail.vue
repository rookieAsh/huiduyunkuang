<template>
  <div class="maeketDetailPage">
    <div class="k60"></div>
    <div class="banner margin0 flex-between">
      <div class="left">
        <div class="name">{{ detailObj.name }}</div>
        <!-- <div class="name">230M 现货 </div> -->
        <!-- <div class="countDown flex align-center">
                  <div class="border">04</div>
                  <span>天</span>
                  <div class="border">07</div>
                  <span>:</span>
                  <div class="border">56</div>
                  <span>:</span>
                  <div class="border">56</div>
                  <span>后结束</span>
                </div> -->
        <div class="pic">
          <img src="../../assets/imgs/pic.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="starTime">开始挖矿时间：{{ detailObj.mining_time }}</div>
        <div class="th flex">
          <div class="th_li">矿机算力</div>
          <div class="th_li">矿机功耗</div>
          <div class="th_li" v-if="detailObj.cmc_subarea == 'CHIA'">托管费</div>
          <div class="th_li" v-else>电费</div>
          <!-- <div class="th_li">狂吃费率</div> -->
        </div>
        <div class="td flex">
          <div class="td_li" v-if="detailObj.cmc_subarea == 'BTC'">
            {{ detailObj.hashrate }}TH/S
          </div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'ETH'">
            {{ detailObj.hashrate }}MH/S
          </div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'CHIA'">
            {{ detailObj.hashrate }}TH/S
          </div>
          <div class="td_li">{{ detailObj.power_diss }}KW/台</div>
          <div class="td_li" v-if="detailObj.cmc_subarea == 'CHIA'">
            {{ detailObj.electric_charge }}元/T/月
          </div>
          <div class="td_li" v-else>{{ detailObj.electric_charge }}元/KW*h</div>
        </div>
        <div class="th flex" style="margin-top:30px">
          <div class="th_li">预计日产币</div>
          <div class="th_li">管理费</div>
          <div class="th_li">回本天数</div>
        </div>
        <div class="td flex">
          <div class="td_li">
            {{ detailObj.earnings }}{{ detailObj.cmc_subarea }}/天
          </div>
          <div class="td_li">{{ detailObj.administrative_fee }}%</div>
          <div class="td_li">{{ detailObj.Back_tothe }}天</div>
        </div>
        <div class="th">
          总价 ￥{{ detailObj.activity_price * quantity }} （不包含电费）
        </div>

        <div class="number flex-between align-center">
          <div
            class="pre"
            @click="quantity == 1 ? '' : quantity--"
            :style="quantity == 1 ? 'color:#999' : 'color:#000'"
          >
            -
          </div>
          <div class="num">{{ quantity }}</div>
          <div class="plus" @click="quantity++">+</div>
        </div>

        <el-checkbox v-model="checked">我已阅读并同意</el-checkbox
        ><span class="span" @click="navigate('./tips')">矿机租赁/购买协议</span>
        <div class="btn1" v-if="flag == true">已结束</div>
        <div class="btn" @click="navigate('./order')" v-else>购买</div>
      </div>
    </div>
    <div class="content margin0">
      <div class="titleBox">
        <div class="title">市场热销</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="text" v-html="detailObj.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      id: "",
      detailObj: {},
      quantity: 1,
      time: "",
      flag: false
    };
  },
  created() {
    this.id = this.$route.query.productId;
    this.getDetail(this.id);
  },
  //   watch: {
  //     $route(to, from) {
  //       this.id = this.$route.query.productId;
  //       //   this.getDetail();
  //     }
  //   },
  methods: {
    navigate(path) {
      this.$router.push({
        path: path,
        query: {
          quantity: this.quantity,
          id: this.id
        }
      });
    },
    getDetail(id) {
      let param = new URLSearchParams();
      param.append("productId", id);
      this.$axios.post("/MartianOrePool/selectMillAllById", param).then(res => {
        let result = res.data;
        var nowTime = Date.parse(new Date()) / 1000;
        this.time = result.data[0].parseTime - nowTime;
        if (this.time <= 0) {
          this.flag = true;
          // this.text == "已结束";
        } else {
          this.flag = false;
          // this.text == "购买";
        }
        if (result.state == 0) {
          this.detailObj = result.data[0];
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
    cursor: pointer;
  }
  .pic {
    width: 320px;
    height: 220px;
    margin-top: 120px;
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
        width: 33.333333%;
      }
    }
    .td {
      width: 100%;
      margin-top: 10px;
      font-size: 20px;
      color: #999;
      .td_li {
        width: 33.333333%;
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
        color: #000;
        font-size: 48px;
        cursor: pointer;
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
      cursor: pointer;
    }
    .btn1 {
      width: 500px;
      height: 60px;
      line-height: 60px;
      background: linear-gradient(180deg, #b6b6b6, #929292);
      margin: 80px auto;
      text-align: center;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
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
