<template>
  <div class="accounts">
    <n-tabs type="line" animated>
      <n-tab-pane name="notapproved" tab="未审核">
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>用户名</th>
              <th>邮箱</th>
              <th>联系电话</th>
              <th>地区</th>
              <th>角色</th>
              <!-- <th>资质</th> -->
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in notapproved" :key="item.id">
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.region }}</td>
              <td>
                {{
                  item.role == 4
                    ? "志愿者"
                    : item.role == 8
                    ? "工作人员"
                    : "管理员"
                }}
              </td>
              <!-- <td>{{ item.aptitude }}</td> -->
              <td>{{ item.create_time.substr(0, 16).replace("T", " ") }}</td>
              <td class="actions">
                <span class="pass" @click="userApproveAsyncFn(item.email, true)">通过</span>
                <span class="reject" @click="userApproveAsyncFn(item.email, false)">驳回</span>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>
      <n-tab-pane name="approved" tab="已审核">
        <n-table :bordered="true" :single-line="false">
          <thead>
            <tr>
              <th>用户名</th>
              <th>邮箱</th>
              <th>联系电话</th>
              <th>地区</th>
              <th>角色</th>
              <!-- <th>资质</th> -->
              <th>注册时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in approved" :key="item.id">
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.region }}</td>
              <td>
                {{
                  item.role == 4
                    ? "志愿者"
                    : item.role == 8
                    ? "工作人员"
                    : "管理员"
                }}
              </td>
              <!-- <td>{{ item.aptitude }}</td> -->
              <td>{{ item.create_time.substr(0, 16).replace("T", " ") }}</td>
              <td>
                <span style="color: #18a058" v-if="item.approver > 0">通过</span>
                <span style="color: red" v-else>驳回</span>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NTabs, NTabPane, NTable } from "naive-ui";
import { getRegisters, userApprove } from "../api/user";

// 获取账号信息 approved为已审核/notapproved为未审核
let notapproved = ref(null);
let approved = ref(null);
getRegistersAsyncFn();
async function getRegistersAsyncFn() {
  const notApprovedRes = await getRegisters("notapproved");
  notapproved.value = notApprovedRes.data.data;
  const approvedRes = await getRegisters("approved");
  approved.value = approvedRes.data.data;
}

async function userApproveAsyncFn(email, pass) {
  const res = userApprove({ email, pass });
  console.log("approve", res);
}
</script>

<style lang="scss" scoped>
.accounts {
  padding: 1rem;

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
}
</style>
