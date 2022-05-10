<template>
  <div id="editor">
    <div class="header">
      <n-icon @click="back" title="返回" :size="25"><arrow-back /></n-icon>
      <input placeholder="输入文章标题" v-model="article.title" />
      <n-button color="#1288ff" @click="save">保存</n-button>
    </div>
    <md-editor
      :style="{ height: 'calc(100vh - 120px)', 'white-space': 'pre-wrap' }"
      v-model="article.content"
    />
    <n-modal v-model:show="showModal">
      <div style="width: 500px">
        <n-card content-style="padding: 16px;">
          <span style="padding: 10px">文章未保存，是否继续退出？</span>
          <div>
            <button class="confirm" @click="confirm">确定</button>
            <button class="cancel" @click="showModal = false">取消</button>
          </div>
        </n-card>
      </div>
    </n-modal>
    <!-- <quill-editor v-model:content="text"/> -->
  </div>
</template>

<script setup>
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowBack } from "@vicons/ionicons5";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { saveArticle, getArticle, getUserArticles } from "../../api/article";

const route = useRoute();
const router = useRouter();
// 控制modal显示
let showModal = ref(false);

const article = ref({
  content: "",
  resume: "",
  tags: "",
  title: "",
});

// 若id变化则表示已保存
watch(
  () => article.value.id,
  (oldVal, val) => {
    isSaved.value = true;
  }
);
// 文章是否保存
let isSaved = ref(true);
watch(
  () => article.value.title,
  () => {
    isSaved.value = false;
  }
);
watch(
  () => article.value.content,
  () => {
    isSaved.value = false;
  }
);
watch(
  () => article.value.tags,
  () => {
    isSaved.value = false;
  }
);

// 获取文章信息
if (route.query.id) getArticleAsyncFn();
async function getArticleAsyncFn() {
  const res = await getArticle(route.query.id);
  article.value = res.data.data;
  // 新建一个宏任务
  setTimeout(() => {
    isSaved.value = true;
  });
}

// 保存文章
// 若参数中存在id则为修改，无id为新建
let getId = ref(true);
async function save() {
  const res = await saveArticle(article.value);
  if (res.data.msg == "Success") {
    window.$message.success("文章已保存");
    // 获取新建文章的id
    if (getId.value) {
      const notpublishedRes = await getUserArticles("notpublished");
      const data = notpublishedRes.data.data;
      article.value.id = data[data.length - 1].id;
      getId.value = false;
    }
    isSaved.value = true;
  }
}

// 返回
function back() {
  if (isSaved.value) {
    console.log("文章已保存");
    router.push("/article");
  } else {
    console.log("文章未保存");
    showModal.value = true;
  }
}
// 未保存提示confirm
function confirm() {
  router.push("/article")
}
</script>

<style lang="scss" scoped>
#editor {
  .header {
    padding-right: 27px;
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

    .n-icon {
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .cancel {
    padding: 0.6rem 1.9rem;
    font-size: 1.167rem;
    color: hsl(0, 0%, 79%);
    background-color: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:hover {
      color: #c9c9c9;
    }
  }
}
</style>

<style lang="scss">
.cancel {
  font-size: 14px;
  padding: 6px 15px;
  color: #a5a5a5;
  background-color: #fff;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  float: right;

  &:hover {
    color: #bebebe;
  }
}

.confirm {
  padding: 6px 15px;
  margin-left: 15px;
  color: #1288ff;
  border: 1px solid currentColor;
  background-color: #fff;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  float: right;

  &:hover {
    color: #43a1ff;
  }
}
</style>
