<template>
  <div class="city-report">
    <div class="title">疫情速报</div>
    <div class="headr">
      <div>地区</div>
      <div>新增本土</div>
      <div>现有病例</div>
    </div>
    <div class="item" v-for="item in cityData.slice(0, 5)" :key="item.name">
      <div>{{ item.name }}</div>
      <div>{{ item.todayConfirm }}</div>
      <div>{{ item.nowConfirm }}</div>
    </div>
    <template v-if="isLoadMore">
      <div class="item" v-for="item in cityData.slice(5)" :key="item.name">
        <div>{{ item.name }}</div>
        <div>{{ item.todayConfirm }}</div>
        <div>{{ item.nowConfirm }}</div>
      </div>
    </template>
    <div class="load-more" @click="isLoadMore = !isLoadMore">
      <span>{{ !isLoadMore ? "加载更多" : "收起" }}</span>
      <n-icon size="22">
        <ChevronDown v-if="!isLoadMore" />
        <ChevronUp v-else/>
      </n-icon>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { ChevronDown, ChevronUp } from "@vicons/ionicons5";
import { getCity } from "../../api/statistics";

export default {
  name: "CityReport",
  components: { ChevronDown, ChevronUp },
  setup() {
    const state = reactive({
      cityData: [],
      isLoadMore: false,
    });

    onBeforeMount(async () => {
      const res = await getCity("today");
      const data = res.data.data;
      for (let item of data) {
        if (item.today.confirm <= 0) break;
        let city = {
          name: item.name,
          todayConfirm: item.today.confirm,
          nowConfirm: item.total.nowConfirm,
        };
        state.cityData.push(city);
      }
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.city-report {
  padding: 1rem;
  background: #fff;

  .title {
    font-size: 16px;
    font-weight: 700;
  }

  .headr {
    & > div {
      display: inline-block;
      color: #555;
      background: #f5f6f7;
      height: 2rem;
      line-height: 2rem;

      &:first-child {
        width: 46%;
        padding-left: 0.5rem;
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
      }

      &:not(:first-child) {
        width: 27%;
        text-align: center;
      }

      &:nth-child(2) {
        border-left: #fff 3px solid;
        border-right: #fff 3px solid;
      }
      &:nth-child(3) {
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
      }
    }
  }

  .item {
    position: relative;

    & > div {
      height: 3rem;
      line-height: 3rem;
      font-size: 1rem;
      font-weight: 700;
      display: inline-block;

      &:first-child {
        width: 46%;
        padding-left: 0.5rem;
      }

      &:nth-child(2) {
        color: #2e7be6;
      }

      &:not(:first-child) {
        width: 27%;
        text-align: center;
      }
    }

    &::after {
      content: "";
      height: 2px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #eee;
      -webkit-transform: scaleY(0.3);
      -ms-transform: scaleY(0.3);
      transform: scaleY(0.3);
    }
  }

  .load-more {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    cursor: pointer;
    font-size: 16px;
    color: #555;
  }
}
</style>
