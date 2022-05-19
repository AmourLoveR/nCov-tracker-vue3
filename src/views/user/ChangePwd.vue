<template>
  <div class="changePwd">
    <div class="form">
      <n-form
        ref="formRef"
        :model="formVal"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="邮箱:" path="changePwd.email">
          <n-input-group>
            <n-input
              v-model:value="formVal.changePwd.email"
              :placeholder="isPlaceholderShow ? '邮箱' : ''"
            ></n-input>
            <n-button
              color="#1288ff"
              style="background: #1288ff; width: 100px"
              @click="getEmailCodeAsyncFN"
              :loading="getCodeLoading"
              :disabled="getCodeDisabled"
            >
              {{ getCodeDisabled ? countDown + "s后重试" : "发送验证码" }}
            </n-button>
          </n-input-group>
        </n-form-item>
        <n-form-item label="验证码:" path="changePwd.code">
          <n-input
            v-model:value="formVal.changePwd.code"
            :placeholder="isPlaceholderShow ? '验证码' : ''"
          ></n-input>
        </n-form-item>
        <n-form-item label="新密码:" path="changePwd.newPassword">
          <n-input
            v-model:value="formVal.changePwd.newPassword"
            :placeholder="isPlaceholderShow ? '密码' : ''"
            type="password"
          ></n-input>
        </n-form-item>
        <n-form-item label="重复密码:" path="changePwd.confirmPsd">
          <n-input
            v-model:value="formVal.changePwd.confirmPsd"
            :placeholder="isPlaceholderShow ? '重复密码' : ''"
            type="password"
          ></n-input>
        </n-form-item>
      </n-form>
      <n-button
        type="info"
        color="#6474d2"
        round
        :loading="changePwdLoading"
        @click="changePwdAsyncFn"
        >修改密码</n-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, provide } from "vue";
import { useRouter } from "vue-router";
import { useMessage, NInputGroup } from "naive-ui";
import { getEmailCode, changePwd } from "../../api/user";

const router = useRouter();
const formRef = ref(null);
const message = useMessage();
window.$message = useMessage();
let isPlaceholderShow = ref(false);
let changePwdLoading = ref(false);
isPlaceholderShow.value = document.body.clientWidth < 500;

const formVal = reactive({
  changePwd: {
    code: "",
    email: "",
    newPassword: "",
    confirmPsd: "",
  },
});

const rules = {
  changePwd: {
    newPassword: {
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
          return value === formVal.changePwd.newPassword;
        },
        message: "两次密码输入不一致",
      },
    ],
    code: [
      {
        required: true,
        message: "请输入邮箱验证码",
      },
      {
        validator(rule, value) {
          if (value) return value.length == 6;
          else return true;
        },
        message: "验证码是长度为6的数字及字母组合",
      },
    ],
    email: {
      required: true,
      message: "请输入邮箱",
      trigger: 'blur'
    },
  },
};

function toLogin() {
  router.push("/login");
}

// 获取email code
let getCodeLoading = ref(false);
let countDown = ref(30);
let getCodeDisabled = ref(false);

let interval = "";
async function getEmailCodeAsyncFN() {
  getCodeLoading.value = true;
  const res = await getEmailCode(formVal.changePwd.email);
  getCodeLoading.value = false;
  if (res.data.msg == "Success") {
    message.success("验证码发送成功");
    getCodeDisabled.value = true;
    interval = setInterval(() => {
      countDown.value--;
    }, 1000);
  }
}
watch(countDown, (oldVal, val) => {
  if (val == 0) {
    countDown.value = 30;
    getCodeDisabled.value = false;
    clearInterval(interval);
  }
});

function changePwdAsyncFn() {
  formRef.value?.validate(async (err) => {
    if (!err) {
      changePwdLoading.value = true;
      console.log(formVal.changePwd);
      const res = await changePwd(formVal.changePwd);
      changePwdLoading.value = false;
      if (res.data.msg == "Success") {
        message.success("密码修改成功");
      }
    } else message.error("表单校验未通过！");
  });
}
</script>

<style lang="scss" scoped>
.changePwd {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/register-bg.png");
  background-size: cover;

  .form {
    padding: 2rem;
    border-radius: 15px;
    box-shadow: rgb(0 0 0 / 10%) 0px 12px 20px 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;

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
      color: #fff;
      margin-left: calc(50% - 75px);
      background: linear-gradient(90deg, #77a5eb, #6474d2);
    }
  }
}

@media screen and (min-width: 500px) {
  .form {
    width: 500px;
  }
}

@media screen and (max-width: 500px) {
  .form {
    width: 95%;
    margin: 0 auto;

    :deep(.n-form-item-label) {
      display: none;
    }
  }
}
</style>
