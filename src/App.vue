<template>
  <div id="app-container">
    <Header v-if="user" />
    <RouterView />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import { useAuth } from './composables/useAuth';
const { user } = useAuth();
</script>

<style scoped>
</style>