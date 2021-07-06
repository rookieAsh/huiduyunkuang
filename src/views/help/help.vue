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
      htmllist: []
    };
  },
  created() {
    this.getLun();
  },
  methods: {
    getLun() {
      let param = new URLSearchParams();
      param.append("type", 7);
      this.$axios.post("/index/getBannerList", param).then(res => {
        console.log(res.data.data);
        res.data.data.map(item => {
          this.imglist.push(item.url);
          this.titlelist.push(item.content);
          this.htmllist.push(item.jump_site);
        });
      });
    },
    gotoword(item) {
      var htmll = item;
      this.$router.push({
        path: "/dynamicContent",
        query: {
          title: htmll
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.helpPage {
  // height: 1100px;
  // height: 100%;
  .box {
    width: 1200px;
    // padding-bottom: 100px;
    margin-top: 40px;
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
}
@media screen and (max-width: 767px) {
  .helpPage {
    // height: 100%;
    .box {
      width: 96%;
      padding: 0 10px 0px 10px;
      .item {
        width: 100%;
        height: 100px;
        margin-bottom: 20px;
        .item_left {
          width: 160px;
          height: 100px;
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
          padding-left: 10px;
          cursor: pointer;
          .fzs {
            font-size: 14px !important;
          }
          .text {
            color: #333;
            font-size: 12px;
            line-height: 13px;
            padding: 5px 0;
          }
        }
      }
    }
  }
}
</style>
