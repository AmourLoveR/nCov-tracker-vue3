<template>
  <div id="not-found">
    <div>
      <div class="image"></div>
      <div class="btn">
        <n-button color="#1288ff" @click="backHome">返回上一页</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function backHome() {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
#not-found {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 600px;
    height: 600px;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
      background: url("../assets/imgs/404.png") no-repeat;
      background-size: contain;
    }

    .btn {
      position: absolute;
      left: 50%;
      bottom: 140px;
      transform: translateX(-50%);
    }
  }
}
</style>
