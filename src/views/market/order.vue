<template>
  <div class="orderContent">
    <div class="k60"></div>
    <div class="flex">
      <div class="left">
        <div class="name" style="margin-bottom:100px">{{ orderObj.name }}</div>
        <div class="pic">
          <img :src="orderObj.image" alt="" />
        </div>
        <!-- <div class="number flex align-center">
          <div class="text">数量</div>
          <span
            @click="quantity == 1 ? '' : quantity--"
            :style="quantity == 1 ? 'color:#999' : 'color:#000'"
            >-</span
          >
          <div class="num">{{ quantity }}</div>
          <span @click="quantity++">+</span>
        </div> -->
      </div>
      <div class="center">
        <div class="title" style="margin-bottom:70px">电费</div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">今日电费</div>
          <div class="val" style="margin-bottom:20px">
            {{ orderObj.electricDay }}元/台/天
          </div>
        </div>
        <div class="li flex-between">
          <div class="key">天数</div>
          <div class="val flex">
            <div
              class="cell text-center"
              :class="{ active: active == 1 }"
              @click="changeAct(1)"
            >
              30天
            </div>
            <div
              class="cell text-center"
              :class="{ active: active == 2 }"
              @click="changeAct(2)"
            >
              90天
            </div>
            <input type="text" v-model="days" placeholder="自定义" />
          </div>
        </div>
        <div class="tip">最小缴纳30天，最大缴纳90天</div>
      </div>
      <div class="right">
        <div class="title" style="margin-bottom:70px">金额</div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">矿机总价</div>
          <div class="val">￥{{ orderObj.mill_cost_sum }}</div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">矿机税费</div>
          <div class="val">￥{{ orderObj.cose }}</div>
        </div>
        <div class="li flex-between">
          <div
            class="key"
            style="margin-bottom:20px"
            v-if="orderObj.name == 'CHIA存储挖矿'"
          >
            托管费
          </div>
          <div class="key" style="margin-bottom:20px" v-else>电费</div>
          <div class="val">￥{{ orderObj.decimal }}</div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">运费</div>
          <div class="val">￥{{ orderObj.carriage }}</div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">预计总价</div>
          <div class="val">{{ cost }}</div>
        </div>
      </div>
    </div>

    <div
      class="coupon text-center"
      v-if="$route.query.name && $route.query.newAward"
      @click="navigate('./coupon')"
    >
      {{ name }}￥{{ newAward }}
    </div>
    <!-- <div class="coupon text-center" @click="navigate('./coupon')" v-else>
      添加优惠券
    </div> -->
    <div class="btn" @click="navigate('./usdtPay')">支付</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: "",
      id: "",
      day: 30,
      days: "",
      orderObj: {},
      cost: "",
      active: 1,
      name: "",
      newAward: "",
      totle: ""
    };
  },
  watch: {
    days() {
      if (this.days) {
        this.active = "";
        this.getInfo(this.quantity, this.id);
      } else {
        this.active = 1;
        this.day = 30;
        setTimeout(() => {
          this.getInfo(this.quantity, this.id);
        }, 200);
      }
    }
  },
  created() {
    this.quantity = this.$route.query.quantity;
    this.id = this.$route.query.id;
    if (this.$route.query.name) {
      this.name = this.$route.query.name;
    }
    if (this.$route.query.newAward) {
      this.newAward = this.$route.query.newAward;
    }
    this.getInfo(this.quantity, this.id);
  },
  methods: {
    navigate(path) {
      this.$router.push({
        path: path,
        query: {
          cost: this.cost,
          quantity: this.quantity,
          id: this.id,
          mallAddress: this.orderObj.addressKey,
          totle: this.orderObj.mill_cost_sum
        }
      });
    },
    changeAct(index) {
      if (this.days) return;
      this.active = index;
      console.log(index);
      if (index == 1) {
        this.day = 30;
        this.getInfo(this.quantity, this.id);
        this.days = "";
      } else {
        this.day = 90;
        this.getInfo(this.quantity, this.id);
        this.days = "";
      }
    },
    getInfo(quantity, id) {
      let param = new URLSearchParams();
      param.append("orderId", id);
      param.append("number", quantity);
      param.append("day", this.days ? this.days : this.day);
      this.$axios.post("/MartianOrePool/millOrderPage", param).then(res => {
        let result = res.data;
        console.log(result, "resultresultresultresult");
        if (result.state == 0) {
          this.orderObj = result.data[0];
          console.log("this.orderObj", this.orderObj);
          this.millCost = Number(this.orderObj.mill_cost_sum);
          this.cost =
            Number(this.orderObj.mill_cost_sum) +
            Number(this.orderObj.cose) +
            Number(this.orderObj.decimal) +
            Number(this.orderObj.carriage);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.orderContent {
  width: 1200px;
  height: 928px;
  margin: 0 auto;
  .left {
    padding-right: 120px;
    padding-bottom: 60px;
    .name {
      color: #000;
      font-size: 26px;
      font-weight: 600;
      padding: 60px 0 30px;
    }
    .number {
      margin-top: 60px;
      .text {
        color: #888;
        font-size: 20px;
        padding-right: 20px;
      }
      span {
        color: #000;
        font-size: 36px;
        cursor: pointer;
      }
      .num {
        width: 100px;
        color: #000;
        font-size: 28px;
        border: 1px solid #999;
        text-align: center;
        border-radius: 5px;
        margin: 0 20px;
      }
    }
    .pic {
      width: 180px;
      height: 152px;
      margin-top: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .center {
    width: 360px;
    .tip {
      color: #f16c00;
      padding-top: 20px;
    }
    .title {
      padding-top: 60px;
      color: #000;
      font-size: 26px;
      font-weight: 600;
    }
    .li {
      margin-top: 20px;
      .key {
        color: #666;
        font-size: 18px;
      }
      .val {
        color: #000;
        font-size: 18px;
        .cell {
          width: 60px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #999;
          border-radius: 5px;
          font-size: 16px;
          margin-left: 10px;
          cursor: pointer;
        }
        .active {
          border: 1px solid #ff3600;
          background: #ffeee3;
        }
        input {
          width: 60px;
          height: 30px;
          text-align: center;
          font-size: 16px;
          margin-left: 10px;
          border-radius: 5px;
          border: none;
          border: 1px solid #999;
        }
        input::-webkit-input-placeholder {
          color: #999;
          font-size: 16px !important;
        }
      }
    }
  }

  .right {
    flex: 1;
    padding-left: 200px;
    .title {
      padding-top: 60px;
      color: #000;
      font-size: 26px;
      font-weight: 600;
    }
    .li {
      margin-top: 20px;
      .key {
        color: #666;
        font-size: 18px;
      }
      .val {
        color: #000;
        font-size: 18px;
      }
    }
  }
  .coupon {
    color: #ff9b48;
    font-size: 16px;
    padding-top: 80px;
    cursor: pointer;
  }
  .btn {
    width: 400px;
    height: 60px;
    line-height: 60px;
    background: linear-gradient(180deg, #ff9b48, #ffc99b);
    margin: 20px auto 80px;
    text-align: center;
    border-radius: 30px;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
