<script setup>
import { ref, computed, onMounted } from 'vue';
import TaskBoard from '../components/TaskBoard.vue'; // Asegúrate que la ruta es correcta
import TaskFilter from '../components/TaskFilter.vue'; // Usará Tailwind
import TaskModal from '../components/TaskModal.vue';
import { taskService } from '../components/services/taskService.js';

const allTasks = ref([]);
const columns = ref([]);
const users = ref([]);
const tags = ref([]);
const priorities = ref([]);

const filters = ref({
  text: '',
  tags: [],
  priority: '',
});

const isModalOpen = ref(false);
const taskToEdit = ref(null);

const filteredTasks = computed(() => {
  return allTasks.value.filter(task => {
    const textMatch = task.title.toLowerCase().includes(filters.value.text.toLowerCase()) ||
                      (task.description && task.description.toLowerCase().includes(filters.value.text.toLowerCase()));
    const tagsMatch = filters.value.tags.length === 0 || filters.value.tags.every(tag => task.tags.includes(tag));
    const priorityMatch = !filters.value.priority || task.priority === filters.value.priority;
    return textMatch && tagsMatch && priorityMatch;
  });
});

async function loadData() {
  try {
    const data = await taskService.getData();
    allTasks.value = data.tasks;
    columns.value = data.columns;
    users.value = data.users;
    tags.value = data.tags;
    priorities.value = data.priorities;
  } catch (error) {
    console.error("Error al cargar los datos del tablero:", error);
  }
}

function openCreateModal() {
  taskToEdit.value = null;
  isModalOpen.value = true;
}

function openEditModal(task) {
  taskToEdit.value = { ...task };
  isModalOpen.value = true;
}

async function handleTaskSave(task) {
  if (task.id) {
    await taskService.updateTask(task);
  } else {
    await taskService.createTask(task);
  }
  await loadData(); // Recargar datos
  isModalOpen.value = false;
}

function handleTasksUpdate(newTasks) {
  allTasks.value = newTasks;
}

async function handleTaskMoved() {
  // La lógica de movimiento ya se hace en el backend a través de vuedraggable
  // y el estado local se actualiza a través de v-model. No es necesario recargar.
}

onMounted(loadData);
</script>

<template>
  <main class="board-view">
    <TaskFilter
      :tags="tags"
      :priorities="priorities"
      v-model:filters="filters"
      @create-task="openCreateModal"
    />
    <TaskBoard
      :tasks="allTasks"
      :columns="columns"
      :filters="filters"
      @update:tasks="handleTasksUpdate"
      @edit-task="openEditModal"
      @task-moved="handleTaskMoved"
    />
    <TaskModal
      :open="isModalOpen"
      :task="taskToEdit"
      :users="users"
      :tags="tags"
      :priorities="priorities"
      @close="isModalOpen = false"
      @save="handleTaskSave"
    />
  </main>
</template>

<style scoped>
.board-view {
  padding: 1rem;
}
</style>
