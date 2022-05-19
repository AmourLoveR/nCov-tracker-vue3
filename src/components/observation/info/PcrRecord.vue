<template>
  <n-card title="核酸检测记录">
    <template #header-extra>
      <n-button color="#1288ff" @click="modalShow = true">新增</n-button>
    </template>
    <n-timeline>
      <n-timeline-item
        v-for="item in pcrList"
        :key="item.id"
        :type="
          item.detectResult == 2
            ? 'error'
            : item.detectResult == 0
            ? 'warning'
            : 'info'
        "
        :time="item.detectTime.substr(0, 16).replace('T', ' ')"
      >
        {{
          item.detectResult == 1
            ? "阴性"
            : item.detectResult == 2
            ? "阳性"
            : "未检测"
        }}
      </n-timeline-item>
    </n-timeline>
  </n-card>
  <n-modal v-model:show="modalShow">
    <n-card style="width: 500px">
      <n-form
        ref="addRef"
        :model="pcr"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="检测时间" path="detectTime">
          <n-date-picker
            v-model:formatted-value="pcr.detectTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
          />
        </n-form-item>
        <n-form-item label="检测结果" path="detectResult">
          <n-select v-model:value="pcr.detectResult" :options="resultOptions" />
        </n-form-item>
        <div style="display: flex; justify-content: center">
          <n-button
            color="#1288ff"
            style="width: 100px"
            :loading="btnLoading"
            @click="addPcrAsyncFn"
            >添加</n-button
          >
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup>
import { inject, ref, toRef } from "vue";
import { useRoute } from "vue-router";
import { NSelect, NDatePicker, NTimeline, NTimelineItem } from "naive-ui";
import { insertPcrRecord, getObservationById } from "../../../api/management";
import { formatDate } from "../../../utils/utils";

const route = useRoute();

let modalShow = ref(false);
let addRef = ref(null);
let pcr = ref({
  detectResult: 0,
  detectTime: formatDate(new Date()),
  observation: parseInt(route.params.id),
});

const pcrList = toRef(inject("observation").value, "pcrRecord");
console.log(pcrList);

// 添加核酸检测记录
let btnLoading = ref(false);
function addPcrAsyncFn() {
  addRef.value?.validate(async (err) => {
    if (!err) {
      btnLoading.value = true;
      try {
        const res = await insertPcrRecord(pcr.value);
        if (res.data.msg == "Success") {
          window.$message.success("添加成功");
          const observationRes = await getObservationById(route.params.id);
          pcrList.value = observationRes.data.data.pcrRecord || [];
        }
      } finally {
        btnLoading.value = false;
        modalShow.value = false;
      }
    } else message.error("表单校验未通过！");
  });
}

const resultOptions = [
  {
    label: "未检测",
    value: 0,
  },
  {
    label: "阴性",
    value: 1,
  },
  {
    label: "阳性",
    value: 2,
  },
];

const rules = {
  detectResult: {
    required: true,
    message: "请选择核酸检测时间",
  },
  detectTime: {
    required: true,
    message: "请选择核酸检测结果",
  },
};
</script>

<style lang="scss" scoped></style>
