<template>
  <div id="editor">
    <div class="header">
      <input placeholder="输入文章标题" v-model="article.title" />
      <n-button @click="save">保存</n-button>
    </div>
    <md-editor
      :style="{ height: 'calc(100vh - 120px)', 'white-space': 'pre-wrap' }"
      v-model="article.content"
    />
    <!-- <quill-editor v-model:content="text"/> -->
  </div>
</template>

<script setup>
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref, watch } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { saveArticle } from "../../api/article";

const article = reactive({
  content: "",
  cover: "string",
  createTime: "string",
  createUser: "string",
  isDelete: 0,
  isPublish: 0,
  modifyTime: "string",
  modifyUser: "string",
  resume: "string",
  tags: "string",
  title: "",
});

async function save() {
  saveArticle(article)
}
</script>

<style lang="scss" scoped>
#editor {
  .header {
    padding: 0 27px;
    height: 60px;
    display: flex;
    align-items: center;
    p {
      white-space: pre-line;
    }

    input {
      flex: 1 1 auto;
      height: 100%;
      margin: 0;
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
    }
  }

  :deep(.md-editor-v3-textarea) {
    color: #fff;
  }
}
</style>
