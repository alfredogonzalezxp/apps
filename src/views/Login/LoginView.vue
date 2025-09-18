<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const { login } = useAuth();
const username = ref('');
const error = ref('');

async function handleLogin() {
  if (username.value.trim()) {
    await login(username.value);
    error.value = '';
  } else {
    error.value = 'Por favor, introduce un nombre de usuario.';
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-900">Iniciar Sesión (Mock)</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Escribe tu nombre"
            aria-required="true"
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit" class="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Entrar
        </button>
        <p v-if="error" class="mt-2 text-sm text-red-600" role="alert">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
