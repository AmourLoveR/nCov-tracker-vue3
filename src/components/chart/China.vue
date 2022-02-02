<template>
  <div id="china"></div>
</template>

<script>
import { onMounted } from "vue";
import { useMessage } from 'naive-ui'
import * as echarts from "echarts";
import china from "../../assets/json/china.json";
import { getChina, getProvience } from "../../api/china";

export default {
  name: "China",
  setup() {
    const message = useMessage()
    onMounted(async () => {
      let provinceData = [];
      const res = await getProvience('now')
      for(let item of res.data.data) {
        const province = { name: item.name, value: item.total.nowConfirm }
        provinceData.push(province)
      }

      const chinaChart = echarts.init(document.getElementById("china"));
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
            roam: true,
            scaleLimit: {
              min: 0.5,
              max: 10,
            },
            center: [106, 26],
            layoutCenter: ["100%", "100%"],
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
        console.log(params); //此处写点击事件内容
        message.info(params.data.name)
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#china {
  margin: 0 auto;
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #f8f9fa;
  box-sizing: border-box;
}
</style>