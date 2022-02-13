<template>
  <div class="visualization">
    <div class="hover">
      <div class="domestic">
        <div class="title">国内疫情</div>
        <div class="content">
          <div>
            <span class="name">本土现有确诊</span>
            <span class="main-data" :style="{'color': '#e57631'}">{{ chinaData?.chinaTotal?.localConfirm }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#e57631'}">{{ chinaData?.chinaAdd?.localConfirmH5 >=0 ? `+${chinaData?.chinaAdd?.localConfirmH5}` : `${chinaData?.chinaAdd?.localConfirmH5}` }}</span>
          </div>
          <div>
            <span class="name">现有确诊</span>
            <span class="main-data" :style="{'color': '#ff6a57'}">{{ chinaData?.chinaTotal?.nowConfirm }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#ff6a57'}">{{ chinaData?.chinaAdd?.nowConfirm >=0 ? `+${chinaData?.chinaAdd?.nowConfirm}` : `${chinaData?.chinaAdd?.nowConfirm}`}}</span>
          </div>
          <div>
            <span class="name">累计确诊</span>
            <span class="main-data" :style="{'color': '#e83132'}">{{ chinaData?.chinaTotal?.confirm }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#e83132'}">{{ chinaData?.chinaAdd?.confirm >= 0? `+${chinaData?.chinaAdd?.confirm}` : `${chinaData?.chinaAdd?.confirm}` }}</span>
          </div>
          <div>
            <span class="name">现有重症</span>
            <span class="main-data" :style="{'color': '#545499'}">{{ chinaData?.chinaTotal?.nowSevere }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#545499'}">{{ chinaData?.chinaAdd?.nowSevere >= 0? `+${chinaData?.chinaAdd?.nowSevere}` : `${chinaData?.chinaAdd?.nowSevere}` }}</span>
          </div>
          <div>
            <span class="name">无症状</span>
            <span class="main-data" :style="{'color': '#f86d48'}">{{ chinaData?.chinaTotal?.noInfect }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#f86d48'}">{{ chinaData?.chinaAdd?.noInfect >= 0? `+${chinaData?.chinaAdd?.noInfect}` : `${chinaData?.chinaAdd?.noInfect}` }}</span>
          </div>
          <div>
            <span class="name">境外输入</span>
            <span class="main-data" :style="{'color': '#476da0'}">{{ chinaData?.chinaTotal?.importedCase }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#476da0'}">{{ chinaData?.chinaAdd?.importedCase >= 0? `+${chinaData?.chinaAdd?.importedCase}` : `${chinaData?.chinaAdd?.importedCase}` }}</span>
          </div>
          <div>
            <span class="name">累计治愈</span>
            <span class="main-data" :style="{'color': '#10aeb5'}">{{ chinaData?.chinaTotal?.heal }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#10aeb5'}">{{ chinaData?.chinaAdd?.heal >= 0? `+${chinaData?.chinaAdd?.heal}` : `${chinaData?.chinaAdd?.heal}` }}</span>
          </div>
          <div>
            <span class="name">累计死亡</span>
            <span class="main-data" :style="{'color': '#4d5054'}">{{ chinaData?.chinaTotal?.dead }}</span>
            <span class="previous-day">较上日</span>
            <span class="previous-data" :style="{'color': '#4d5054'}">{{ chinaData?.chinaAdd?.dead >= 0? `+${chinaData?.chinaAdd?.dead}` : `${chinaData?.chinaAdd?.dead}` }}</span>
          </div>
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
      padding: 1rem;

      .title {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 0.625rem;
      }

      .content {
        display: flex;
        flex-wrap: wrap;

        &>div {
          width: 25%;
          text-align: center;
          
          .name {
            font-size: 16px;
            display: block;
          }

          .main-data {
            display: block;
            font-size: 1.18rem;
            font-weight: 700;
          }

          .previous-day {
            font-size: .8125rem;
            color: #999;
          }

          .previous-data {
            font-size: .8125rem;
          }
        }
      }
    }
  }
}
</style>