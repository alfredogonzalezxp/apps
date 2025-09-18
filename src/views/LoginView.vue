<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { login } = useAuth();
const router = useRouter();
const username = ref('');
const error = ref('');

async function handleLogin() {
  if (!username.value.trim()) {
    error.value = 'Please enter a username.';
    return;
  }
  try {
    await login(username.value);
    router.push('/board');
  } catch (e) {
    error.value = 'Login failed. Could not connect to the server.';
  }
}
</script>

<template>
  <div class="login-container bg-gray-100">
    <div class="login-box">
      <h2 class="login-title">Welcome to TaskBoard Pro</h2>
      <p class="login-subtitle">Please sign in to continue</p>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter any username"
            class="form-input"
            aria-describedby="username-error"
          />
        </div>
        <p v-if="error" id="username-error" class="error-text">{{ error }}</p>
        <button type="submit" class="login-button">Sign In</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  text-align: left;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.error-text {
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: -0.5rem;
}

.login-button {
  background-color: #1976d2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #1565c0;
  }
}
</style>