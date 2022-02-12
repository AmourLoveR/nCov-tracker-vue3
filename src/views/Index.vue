<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout has-sider position="absolute">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 0;"
      >
        <n-menu
          collapse-mode="width"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :value="menuValue"
          @update:value="menuUpdate"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header><div class="layout-header">
            {{ menuValue === "/" ? "首页" : "疫情数据报告" }}
          </div></n-layout-header>
        <n-layout-content content-style="padding: 0;">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script>
import { ref, h, resolveComponent } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import {
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
} from "naive-ui";
import { HomeOutline, SpeedometerOutline } from "@vicons/ionicons5";

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMenu,
  },
  setup() {
    /**
     * js 文件下使用这个做类型提示
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      Menu: {
        itemTextColor: "#BBB",
        itemIconColor: "#BBB",
        itemTextColorHover: "#FFF",
        itemIconColorHover: "#FFF",
        itemTextColorActive: "#FFF",
        itemIconColorActive: "#FFF",
        itemColorActive: "#2d8cf0",
        itemIconColorCollapsed: "#BBB",
        itemColorActiveCollapsed: "#2d8cf0"
      },
    };

    let menuValue = ref("index");
    const route = useRoute();
    const router = useRouter();

    menuValue.value = route.path;

    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }

    const menuOptions = [
      {
        label: "首页",
        key: "/",
        icon: renderIcon(HomeOutline),
      },
      {
        label: "疫情数据报告",
        key: "/visualization",
        icon: renderIcon(SpeedometerOutline),
      },
    ];

    function menuUpdate(key, item) {
      console.log(item);
      router.push(key);
      menuValue.value = key;
    }

    return {
      menuUpdate,
      menuValue,
      menuOptions,
      themeOverrides
    };
  },
};
</script>

<style lang="scss" scoped>
.n-layout-header {
  background: #fff;
  height: 60px;
  line-height: 60px;
  color: #10aeb5;
  font-size: 18px;
  position: relative;
  z-index: 99;

  .layout-header {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    box-shadow: 0 1px 4px #00152914;
  }
}

.n-layout-sider {
  background: #001428;
}

.n-layout-content {
  background: #f5f7f9;
  min-height: calc(100vh - 60px);
}
</style>