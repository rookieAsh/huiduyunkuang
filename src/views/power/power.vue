<template>
  <div class="powerContent">
    <div class="k60" style="background: #815ff5"></div>
    <div class="tabs flex-between margin60">
      <div class="tab" :class="{ active: active === 0 }" @click="change(0)">
        BTC专区
      </div>
      <div class="tab" :class="{ active: active === 1 }" @click="change(1)">
        ETH专区
      </div>
      <!-- <div class="tab" :class="{active:active===2}" @click="change(2)">FIL专区</div> -->
    </div>
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="navigate('./powerDetail', item.productId)"
      >
        <div class="name">{{ item.name }}</div>
        <div class="subTitle flex">
          <div class="l">产品保障</div>
          <div class="r">合约期365天 新手专享</div>
        </div>
        <div class="li flex-between">
          <div class="key">云算力总量</div>
          <div class="val">{{ item.cloud_hashrate }}T</div>
        </div>
        <div class="li flex-between">
          <div class="key">算力周期</div>
          <div class="val">{{ item.period }}</div>
        </div>
        <div class="li flex-between">
          <div class="key">单体售价</div>
          <div class="val">{{ item.unitprice }}</div>
        </div>
        <div class="li flex-between">
          <div class="flex">
            <div class="key">预计产币</div>
            <div class="produ">{{ item.cloud_day }}</div>
          </div>
          <div class="flex">
            <div class="key">开挖时间</div>
            <div class="time">{{ item.mining_time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false
    };
  },
  created() {
    this.getBtcList();
  },
  methods: {


    getBtcList() {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("goodsType", 1);
      param.append("typeMill", 1);
      this.$axios
        .post("/MartianOrePool/selectCloudHashrate", param)
        .then(res => {
          let result = res.data;
          console.log(result);
          if (result.state == 0) {
            this.list = result.data;
          }
        });
    },
    getEthList() {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("goodsType", 2);
      param.append("typeMill", 1);
      this.$axios
        .post("/MartianOrePool/selectCloudHashrate", param)
        .then(res => {
          let result = res.data;
          console.log(result);
          if (result.state == 0) {
            this.list = result.data;
          }
        });
    },
    navigate(path, productId) {
      this.$router.push({
        path: path,
        query: {
          productId: productId
        }
      });
    },
    change(index) {
      this.active = index;
      if (index == 1) {
        this.getEthList();
      } else {
        this.getBtcList();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  width: 800px;
  height: 140px;
  box-shadow: 0px 17px 19px 2px rgba(6, 4, 3, 0.07);
  border-radius: 10px;
  .tab {
    width: 50%;
    font-size: 48px;
    font-weight: 800;
    color: #815ff5;
    text-align: center;
    line-height: 140px;
    cursor: pointer;
  }
  .active {
    background: #815ff5;
    color: #fff;
  }
}
.container {
  width: 1200px;
  height: 670px;
  margin: 0px auto 0;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-bottom: 80px;
  .item {
    background: #fffbf8;
    width: 800px;
    margin: 0 auto 20px;
    padding: 30px;
    cursor: pointer;
    .name {
      color: #000;
      font-size: 28px;
      font-weight: 600;
    }
    .subTitle {
      width: 400px;
      height: 40px;
      background: url("../../assets/imgs/power_subtitle.png") no-repeat;
      background-size: cover;
      margin-top: 30px;
      margin-bottom: 30px;
      .l {
        width: 130px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 40px;
      }
      .r {
        flex: 1;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        color: #333;
      }
    }
    .li {
      line-height: 60px;
    }
    .key {
      color: #666;
      font-size: 24px;
      font-weight: 500;
    }
    .val {
      color: #000;
      font-size: 24px;
      font-weight: 500;
    }
    .produ {
      color: #f16c00;
      font-size: 24px;
      font-weight: 600;
      padding-left: 10px;
    }
    .time {
      color: #333;
      font-size: 24px;
      padding-left: 10px;
    }
  }
}
</style>
