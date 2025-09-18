<script setup>
import { useAuth } from '../composables/useAuth';

const { user, logout } = useAuth();
</script>

<template>
  <header class="app-header">
    <div class="toolbar">
      <h1 class="app-title">TaskBoard Pro</h1>
      <div v-if="user" class="user-info">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
        <span class="username">{{ user.name }}</span>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: #1976d2; // Un color similar al de MUI AppBar
  color: white;
  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 64px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
}

.logout-button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
