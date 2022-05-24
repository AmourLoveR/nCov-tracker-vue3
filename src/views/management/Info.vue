<template>
  <div id="info">
    <n-grid cols="50">
      <n-grid-item span="11">
        <n-card content-style="padding: 10px 0">
          <div class="back" @click="router.go(-1)">
            <n-icon>
              <arrow-back />
            </n-icon>
            <span>返回</span>
          </div>
          <div class="info-menu" v-for="item in infoMenu.slice(0, 3)" :key="item.title"
            :class="{ active: activeMenu == item.key }" @click="activeMenu = item.key">
            <div>{{ item.title }}</div>
            <div>{{ item.description }}</div>
          </div>
          <div v-if="observation?.healthSituation == 1" class="info-menu" :class="{ active: activeMenu == infoMenu[3].key }"
            @click="activeMenu = infoMenu[3].key">
            <div>{{ infoMenu[3].title }}</div>
            <div>{{ infoMenu[3].description }}</div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="38" offset="1">
        <base-info v-if="activeMenu == 'base'" @changeInfo="getObservationAsyncFn" />
        <situation v-else-if="activeMenu == 'situation'" />
        <pcr-record v-else-if="activeMenu == 'pcr'"></pcr-record>
        <faker v-else></faker>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { NGrid, NGridItem, NThing } from "naive-ui";
import { ArrowBack } from "@vicons/ionicons5";
import BaseInfo from "../../components/observation/info/BaseInfo.vue";
import Situation from "../../components/observation/info/Situation.vue";
import PcrRecord from "../../components/observation/info/PcrRecord.vue";
import Faker from "../../components/observation/info/Faker.vue";
import { getObservationById } from "../../api/management";

const router = useRouter();
const route = useRoute()
const id = route.params.id;

let activeMenu = ref("base");
const infoMenu = [
  {
    key: "base",
    title: "基本信息",
    description: "观察对象基本信息",
  },
  {
    key: "situation",
    title: "状态转换记录",
    description: "观察对象状态转换记录",
  },
  {
    key: "pcr",
    title: "核酸检测记录",
    description: "观察对象核酸检测记录",
  },
  {
    key: "faker",
    title: "接触者获取",
    description: "获取患者接触者",
  },
];

// 获取个人具体信息
let observation = ref(null);
getObservationAsyncFn();
async function getObservationAsyncFn () {
  const res = await getObservationById(id);
  observation.value = res.data.data;
}
provide("observation", observation);
provide('id', route.params.id)

</script>

<style lang="scss" scoped>
#info {
  padding: 16px;

  .back {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 40px;
    width: 60px;
    padding-left: 16px;
  }

  .info-menu {
    padding: 10px 16px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
      background: rgb(231, 231, 231);
    }

    &>div {
      &:first-child {
        font-size: 16px;
        margin-bottom: 5px;
      }
    }
  }

  .info-menu.active {
    background: #f0faff;
    color: #2d8cf0;
  }
}
</style>
