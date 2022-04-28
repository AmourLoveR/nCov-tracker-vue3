<template>
  <div style="{display: flex}">
    <div class="test active">Test</div>
    <div class="test" :class="{active: true}">Test</div>
    <div class="test">Test</div>
    <div class="test">Test</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.test.active {
  color: aqua;
}
</style>
