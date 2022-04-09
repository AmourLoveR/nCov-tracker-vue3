<template>
  <div id="app">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<script>
import { getAllArticles } from './api/article'
export default {
  name: "App",
  setup() {
    getAllArticles()
  },
};
</script>

<style lang="scss" scoped>
$base-color: red; // 变量

// scss 混入
@mixin mixinCSS($color: black) {
  color: pink;
}

// scss 自定义函数
@function double($num) {
  @return $num * 2;
}

#app {
  width: 100%;
  height: 100vh;
}

.class1 {
  @extend #app; // scss 继承

  @include mixinCSS(red); // scss 混入

  background: lighten(red, 10%); // 颜色变浅10%
  color: darken(red, 10%); // 颜色变深10%
}
</style>
