<template>
  <div class="accounts">
    <n-card content-style="padding: 10px">
      <n-tabs type="line" animated>
        <n-tab-pane name="notapproved" tab="未审核">
          <n-data-table
            :columns="columns"
            :data="notapproved"
            :bordered="true"
            :pagination="pagination"
          />
        </n-tab-pane>
        <n-tab-pane name="approved" tab="已审核">
          <n-data-table
            :columns="columns2"
            :data="approved"
            :bordered="true"
            :pagination="pagination"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, h, reactive } from "vue";
import { NTabs, NTabPane, NTable, NDataTable } from "naive-ui";
import { getRegisters, userApprove } from "../api/user";

const columns = [
  {
    title: "用户名",
    key: "username",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "联系电话",
    key: "phone",
  },
  {
    title: "地区",
    key: "region",
  },
  {
    title: "角色",
    key: "role",
  },
  {
    title: "注册时间",
    key: "create_time",
  },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return [
        h(
          "span",
          {
            class: "pass",
            onClick: () => userApproveAsyncFn(row.email, true),
          },
          "通过"
        ),
        h(
          "span",
          {
            class: "reject",
            onClick: () => userApproveAsyncFn(row.email, false),
          },
          "驳回"
        ),
      ];
    },
  },
];
const columns2 = JSON.parse(JSON.stringify(columns));
columns2[columns2.length - 1] = {
  title: "状态",
  key: "actions",
  render(row) {
    return [
      h(
        "span",
        {
          style: {
            color: "#18a058",
            display: row.approver > 0 ? "inline" : "none",
          },
        },
        "通过"
      ),
      h(
        "span",
        {
          style: {
            color: "red",
            display: row.approver < 0 ? "inline" : "none",
          },
        },
        "驳回"
      ),
    ];
  },
};

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});

// 获取账号信息 approved为已审核/notapproved为未审核
let notapproved = ref([]);
let approved = ref([]);
getRegistersAsyncFn();
async function getRegistersAsyncFn() {
  const notApprovedRes = await getRegisters("notapproved");
  notapproved.value = notApprovedRes.data.data || [];
  notapproved.value.forEach((item) => {
    item.create_time = item.create_time.substr(0, 16).replace("T", " ");
    item.role =
      item.role == 4 ? "志愿者" : item.role == 8 ? "工作人员" : "管理员";
  });
  const approvedRes = await getRegisters("approved");
  approved.value = approvedRes.data.data || [];
  approved.value.forEach((item) => {
    item.create_time = item.create_time.substr(0, 16).replace("T", " ");
    item.role =
      item.role == 4 ? "志愿者" : item.role == 8 ? "工作人员" : "管理员";
  });
}

async function userApproveAsyncFn(email, pass) {
  const res = await userApprove({ email, pass });
  if(res.data?.msg == 'Success') {
    window.$message.success('操作成功')
    getRegistersAsyncFn()
  }
}
</script>

<style lang="scss" scoped>
.accounts {
  padding: 1rem;
}
</style>
<style lang="scss">
.pass,
.reject {
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
}

.pass {
  color: #1d7dfa;
}

.reject {
  color: red;
}

.reject {
  margin-left: 10%;
}
</style>
