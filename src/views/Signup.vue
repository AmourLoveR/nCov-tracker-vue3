<template>
  <div class="register">
    <div class="form">
      <div class="title">nCov Tracker</div>
      <n-form
        ref="formRef"
        :model="formVal"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="资质:" path="register.aptitude">
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
            type="password"
          ></n-input>
        </n-form-item>
        <n-form-item label="重复密码:" path="register.confirmPsd">
          <n-input
            v-model:value="formVal.register.confirmPsd"
            placeholder=""
            type="password"
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
      <div class="to-login">
        已有帐号？<span @click="toLogin">立即登录</span>
      </div>
      <n-button type="info" round @click="register">注册</n-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { userRegister } from "../api/user";
export default {
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();

    const formVal = reactive({
      register: {
        aptitude: "",
        email: "",
        password: "",
        confirmPsd: "",
        phone: "",
        username: "",
      },
    });

    const rules = {
      register: {
        username: {
          required: true,
          message: "请输入用户名",
        },
        password: {
          required: true,
          message: "请输入密码",
        },
        confirmPsd: [
          {
            required: true,
            message: "请再次输入密码",
          },
          {
            validator(rule, value) {
              return value === formVal.register.password;
            },
            message: "两次密码输入不一致",
          },
        ],
      },
    };

    function toLogin() {
      router.push("/login");
    }

    async function register() {
      formRef.value?.validate((err) => {
        if (!err) message.success("success");
        else message.error('fail')
      });
      // const res = await userRegister(formVal.register);
    }

    return {
      formRef,
      formVal,
      rules,
      toLogin,
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
    width: 500px;
    height: 600px;
    padding: 0 2.5rem;
    border-radius: 20px;
    box-shadow: rgb(0 0 0 / 10%) 0px 12px 20px 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;

    .title {
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 22px;
    }

    .to-login {
      font-size: 13px;
      margin-bottom: 1rem;

      & > span {
        color: blue;
        cursor: pointer;
      }
    }

    .n-button {
      width: 150px;
      margin-left: calc(50% - 75px);
      background: linear-gradient(90deg, #77a5eb, #6474d2);
    }
  }
}
</style>
