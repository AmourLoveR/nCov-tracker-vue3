<template>
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
        :on-update:value="menuUpdate"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header></n-layout-header>
      <n-layout-content content-style="padding: 0;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script>
import { ref, h, resolveComponent } from "vue";
import {useRoute, useRouter, RouterLink } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
} from "naive-ui";
import { HomeOutline, SpeedometerOutline } from "@vicons/ionicons5";
import { use } from 'echarts';

export default {
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMenu,
  },
  setup() {
    let menuValue = ref('index')
    const route = useRoute();
    const router = useRouter();

    menuValue.value = route.path

    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }

    const menuOptions = [
      {
        label: () =>
          h(
            resolveComponent("router-link"),
            {
              to: {
                name: "index",
              },
            },
            { default: () => "首页" }
          ),
        key: "/",
        icon: renderIcon(HomeOutline),
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/visualization",
              },
            },
            { default: () => "数据大屏" }
          ),
        key: "/visualization",
        icon: renderIcon(SpeedometerOutline),
      },
    ];

    function menuUpdate(key, item) {
      menuValue.value = key
    }

    return {
      menuUpdate,
      menuValue,
      menuOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.n-layout-header {
  background: rgba(128, 128, 128, 0.2);
  padding: 0 auto;
  height: 60px;
  line-height: 60px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
  min-height: calc(100vh - 60px);
}
</style>