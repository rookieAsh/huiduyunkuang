<template>
  <div class="couponContent">
    <div class="k60"></div>
    <div class="title text-center">我的优惠券</div>
    <div
      class="item flex align-center margin0"
      v-for="(item, index) in list"
      :key="index"
      @click="toUse(item.name, item.newAward)"
    >
      <div class="pic">
        <img
          src="../../assets/imgs/coupon.png"
          style="width: 160px;height: 120px;"
        />
      </div>
      <div class="inner flex-between flex-column">
        <div class="name">{{ item.name }}￥{{ item.newAward }}</div>
        <div class="tip">有效期七天</div>
        <div class="flex-between align-center" style="margin-top: 30rpx;">
          <text class="tip">仅限挖矿/算力使用</text>
          <!-- <u-icon name="checkmark-circle-fill" :color="active==index?'#FFAB57':'#999'" size="36"></u-icon> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      id: this.$route.query.id,
      quantity: this.$route.query.quantity
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let param = new URLSearchParams();
      let userId = sessionStorage.getItem("userId");
      param.append("userId", userId);
      this.$axios.post("/register/selectNewAward", param).then(res => {
        let result = res.data.data;
        this.list = result;
        console.log(result);
      });
    },
    toUse(name, newAward) {
      this.$router.push({
        path: "./order",
        query: {
          name,
          newAward,
          quantity: this.quantity,
          id: this.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.couponContent {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  .title {
    font-size: 24px;
    color: #000;
    padding-top: 50px;
  }
  .item {
    width: 500px;
    height: 200px;
    background: url("../../assets/imgs/coupon_item.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 40px;
    .inner {
      flex: 1;
      // height: 160px;
      padding-left: 30px;
      .name {
        color: #000;
        font-size: 20px;
        font-weight: 600;
      }
      .tip {
        font-size: 16px;
        color: #999;
        margin-top: 20px;
      }
    }
  }
}
</style>
