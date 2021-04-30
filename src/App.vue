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
// .viewClass {
//   margin: 0 0 300px 0;
// }
</style>
