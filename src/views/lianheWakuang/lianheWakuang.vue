<template>
  <div class="wakuangPage">
    <div class="k60"></div>
    <div class="banner margin0 flex-between">
      <div class="left">
        <div class="name">极速回本</div>
        <div class="name">Graypool矿机E30</div>
        <div class="countDown flex align-center">
          <div class="border">04</div>
          <span>天</span>
          <div class="border">07</div>
          <span>:</span>
          <div class="border">56</div>
          <span>:</span>
          <div class="border">56</div>
          <span>后结束</span>
        </div>
        <div class="pic">
          <img src="../../assets/imgs/pic.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="starTime">开始挖矿时间：03-01</div>
        <div class="th flex">
          <div class="th_li">矿石算力</div>
          <div class="th_li">矿机功耗</div>
          <div class="th_li">电费</div>
          <div class="th_li">狂吃费率</div>
        </div>
        <div class="td flex">
          <div class="td_li">240 MH/s/台</div>
          <div class="td_li">1.3KW/h/台</div>
          <div class="td_li">12.45元/天<br />0.38元/度</div>
          <div class="td_li">0%</div>
        </div>
        <div class="th flex" style="margin-top:30px">
          <div class="th_li">预计日产币</div>
          <div class="th_li">库存数量</div>
          <div class="th_li">管理费</div>
          <div class="th_li">回头天数</div>
        </div>
        <div class="td flex">
          <div class="td_li">0.015936ETH/天<br />≈￥184.64/天</div>
          <div class="td_li">100台</div>
          <div class="td_li">0</div>
          <div class="td_li">126</div>
        </div>
        <div class="th flex" style="margin-top:30px">
          <div class="th_li">静态回本天数</div>
          <div class="th_li">静态回本天数</div>
        </div>
        <div class="td flex">
          <div class="td_li">180天</div>
          <div class="td_li">5%</div>
        </div>
        <div class="th">总价 ￥199999 （不包含电费）</div>

        <div class="number flex-between align-center">
          <div class="pre">-</div>
          <div class="num">1</div>
          <div class="plus">+</div>
        </div>

        <el-checkbox v-model="checked"
          >我已阅读并同意<span class="span"
            >矿机租赁/购买协议</span
          ></el-checkbox
        >

        <div class="btn">购买</div>
      </div>
    </div>
    <div class="content margin0">
      <div class="titleBox">
        <div class="title">市场热销</div>
        <img src="../../assets/imgs/title_bg.png" class="title_bg" />
      </div>
      <div class="text">
        1月20日下午，比特小鹿CEO孟晓妮受邀出席“币世界年度数字资产投资策略论坛”，与矿圈大佬一起，探讨行业现状，分享2021年挖矿投资的掘金机会。
        新年伊始，比特币一骑绝尘，以前所未有的上涨速度冲破4万美元，刷新史上最高价格，挖矿市场情绪高涨。受比特币疯牛行情刺激，一边是矿机市场断货严重，供不应求，一边是二级市场囤币惜售，持币待涨。对于当下“一机难求”现状，孟晓妮给出了三个解释：
        从供给端，矿机厂商控制投片导致产能不足。孟晓妮认为，去年黑天鹅事件让很多企业深刻地认识到风险管理和现金流管理的重要性，大规模的产能对应的就是大规模的投片，也需要大量的资金投入，在20年上半年风险不是很明朗的时候，很多矿机厂商做了相对理性的投片控制。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    };
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
  }
  .pic {
    width: 320px;
    height: 220px;
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
        width: 25%;
      }
    }
    .td {
      width: 100%;
      margin-top: 10px;
      font-size: 20px;
      color: #999;
      .td_li {
        width: 25%;
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
        font-size: 36px;
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
