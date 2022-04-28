<template>
  <div class="timeline">
    <!-- <div class="style">
      <div class="timeline-icon"></div>
      <div class="line"></div>
    </div>
    <div class="content">
      <div class="time">04月25日 08:52</div>
      <router-link :to="'/preview/'+props.article.id" target="_blank">
        <div class="title">
          {{ props.article.title ? props.article.title : "无标题" }}
        </div>
      </router-link>
    </div> -->
    <div class="above">
      <div class="timeline-icon"></div>
      <span class="time">04月25日 08:52</span>
    </div>
    <div class="below">
      <div class="line"><div></div></div>
      <div class="cover">
        <div class="title">
          <router-link :to="'/preview/' + props.article.id" target="_blank">
            {{ props.article.title ? props.article.title : "无标题" }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ article: Object });
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
    }
  }
}
</style>
