import { ref, computed } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('taskboard-user') || 'null'));

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  async function login(username) {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      user.value = data.user;
      localStorage.setItem('taskboard-user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Propagar el error para que LoginView.vue lo maneje
    }
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('taskboard-user');
    // Redirigir al login
    window.location.pathname = '/login';
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}