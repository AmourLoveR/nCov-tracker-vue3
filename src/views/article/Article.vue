<template>
  <div id="article" ref="article">
    <n-card content-style="padding: 15px">
      <div class="actions">
        <n-button color="#1288ff" @click="toEditor">写文章</n-button>
      </div>
      <n-tabs type="card">
        <n-tab-pane name="notpublished" tab="草稿箱">
          <article-timeline
            v-for="item in notpublishedArticle"
            :key="item.id"
            :timeToShow="item.modifyTime"
            :article="item"
            @articleChange="getUserArticlesAsyncFn"
          />
        </n-tab-pane>
        <n-tab-pane name="published" tab="已发布">
          <article-timeline
            v-for="item in publishedArticle"
            :key="item.id"
            :timeToShow="item.createTime"
            :article="item"
            :published="true"
            @articleChange="getUserArticlesAsyncFn"
          />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { NTabs, NTabPane } from "naive-ui";
import ArticleTimeline from "../../components/article/ArticleTimeline.vue";
import { getUserArticles } from "../../api/article";
const router = useRouter();


// 获取工作人员管理文章
let publishedArticle = ref(null);
let notpublishedArticle = ref(null);
getUserArticlesAsyncFn();
async function getUserArticlesAsyncFn() {
  const res0 = await getUserArticles("notpublished");
  notpublishedArticle.value = res0.data.data;
  notpublishedArticle.value = notpublishedArticle.value.sort((a, b) => {
    return sortByTime(a.modifyTime, b.modifyTime);
  });
  const res1 = await getUserArticles("published");
  publishedArticle.value = res1.data.data;
  publishedArticle.value = publishedArticle.value.sort((a, b) => {
    return sortByTime(a.createTime, b.createTime);
  });
}

function toEditor() {
  router.push("/editor");
}

// 文章排序函数
function sortByTime(a, b) {
  const year1 = a.substring(0, 4);
  const month1 = a.substring(5, 7);
  const day1 = a.substring(8, 10);
  const hh1 = a.substring(11, 13);
  const mm1 = a.substring(14, 16);
  const ss1 = a.substring(17, 19);
  const dateArr1 = [year1, month1, day1, hh1, mm1, ss1];
  const year2 = b.substring(0, 4);
  const month2 = b.substring(5, 7);
  const day2 = b.substring(8, 10);
  const hh2 = b.substring(11, 13);
  const mm2 = b.substring(14, 16);
  const ss2 = b.substring(17, 19);
  const dateArr2 = [year2, month2, day2, hh2, mm2, ss2];

  let index = 0;
  while (index < 6) {
    if (dateArr1[index] > dateArr2[index]) return -1;
    else if (dateArr1[index] < dateArr2[index]) return 1;
    else index++;
  }
  return 0;
}
</script>

<style lang="scss" scoped>
#article {
  padding: 1rem;
  position: relative;

  .actions {
    position: absolute;
    right: 1rem;
    z-index: 10;
  }
}
</style>
