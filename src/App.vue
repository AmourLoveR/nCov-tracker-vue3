<template>
  <div id="app">
    <div class="toVis" @click="toVis">疫情实时数据大屏</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import China from "./components/chart/China.vue";
import Visualization from "./views/Visualization.vue";
export default {
  name: "App",
  components: { China, Visualization },
  setup() {
    let router = useRouter();
    function toVis() {
      router.push("/visualization");
    }
    return {
      toVis,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;

  .toVis {
    width: 210px;
    margin: 0 auto;
    color: #10aeb5;
    font-size: 26px;
    cursor: pointer;
  }
}
</style>
