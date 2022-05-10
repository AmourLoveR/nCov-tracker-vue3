<template>
  <div id="growthTrend"></div>
</template>

<script>
import { watch } from "vue";
import * as echarts from "echarts";
import { formatDate } from "../../utils/utils";
export default {
  name: "growthTrend",
  props: ["chinaTrend", "type"],
  setup(props) {
    let chart = undefined;
    function chartResize() {
      chart.resize();
    }

    function setChart() {
      const { chinaDayAddList, ChinaDayList } = props.chinaTrend;
      const dates = []; // 存放日期
      const localConfirmadd = []; // 存放每日本土新增
      const localConfirm = []; // 存放每日本土现有确诊
      for (let item of chinaDayAddList) {
        dates.push(item.date);
        localConfirmadd.push(item.localConfirmadd);
      }
      for (let item of ChinaDayList) {
        // dates.push(item.date);
        localConfirm.push(item.localConfirm);
      }
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
          show: false,
          data: ["本土新增"],
          textStyle: { color: "#fff" },
        },
        toolbox: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
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
            data: props.type == "add" ? localConfirmadd : localConfirm,
          },
        ],
      });
    }

    // 监听trend数据，当有数据时开始渲染
    watch(
      () => props.chinaTrend,
      (val, oldVal) => {
        if (val.chinaDayAddList) {
          setChart();
        }
      },
      { immediate: false }
    );

    // 监听父组件数据type，渲染不同数据
    watch(
      () => props.type,
      (val, oldVal) => {
        setChart()
      }
    );

    return {
      chartResize,
    };
  },
};
</script>

<style lang="scss" scoped>
#growthTrend {
  width: 100%;
  height: 100%;
}
</style>
