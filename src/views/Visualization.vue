<template>
  <div class="visualization">
    <div class="hover">
      <div class="domestic">
        <div>国内疫情</div>
        <div>
          本土现有确诊：{{ chinaData?.chinaTotal?.localConfirm }} -- 
          较上日：+{{ chinaData?.chinaAdd.localConfirmH5 }}
        </div>
        <div>
          现有确诊：{{ chinaData?.chinaTotal?.nowConfirm }} -- 
          较上日：+{{ chinaData?.chinaAdd.nowConfirm }}
        </div>
        <div>
          累计确诊：{{ chinaData?.chinaTotal?.confirm }} -- 
          较上日：+{{ chinaData?.chinaAdd.confirm }}
        </div>
        <div>
          现有重症{{ chinaData?.chinaTotal?.nowSevere }} -- 
          较上日：+{{ chinaData?.chinaAdd.nowSevere }}
        </div>
        <div>
          无症状感染者：{{ chinaData?.chinaTotal?.noInfect }} -- 
          较上日：+{{ chinaData?.chinaAdd.noInfect }}
        </div>
        <div>
          境外输入：{{ chinaData?.chinaTotal?.importedCase }} -- 
          较上日：+{{ chinaData?.chinaAdd.importedCase }}
        </div>
        <div>
          累计治愈：{{ chinaData?.chinaTotal?.heal }} -- 
          较上日：+{{ chinaData?.chinaAdd.heal }}
        </div>
        <div>
          累计死亡：{{ chinaData?.chinaTotal?.dead }} -- 
          较上日：+{{ chinaData?.chinaAdd.dead }}
        </div>
      </div>
      <China></China>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import China from "../components/chart/China.vue";
import { getChina, getCity } from "../api/china";
export default {
  name: "Visualization",
  components: {
    China,
  },
  setup() {
    const state = reactive({
      chinaData: {}
    });

    onBeforeMount(async () => {
      const chinaRes = await getChina();
      state.chinaData = chinaRes.data.data
    });

    return {
      ...toRefs(state)
    };
  },
};
</script>

<style lang="scss" scoped>
.visualization {
  background-color: #10aeb5;

  .hover {
    max-width: 1000px;
    margin: 0 auto;

    .domestic {
      background-color: #fff;
      max-width: 1000px;
    }
  }
}
</style>