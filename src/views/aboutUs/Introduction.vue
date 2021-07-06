<template>
  <div class="introContent">
    <div class="k60"></div>
    <div class="content">
      {{ content }}
    </div>
    <div class="main">
      <img :src="img" align="left" alt="" />
      <div class="text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      img: "",
      text: ""
    };
  },
  created() {
    this.getIntrodutionDate();
  },
  methods: {
    getIntrodutionDate() {
      let param = new URLSearchParams();
      param.append("type", 10);
      this.$axios.post("/index/getBannerList", param).then(res => {
        console.log(res.data.data, 1212121212);
        let data = res.data.data[0];
        this.content = data.content;
        this.img = data.url;
        this.text = data.jump_site;
        // res.data.data.map(item => {
        //   console.log(this.imglist, 1111111);
        //   this.titlelist.push(item.content);
        //   this.htmllist.push(item.jump_site);
        // });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.introContent {
  width: 1200px;
  min-height: 620px;
  margin: 0 auto;
  .content {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    margin: 20px 0;
  }
  .main {
    img {
      margin: 5px 15px 5px 5px;
    }
    .text {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 767px) {
  .introContent {
    width: 100%;
    min-height: 320px;
    margin: 0 auto;
    .content {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 15px;
      margin: 30px 0 0px 0;
    }
    .main {
      padding: 20px;
      img {
        width: 180px;
        height: 100px;
        margin: 5px 8px 5px 5px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
</style>
