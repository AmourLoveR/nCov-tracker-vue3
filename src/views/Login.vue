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
        <div class="signup" @click="toSignup"><span>注册</span></div>
        <n-form-item>
          <n-button :disabled="!disabled" @click="login">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { userLogin } from "../api/user";
export default {
  setup() {
    const router = useRouter();

    const formVal = reactive({
      login: {
        account: "1853633282@qq.com",
        password: "13291004986",
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

    function login() {
      userLogin(formVal.login);
      router.push("/");
    }

    return {
      formVal,
      rules,
      disabled,
      toSignup,
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
      padding-right: 1rem;
      margin-top: -0.8rem;

      & > span {
        cursor: pointer;
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
