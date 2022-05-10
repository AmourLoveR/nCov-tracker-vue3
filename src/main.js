import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import {
  create,
  NButton,
  NIcon,
  NInput,
  NForm,
  NFormItem,
  NSelect,
  NSpin,
  NModal,
  NCard
} from "naive-ui";
import "./index.css";

const naive = create({
  components: [NButton, NIcon, NInput, NForm, NFormItem, NSelect, NSpin, NModal, NCard],
});

const app = createApp(App);
const pinia = createPinia();
app.use(naive);
app.use(router);
app.use(pinia);

app.mount("#app");
