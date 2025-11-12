import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// Usaremos la API simulada para que no necesites el backend
import * as api from '../../backend/mock-api';

// Estado global del usuario (fuera de la función `useAuth` para que sea un singleton)
const user = ref(null);

export function useAuth() {
  const router = useRouter();
  const error = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  async function login(username) {
    try {
      const response = await api.login(username);
      user.value = response.user;
      error.value = null;
      // Redirigir al tablero principal después de un login exitoso
      router.push('/');
    } catch (e) {
      error.value = e.message;
      // Relanzamos el error para que la vista de Login pueda atraparlo
      throw e;
    }
  }

  function logout() {
    user.value = null;
    router.push('/login');
  }

  return { user, isAuthenticated, login, logout, error };
}