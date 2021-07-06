<template>
  <div class="hintContent">
    <div class="k60"></div>
    <div class="content">
      <div class="content1">{{ hintList.subtitle }}</div>
      <div class="content2">{{ hintList.creatTime }}</div>
      <div class="content3" v-html="hintList.describe"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hintId: "",
      hintList: {}
    };
  },
  created() {
    this.hintId = this.$route.query.id;
    this.getHintDate();
  },
  methods: {
    getHintDate() {
      let param = new URLSearchParams();
      param.append("noticeId", this.hintId);
      this.$axios.post("/notice/selectNoticeById", param).then(res => {
        console.log("this.res111", res.data.data[0]);
        this.hintList = res.data.data[0];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.hintContent {
  .content {
    width: 1200px;
    min-height: 400px;
    margin: 80px auto 80px;
    padding: 60px;
    box-shadow: 0 0 10px #ccc;
    .content1 {
      width: 100%;
      color: #fac392;
      text-align: center;
      font-size: 30px;
    }
    .content2 {
      width: 100%;
      text-align: center;
      margin: 20px 0;
      font-size: 20px;
    }
    .content3 {
      width: 100%;
      text-indent: 2em;
      font-size: 18px;
    }
  }
}
@media screen and (max-width: 767px) {
  .hintContent {
    .content {
      width: 90%;
      min-height: 400px;
      margin: 10px auto 10px;
      padding: 15px;
      box-shadow: 0 0 10px #ccc;
      .content1 {
        width: 100%;
        color: #fac392;
        text-align: center;
        font-size: 20px;
      }
      .content2 {
        width: 100%;
        text-align: center;
        margin: 20px 0;
        font-size: 18px;
      }
      .content3 {
        width: 100%;
        text-indent: 2em;
        font-size: 14px;
      }
    }
  }
}
</style>
