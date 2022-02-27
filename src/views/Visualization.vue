<template>
  <div id="visualization">
    <div class="header">
      <div style="margin: 0 auto">疫情实时数据</div>
      <n-button text color="#6BB2A0" @click="enterfullscreen">
        <template #icon>
          <n-icon>
            <Scan />
          </n-icon>
        </template>
      </n-button>
      <n-button color="#2C6975" @click="exitfullscreen">退出全屏</n-button>
    </div>
    <div class="content">
      <div>
        <div class="local-confirm">
          <div class="item-title">本土新增</div>
          <div class="local-confirm-header">
            <div>地区</div>
            <div>新增本土</div>
            <div>现有病例</div>
          </div>
          <div
            v-for="item in cityData.slice(0, 4)"
            :key="item.name"
            class="city-increase"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.todayConfirm }}</div>
            <div>{{ item.nowConfirm }}</div>
          </div>
        </div>
        <div class="growth-trend">
          <div class="item-title">增长趋势统计</div>
          <div class="trend-hover">
            <GrowthTrend></GrowthTrend>
          </div>
        </div>
      </div>
      <div class="china-hover">
        <China ref="chinaRef" :zoom="1.2"></China>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount } from "vue";
import { Scan } from "@vicons/ionicons5";
import { getChina, getCity } from "../api/china";
import China from "../components/chart/China.vue";
import GrowthTrend from "../components/visualization/GrowthTrend.vue";

export default {
  name: "Visualization",
  components: { China, Scan, GrowthTrend },
  setup() {
    const state = reactive({
      chinaData: {},
      cityData: [],
    });
    const chinaRef = ref(null);

    window.onresize = () => {
      chinaRef.value.chartResize();
    };

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

    onBeforeMount(async () => {
      const chinaRes = await getChina();
      state.chinaData = chinaRes.data.data;

      state.cityData.push({
        name: "全国",
        todayConfirm: state.chinaData?.chinaAdd?.localConfirmH5,
        nowConfirm: state.chinaData?.chinaTotal?.localConfirm,
      });

      const cityRes = await getCity("today");
      const data = cityRes.data.data;
      for (let item of data) {
        if (item.today.confirm <= 0) break;
        let city = {
          name: item.name,
          todayConfirm: item.today.confirm,
          nowConfirm: item.total.nowConfirm,
        };
        state.cityData.push(city);
      }
    });

    return {
      ...toRefs(state),
      chinaRef,
      enterfullscreen,
      exitfullscreen,
    };
  },
};
</script>

<style lang="scss" scoped>
#visualization {
  background-color: #010101;
  width: 100%;
  min-height: 100vh;
  height: 100vh;

  .header {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem;
    border-bottom: 1px #fff solid;

    .n-button {
      margin: 1rem;
      z-index: 99;
    }
  }

  .content {
    display: table;
    width: 100%;
    height: calc(100% - 60px);

    & > div {
      display: table-cell;
      vertical-align: top;

      &:not(:nth-child(2)) {
        width: 30%;
      }
    }

    .local-confirm {
      color: #fff;
      padding: 0.8rem;

      .local-confirm-header {
        & > div {
          display: inline-block;
          background: #14263a;
          height: 2rem;
          line-height: 2rem;

          &:first-child {
            width: 46%;
            padding-left: 0.5rem;
            border-top-left-radius: 0.3rem;
            border-bottom-left-radius: 0.3rem;
          }

          &:not(:first-child) {
            width: 27%;
            text-align: center;
          }

          &:nth-child(2) {
            border-left: #fff 2px solid;
            border-right: #fff 2px solid;
          }
          &:nth-child(3) {
            border-top-right-radius: 0.3rem;
            border-bottom-right-radius: 0.3rem;
          }
        }
      }

      .city-increase {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;

        & > div {
          height: 2rem;
          line-height: 2rem;

          &:first-child {
            width: 46%;
            padding-left: 0.5rem;
          }

          &:not(:nth-child(1)) {
            width: 27%;
            text-align: center;
            color: #f4ba94;
          }
        }
      }
    }

    .growth-trend {
      width: 100%;
      height: 40%;

      .trend-hover {
        height: calc(100% - 50px);
      }
    }

    .china-hover {
      width: 40%;
      border-left: 1px white solid;
      border-right: 1px white solid;
    }

    .item-title {
      height: 50px;
      padding: 0.5rem;
      color: #77b0cb;
      font-weight: 700;
      border-radius: 0.25rem;
      font-size: 1.2rem;
    }
  }
}
</style>