<template>
  <div class="mask" @click.self="close">
    <div class="card">
      <span>请输入邮箱验证码</span>
      <n-form
        ref="codeRef"
        :model="formVal"
        :rules="rules"
        label-placement="left"
      >
        <n-form-item label="" path="code">
          <n-input placeholder="" v-model:value="formVal.code"></n-input>
        </n-form-item>
        <n-form-item>
          <c-button
            @click="confirm"
            :loading="loading"
            :disabled="false"
          ></c-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import CButton from "../components/CButton.vue";
import { sendEmailCode, userRegister } from "../api/user";

const message = useMessage();
const emit = defineEmits(["close"]);
const register = inject("register");
let codeRef = ref(null);
const formVal = reactive({
  code: "",
});
let loading = ref(false);

const rules = {
  code: [
    {
      required: true,
      message: "请输入验证码",
    },
    {
      validator(rule, value) {
        if (value) return value.length == 6;
        else return true;
      },
      message: "验证码是长度为6的数字及字母组合",
    },
  ],
};

function confirm() {
  codeRef.value?.validate(async (err) => {
    if (!err) {
      loading.value = true;
      const codeRes = await sendEmailCode(register.email, formVal.code);
      loading.value = false;
      const { match } = codeRes.data.data;
      if (match) {
        const registerRes = await userRegister(register);
        if (registerRes.data.msg == "Success")
          message.success("账号注册成功！待管理员审核");
        else if (registerRes.data.msg == "Registered")
          message.warning("该邮箱账号已存在！");
        close();
      } else  message.error("验证码错误！");
    }
  });
}

function close() {
  emit("close");
  formVal.code = "";
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    width: 300px;
    height: 150px;
    background: #fff;
    border-radius: 3px;
    padding: 10px;

    span {
      display: inline-block;
      font-size: 16px;
      // margin-top: 10px;
    }

    .n-form {
    }

    .n-input {
      margin-top: 10px;
    }
  }
}
</style>
