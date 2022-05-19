<template>
  <div id="notification">
    <n-alert v-if="count !== 0" type="warning" closable>
      <span>您共有{{ count }}个待处理事项，请及时处理！</span>
    </n-alert>
    <n-alert v-else type="info" closable>
      <span>暂无待处理事项</span>
    </n-alert>
    <n-card
      content-style="padding: 10px"
      v-for="item in notifications"
      :key="item.index"
    >
      <div class="content-hover">
        <span class="content">{{ item?.content }}</span>
        <n-popconfirm
          negative-text="取消"
          positive-text="确定"
          @positive-click="deleteNotificationAsyncFn(item?.index)"
        >
          <template #trigger>
            <span class="action">已处理</span>
          </template>
          标记为已处理将不再显示该通知！
        </n-popconfirm>
      </div>
      <div class="msg">
        <span>{{ item?.kind }}</span>
        <span>
          {{ item?.time.substr(0, 16).replace("T", " ") }}
        </span>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NPopconfirm, NAlert } from "naive-ui";
import { useNotifyStore } from "../store/index";
import {
  getNotifyCount,
  getNotification,
  deleteNotification,
} from "../api/notification";

const notifyStore = useNotifyStore();

// 获取通知信息
let count = ref(0);
let notifications = ref([]);
getNotificationAsyncFn();
async function getNotificationAsyncFn() {
  // 同步获取count作为参数
  const countRes = await getNotifyCount();
  count.value = countRes.data.data.count;
  notifyStore.setCount(count.value);
  const res = await getNotification(0, count.value);
  notifications.value = res.data.data || [];
  notifications.value.forEach((item, index) => {
    item.index = index;
  });
  notifications.value.reverse();
}
async function deleteNotificationAsyncFn(index) {
  const res = await deleteNotification(index);
  console.log(res.data);
  if (res.data.msg == "Success") {
    window.$message.success("标记成功");
    getNotificationAsyncFn();
  }
}
</script>

<style lang="scss" scoped>
#notification {
  padding: 1rem;

  .n-card {
    margin-top: 10px;
  }

  .content-hover {
    display: flex;
    justify-content: space-between;
    .content {
      font-size: 16px;
      line-height: 30px;
    }

    .action {
      color: #1288ff;
      cursor: pointer;
      margin-right: 2rem;

      &:hover {
        color: #389afc;
      }
    }
  }

  .msg {
    font-size: 13px;

    span {
      &:nth-child(1) {
        &::before {
          content: "#";
        }
      }

      &:nth-child(2) {
        margin-left: 2rem;
      }
    }
  }
}
</style>
