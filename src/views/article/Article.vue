<template>
  <div id="article" ref="article">
    <div class="actions">
      <n-button @click="toEditor">写文章</n-button>
    </div>
    <div>
      <timeline v-for="item in articles" :key="item.id" :article="item" />
      <timeline v-for="item in articles" :key="item.id" :article="item" />
      <timeline v-for="item in articles" :key="item.id" :article="item" />
      <timeline v-for="item in articles" :key="item.id" :article="item" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Timeline from "../../components/article/Timeline.vue";
import { getAllArticles } from "../../api/article";

export default {
  components: {
    Timeline,
  },
  setup() {
    let articles = ref("");
    const router = useRouter();

    getAllArticlesAsyncFn();

    async function getAllArticlesAsyncFn() {
      const res = await getAllArticles();
      articles.value = res.data.data;
      console.log(articles);
    }

    function toEditor() {
      router.push("/editor");
    }

    return {
      toEditor,
      articles,
    };
  },
};
</script>

<style lang="scss" scoped>
#article {
  padding: 1rem;

  .actions {
    // padding: 1rem 1rem 0;
    height: 3rem;
    display: flex;
    justify-content: right;

    .n-button {
      background: #1e80ff;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
