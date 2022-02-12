<template>
  <div id="app">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {},
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
}
</style>
