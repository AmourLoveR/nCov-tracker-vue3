<template>
  <div class="report">
    <div class="hover">
      <Domestic></Domestic>
      <CityReport></CityReport>
      <div class="china-hover">
        <China color="#f8f9fa" :zoom="1.4" :provinceRes="provinceRes"></China>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Domestic from "../components/report/Domestic.vue";
import CityReport from "../components/report/CityReport.vue";
import China from "../components/chart/China.vue";
import { getChina, getCity, getProvince } from "../api/statistics";

export default {
  name: "Report",
  components: {
    China,
    Domestic,
    CityReport,
  },
  setup() {
    const state = reactive({
      chinaRes: {},
      chinaData: {},
      provinceRes: {},
      provinceData: [],
      cityData: [],
    });

    async function getProvinceFunc() {
      state.provinceRes = await getProvince("today");
    }
    getProvinceFunc()

    return {
      ...toRefs(state)
    }
  },
};
</script>

<style lang="scss" scoped>
.report {
  background-color: #10aeb5;

  .hover {
    max-width: 800px;
    margin: 0 auto;

    .china-hover {
      width: 100%;
      height: 80vh;
    }
  }
}
</style>
