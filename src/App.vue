<template>
  <div id="app">
    <headerVue v-if="isReloadData"></headerVue>
    <!-- <keep-alive v-if="isReloadData">
      <router-view />
    </keep-alive> -->
    <router-view />
    <footerVue v-if="isReloadData"></footerVue>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReloadData: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__wrapper .el-dialog {
  width: 600px;
}
@media screen and (max-width: 767px) {
  html {
    // overflow: hidden !important;
    body {
      // overflow: hidden !important;
      #app {
        overflow: hidden !important;
      }
    }
  }

  .el-dialog__wrapper .el-dialog {
    width: 300px;
  }
  // .el-dialog__wrapper .el-dialog__footer .dialog-footer .el-button {
  // }

  // el-dialog__body

  .el-message-box {
    width: 80%;
  }
}
</style>
