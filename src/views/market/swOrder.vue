<template>
  <div class="orderContent">
    <div class="k60"></div>
    <div class="flex flexPhone">
      <div class="left">
        <div class="name">{{ swarmObj.name }}</div>
        <div class="pic">
          <img :src="swarmObj.logo" alt="" />
        </div>
      </div>
      <div class="center">
        <div class="title">网络带宽</div>
        <div class="li flex-between">
          <div class="key">网络带宽</div>
          <div
            class="val"
            style="margin-bottom:20px"
            v-if="this.swarmObj.name == '月月租'"
          >
            赠送
          </div>
          <div class="val" style="margin-bottom:20px" v-else>
            ￥{{ swarmObj.network }}元/年/个节点
          </div>
        </div>
        <div class="li flex-between" v-if="swarmObj.name == '年年租'">
          <div class="key">节点周期</div>
          <div class="val" style="margin-bottom:20px">
            三年
          </div>
        </div>
        <div class="li flex-between" v-if="swarmObj.name == '超级矿机'">
          <div class="key">缴费方式</div>
          <div class="val" style="margin-bottom:20px">
            季付
          </div>
        </div>
        <div class="li flex-between" v-if="swarmObj.name == '月月租'">
          <div class="key">月数</div>
          <div class="val flex">
            <div
              class="cell text-center"
              :class="{ active: active == 1 }"
              @click="changeAct(1)"
            >
              {{ day }}
            </div>
            <input
              type="text"
              v-model="days"
              placeholder="自定义"
              :class="{ active: days != '' }"
            />
          </div>
        </div>
        <div class="tip" v-if="swarmObj.name == '月月租'">
          最小缴纳三个月
        </div>
      </div>
      <div class="right">
        <div class="title">金额</div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">节点总价</div>
          <div class="val" v-if="swarmObj.name == '月月租'">
            ￥{{ nodeNumberMonth }}
          </div>
          <div class="val" v-if="swarmObj.name == '年年租'">
            ￥{{ nodeNumberYear }}
          </div>
          <div class="val" v-if="swarmObj.name == '超级矿机'">
            ￥{{ nodeNumberSuper }}
          </div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">网络带宽</div>
          <div class="val" v-if="swarmObj.name == '月月租'">
            ￥{{ networkMonth }}
          </div>
          <div class="val" v-if="swarmObj.name == '年年租'">
            ￥{{ networkYear }}
          </div>
          <div class="val" v-if="swarmObj.name == '超级矿机'">
            ￥{{ networkSuper }}
          </div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">运费</div>
          <div class="val">￥{{ swarmObj.carriage }}</div>
        </div>
        <div class="li flex-between">
          <div class="key" style="margin-bottom:20px">预计总价</div>
          <div class="val">￥{{ cost }}</div>
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
    <div class="coupon text-center" v-else>
      <div @click="navigate('./coupon')">添加优惠券</div>
    </div>
    <div class="btn" @click="navigate('./swUsdtPay')">
      <!-- <div class="btn" @click="toSwUsdtpay"> -->
      支付
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: "",
      id: "",
      day: 3,
      days: "",
      orderObj: {},
      swarmObj: {},
      cost: "",
      active: 1,
      name: "",
      newAward: "",
      totle: "",
      nodeNumberMonth: "", //节点数量总价
      nodeNumberYear: "",
      nodeNumberSuper: "",
      networkMonth: "", //网络带宽
      networkYear: "",
      networkSuper: "",
      node: "",
      coin: ""
    };
  },
  watch: {
    days() {
      if (this.days) {
        if (this.days < 3 && this.swarmObj.name == "月月租") {
          this.$message.warning("月数不能小于三个月");
          this.days = 3;
        }
        this.active = "";
        // this.quantity = this.days;
        this.getInfo(this.quantity, this.id);
      } else {
        this.active = 1;
        this.days = "";
        this.day = 3;
        setTimeout(() => {
          this.getInfo(this.quantity, this.id);
        }, 200);
      }
    }
  },
  created() {
    this.quantity = this.$route.query.quantity;
    this.days = this.$route.query.days;
    this.id = this.$route.query.id;
    this.coin = this.$route.query.coin;
    this.node = this.$route.query.node;
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
          mallAddress: this.swarmObj.addressKey,
          totle: this.cost,
          days: this.days,
          coin: this.coin
        }
      });
    },
    // toSwUsdtpay() {
    //   this.$router.push({
    //     path: "swUsdtPay",
    //     query: {
    //       cost: this.cost,
    //       quantity: this.quantity,
    //       id: this.id,
    //       mallAddress: this.swarmObj.addressKey,
    //       totle: this.cost,
    //       names: this.name
    //     }
    //   });
    // },
    changeAct(index) {
      if (this.days) return;
      this.active = index;
      if (index == 1) {
        this.day = 3;
        this.getInfo(this.quantity, this.id);
        this.days = "";
      }
    },
    getInfo(quantity, id) {
      let param = new URLSearchParams();
      param.append("orderId", id);
      param.append("number", quantity);
      //   param.append("day", this.days ? this.days : this.day);
      this.$axios.post("/swarm/swarmMillOrderPage", param).then(res => {
        console.log(res, "resultresultresultresult");
        this.swarmObj = res.data.data[0];
        console.log(this.swarmObj, "this.swarmObj");

        // this.cost =
        //   Number(this.orderObj.mill_cost_sum) +
        //   Number(this.orderObj.cose) +
        //   Number(this.orderObj.decimal) +
        //   Number(this.swarmObj.carriage);
        if (this.swarmObj.name == "月月租") {
          this.networkMonth = Number(this.swarmObj.network) * Number(this.days);
          this.nodeNumberMonth = this.days
            ? Number(this.swarmObj.mill_cost_sum) * Number(this.days)
            : Number(this.swarmObj.mill_cost_sum) * 3;

          this.cost = this.days
            ? Number(this.swarmObj.mill_cost_sum) * Number(this.days) +
              Number(this.swarmObj.network) * Number(this.days) +
              Number(this.swarmObj.carriage) -
              Number(this.newAward)
            : Number(this.swarmObj.mill_cost_sum) * 3 +
              Number(this.swarmObj.network) * Number(this.days) +
              Number(this.swarmObj.carriage) -
              Number(this.newAward);
        }
        if (this.swarmObj.name == "年年租") {
          this.networkYear =
            Number(this.swarmObj.network) * Number(this.quantity);
          this.nodeNumberYear = Number(this.swarmObj.mill_cost_sum);
          this.cost =
            this.networkYear +
            this.nodeNumberYear +
            Number(this.swarmObj.carriage) -
            Number(this.newAward);
        }
        if (this.swarmObj.name == "超级矿机") {
          this.networkSuper =
            Number(this.swarmObj.network) *
            Number(this.quantity) *
            Number(this.node);
          this.networkSuper = this.networkSuper / 4;
          this.nodeNumberSuper = Number(this.swarmObj.mill_cost_sum);
          this.cost =
            this.networkSuper +
            this.nodeNumberSuper +
            Number(this.swarmObj.carriage) -
            Number(this.newAward);
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
    padding-right: 100px;
    padding-bottom: 0px;
    .name {
      color: #000;
      font-size: 26px;
      font-weight: 600;
      text-align: center;
      padding: 60px 0 30px;
      margin-bottom: 100px;
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
      width: 200px;
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
      margin-bottom: 70px;
      color: #000;
      font-size: 26px;
      font-weight: 600;
    }
    .li {
      margin-top: 20px;
      .key {
        margin-bottom: 20px;
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
@media screen and (max-width: 767px) {
  .orderContent {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .flexPhone {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .left {
        width: 100%;
        padding-right: 0px;
        padding-bottom: 0px;
        .name {
          width: 100%;
          text-align: center;
          color: #000;
          font-size: 26px;
          font-weight: 600;
          padding: 0px 0px;
          margin-bottom: 30px;
          margin-top: 30px;
        }
        .number {
          margin-top: 10px;
          .text {
            color: #888;
            font-size: 14px;
            padding-right: 10px;
          }
          span {
            color: #000;
            font-size: 18px;
            cursor: pointer;
          }
          .num {
            width: 50px;
            color: #000;
            font-size: 16px;
            border: 1px solid #999;
            text-align: center;
            border-radius: 5px;
            margin: 0 10px;
          }
        }
        .pic {
          width: 100%;
          // height: 152px;
          margin-top: 10px;
          text-align: center;
          img {
            width: 60%;
            height: 100%;
          }
        }
      }
      .center {
        width: 100%;
        padding: 0 25px;
        .tip {
          color: #f16c00;
          padding-top: 16px;
        }
        .title {
          padding-top: 15px;
          margin-bottom: 20px;
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
        .li {
          margin-top: 0px;
          .key {
            color: #666;
            font-size: 16px;
            margin-bottom: 0px;
          }
          .val {
            color: #000;
            font-size: 16px;
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
        width: 100%;
        padding-left: 25px;
        padding-right: 25px;
        .title {
          padding-top: 30px;
          padding-bottom: 20px;
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
        .li {
          margin-top: 0px;
          .key {
            color: #666;
            font-size: 16px;
          }
          .val {
            color: #000;
            font-size: 16px;
          }
        }
      }
      .coupon {
        color: #ff9b48;
        font-size: 16px;
        padding-top: 80px;
        cursor: pointer;
      }
    }
    .btn {
      width: 60%;
      height: 40px;
      line-height: 40px;
      background: linear-gradient(180deg, #ff9b48, #ffc99b);
      margin: 10px auto 40px;
      text-align: center;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
