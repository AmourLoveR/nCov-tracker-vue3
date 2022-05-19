<template>
  <n-card title="状态转换记录">
    <n-timeline>
      <n-timeline-item
        v-for="item in situationRecord"
        :key="item.id"
        :type="item.record.includes('患者') ? 'error' : 'info'"
        :time="item.createTime.substr(0, 16).replace('T', ' ')"
      >
        {{ item.record.substring(9) }}
      </n-timeline-item>
    </n-timeline>
  </n-card>
</template>

<script setup>
import { inject, toRef } from "vue";
import { NTimeline, NTimelineItem } from "naive-ui";
const observation = inject("observation");

let situationRecord = toRef(observation.value, "situationRecord");
</script>

<style lang="scss" scoped></style>
