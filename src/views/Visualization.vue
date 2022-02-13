<template>
  <div class="visualization">
    <div class="hover">
      <Domestic></Domestic>
      <CityReport></CityReport>
      <China></China>
    </div>
  </div>
</template>

<script>
import Domestic from "../components/visualization/Domestic.vue"
import China from "../components/chart/China.vue";
import CityReport from "../components/visualization/CityReport.vue"

export default {
  name: "Visualization",
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
.visualization {
  background-color: #10aeb5;

  .hover {
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>