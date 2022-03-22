import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    host: "0.0.0.0",
    proxy: {
      "^/api/v1": {
        target: "http://myhost.fallen-angle.com:8081",
        changeOrigin: true, //开启代理
        secure: false, // 接受 运行在 https ,上的服务
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
