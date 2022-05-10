import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import visualizer from "rollup-plugin-visualizer"; // 分析依赖大小占比

export default defineConfig({
  plugins: [vue(), visualizer()],
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  server: {
    open: false,
    host: "0.0.0.0",
      // proxy: {
      //   "^/api/v1": {
      //     target: "http://myhost.fallen-angle.com:8082",
      //     changeOrigin: true, //开启代理
      //     secure: false, // 接受 运行在 https ,上的服务
      //   },
      // },
  },
});
