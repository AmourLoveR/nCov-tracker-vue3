<template>
  <div id="visualization">
    <div class="header">
      <div>
        <div class="now-date">
          <div class="time">{{ time }}</div>
          <div class="date">
            <div>{{ week }}</div>
            <div>{{ date }}</div>
          </div>
        </div>
      </div>
      <div class="title">疫情实时数据</div>
      <div class="actions">
        <n-button text color="#6BB2A0" title="全屏" @click="enterfullscreen">
          <template #icon>
            <n-icon>
              <expand-outline />
            </n-icon>
          </template>
        </n-button>
        <!-- <n-button color="#2C6975" @click="exitfullscreen">退出全屏</n-button> -->
      </div>
    </div>
    <div class="content">
      <div>
        <div class="local-confirm">
          <div class="item-title">本土新增（城市）</div>
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
          <div class="tren-header">
            <div
              class="item-title"
              :style="{ color: activeTrend == 'add' ? '#77b0cb' : '#999' }"
              @click="activeTrend = 'add'"
            >
              本土新增确诊趋势
            </div>
            <div
              class="item-title"
              :style="{ color: activeTrend == 'add' ? '#999' : '#77b0cb' }"
              @click="activeTrend = 'all'"
            >
              本土现有确诊趋势
            </div>
          </div>
          <div class="trend-hover">
            <GrowthTrend
              ref="trendRef"
              :chinaTrend="chinaTrend"
              :type="activeTrend"
            ></GrowthTrend>
          </div>
        </div>
      </div>
      <div>
        <div class="china-data">
          <div>
            <span class="name">本土新增</span
            ><span class="data">{{ chinaData.todayConfirm }}</span>
          </div>
          <div>
            <span class="name">现有确诊</span
            ><span class="data">{{ chinaData.nowConfirm }}</span>
          </div>
        </div>
        <div class="china-hover">
          <China ref="chinaRef" :zoom="1.2" :provinceRes="provinceRes"></China>
        </div>
      </div>
      <div>
        <div class="local-confirm">
          <div class="item-title">本土新增（省）</div>
          <div class="local-confirm-header">
            <div>地区</div>
            <div>新增本土</div>
            <div>现有病例</div>
          </div>
          <div
            v-for="item in provinceData.slice(0, 4)"
            :key="item.name"
            class="city-increase"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.todayConfirm }}</div>
            <div>{{ item.nowConfirm }}</div>
          </div>
        </div>
        <div class="proportion-hover">
          <div class="item-title">新增确诊病例分布</div>
          <IncreasedProportion
            ref="proportionRef"
            :chinaRes="chinaRes"
          ></IncreasedProportion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onBeforeMount, onBeforeUnmount } from "vue";
import { ExpandOutline } from "@vicons/ionicons5";
import {
  getChina,
  getCity,
  getProvince,
  getChinaTrend,
} from "../../api/statistics";
import { formatDate } from "../../utils/utils";
import China from "../../components/chart/China.vue";
import GrowthTrend from "../../components/chart/GrowthTrend.vue";
import IncreasedProportion from "../../components/visualization/IncreasedProportion.vue";

