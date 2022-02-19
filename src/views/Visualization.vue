<template>
  <div id="visualization">
    <div class="actions">
      <n-button color="#6BB2A0" @click="enterfullscreen">全屏</n-button>
      <n-button color="#2C6975" @click="exitfullscreen">退出全屏</n-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Visualization",
  components: {},
  setup() {
    //控制全屏
    function enterfullscreen() {
      //进入全屏
      var docElm = document.getElementById("visualization"); // 指定容器id
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
      enterfullscreen,
      exitfullscreen,
    };
  },
};
</script>

<style lang="scss" scoped>
#visualization {
  background-color: #010101;
  height: calc(100vh - 60px);

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem;

    .n-button {
      margin: 1rem;
    }
  }
}
</style>