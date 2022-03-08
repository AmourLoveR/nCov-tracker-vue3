<template>
  <div class="domestic">
    <div class="title">国内疫情</div>
    <div class="content">
      <div v-for="item in chinaData" :key="item.name">
        <span class="name">{{ item.name }}</span>
        <span class="main-data" :style="{ color: item.color }">{{ item.mainData }}</span>
        <span class="previous-day">较上日</span>
        <span class="previous-data" :style="{ color: item.color }">{{ item.previousData }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onBeforeMount, toRefs } from "vue";
import { getChina } from "../../api/china";
export default {
  setup() {
    const state = reactive({
      chinaData: [],
    });

    onBeforeMount(async () => {
      const res = await getChina();
      const data = res.data.data;
      state.chinaData = [
        {
          name: "本土现有确诊",
          mainData: data.chinaTotal?.localConfirm.toLocaleString(),
          previousData:
            data.chinaAdd?.localConfirmH5 >= 0
              ? `+${data?.chinaAdd?.localConfirmH5.toLocaleString()}`
              : data?.chinaAdd?.localConfirmH5.toLocaleString(),
          color: "#e57631",
        },
        {
          name: "现有确诊",
          mainData: data.chinaTotal?.nowConfirm.toLocaleString(),
          previousData:
            data.chinaAdd?.nowConfirm >= 0
              ? `+${data?.chinaAdd?.nowConfirm.toLocaleString()}`
              : data?.chinaAdd?.nowConfirm.toLocaleString(),
          color: "#ff6a57",
        },
        {
          name: "累计确诊",
          mainData: data?.chinaTotal?.confirm.toLocaleString(),
          previousData:
            data?.chinaAdd?.confirm >= 0
              ? `+${data?.chinaAdd?.confirm.toLocaleString()}`
              : data?.chinaAdd?.confirm.toLocaleString(),
          color: "#e83132",
        },
        {
          name: "现有重症",
          mainData: data?.chinaTotal?.nowSevere.toLocaleString(),
          previousData:
            data?.chinaAdd?.nowSevere >= 0
              ? `+${data?.chinaAdd?.nowSevere.toLocaleString()}`
              : data?.chinaAdd?.nowSevere.toLocaleString(),
          color: "#545499",
        },
        {
          name: "无症状",
          mainData: data?.chinaTotal?.noInfect.toLocaleString(),
          previousData:
            data?.chinaAdd?.noInfect >= 0
              ? `+${data?.chinaAdd?.noInfect.toLocaleString()}`
              : data?.chinaAdd?.noInfect.toLocaleString(),
          color: "#f86d48",
        },
        {
          name: "境外输入",
          mainData: data?.chinaTotal?.importedCase.toLocaleString(),
          previousData:
            data?.chinaAdd?.importedCase >= 0
              ? `+${data?.chinaAdd?.importedCase.toLocaleString()}`
              : data?.chinaAdd?.importedCase.toLocaleString(),
          color: "#476da0",
        },
        {
          name: "累计治愈",
          mainData: data?.chinaTotal?.heal.toLocaleString(),
          previousData:
            data?.chinaAdd?.heal >= 0
              ? `+${data?.chinaAdd?.heal.toLocaleString()}`
              : data?.chinaAdd?.heal.toLocaleString(),
          color: "#10aeb5",
        },
        {
          name: "累计死亡",
          mainData: data?.chinaTotal?.dead.toLocaleString(),
          previousData:
            data?.chinaAdd?.dead >= 0
              ? `+${data?.chinaAdd?.dead.toLocaleString()}`
              : data?.chinaAdd?.dead.toLocaleString(),
          color: "#4d5054",
        },
      ];
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
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

    & > div {
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
        font-size: 0.8125rem;
        color: #999;
      }

      .previous-data {
        font-size: 0.8125rem;
      }
    }
  }
}
</style>