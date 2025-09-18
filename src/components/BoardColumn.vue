<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <section class="board-column" :aria-label="`Columna ${title}`">
    <h3 class="column-title">{{ title }}</h3>
    <div class="column-content">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.board-column {
  background-color: #f4f5f7;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.column-title {
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.column-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 0.5rem;
}
</style>
