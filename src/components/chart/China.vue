<template>
  <div id="china" :style="{ 'background-color': color }"></div>
</template>

<script>
import { onMounted, toRefs, watch } from "vue";
import { useMessage } from "naive-ui";
import * as echarts from "echarts";
import china from "../../assets/json/china.json";
import { getProvince } from "../../api/statistics";

export default {
  name: "China",
  props: ["color", "zoom", "provinceRes"],
  setup(props) {
    const message = useMessage();
    let chinaChart = undefined;

    function chartResize() {
      chinaChart.resize();
    }

    function setChart() {
      let provinceData = [];
      for (let item of props.provinceRes.data.data) {
        const province = { name: item.name, value: item.total.nowConfirm };
        provinceData.push(province);
      }

      chinaChart = echarts.init(document.getElementById("china"));
      echarts.registerMap("china", china);
      // 绘制图表
      chinaChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "地区：{b}<br/>现有确诊：{c}",
        },
        visualMap: {
          type: "piecewise",
          pieces: [
            { gte: 10000 },
            { min: 1000, max: 9999 },
            { min: 100, max: 999 },
            { min: 10, max: 99 },
            { min: 1, max: 9 },
            { value: 0 },
          ],
          itemGap: 5,
          hoverLink: true,
          left: "20px",
          bottom: "10px",
          inRange: {
            color: ["white", "#F57567", "#B80909"],
          },
        },
        series: [
          {
            name: "china",
            type: "map",
            map: "china",
            // roam: true,
            // scaleLimit: {
            //   min: 0.5,
            //   max: 10,
            // },
            center: [105, 35],
            zoom: props.zoom,
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                color: "#333",
              },
              itemStyle: {
                areaColor: "#A6F4F7",
              },
            },
            select: {
              label: {
                show: true,
                color: "#333",
              },
              itemStyle: {
                areaColor: "#A6F4F7",
              },
            },
            data: provinceData,
          },
        ],
      });
      chinaChart.on("click", function (params) {
        console.log(params);
        message.info(params.data.name);
      });
    }
    watch(
      () => props.provinceRes,
      (val, oldVal) => {
        if (val.data.data) {
          setChart();
        }
      },
      { immediate: false }
    );

    return {
      ...toRefs(props),
      chartResize,
    };
  },
};
</script>

<style lang="scss" scoped>
#china {
  width: 100%;
  height: 100%;
}
</style>
