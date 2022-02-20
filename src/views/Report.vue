<template>
  <div class="report">
    <div class="hover">
      <Domestic></Domestic>
      <CityReport></CityReport>
      <China color="#f8f9fa"></China>
    </div>
  </div>
</template>

<script>
import Domestic from "../components/report/Domestic.vue"
import CityReport from "../components/report/CityReport.vue"
import China from "../components/chart/China.vue";


export default {
  name: "Report",
  components: {
    China,
    Domestic,
    CityReport
  },
  setup() {

  },
};
</script>

<style lang="scss" scoped>
.report {
  background-color: #10aeb5;

  .hover {
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>