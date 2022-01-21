import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})