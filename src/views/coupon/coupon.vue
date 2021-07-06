<template>
  <div class="couponContent">
    <div class="k60"></div>
    <div class="title text-center">我的优惠券</div>
    <div
      class="item align-center"
      v-for="(item, index) in list"
      :key="index"
      @click="
        toUse(
          item.couponName,
          item.couponAmount,
          item.zt,
          item.useState,
          item.amount_threshold,
          item.cmc_subarea
        )
      "
      :class="{ coupon: item.useState == 1 || item.zt == 2 }"
    >
      <div class="pic">
        <img
          src="../../assets/imgs/coupon.png"
          style="width: 120px;height: 90px;"
        />
      </div>
      <div class="inner flex-between flex-column">
        <div class="name">{{ item.couponName }}</div>
        <div class="name">￥{{ item.couponAmount }}</div>
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
      quantity: this.$route.query.quantity,
      days: this.$route.query.days,
      coin: "",
      cost: ""
    };
  },
  created() {
    this.init();
    this.coin = this.$route.query.coin;
    this.cost = this.$route.query.cost;
    console.log(23213, this.coin);
  },
  methods: {
    init() {
      let param = new URLSearchParams();
      // let userId = sessionStorage.getItem("userId");
      // param.append("userId", userId);
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      this.$axios.post("/register/selectNewAward", param).then(res => {
        let result = res.data.data;
        this.list = result;
        console.log("this.listthis.list", this.list);
      });
    },
    toUse(name, newAward, zt, useState, limit, subarea) {
      if (this.coin != subarea)
        return this.$message.warning(`该优惠券不支持 ${this.coin} 使用`);
      if (zt == 2 || useState == 1)
        return this.$message.warning("优惠券已使用或已失效");
      if (Number(this.cost) < Number(limit)) {
        this.$message.warning(`金额少于${limit}不能使用`);
        return;
      }
      this.$router.push({
        path: "./swOrder",
        query: {
          name,
          newAward,
          quantity: this.quantity,
          id: this.id,
          days: this.days
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.couponContent {
  width: 1200px;
  min-height: 600px;
  margin: 0 auto 50px;
  .title {
    font-size: 24px;
    color: #000;
    padding: 50px 0;
  }
  .item {
    width: 400px;
    height: 200px;
    // float: left;
    display: inline-flex;
    background: url("../../assets/imgs/coupon_item.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 30px;
    .inner {
      flex: 1;
      // height: 160px;
      padding-left: 0px;
      .name {
        color: #000;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
      }
      .tip {
        font-size: 16px;
        color: #999;
        text-align: center;
        // margin-top: 20px;
      }
    }
  }
  .coupon {
    background: url("../../assets/imgs/coupon_no.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
