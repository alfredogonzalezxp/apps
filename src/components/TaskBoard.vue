<script setup lang="js">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue'; 
import { taskService } from './services/taskService.js';

const props = defineProps({
  tasks: Array,
  columns: Array,
});

const emit = defineEmits(['update:tasks', 'edit-task', 'task-moved']);

const tasksByColumn = computed(() => {
  const grouped = {};
  props.columns.forEach(col => {
    // Inicializa cada columna con un array vacío
    grouped[col.id] = [];
  });
  props.tasks.forEach(task => {
    if (grouped[task.column]) {
      grouped[task.column].push(task);
    }
  });
  return grouped;
});

async function onDragEnd(event) {
  const { to, item } = event;
  const taskId = item.dataset.taskId;
  const newColumnId = to.parentElement.dataset.columnId;
  
  if (taskId && newColumnId) {
    await taskService.updateTaskColumn(Number(taskId), newColumnId);
    
    const task = props.tasks.find(t => t.id === Number(taskId));
    if (task) {
      task.column = newColumnId;
      emit('task-moved');
    }
  }
}
</script>

<template>
  <div class="task-board">
    <BoardColumn
      v-for="column in columns"
      :key="column.id"
      :title="column.title"
      :data-column-id="column.id"
    >
      <draggable
        v-model="tasksByColumn[column.id]"
        group="tasks"
        item-key="id"
        class="column-draggable"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <TaskCard :task="element" @edit="emit('edit-task', $event)" :data-task-id="element.id" />
        </template>
      </draggable>
    </BoardColumn>
  </div>
</template>

<style lang="scss" scoped>
.task-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  height: calc(100vh - 64px - 74px - 2rem); // Ajustar según altura del header y filtros
  overflow-x: auto;
}

.column-draggable {
  min-height: 100px;
  height: 100%;
}
</style>
