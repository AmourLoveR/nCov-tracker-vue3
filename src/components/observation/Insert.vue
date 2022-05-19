<template>
  <n-modal v-model:show="modalShow">
    <div style="width: 500px">
      <n-card content-style="padding: 16px 0 10px 16px">
        <n-scrollbar style="max-height: 480px; padding-right: 16px">
          <n-form
            ref="insertForm"
            :model="observation"
            :rules="insertRules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item label="姓名" path="name">
              <n-input
                v-model:value="observation.name"
                placeholder=""
              ></n-input>
            </n-form-item>
            <n-form-item label="性别" path="sex">
              <n-radio
                :checked="observation.sex == 1"
                :value="1"
                @change="handleSexChange"
                >男</n-radio
              >
              <n-radio
                :checked="observation.sex == 0"
                :value="0"
                @change="handleSexChange"
                >女</n-radio
              >
            </n-form-item>
            <n-form-item label="年龄" path="age">
              <n-input-number
                v-model:value="observation.age"
                placeholder=""
              ></n-input-number>
            </n-form-item>
            <n-form-item label="类型" path="healthSituation">
              <n-select
                v-model:value="observation.healthSituation"
                :options="healthOptions"
              />
            </n-form-item>
            <n-form-item path="contactPerson">
              <template #label>
                <span>
                  接触患者
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <n-icon size="15" style="cursor: pointer;">
                        <information-circle-outline />
                      </n-icon>
                    </template>
                    该观察对象所接触患者的id
                  </n-tooltip>
                </span>
              </template>
              <n-input-number
                v-model:value.number="observation.contactPerson"
                placeholder="观察对象所接触患者的id"
              ></n-input-number>
            </n-form-item>
            <n-form-item label="身份证号" path="identification">
              <n-input
                v-model:value="observation.identification"
                placeholder=""
              ></n-input>
            </n-form-item>
            <n-form-item label="联系电话" path="phone">
              <n-input
                v-model:value="observation.phone"
                placeholder=""
              ></n-input>
            </n-form-item>
            <n-form-item label="所属地区" path="region">
              <n-cascader
                :options="getRegionOptions()"
                check-strategy="child"
                clearable
                placeholder=""
                @update:value="handleUpdateRegion"
              ></n-cascader>
            </n-form-item>
            <n-form-item label="所在地址" path="address">
              <n-input
                v-model:value="observation.address"
                placeholder=""
              ></n-input>
            </n-form-item>
            <n-form-item label="采取措施" path="measureSituation">
              <n-select
                v-model:value="observation.measureSituation"
                :options="measureOptions"
              ></n-select>
            </n-form-item>
            <n-form-item label="行程轨迹" path="trajectory">
              <n-input
                v-model:value="observation.trajectory"
                type="textarea"
                cols="50"
                rows="6"
                placeholder=""
              ></n-input>
            </n-form-item>
          </n-form>
          <div style="display: flex; justify-content: center">
            <n-button
              type="info"
              color="#1288ff"
              style="width: 100px"
              :loading="insertBtnLoading"
              @click="insertObservationAsyncFn"
              >添加</n-button
            >
          </div>
        </n-scrollbar>
      </n-card>
    </div>
  </n-modal>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  NRadio,
  NSelect,
  NInputNumber,
  NCascader,
  NScrollbar,
  NTooltip,
} from "naive-ui";
import { InformationCircleOutline } from "@vicons/ionicons5";
import { getObservations, insertObservation } from "../../api/management";
import { useUserStore } from "../../store/index";
import { getRegionOptions } from "../../utils/utils";

const userStore = useUserStore();

let modalShow = ref(false);
defineExpose({
  modalShow,
});

let insertForm = ref(null);

let observation = ref({
  name: "",
  sex: 1,
  age: 0,
  identification: "",
  address: "",
  contactPerson: 0,
  healthSituation: 1, // 0- 其他，1-患者，2-密接，3-次密接
  measureSituation: 0, // 0-未采取措施，1-解除风险，2-正在治疗，3-集中隔离，4-居家隔离
  phone: "",
  region: "",
  trajectory: "",
});

const insertRules = {
  name: {
    required: true,
    message: "请输入姓名",
  },
  age: [
    {
      required: true,
      message: "请输入年龄",
    },
    {
      validator(rule, value) {
        return value >= 0;
      },
      message: "年龄不能为负数",
    },
    {
      validator(rule, value) {
        return Number(value).toString() !== "NaN";
      },
      message: "年龄不能为负数",
    },
  ],
  healthSituation: {
    required: true,
    message: "请输入观察者类型",
  },
  identification: {
    required: true,
    message: "请输入身份证号",
  },
  contactPerson: [
    {
      required: true,
      message: "请输入接触患者id，若无则为0",
    },
    {
      validator(rule, value) {
        return Number(value).toString() !== "NaN";
      },
      message: "接触患者id应该由数字组成",
    },
  ],
  region: {
    required: true,
    message: "请选择所属地区",
  },
  address: {
    required: true,
    message: "请输入居住地址",
  },
  measureSituation: {
    required: true,
    message: "请选择已采取的措施",
  },
};

// 新增医学观察着
let insertBtnLoading = ref(false);
function insertObservationAsyncFn() {
  insertForm.value?.validate(async (err) => {
    if (!err) {
      if (observation.value.trajectory == "")
        observation.value.trajectory = "无";
      try {
        insertBtnLoading.value = true;
        const res = await insertObservation(observation.value);
        if (res.data.msg == "Success") window.$message.success("添加成功");
      } finally {
        insertBtnLoading.value = false;
        modalShow.value = false
      }
    } else window.$message.error("表单校验未通过！");
  });
}

function handleSexChange(e) {
  observation.value.sex = e.target.value;
}

const healthOptions = [
  {
    label: "患者",
    value: 1,
  },
  {
    label: "密接",
    value: 2,
  },
  {
    label: "次密接",
    value: 3,
  },
  {
    label: "其他",
    value: 0,
  },
];

const measureOptions = [
  {
    label: "未采取措施",
    value: 0,
  },
  {
    label: "解除风险",
    value: 1,
  },
  {
    label: "正在治疗",
    value: 2,
  },
  {
    label: "集中隔离",
    value: 3,
  },
  {
    label: "居家隔离",
    value: 4,
  },
];

function handleUpdateRegion(value, option) {
  observation.value.region = option.parent + " " + option.value;
}
</script>

<style lang="scss" scoped>
</style>
