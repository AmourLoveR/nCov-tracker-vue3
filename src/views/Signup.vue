<template>
  <div class="register">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="form">
        <n-form
          :model="formVal"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="aptitude:" path="register.aptitude">
            <n-input
              v-model:value="formVal.register.aptitude"
              placeholder=""
            ></n-input>
          </n-form-item>
          <n-form-item label="用户名:" path="register.username">
            <n-input
              v-model:value="formVal.register.username"
              placeholder=""
            ></n-input>
          </n-form-item>
          <n-form-item label="密码:" path="register.password">
            <n-input
              v-model:value="formVal.register.password"
              placeholder=""
            ></n-input>
          </n-form-item>
          <n-form-item label="确认密码:" path="register.confirmPsd">
            <n-input
              v-model:value="formVal.register.confirmPsd"
              placeholder=""
            ></n-input>
          </n-form-item>
          <n-form-item label="邮箱:" path="register.email">
            <n-input
              v-model:value="formVal.register.email"
              placeholder=""
            ></n-input>
          </n-form-item>
          <n-form-item label="联系电话:" path="register.phone">
            <n-input
              v-model:value="formVal.register.phone"
              placeholder=""
            ></n-input>
          </n-form-item>
        </n-form>
        <n-button type="info" round @click="register">注册</n-button>
        <div>{{ formVal.register }}</div>
      </div>
    </n-config-provider>
  </div>
</template>

<script>
import { reactive } from "vue";
import { NConfigProvider } from "naive-ui";
import { userRegister } from "../api/user";
export default {
  components: { NConfigProvider },
  setup() {
    const themeOverrides = {
      Button: {
        fontSizeMedium: "1rem",
      },
    };

    const formVal = reactive({
      register: {
        aptitude: "",
        email: "",
        password: "",
        // confirmPsd: "",
        phone: "",
        username: "",
      },
    });

    const rules = {
      register: {
        username: {
          required: true,
        },
        password: {
          required: true,
        },
        confirmPsd: {
          required: true,
        },
      },
    };

    async function register() {
      const res = await userRegister(formVal.register);
    }

    return {
      themeOverrides,
      formVal,
      rules,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: url("../assets/imgs/register-bg.png");

  .form {
    width: 600px;
    height: 700px;
    padding: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;

    .n-button {
      width: 150px;
      margin-left: calc(50% - 75px);
    }
  }
}
</style>