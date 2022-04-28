<template>
  <div class="article-card">
    <div class="title">截至4月13日24时新型冠状病毒肺炎疫情最新情况</div>
    <MdEditor v-model="messageShow" previewOnly></MdEditor>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { message } from "../../utils/utils";

const messageShow = message.substr(0, 200) + "...";
</script>

<style lang="scss" scoped>
.article-card {
  background: #fff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow .3s linear;

  &:hover {
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
  }

  .title {
    font-size: 18px;
  }
}
</style>
