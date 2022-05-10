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
        <!-- <n-form-item label="资质:" path="register.aptitude">
          <n-input
            v-model:value="formVal.register.aptitude"
            :placeholder="isPlaceholderShow ? '资质' : ''"
          ></n-input>
        </n-form-item> -->
        <n-form-item label="角色:" path="register.role">
          <n-select
            v-model:value="formVal.register.role"
            :options="roleOptions"
            :placeholder="isPlaceholderShow ? '角色' : ''"
          ></n-select>
        </n-form-item>
        <n-form-item label="所属地区:" path="register.region">
          <n-cascader
            :options="getRegionOptions()"
            check-strategy="child"
            :placeholder="isPlaceholderShow ? '所属地区' : ''"
            clearable
            @update:value="handleUpdateRegion"
          ></n-cascader>
        </n-form-item>
        <n-form-item label="用户名:" path="register.username">
          <n-input
            v-model:value="formVal.register.username"
            :placeholder="isPlaceholderShow ? '用户名' : ''"
          ></n-input>
        </n-form-item>
        <n-form-item label="密码:" path="register.password">
          <n-input
            v-model:value="formVal.register.password"
            :placeholder="isPlaceholderShow ? '密码' : ''"
            type="password"
          ></n-input>
        </n-form-item>
        <n-form-item label="重复密码:" path="register.confirmPsd">
          <n-input
            v-model:value="formVal.register.confirmPsd"
            :placeholder="isPlaceholderShow ? '重复密码' : ''"
            type="password"
          ></n-input>
        </n-form-item>
        <n-form-item label="邮箱:" path="register.email">
          <n-input
            v-model:value="formVal.register.email"
            :placeholder="isPlaceholderShow ? '邮箱' : ''"
          ></n-input>
        </n-form-item>
        <n-form-item label="联系电话:" path="register.phone">
          <n-input
            v-model:value="formVal.register.phone"
            :placeholder="isPlaceholderShow ? '联系电话' : ''"
          ></n-input>
        </n-form-item>
      </n-form>
      <div class="to-login">
        已有帐号？<span @click="toLogin">立即登录</span>
      </div>
      <n-button
        type="info"
        color="#6474d2"
        round
        :loading="buttonLoading"
        @click="register"
      >注册</n-button>
    </div>
  </div>
  <c-dialog v-show="dialogShow" @close="dialogShow = false"></c-dialog>
</template>

<script>
import { reactive, ref, watch, provide } from "vue";
import { useRouter } from "vue-router";
import { useMessage, NConfigProvider, NCascader } from "naive-ui";
import CDialog from "../components/CDialog.vue";
import { getEmailCode } from "../api/user";
import { getRegionOptions } from "../utils/utils";

const roleOptions = [
  {
    label: "管理员",
    value: 12,
  },
  {
    label: "工作人员",
    value: 8,
  },
  {
    label: "志愿者",
    value: 4,
  },
];

export default {
  components: { NConfigProvider, NCascader, CDialog },
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const message = useMessage();
    let isPlaceholderShow = ref(false);
    let dialogShow = ref(false);
    let buttonLoading = ref(false);
    isPlaceholderShow.value = document.body.clientWidth < 500;

    const formVal = reactive({
      register: {
        aptitude: "",
        email: "",
        password: "",
        confirmPsd: "",
        phone: "",
        username: "",
        region: null,
        role: null,
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
        region: {
          required: true,
          message: "请选择所属地区",
        },
        role: {
          required: true,
          message: "请选择角色",
        },
        email: {
          required: true,
          message: "请输入邮箱",
        },
      },
    };

    function handleUpdateRegion(value, option) {
      formVal.register.region = option.parent + " " + option.value;
    }

    function toLogin() {
      router.push("/login");
    }
    
    function register() {
      formRef.value?.validate(async (err) => {
        if (!err) {
          buttonLoading.value = true;
          await getEmailCode(formVal.register.email);
          dialogShow.value = true;
          buttonLoading.value = false;
          // await userRegister(formVal.register);
        } else message.error("表单校验未通过！");
      });
    }

    provide('register', formVal.register)

    return {
      formRef,
      formVal,
      rules,
      isPlaceholderShow,
      toLogin,
      register,
      handleUpdateRegion,
      getRegionOptions,
      roleOptions,
      dialogShow,
      buttonLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: url("../assets/imgs/register-bg.png");
  background-size: cover;

  .form {
    padding: 2rem 2rem;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 10%) 0px 12px 20px 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;

    .title {
      line-height: 50px;
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
