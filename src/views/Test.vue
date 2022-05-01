<template>
  <n-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
  >
    <n-form-item label="电话号码" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="电话号码" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";

const formRef = ref(null);
const message = useMessage();
let formValue = ref({
  phone: "",
});
const rules = {
  phone: {
    required: true,
    message: "请输入电话号码",
    // trigger: ["input"],
  },
};
function handleValidateClick(e) {
  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Valid");
    } else {
      console.log(errors);
      message.error("Invalid");
    }
  });
}
</script>
