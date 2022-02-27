<template>
  <div id="todayConfirm"></div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from "vue";
import * as echarts from "echarts";
import { getChina, getCity } from "../../api/china";

export default {
  setup() {
    const state = reactive({
      chinaData: {},
      cityData: [],
    });
    let chart = undefined;

    function chartResize() {
      chart.resize();
    }

    onMounted(async () => {
      const chinaRes = await getChina();
      state.chinaData = chinaRes.data.data;

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

      const xAxisData = ["全国"];
      const todayConfirmArr = [state.chinaData?.chinaAdd?.localConfirmH5];
      for (let item of state.cityData.slice(0, 5)) {
        xAxisData.push(item.name);
        todayConfirmArr.push(item.todayConfirm);
      }

      chart = echarts.init(document.getElementById("todayConfirm"));
      chart.setOption({
        tooltip: {},
        legend: {},
        xAxis: {
          data: xAxisData,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: todayConfirmArr,
          },
        ],
      });
    });

    return {
      ...toRefs(state),
      chartResize,
    };
  },
};
</script>

<style lang="scss" scoped>
#todayConfirm {
  width: 100%;
  height: 100%;
}
</style>