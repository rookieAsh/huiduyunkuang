<template>
  <div class="pls1">
    <div class="plsbox" v-html="$route.query.title">
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmllist:undefined
    };
  },
};
</script>

<style lang="less" scoped>
.pls1 {
  overflow: hidden;
  .plsbox {
    color: #000;
    width: 1200px;
    margin: 120px auto;
    font-size: 20px;
    line-height: 50px;
    .div1 {
      font-size: 40px;
    }
  }
}
</style>