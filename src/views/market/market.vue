<template>
  <div class="marketPage">
    <div class="k60" style="background: #815ff5"></div>
    <div class="tabs flex-between margin60">
      <div class="tab" :class="{ active: active == 0 }" @click="change(0)">
        BTC专区
      </div>
      <div class="tab" :class="{ active: active == 1 }" @click="change(1)">
        ETH专区
      </div>
      <div class="tab" :class="{ active: active == 2 }" @click="change(2)">
        CHIA专区
      </div>
      <!-- <div class="tab" :class="{active:active===2}" @click="change(2)">FIL专区</div> -->
    </div>
    <div class="showLoading text-center fixed-auto" v-if="loading">
      <span class="el-icon-loading" style="font-size:50px;color:#cecece"></span>
    </div>
    <div class="container">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="navigate('./marketDetail', item.productId)"
      >
        <div class="pic">
          <img src="../../assets/imgs/pic.png" alt="" />
        </div>
        <div class="subT" v-show="item.parseTime - nowTime >= 0">
          现货挖矿
        </div>
        <div class="subT" v-show="item.parseTime - nowTime <= 0">
          已结束
        </div>
        <div class="name text-center">{{ item.name }}</div>
        <!-- <div class="name text-center">230M 现货</div> -->
        <div class="product text-center">
          {{ item.production }}<span v-show="active == 0">BTC/日产出</span>
          <span v-show="active == 1">ETH/日产出</span>
          <span v-show="active == 2">CHIA/日产出</span>
        </div>
        <div class="price text-center">￥{{ item.activity_price }}</div>
        <div class="del">￥{{ item.mill_cost }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
      list: [],
      loading: false,
      nowTime: "",
      endTime: "",
      flag: false,
      id: ""
    };
  },
  created() {
    this.nowTime = Date.parse(new Date()) / 1000;
    this.active = this.$route.query.id;
    this.change(this.active);
  },

  // watch: {
  //   active: {
  //     handler(newVal, oldVal) {
  //       console.log(newVal);
  //       console.log(oldVal);
  //     }
  //   }
  // },
  methods: {
    change(index) {
      this.active = index;
      if (this.active == 0) {
        this.getBtcList();
      } else if (this.active == 1) {
        this.getEthList();
      } else {
        this.getChiaList();
      }
    },
    navigate(path, productId) {
      this.$router.push({
        path: path,
        query: {
          productId: productId
        }
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    // showTime(time) {
    //   var thetime = time;
    //   this.endTime = new Date(Date.parse(thetime.replace(/-/g, "/")));
    //   this.nowTime = new Date();
    //   console.log(this.endTime);
    //   console.log(this.nowTime);
    //   if (this.endTime <= this.nowTime) {
    //     this.flag = false;
    //   } else {
    //     this.flag = true;
    //   }
    // },

    getBtcList() {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("goodsType", 1);
      param.append("typeMill", 3);
      this.$axios.post("/MartianOrePool/selectMillAll", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.list = result.data;
          console.log(this.list);
        }
        this.loading = false;
      });
    },
    getEthList() {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("goodsType", 2);
      param.append("typeMill", 3);
      this.$axios.post("/MartianOrePool/selectMillAll", param).then(res => {
        let result = res.data;
        if (result.state == 0) {
          this.list = result.data;
        }
        this.loading = false;
      });
    },
    getChiaList() {
      this.loading = true;
      let param = new URLSearchParams();
      param.append("goodsType", 3);
      param.append("typeMill", 3);
      this.$axios.post("/MartianOrePool/selectMillAll", param).then(res => {
        let result = res.data;
        console.log("result", result);
        if (result.state == 0) {
          this.list = result.data;
        }
        this.loading = false;
      });
    }
  },
  watch: {
    // active: {
    //   handler(newVal, oldVal) {
    //     console.log(newVal);
    //     console.log(oldVal);
    //     if (newVal != oldVal) {
    //       this.active == newVal;
    //     }
    //   }
    // }
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
    font-size: 36px;
    font-weight: 600;
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
  margin: 100px auto 0;
  display: flex;
  flex-wrap: wrap;
  padding-top: 180px;
  .item {
    width: 360px;
    height: 460px;
    background: linear-gradient(
      21deg,
      rgba(255, 155, 71, 0.7),
      rgba(255, 201, 155, 0.7),
      rgba(255, 201, 155, 0.7)
    );
    box-shadow: -1px 12px 21px 0px rgba(29, 39, 53, 0.16);
    border-radius: 20px;
    margin-bottom: 140px;
    margin-right: 40px;
    position: relative;
    padding-top: 210px;
    .pic {
      width: 280px;
      height: 210px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -88px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .subT {
      position: absolute;
      width: 160px;
      height: 60px;
      left: -5px;
      top: 130px;
      background: url("../../assets/imgs/subT.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 20px;
      line-height: 52px;
      text-align: center;
    }
    .name {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
    }
    .product {
      font-size: 20px;
      color: #ffffff;
      padding-top: 10px;
      span {
        color: rgba(255, 255, 255, 0.7);
        font-size: 16px;
        padding-left: 5px;
      }
    }
    .price {
      color: #fff;
      font-size: 36px;
      font-weight: 600;
      padding-top: 30px;
    }
    .del {
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      font-size: 20px;
      text-decoration: line-through;
    }
  }
  .item:nth-child(3n) {
    margin-right: 0;
  }
}
@media screen and (max-width: 767px) {
  .tabs {
    width: 95%;
    height: 70px;
    box-shadow: 0px 9px 9px 1px rgba(6, 4, 3, 0.07);
    border-radius: 5px;
    .tab {
      width: 50%;
      font-size: 18px;
      font-weight: 600;
      color: #815ff5;
      text-align: center;
      line-height: 70px;
      cursor: pointer;
    }
    .active {
      background: #815ff5;
      color: #fff;
    }
  }

  .container {
    width: 100%;
    margin: 50px auto 0;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    .item {
      width: 100%;
      height: 188px;
      background: linear-gradient(
        21deg,
        rgba(255, 155, 71, 0.7),
        rgba(255, 201, 155, 0.7),
        rgba(255, 201, 155, 0.7)
      );
      box-shadow: -1px 6px 11px 0px rgba(29, 39, 53, 0.16);
      border-radius: 10px;
      margin: 0 10px 60px 10px;
      position: relative;
      padding-top: 80px;
      .pic {
        width: 140px;
        height: 110px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .subT {
        position: absolute;
        width: 80px;
        height: 30px;
        left: -5px;
        top: 78px;
        background: url("../../assets/imgs/subT.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
        font-size: 14px;
        line-height: 25px;
        text-align: center;
      }
      .name {
        font-size: 12px;
        font-weight: 700;
        color: #ffffff;
      }
      .product {
        font-size: 14px;
        color: #ffffff;
        padding-top: 10px;
        span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          padding-left: 3px;
        }
      }
      .price {
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        padding-top: 15px;
      }
      .del {
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        font-size: 14px;
        text-decoration: line-through;
      }
    }
    .item:nth-child(3n) {
      margin-right: 10px;
    }
  }
}
</style>
