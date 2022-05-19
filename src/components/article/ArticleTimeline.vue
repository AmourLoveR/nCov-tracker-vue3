<template>
  <div class="timeline">
    <div class="above">
      <div class="timeline-icon"></div>
      <span class="time">{{
        props.timeToShow.substr(0, 16).replace("T", " ")
      }}</span>
    </div>
    <div class="below">
      <div class="line"><div></div></div>
      <div class="cover">
        <div class="title">
          <router-link :to="preview" target="_blank">
            {{ props.article.title ? props.article.title : "无标题" }}
          </router-link>
          <n-popselect trigger="click" v-if="!props.public">
            <n-button quaternary circle>
              <template #icon>
                <n-icon><more-outlined /></n-icon>
              </template>
            </n-button>
            <template #empty>
              <div class="article-actions-item" @click="editor">编辑</div>
              <div
                v-if="!props.published"
                class="article-actions-item"
                @click="publishAsyncFn"
              >
                发布
              </div>
              <n-popconfirm
                negative-text="取消"
                positive-text="确定"
                @positive-click="deleteArticleAsyncFn"
              >
                <template #trigger>
                  <div class="article-actions-item">删除</div>
                </template>
                删除之后无法恢复！
              </n-popconfirm>
            </template>
          </n-popselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { NPopselect, NPopconfirm } from "naive-ui";
import { MoreOutlined } from "@vicons/antd";
import { deleteArticle, publish } from "../../api/article";
const router = useRouter();
const emit = defineEmits(["articleChange"]);
const props = defineProps({
  article: Object,
  published: {
    type: Boolean,
    default: false,
  },
  timeToShow: {
    type: String,
    default: "time error",
  },
  public: {
      type: Boolean,
      default: false
  }
});

// 进去文章编辑页面
function editor() {
  router.push({
    name: "editor",
    query: {
      id: props.article.id,
    },
  });
}

// 删除文章
async function deleteArticleAsyncFn() {
  const res = await deleteArticle(props.article.id);
  if (res.data.msg == "Success") window.$message.success("文章删除成功");
  // 传递给父组件进行监听，获取最新的文章信息
  emit("articleChange");
}

async function publishAsyncFn() {
  const res = await publish(props.article.id);
  if (res.data.msg == "Success") window.$message.success("文章发布成功");
  else window.$message.error("文章发布失败！");
  // 传递给父组件进行监听，获取最新的文章信息
  emit("articleChange");
}

let preview = (!props.public? '/preview/': '/public/article/') + props.article.id
console.log(preview);
</script>

<style lang="scss" scoped>
.timeline {
  .above {
    .timeline-icon {
      display: inline-block;
      width: 0.375rem;
      height: 0.375rem;
      background: #5a92f5;
      border-radius: 0.375rem;
      border: 0.1875rem solid #a8c4f7;
      box-sizing: content-box;
      margin-top: 0.125rem;
    }

    .time {
      color: #999;
      height: 1rem;
      line-height: 1rem;
      margin-left: 0.5rem;
    }
  }

  .below {
    display: table;
    width: calc(100% - 5.25px);
    margin-left: 5.25px;
    a {
      text-decoration: none;
      color: #4d5054;

      &:hover {
        color: #5a92f5;
      }

      &:visited {
        // color: #999;
      }
    }

    .line {
      display: table-cell;
      width: 1.5px;
      background: #eee;
    }

    .cover {
      display: table-cell;
      padding: 1rem 0 1rem 0.75rem;
    }

    .title {
      width: 100%;
      position: relative;
      font-size: 16px;
      padding: 0.5rem 0.625rem;
      line-height: 1.625rem;
      background: #f5f6f7;
      border-radius: 0.27rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > span {
        cursor: pointer;

        &:hover {
          color: #5a92f5;
        }
      }

      .article-actions-item {
        padding: 8px 32px;
      }
    }
  }
}
</style>

<style lang="scss">
.n-base-select-menu__empty {
  padding: 4px 0 !important;
  display: block !important;

  .article-actions-item {
    font-size: 13px;
    padding: 4px 16px;
    cursor: pointer;

    &:hover {
      background: #f8f9fa;
    }
  }
}
</style>
