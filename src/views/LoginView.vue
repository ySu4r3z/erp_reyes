<template>
  <main class="login-page">
    <section class="login-card" aria-labelledby="login-title">
      <header class="login-header">
        <div class="login-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" stroke-width="1.8" />
            <path d="M2 9h20" stroke="currentColor" stroke-width="1.8" />
            <path d="M6 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </div>
        <h1 id="login-title" class="login-title">Sistema de Control de Pagos</h1>
        <p class="login-subtitle">Ingresa tus credenciales para continuar</p>
      </header>

      <div class="form-message" role="alert" aria-live="polite" :hidden="!message">{{ message }}</div>

      <form class="login-form" novalidate @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email" class="form-label">Correo electrónico</label>
          <div class="input-wrapper">
            <span class="input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </span>
            <input v-model="email" type="email" id="email" name="email" class="form-input" placeholder="nombre@empresa.com" autocomplete="email" required />
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <div class="input-wrapper">
            <span class="input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.6" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </span>
            <input v-model="password" type="password" id="password" name="password" class="form-input" placeholder="••••••••" autocomplete="current-password" required />
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox">
            <input type="checkbox" id="remember" name="remember" />
            <span class="checkbox-box" aria-hidden="true"></span>
            <span class="checkbox-label">Recordarme</span>
          </label>
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="btn-primary">
          <span class="btn-text">Iniciar sesión</span>
        </button>
      </form>

      <footer class="login-footer">
        <p>&copy; <span>{{ year }}</span> Control de Pagos. Todos los derechos reservados.</p>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const message = ref('');
const year = new Date().getFullYear();

// Valida los campos mínimos antes de actualizar el store y navegar al dashboard.
function handleSubmit() {
  if (!email.value || !password.value) {
    message.value = 'Completa correo y contraseña.';
    return;
  }

  auth.login({ email: email.value });
  router.push('/dashboard');
}
</script>
