<template>
  <div id="public">
    <div class="menu">
      <div class="menu-item" :class="{ active: activeMenu == item.value }" v-for="item in menu" :key="item.value"
        @click="handleMenuChange(item.value)">
        {{ item.label }}
      </div>
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const menu = [
  {
    label: '疫情数据报告',
    value: 'report'
  },
  {
    label: '数据大屏',
    value: 'visualization'
  },
  {
    label: '文章推送',
    value: 'articles'
  }
]

let activeMenu = ref('report')
function handleMenuChange (value) {
  activeMenu.value = value
  router.push(`/public/${value}`)
}

if(route.name == 'articleId') activeMenu.value = 'articles'
</script>

<style lang="scss" scoped>
#public {
  overflow-x: hidden;

  .view {
    background: #10aeb5;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 48px);
  }

  .menu {
    width: 100%;
    background: #fff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    margin-left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 1px 4px #00152914;

    .menu-item {
      width: 266px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .menu-item.active {
      color: #10aeb5
    }
  }
}
</style>