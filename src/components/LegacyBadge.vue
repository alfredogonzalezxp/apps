<script setup>
defineProps({
  text: String,
});
</script>

<template>
  <span class="legacy-badge">{{ text }}</span>
</template>

<style lang="less" scoped>
@badge-bg: #e0e0e0;
@badge-color: #333;
@border-radius: 12px;

.legacy-badge {
  display: inline-block;
  padding: 2px 10px;
  background-color: @badge-bg;
  color: @badge-color;
  border-radius: @border-radius;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>