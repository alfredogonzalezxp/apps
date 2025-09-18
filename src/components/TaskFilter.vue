<script setup>
const props = defineProps({
  tags: Array,
  priorities: Array,
  filters: Object,
});

const emit = defineEmits(['update:filters', 'create-task']);

function updateFilter(key, value) {
  emit('update:filters', { ...props.filters, [key]: value });
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow-md mb-4 flex flex-wrap items-center gap-4">
    <div class="flex-grow min-w-[200px]">
      <input
        type="text"
        :value="filters.text"
        @input="updateFilter('text', $event.target.value)"
        placeholder="Search by title or description..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search tasks"
      />
    </div>
    <div class="flex-grow min-w-[150px]">
      <select
        :value="filters.priority"
        @change="updateFilter('priority', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter by priority"
      >
        <option value="">All Priorities</option>
        <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
      </select>
    </div>
    <div class="flex-grow min-w-[150px]">
       <!-- Un select múltiple sería mejor, pero para simplificar usamos uno simple -->
      <select
        :value="filters.tags.length ? filters.tags[0] : ''"
        @change="updateFilter('tags', $event.target.value ? [$event.target.value] : [])"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Filter by tag"
      >
        <option value="">All Tags</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>
    <button
      @click="$emit('create-task')"
      class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create Task
    </button>
  </div>
</template>