<template>
<div id="publicArticle">
  <div class="content">
    <article-timeline v-for="item in articles" :key="item.id" :timeToShow="item.createTime" :article="item"
      :public="true" />
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArticleTimeline from '../../components/article/ArticleTimeline.vue';
import { getAllArticles } from "../../api/article";

// 获取面向用户文章
let articles = ref(null);
getAllArticlesAsyncFn();
async function getAllArticlesAsyncFn () {
  const res = await getAllArticles();
  articles.value = res.data.data;
  articles.value = articles.value.sort((a, b) => {
    return sortByTime(a.createTime, b.createTime);
  });
}

// 文章排序函数
function sortByTime (a, b) {
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
#publicArticle {
  width: 100%;
  min-height: 100vh;
  background: #2fbcc4;
  display: flex;
  justify-content: center;

  .content {
    background: #fff;
    width: 800px;
    padding: 16px;
  }
}
</style>