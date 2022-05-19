<template>
  <div id="preview" :style="route.name == 'preview' ? {} : publicClass">
    <div class="title">{{ article.title }}</div>
    <hr />
    <md-editor previewOnly v-model="article.content" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { getArticle } from "../../api/article";

const route = useRoute();

let article = ref({
  content: "",
});

getArticlesAsyncFn();

async function getArticlesAsyncFn () {
  const res = await getArticle(route.params.id);
  article.value = res.data.data;
}

const publicClass = {
  'max-width': '800px',
  margin: 0
}
</script>

<style lang="scss" scoped>
#preview {
  padding: 1rem;
  background: #fff;
  margin: 1rem;

  .title {
    font-size: 26px;
    color: #015293;
    text-align: center;
    line-height: 48px;
  }
}
</style>
