<script setup>
import LegacyBadge from './LegacyBadge.vue';

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit']);
</script>

<template>
  <article
    class="task-card"
    :class="`priority--${task.priority.toLowerCase()}`"
    @dblclick="emit('edit', task)"
    tabindex="0"
    role="button"
    :aria-label="`Tarea: ${task.title}. Prioridad: ${task.priority}. Doble clic para editar.`"
  >
    <header class="task-card__header">
      <h4 class="task-card__title">{{ task.title }}</h4>
      <div class="task-card__priority">{{ task.priority }}</div>
    </header>
    <div class="task-card__body">
      <p>{{ task.description }}</p>
    </div>
    <footer class="task-card__footer">
      <div class="task-card__tags">
        <LegacyBadge v-for="tag in task.tags" :key="tag" :text="tag" />
      </div>
      <div class="task-card__assignee">
        <span>{{ task.assignee }}</span>
      </div>
    </footer>
  </article>
</template>

<style lang="scss" scoped src="./TaskCard.scss"></style>
