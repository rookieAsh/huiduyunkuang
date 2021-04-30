<template>
  <div class="helpPage">
    <div class="k60" style="background: #815ff5"></div>
    <div class="box margin60">
      <div class="item flex" v-for="(item, index) in imglist" :key="index">
        <div class="item_left flex">
          <div class="pic">
            <img
              :src="imglist[index]"
              alt=""
              @click="gotoword(htmllist[index])"
            />
          </div>
        </div>
        <div class="item_right">
          <div class="title flex align-center">
            <div
              class="fzs"
              @click="gotoword(htmllist[index])"
              style="color: #000; font-size: 26px; padding-right: 20px"
            >
              {{ titlelist[index] }}
            </div>
          </div>
          <!-- <div class="text">
            1月20日下午，比特小鹿CEO孟晓妮受邀出席“币世界年度数字资产投资策略论坛”，与矿圈大佬一起，探讨行业现状，分享2021年挖矿投资的掘金机会。新年伊始，比特币一骑绝尘，以前所未有的上涨速度冲破4万美元，刷新史上最高价格，挖矿市场情绪高涨。受比特币疯牛行情刺激，一边是矿机市场断货严重，供不应求，一边是二级市场囤币从供给端，矿机厂商控制投片导致产能不足。孟晓妮认为，去年黑天鹅事件让很多企业深刻地认识到风险管理和现金流管理的重要性，大规模的产能对应的就是大规模的投片，也需要大量的资金投入，在20年上半年风险不是很明朗的时候，很多矿机厂商做了相对理性的投片控制。
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imglist: [],
      titlelist: [],
      htmllist: [],
    };
  },
  created() {
    this.getLun();
  },
  methods: {
    getLun() {
      let param = new URLSearchParams();
      param.append("type", 7);
      this.$axios.post("/index/getBannerList", param).then((res) => {
        console.log(res.data.data);
        res.data.data.map((item) => {
          this.imglist.push(item.url);
          this.titlelist.push(item.content);
          this.htmllist.push(item.jump_site);
        });
      });
    },
    gotoword(item) {
      var htmll = item;
      this.$router.push({
        path: "/pls1",
        query: {
          title: htmll,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 1200px;
  padding-bottom: 100px;
  .item {
    width: 1200px;
    height: 250px;
    margin-bottom: 40px;

    .item_left {
      width: 450px;
      height: 240px;
      border: 1px solid #ccc;
      .pic {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .item_right {
      flex: 1;
      padding-left: 40px;
      cursor: pointer;
      .fzs {
        font-size: 20px !important;
      }
      .text {
        color: #333;
        font-size: 16px;
        line-height: 26px;
        padding: 10px 0;
      }
    }
  }
}
</style>