<template>
  <!-- 信息确定页面 -->
  <div class="content margin0">
    <div class="flex-between">
      <div class="leftContent">
        <div class="title">
          图灵T6por
          <div>高性能</div>
        </div>
        <div class="number flex-between align-center">
          <!-- <div class="pre" @click="handleSub">-</div> -->
          <div class="num">{{ number }}</div>
          <!-- <div class="plus" @click="handleAdd">+</div> -->
        </div>
        <div class="flex-start title1">
          <div class="marginRight">单份价格</div>
          <div>￥{{ $route.query.price }}</div>
        </div>
        <div class="flex-start title1">
          <div class="marginRight">算力总量</div>
          <div>{{ $route.query.totalNumber }}M</div>
        </div>
        <!-- <div class="flex-start title1">
          <div class="marginRight couponsNav">优惠卷</div>
          <div class="coupons">
            <el-select
              v-model="coupons"
              clearable
              @change="couponChange"
              placeholder="添加优惠卷"
            >
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name + item.newAward + '元'"
                :value="item.newAward"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->
        <div class="flex-start title1">
          <div class="marginRight">算力金额</div>
          <div>￥{{ amount }}</div>
        </div>
      </div>
      <div class="rightContent">
        <img src="../../assets/imgs/pic.png" alt="" />
      </div>
    </div>
    <div class="footerBtn" @click="handlePayMsg">购买</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
      coupons: "", //优惠卷的值
      options: [],
      amount: "" //算力金额
    };
  },
  created() {
    this.amount = this.$route.query.amount;
    this.getData();
    this.getSelectNewAward();
    this.couponChange();
  },

  methods: {
    // 计算减去优惠卷的算力总量
    // couponChange() {
    //   if (this.coupons == null) {
    //     this.amount = this.$route.query.amount;
    //   } else {
    //     this.amount = this.$route.query.amount - this.coupons;
    //   }
    // },
    getData() {
      this.number = this.$route.query.number;
      this.amount = this.$route.query.amount;
    },
    // 点击购买
    handlePayMsg() {
      this.$router.push({
        path: "/powerBuy",
        query: {
          number: this.number,
          amount: this.amount,
          productId: this.$route.query.productId
        }
      });
    },
    getSelectNewAward() {
      let param = new URLSearchParams();
      let userId = sessionStorage.getItem("userId");
      param.append("userId", userId);
      this.$axios.post("/register/selectNewAward", param).then(res => {
        this.options = res.data.data;
      });
    }
  },
  computed: {},
  watch: {
    $route(to, from) {
      // this.$route.go(0);
      this.getData();
      this.coupons = "";
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  padding: 100px 0 0 30px;

  .leftContent {
    width: 100%;
    .title {
      font-size: 48px;
      font-weight: 800;
      color: #000000;
      line-height: 60px;
    }
    .number {
      width: 600px;
      height: 75px;
      background: rgba(0, 0, 0, 0.05);
      margin: 40px 0 70px 0;
      text-align: center;
      padding: 0 20px;
      .pre,
      .plus {
        cursor: pointer;
        color: #000;
        font-size: 36px;
      }
      .num {
        width: 100%;
        text-align: center;
        color: #000;
        font-size: 36px;
      }
    }
    .couponsNav {
      height: 40px;
      line-height: 40px;
    }
    .coupons {
      .el-select {
        width: 400px;
        height: 100%;
        .el-input__inner {
          font-size: 18px;
          border: 0;
        }
      }
    }
    .title1 {
      font-size: 20px;
      font-weight: 800;
      color: #000000;
      margin: 50px 0;
    }
  }
  .rightContent {
    width: 500px;
    img {
      width: 320px;
      height: 220px;
    }
  }
  .footerBtn {
    width: 568px;
    height: 89px;
    line-height: 89px;
    text-align: center;
    margin: 0 auto;
    margin-top: 170px;
    margin-bottom: 180px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    border-radius: 50px;
    background: linear-gradient(121deg, #ff9b47, #ffc99b);
  }
}
</style>
