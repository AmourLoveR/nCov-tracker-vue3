<template>
  <button
    class="button"
    :disabled="props.disabled"
    :style="props.disabled ? disabledClass : naturalClass"
  >
    <n-spin :size="17" v-show="props.loading" :loading="loading" stroke="white" />
    <span>确定</span>
  </button>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const disabledClass = {
  opacity: 0.7,
  cursor: "not-allowed",
};

const naturalClass = {
  opacity: 1,
  cursor: "pointer",
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 100px;
  padding: 2px 16px;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  line-height: 22px;
  border: 1px solid #1d7dfa;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #1d7dfa;

  &:hover {
    opacity: 0.7;
  }

  :deep(.n-spin-body) {
    margin-right: 2.5px;
  }

  span {
    margin-left: 2.5px;
  }
}
</style>
