<template>
    <n-modal v-model:show="modalShow">
        <div style="width: 500px">
            <n-card content-style="padding: 16px 0 10px 16px">
                <n-scrollbar style="max-height: 480px; padding-right: 16px">
                    <n-form ref="insertForm" :model="location" :rules="insertRules" label-placement="left"
                        label-width="auto" require-mark-placement="right-hanging">
                        <n-form-item label="名称" path="name">
                            <n-input v-model:value="location.name"></n-input>
                        </n-form-item>
                        <n-form-item label="所属地区" path="region">
                            <n-cascader :options="getRegionOptions()" check-strategy="child" clearable placeholder=""
                                @update:value="handleUpdateRegion"></n-cascader>
                        </n-form-item>
                        <n-form-item label="具体地址" path="address">
                            <n-input v-model:value="location.address"></n-input>
                        </n-form-item>
                        <n-form-item label="负责人姓名" path="principalName">
                            <n-input v-model:value="location.principalName"></n-input>
                        </n-form-item>
                        <n-form-item label="联系电话" path="principalPhone">
                            <n-input v-model:value="location.principalPhone"></n-input>
                        </n-form-item>
                    </n-form>
                    <div style="display: flex; justify-content: center">
                        <n-button type="info" color="#1288ff" style="width: 100px" :loading="insertBtnLoading"
                            @click="insertlocationAsyncFn">添加</n-button>
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
import { getObservations, insertLocation } from "../../api/management";
import { useUserStore } from "../../store/index";
import { getRegionOptions } from "../../utils/utils";

const userStore = useUserStore();

let modalShow = ref(false);
defineExpose({
    modalShow,
});

let insertForm = ref(null);

let location = ref({
    address: "",
    name: "",
    principalName: "",
    principalPhone: "",
    region: ""
});

const insertRules = {
    name: {
        required: true,
        message: "请输入姓名",
    },
    region: {
        required: true,
        message: "请选择所属地区",
    },
    address: {
        required: true,
        message: "请输入居住地址",
    },
    principalName: {
        required: true,
        message: "请输入负责人姓名",
    },
    principalPhone: {
        required: true,
        message: "请输入负责人联系电话",
    }
};

// 新增医学隔离点
let insertBtnLoading = ref(false);
function insertlocationAsyncFn () {
    insertForm.value?.validate(async (err) => {
        if (!err) {
            try {
                insertBtnLoading.value = true;
                const res = await insertLocation(location.value);
                if (res.data.msg == "Success") window.$message.success("添加成功");
            } finally {
                insertBtnLoading.value = false;
                modalShow.value = false
            }
        } else window.$message.error("表单校验未通过！");
    });
}

function handleUpdateRegion (value, option) {
    location.value.region = option.parent + " " + option.value;
}
</script>

<style lang="scss" scoped>
</style>
