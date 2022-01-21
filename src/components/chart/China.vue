<template>
  <div id="china" :style="{ width: '800px', height: '600px' }"></div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios'
import china from "../../assets/json/china.json";
import { onMounted } from "vue";
export default {
  name: "China",
  setup() {
    onMounted(() => {
      axios.get('/api').then(res => {
        alert('请求成功')
      })

      const chinaChart = echarts.init(document.getElementById("china"));
      echarts.registerMap("china", china);
      function randomData() {
        return Math.round(Math.random() * 50);
      }
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
            data: [
              { name: "北京", value: randomData() },
              { name: "天津", value: randomData() },
              { name: "上海", value: randomData() },
              { name: "重庆", value: randomData() },
              { name: "河北", value: randomData() },
              { name: "河南", value: 160 },
              { name: "云南", value: 1600 },
              { name: "辽宁", value: 10000 },
              { name: "黑龙江", value: randomData() },
              { name: "湖南", value: randomData() },
              { name: "安徽", value: randomData() },
              { name: "山东", value: randomData() },
              { name: "新疆", value: randomData() },
              { name: "江苏", value: 0 },
              { name: "浙江", value: randomData() },
              { name: "江西", value: randomData() },
              { name: "湖北", value: randomData() },
              { name: "广西", value: randomData() },
              { name: "甘肃", value: randomData() },
              { name: "山西", value: randomData() },
              { name: "内蒙古", value: randomData() },
              { name: "陕西", value: randomData() },
              { name: "吉林", value: 1600 },
              { name: "福建", value: randomData() },
              { name: "贵州", value: randomData() },
              { name: "广东", value: randomData() },
              { name: "青海", value: randomData() },
              { name: "西藏", value: randomData() },
              { name: "四川", value: randomData() },
              { name: "宁夏", value: randomData() },
              { name: "海南", value: randomData() },
              { name: "台湾", value: randomData() },
              { name: "香港", value: randomData() },
              { name: "澳门", value: randomData() },
            ],
          },
        ],
      });
      chinaChart.on("click", function (params) {
        console.log(params); //此处写点击事件内容
      });
    });
  },
};
</script>

<style lang="scss" scoped>
#china {
  margin: 0 auto;
  background-color: #f8f9fa;
  box-sizing: border-box;
}
</style>