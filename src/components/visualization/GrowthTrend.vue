<template>
  <div id="growthTrend"></div>
</template>

<script>
import { onBeforeMount, onMounted } from "vue";
import * as echarts from "echarts";
import { getChina } from "../../api/china";
import { formatDate } from "../../utils/utils";
export default {
  name: "App",
  setup() {
    let chart = undefined;
    let chinaDayList = JSON.parse(localStorage.getItem("chinaDayList")) || [];
    const length = chinaDayList.length;

    onBeforeMount(async () => {
      const chinaRes = await getChina();
      const data = chinaRes.data.data;
      const item = {
        date: formatDate(new Date()),
        localConfirm: data.chinaAdd.localConfirmH5,
        localConfirmTotal: data.chinaTotal.localConfirm,
      };
      if (chinaDayList[length - 1].date === formatDate(new Date()))
        chinaDayList.pop();
      chinaDayList.push(item);
      localStorage.setItem("chinaDayList", JSON.stringify(chinaDayList));
    });

    onMounted(() => {
      const dates = [];
      const localConfirms = [];
      const localConfirmTotals = [];
      chinaDayList.forEach((item) => {
        dates.push(item.date);
        localConfirms.push(item.localConfirm);
        localConfirmTotals.push(item.localConfirmTotal);
      });
      chart = echarts.init(document.getElementById("growthTrend"));
      chart.setOption({
        title: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["本土新增", "现有确诊"],
          textStyle: { color: "#fff" },
        },
        toolbox: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: dates,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "本土新增",
            type: "line",
            stack: "Total",
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color: "#f43935",
            },
            emphasis: {
              focus: "series",
            },
            data: localConfirms,
          },
          {
            name: "现有确诊",
            type: "line",
            stack: "Total",
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color: "#f19914",
            },
            emphasis: {
              focus: "series",
            },
            data: localConfirmTotals,
          },
        ],
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#growthTrend {
  width: 100%;
  height: 100%;
}
</style>