<template>
  <div id="increasedProportion"></div>
</template>

<script>
import { onMounted } from "vue";
import * as echarts from "echarts";
import { getChina } from "../../api/china";
import { formatDate } from "../../utils/utils";
export default {
  name: "IncreasedProportion",
  setup() {
    let chart = undefined;

    function chartResize() {
      chart.resize();
    }

    onMounted(async () => {
      const chinaRes = await getChina();
      const data = chinaRes.data.data;

      chart = echarts.init(document.getElementById("increasedProportion"));
      chart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          textStyle: { color: "#fff" },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: [
              { value: data.chinaAdd?.localConfirmH5, name: "本土新增" },
              { value: data?.chinaAdd?.noInfect, name: "无症状" },
              { value: data?.chinaAdd?.importedCase, name: "境外输入" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    });

    return {
      chartResize,
    };
  },
};
</script>

<style lang="scss" scoped>
#increasedProportion {
  width: 100%;
  height: 100%;
}
</style>