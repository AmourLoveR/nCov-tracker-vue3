<template>
  <div class="city-report">
    <div class="title">疫情速报</div>
    <div>地区 —— 新增本土 —— 现有病例</div>
    <div v-for="item in cityData" :key="item.name">
      {{ item.name }} —— {{ item.todayConfirm }} —— {{ item.nowConfirm }}
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { getCity } from "../../api/china";

export default {
  setup() {
    const state = reactive({
      cityData : []
    })
    
    onBeforeMount(async () => {
      let res = await getCity('today')
      const data = res.data.data
      for(let item of data) {
        if(item.today.confirm <= 0) break
        let obj = {
          name: item.name,
          todayConfirm: item.today.confirm,
          nowConfirm: item.total.nowConfirm
        }
        state.cityData.push(obj)
      }
    })

    return {
      ...toRefs(state)
    }
  },
}
</script>

<style lang="scss" scoped>
.city-report {
  padding: 1rem;
  background: #fff;

  .title {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>