<template>
  <div class="login">
    <div class="form">
      <div class="title">nCov Tracker</div>
      <n-form
        :model="formVal"
        :rules="rules"
        label-placement="left"
        require-mark-placement="right-hanging"
      >
        <n-form-item path="login.account">
          <n-input
            v-model:value="formVal.login.account"
            placeholder="请输入账号"
          ></n-input>
        </n-form-item>
        <n-form-item>
          <n-input
            v-model:value="formVal.login.password"
            placeholder="请输入密码"
            type="password"
          ></n-input>
        </n-form-item>
        <div class="signup">
          <span @click="toChangePwd">忘记密码</span>
          <span @click="toSignup">注册</span>
        </div>
        <n-form-item>
          <n-button color="#6474d2" :disabled="!disabled" @click="login">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { userLogin } from "../api/user";
export default {
  setup() {
    const router = useRouter();
    const message = useMessage();

    const formVal = reactive({
      login: {
        account: "testcx@test.com",
        password: "testcx",
      },
    });

    const rules = {
      login: {
        account: {
          required: true,
        },
        password: {
          required: true,
        },
      },
    };

    let disabled = computed(() => {
      return formVal.login.account !== "" && formVal.login.password !== "";
    });

    function toSignup() {
      router.push("/signup");
    }

    function toChangePwd() {
      router.push("/changepwd")
    }

    async function login() {
      const res = await userLogin(formVal.login);
      if (res.data.msg == "Success") {
        message.success("登录成功！");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        message.error("登录失败！");
      }
    }

    return {
      formVal,
      rules,
      disabled,
      toSignup,
      toChangePwd,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  font-size: 1rem;

  .form {
    .title {
      height: 70px;
      line-height: 70px;
      font-size: 22px;
    }

    .signup {
      font-size: 13px;
      text-align: right;
      padding: 0.5rem;
      margin-top: -0.8rem;

      & > span {
        cursor: pointer;

        &:nth-child(1) {
          float: left;
        }
      }
    }

    .n-input {
      border-radius: 20px;
    }

    .n-button {
      width: 150px;
      border-radius: 20px;
      color: #fff;
      margin-top: 1rem;
      background: linear-gradient(90deg, #77a5eb, #6474d2);
    }
  }
}
@media screen and (min-width: 500px) {
  .login {
    background: url("../assets/imgs/login-bg.jpg") no-repeat;
    background-size: cover;

    .form {
      width: 400px;
      position: absolute;
      top: 40%;
      left: 12%;
    }
  }
}

@media screen and (max-width: 500px) {
  .login {
    padding-top: 40%;
    background: url("../assets/imgs/login-bg.jpg") no-repeat;
    background-size: auto 100%;

    .form {
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
