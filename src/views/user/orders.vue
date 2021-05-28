<template>
  <div class="ordersPage">
    <div class="k60"></div>
    <div class="content">
      <div class="tabs flex-between margin60">
        <div class="tab" :class="{ active: active === 0 }" @click="change(0)">
          云算力
        </div>
        <div class="tab" :class="{ active: active === 1 }" @click="change(1)">
          联合挖矿
        </div>
        <!-- <div class="tab" :class="{active:active===2}" @click="change(2)">FIL专区</div> -->
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="flex">
          <div class="pic">
            <img src="../../assets/imgs/coupon.png" />
          </div>
          <div class="info">
            <div class="name">{{ item.product_name }}</div>
            <div class="th flex">
              <div class="li">X{{ item.number }}</div>
              <div class="li">
                {{ item.payment_method == 1 ? "币币交易" : "银行卡支付" }}
              </div>
              <div class="li text-right">￥{{ item.payment_money }}</div>
            </div>
            <div class="td flex">
              <div class="li">台数</div>
              <div class="li">交易方式</div>
              <div class="li text-right">实付金额</div>
            </div>
          </div>
        </div>
        <div class="flex-between" style="paddingTop:30px">
          <div class="oNum">
            订单编号 {{ item.order_number }}
            <i class="el-icon-copy-document"></i>
          </div>
          <div class="state" style="color: #F16C00;">
            {{ ["已支付", "审核中", "购买失败"][item.zt] }}
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
      list: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let param = new URLSearchParams();
      let address = sessionStorage.getItem("address");
      param.append("address", address);
      param.append("type", this.active + 1);
      this.$axios
        .post("/MartianOrePool/selectOrderByAddress", param)
        .then(res => {
          let result = res.data;
          if (result.state == 0) {
            this.list = result.data;
          }
        });
    },
    change(index) {
      this.active = index;
      this.init();
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0 100px;
}
.tabs {
  width: 800px;
  height: 140px;
  box-shadow: 0px 17px 19px 2px rgba(6, 4, 3, 0.07);
  border-radius: 10px;
  margin-bottom: 50px;
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
.item {
  width: 700px;
  height: 320px;
  margin: 0 auto 50px;
  padding: 30px;
  .name {
    font-size: 26px;
    font-weight: bold;
    color: #000000;
  }
  .pic {
    img {
      width: 240px;
      height: 200px;
    }
  }
  .info {
    flex: 1;
    padding-left: 50px;
    .th {
      color: #000;
      font-size: 24px;
      margin-top: 40px;
      .li {
        width: 33.3333%;
      }
    }
    .td {
      font-size: 16px;
      color: #666;
      margin-top: 30px;
      .li {
        width: 33.333%;
      }
    }
  }
  .oNum {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    i {
      margin-left: 5px;
    }
  }
}
@media screen and (max-width: 767px) {
  .content {
    width: 100%;
    margin: 0 auto;
    padding: 25px 10px 50px;
  }
  .tabs {
    width: 90%;
    height: 70px;
    box-shadow: 0px 17px 19px 2px rgba(6, 4, 3, 0.07);
    border-radius: 5px;
    margin-bottom: 50px;
    .tab {
      width: 50%;
      font-size: 20px;
      font-weight: 800;
      color: #815ff5;
      text-align: center;
      line-height: 67px;
      cursor: pointer;
    }
    .active {
      background: #815ff5;
      color: #fff;
    }
  }
  .item {
    width: 700px;
    height: 320px;
    margin: 0 auto 50px;
    padding: 30px;
    .name {
      font-size: 26px;
      font-weight: bold;
      color: #000000;
    }
    .pic {
      img {
        width: 100px;
        height: 70px;
      }
    }
    .info {
      flex: 1;
      padding-left: 15px;
      .th {
        color: #000;
        font-size: 14px;
        margin-top: 20px;
        .li {
          width: 12%;
        }
      }
      .td {
        font-size: 14px;
        color: #666;
        margin-top: 15px;
        .li {
          width: 12%;
        }
      }
    }
    .oNum {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333;
      i {
        margin-left: 5px;
      }
    }
  }
}
</style>
