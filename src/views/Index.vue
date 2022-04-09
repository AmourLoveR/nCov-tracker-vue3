<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout has-sider position="absolute">
      <n-layout-sider
        :collapsed="isMenuShow"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        content-style="padding: 0;"
      >
        <n-menu
          collapse-mode="width"
          :collapsed-width="64"
          :icon-size="22"
          :collapsed-icon-size="24"
          :options="menuOptions"
          :value="menuValue"
          @update:value="menuUpdate"
        />
      </n-layout-sider>
      <n-layout>
        <n-layout-header>
          <div class="layout-header">
            <n-icon size="24" @click="isMenuShow = !isMenuShow">
              <menu-outline />
            </n-icon>
            <span>{{ menuValue === "/" ? "首页" : "疫情数据报告" }}</span>
          </div>
        </n-layout-header>
        <n-layout-content content-style="padding: 0;" :native-scrollbar="false">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-drawer v-model:show="isMenuShow" placement="left">
      <n-drawer-content>
        <n-menu
          collapse-mode="width"
          :collapsed-width="64"
          :icon-size="22"
          :collapsed-icon-size="24"
          :options="menuOptions"
          :value="menuValue"
          @update:value="menuUpdate"
        />
      </n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>

<script>
import { ref, h, resolveComponent } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import {
  useMessage,
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  NDrawer,
  NDrawerContent,
} from "naive-ui";
import {
  MenuOutline,
  HomeOutline,
  SpeedometerOutline,
  DocumentTextOutline,
} from "@vicons/ionicons5";

export default {
  components: {
    MenuOutline,
    NConfigProvider,
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NMenu,
    NDrawer,
    NDrawerContent,
  },
  setup() {
    /**
     * js 文件下使用这个做类型提示
     * @type import('naive-ui').GlobalThemeOverrides
     */
    const themeOverrides = {
      Menu: {
        // fontSize: '1rem',
        itemTextColor: "#BBB",
        itemIconColor: "#BBB",
        itemTextColorHover: "#FFF",
        itemIconColorHover: "#FFF",
        itemTextColorActive: "#FFF",
        itemIconColorActive: "#FFF",
        itemColorActive: "#2d8cf0",
        itemIconColorCollapsed: "#BBB",
        itemColorActiveCollapsed: "#2d8cf0",
      },
      Drawer: {
        bodyPadding: 0,
      },
    };

    window.$message = useMessage()

    let menuValue = ref("index");
    let isMenuShow = ref(false);
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
        key: "/report",
        icon: renderIcon(DocumentTextOutline),
      },
      {
        label: "数据大屏",
        key: "/visualization",
        icon: renderIcon(SpeedometerOutline),
      },
    ];

    function menuUpdate(key, item) {
      router.push(key);
      menuValue.value = key;
      if (document.body.clientWidth < 500) isMenuShow.value = false;
    }

    return {
      menuUpdate,
      menuValue,
      menuOptions,
      themeOverrides,
      isMenuShow,
    };
  },
};
</script>

<style lang="scss" scoped>
.n-layout-header {
  background: #fff;
  height: 60px;
  line-height: 60px;
  // font-size: 1rem;
  position: relative;
  z-index: 99;

  .layout-header {
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    box-shadow: 0 1px 4px #00152914;
    display: flex;
    align-items: center;

    .n-icon {
      cursor: pointer;
    }

    span {
      color: #10aeb5;
      margin-left: 1rem;
    }
  }
}

.n-layout-sider {
  background: #001428;
}

.n-layout-content {
  background: #f5f7f9;
  height: calc(100vh - 60px);
}

@media screen and (max-width: 500px) {
  .n-layout-sider {
    display: none;
  }
}
</style>

<style>
.n-drawer {
  background: #001428;
}
@media screen and (min-width: 500px) {
  .n-drawer-container {
    display: none;
  }
}
</style>
