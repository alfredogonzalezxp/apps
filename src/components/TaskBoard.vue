<script setup lang="js">
import { computed, toRefs } from 'vue';
import draggable from 'vuedraggable';
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue'; 
import { taskService } from './services/taskService.js';

const props = defineProps({
  tasks: Array,
  columns: Array,
  filters: {
    type: Object,
    default: () => ({ text: '', tags: [], priority: '' })
  }
});

const emit = defineEmits(['update:tasks', 'edit-task', 'task-moved']);

const filteredTasks = computed(() => {
  return props.tasks.filter(task => {
    const textMatch = task.title.toLowerCase().includes(props.filters.text.toLowerCase()) ||
                      (task.description && task.description.toLowerCase().includes(props.filters.text.toLowerCase()));
    const tagsMatch = props.filters.tags.length === 0 || props.filters.tags.every(tag => task.tags.includes(tag));
    const priorityMatch = !props.filters.priority || task.priority === props.filters.priority;
    return textMatch && tagsMatch && priorityMatch;
  });
});

const tasksByColumn = computed({
  get() {
    const grouped = {};
    props.columns.forEach(col => {
      grouped[col.id] = [];
    });
    filteredTasks.value.forEach(task => {
      if (grouped[task.column]) {
        grouped[task.column].push(task);
      }
    });
    return grouped;
  }
})

async function onDragEnd(event) {
  const { item, to, from, oldIndex, newIndex } = event;
  const taskId = Number(item.dataset.taskId);
  const toColumnId = to.closest('[data-column-id]').dataset.columnId;

  // 1. Encontrar la tarea en la lista completa de props
  const taskIndex = props.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return;

  // 2. Crear una copia mutable de la lista de tareas
  const newTasks = [...props.tasks];
  const taskToMove = newTasks[taskIndex];

  // 3. Actualizar la columna de la tarea movida
  taskToMove.column = toColumnId;
  
  // 4. Emitir la lista actualizada para que el padre actualice su estado
  emit('update:tasks', newTasks);

  // 5. Persistir el cambio en el backend (esto se puede hacer en paralelo)
  if (taskId && toColumnId) {
    await taskService.updateTaskColumn(taskId, toColumnId);
    emit('task-moved');
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
        :list="tasksByColumn[column.id]"
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
