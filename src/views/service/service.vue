<template>
  <div class="servicePage">
    <div class="box">
      <div class="child1">如何参与</div>
      <img
        class="child2"
        src="https://mclouds.huoxing24.com/build/hit-bdcfe633.png"
        alt=""
      />
      <div class="child3">
        <div class="son1 son">
          <div class="p1">注册</div>
          <div class="p2">
            通过邮箱或者手机轻松注册灰度云矿账号,即可开启挖矿之旅
          </div>
        </div>
        <div class="son2 son">
          <div class="p1">购买</div>
          <div class="p2">
            灰度云矿提供了丰富的BTC、ETH、FIL矿机组合产品，高性价比，高收益，高回报是你财富增值的最佳选择
          </div>
        </div>
        <div class="son3 son">
          <div class="p1">获利</div>
          <div class="p2">
            灰度云矿为您提供一站式的挖矿辅助服务，让你坐享收益，挖矿可以很简单！
          </div>
        </div>
      </div>
    </div>
    <div class="box1">
      <div class="child1">我们的服务</div>
      <div class="child2">
        <div class="son" v-for="(item, index) in fuwulist" :key="index">
          <img class="t1" :src="item.url" alt="" />
          <div class="t2">
            <div class="tt1">{{ item.title }}</div>
            <div class="tt2">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="child1">投资机构</div>
      <img class="child2" :src="imgurl" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fuwulist: [
        {
          url: "https://mclouds.huoxing24.com/build/purchas-131c1242.png",
          title: "矿机采购",
          content: "权威厂家，专业矿机订购"
        },
        {
          url: "https://mclouds.huoxing24.com/build/shopingcar-0b3642b4.png",
          title: "运输部署",
          content: "确保矿机安全、快速的运到场地、并及时上架开始挖矿"
        },
        {
          url: "https://mclouds.huoxing24.com/build/tool-ac57a6d9.png",
          title: "运行维护",
          content: "24小时轮班监控，保证机器安全，稳定运行"
        },
        {
          url: "https://mclouds.huoxing24.com/build/clean-f08ac677.png",
          title: "机器清理",
          content: "定期进行机器清灰保养，延长使用寿命"
        },
        {
          url: "https://mclouds.huoxing24.com/build/electriction-cc0fee02.png",
          title: "电费缴纳",
          content: "一键电费代缴，快捷又省心"
        },
        {
          url: "https://mclouds.huoxing24.com/build/barter-02c3502c.png",
          title: "一键换币",
          content: "随时随地兑换所需币种"
        },
        {
          url: "https://mclouds.huoxing24.com/build/fault-e4d02307.png",
          title: "故障代发",
          content: "运行异常，及时检修，全权安排发货返修"
        },
        {
          url: "https://mclouds.huoxing24.com/build/connects-6ae108ac.png",
          title: "专项客服",
          content: "提供一对一客服服务，随时为您答惑"
        }
      ],
      imgurl: "https://mclouds.huoxing24.com/build/organl-e953533f.png"
    };
  }
};
</script>

<style lang="less" scoped>
.servicePage {
  overflow: hidden;
  .box {
    width: 100%;
    height: 450px;
    margin-top: 60px;
    background: rgba(231, 140, 51, 0.08);
    overflow: hidden;
    .child1 {
      font-size: 32px;
      font-weight: 700;
      color: #35384a;
      text-align: center;
      margin-top: 60px;
    }
    .child2 {
      width: 1200px;
      display: block;
      margin: 50px auto 0;
    }
    .child3 {
      width: 1200px;
      margin: 30px auto 0;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .son {
        width: 320px;
        .p1 {
          font-size: 22px;
          color: #000;
          font-weight: 600;
        }
        .p2 {
          font-weight: 500;
          color: #000;
        }
      }
    }
  }
  .box1 {
    margin: 0 auto;
    background: #28325c;
    color: #fff;
    overflow: hidden;
    .child1 {
      font-size: 32px;
      text-align: center;
      margin-top: 40px;
    }
    .child2 {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
      margin-top: 30px;
      .son {
        width: 300px;
        height: 133px;
        text-align: center;
        margin: 30px 0;
        .t1 {
          width: 44px;
          height: 44px;
        }
        .t2 {
          overflow: hidden;
          border-right: 0.5px solid hsla(0, 0%, 100%, 0.1);
          .tt1 {
            font-size: 16px;
            margin-top: 10px;
          }
          .tt2 {
            font-size: 13px;
            box-sizing: border-box;
            padding: 0 40px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .box2 {
    text-align: center;
    overflow: hidden;
    .child1 {
      color: #000;
      font-weight: 600;
      font-size: 32px;
      text-align: center;
      margin-top: 40px;
    }
    .child2 {
      margin: 50px 0;
      width: 1200px;
    }
  }
}
@media screen and (max-width: 767px) {
  .servicePage {
    overflow: hidden;
    .box {
      width: 100%;
      height: 260px;
      margin-top: 60px;
      background: rgba(231, 140, 51, 0.08);
      overflow: hidden;
      .child1 {
        font-size: 16px;
        font-weight: 700;
        color: #35384a;
        text-align: center;
        margin-top: 30px;
      }
      .child2 {
        width: 90%;
        display: block;
        margin: 25px auto 0;
      }
      .child3 {
        width: 100%;
        margin: 15px auto 0;
        display: flex;
        justify-content: space-between;
        text-align: center;
        .son {
          width: 180px;
          .p1 {
            font-size: 14px;
            color: #000;
            font-weight: 600;
          }
          .p2 {
            width: 100px;
            text-align: center;
            margin: 0 auto;
            font-size: 12px;
            // font-weight: 500;
            color: #000;
          }
        }
      }
    }
    .box1 {
      margin: 0 auto;
      background: #28325c;
      color: #fff;
      overflow: hidden;
      .child1 {
        font-size: 16px;
        text-align: center;
        margin-top: 20px;
      }
      .child2 {
        width: 100%;
        margin: 0 auto;
        display: flex;
        // flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        overflow: hidden;
        margin-top: 30px;
        .son {
          width: 180px;
          height: 115px;
          text-align: center;
          margin: 0px 0;
          .t1 {
            width: 30px;
            height: 30px;
          }
          .t2 {
            overflow: hidden;
            border-right: 0.5px solid hsla(0, 0%, 100%, 0.1);
            .tt1 {
              font-size: 13px;
              margin-top: 0px;
            }
            .tt2 {
              font-size: 12px;
              box-sizing: border-box;
              padding: 0 20px;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .box2 {
      text-align: center;
      overflow: hidden;
      .child1 {
        color: #000;
        font-size: 16px;
        text-align: center;
        margin-top: 25px;
      }
      .child2 {
        margin: 30px 0;
        width: 95%;
      }
    }
  }
}
</style>
