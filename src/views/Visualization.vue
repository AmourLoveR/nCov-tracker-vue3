<template>
  <div id="visualization">
    <div class="actions">
      <n-button color="#6BB2A0" @click="enterfullscreen">全屏</n-button>
      <n-button color="#2C6975" @click="exitfullscreen">退出全屏</n-button>
    </div>
    <div class="china-hover">
      <China ref="chinaChart"></China>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import China from "../components/chart/China.vue";
export default {
  name: "Visualization",
  components: { China },
  setup() {
    const chinaChart = ref(null);

    window.onresize = () => {
      chinaChart.value.chartResize();
      console.log('onresize');
    }

    //控制全屏
    function enterfullscreen() {
      //进入全屏
      const docElm = document.getElementById("visualization"); // 指定容器id
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11
      else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
    //退出全屏
    function exitfullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    return {
      chinaChart,
      enterfullscreen,
      exitfullscreen,
    };
  },
};
</script>

<style lang="scss" scoped>
#visualization {
  background-color: #010101;

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem;

    .n-button {
      margin: 1rem;
      z-index: 99;
    }
  }

  .china-hover {
    width: 50%;
    margin: 0 auto;
  }
}
</style>