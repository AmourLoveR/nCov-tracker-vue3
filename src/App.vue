<template>
  <div id="app">
    <n-config-provider :theme-overrides="themeOverrides">
      <n-message-provider>
        <n-dialog-provider>
          <router-view></router-view>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script setup>
import { NMessageProvider, NDialogProvider, NConfigProvider } from "naive-ui";

const themeOverrides = {
  Menu: {
    // fontSize: '1rem',
    itemTextColor: "#BBB",
    itemIconColor: "#BBB",
    itemTextColorHover: "#FFF",
    itemIconColorHover: "#FFF",
    itemTextColorActive: "#FFF",
    itemIconColorActive: "#FFF",
    itemColorActive: "#5a92f5",
    itemIconColorCollapsed: "#BBB",
    itemColorActiveCollapsed: "#5a92f5",
  },
  Drawer: {
    bodyPadding: 0,
  },
};
</script>

<style lang="scss" scoped>
.n-config-provider {
  width: 100%;
  height: 100%;
}

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