export default {
  name: "Visualization",
  components: { China, ExpandOutline, GrowthTrend, IncreasedProportion },
  setup() {
    const state = reactive({
      chinaRes: {},
      chinaData: {},
      provinceRes: {},
      provinceData: [],
      cityData: [],
      chinaTrend: [],
    });
    const chinaRef = ref(null);
    const trendRef = ref(null);
    const proportionRef = ref(null);

    let activeTrend = ref("add"); // 定义趋势图active

    // 定义时间数据
    const date = reactive({
      date: formatDate(new Date(), "YYYY.MM.DD"),
      time: formatDate(new Date(), "HH:mm:ss"),
      week: formatDate(new Date(), "week"),
    });
    let interval = window.setInterval(() => {
      date.time = formatDate(new Date(), "HH:mm:ss");
    }, 1000);

    window.onresize = () => {
      chinaRef.value.chartResize();
      trendRef.value.chartResize();
      proportionRef.value.chartResize();
    };

    // 获取国内疫情趋势数据
    getChinaTrendAsyncFn();
    async function getChinaTrendAsyncFn() {
      const res = await getChinaTrend();
      state.chinaTrend = res.data.data;
    }

    onBeforeMount(async () => {
      state.chinaRes = await getChina();
      state.chinaData = state.chinaRes.data.data;
      state.chinaData = {
        todayConfirm:
          state.chinaData?.chinaAdd?.localConfirmH5.toLocaleString(),
        nowConfirm: state.chinaData?.chinaTotal?.localConfirm.toLocaleString(),
      };

      state.provinceRes = await getProvince("today");
      for (let item of state.provinceRes.data.data) {
        const province = {
          name: item.name,
          todayConfirm: item.today.confirm.toLocaleString(),
          nowConfirm: item.total.nowConfirm.toLocaleString(),
        };
        state.provinceData.push(province);
      }

      const cityRes = await getCity("today");
      const data = cityRes.data.data;
      for (let item of data) {
        if (item.today.confirm <= 0) break;
        let city = {
          name: item.name,
          todayConfirm: item.today.confirm.toLocaleString(),
          nowConfirm: item.total.nowConfirm.toLocaleString(),
        };
        state.cityData.push(city);
      }
    });

    onBeforeUnmount(() => {
      window.onresize = null;
      window.clearInterval(interval);
    });

    return {
      ...toRefs(state),
      ...toRefs(date),
      chinaRef,
      trendRef,
      proportionRef,
      enterfullscreen,
      exitfullscreen,
      activeTrend,
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
  },
};
</script>

<style lang="scss" scoped>
#visualization {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  background-color: #010101;
  background: url("../../assets/imgs/background.jpeg") no-repeat;
  background-size: cover;

  .header {
    display: table;
    width: 100%;
    height: 60px;

    .now-date {
      color: #fff;
      padding-left: 0.8rem;

      .time {
        font-size: 1.5rem;
        letter-spacing: 0.1rem;
      }

      .date {
        margin-left: 5px;

        & > div {
          margin-bottom: -5px;
          font-size: 12px;
        }
      }
    }

    & > div {
      display: table-cell;
      height: 60px;
      vertical-align: middle;

      &:not(:nth-child(2)) {
        width: 33%;
      }
    }

    .title {
      text-align: center;
      color: #eaedf4;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
    }

    .actions {
      text-align: end;

      .n-button {
        margin: 0 1rem;
      }
    }
  }

  .content {
    display: table;
    width: 100%;
    height: calc(100% - 60px);

    & > div {
      display: table-cell;
      vertical-align: top;

      &:nth-child(2) {
        width: 40%;
      }

      &:not(:nth-child(2)) {
        width: 30%;
      }
    }

    .local-confirm {
      color: #fff;
      padding: 0 0.8rem;
      height: 33%;

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
            color: #ffae00;
          }
        }
      }
    }

    .growth-trend {
      width: 100%;
      height: 40%;
      padding-left: 0.8rem;

      .tren-header {
        display: flex;
        justify-content: space-between;
        padding-right: 0.8rem;

        & > div {
          cursor: pointer;
        }
      }

      .trend-hover {
        height: calc(100% - 50px);
      }
    }

    .china-data {
      width: 100%;
      height: 20%;
      padding: 0 5rem;

      & > div {
        width: 50%;
        margin-top: 50px;
        display: inline-block;
        text-align: center;

        .name {
          display: block;
          color: #fff;
        }

        .data {
          color: #ffae00;
          font-size: 1.5rem;
        }
      }
    }

    .china-hover {
      width: 100%;
      height: 70%;
    }

    .proportion-hover {
      width: 100%;
      height: 40%;
      padding-left: 0.8rem;
    }

    .item-title {
      height: 50px;
      line-height: 50px;
      padding-left: 0.5rem;
      color: #77b0cb;
      font-weight: 700;
      border-radius: 0.25rem;
      font-size: 1.2rem;
    }
  }
}

@media screen and (min-width: 500px) {
  #visualization {
    .now-date {
      display: flex;
    }
  }
}

@media screen and (max-width: 500px) {
  #visualization {
    .now-date {
      display: none;
    }
    .n-button {
      display: none;
    }
  }
}
</style>
