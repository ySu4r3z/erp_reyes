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

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 40px 36px;
  animation: fade-in 0.5s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.login-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary);
  color: var(--color-secondary);
  box-shadow: var(--shadow-sm);
}

.login-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.login-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.form-message {
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  font-size: 0.875rem;
  margin-bottom: 20px;
  border: 1px solid transparent;
}

.form-message.is-error {
  background-color: #fdecec;
  color: var(--color-error);
  border-color: #f6c9c9;
}

.form-message.is-success {
  background-color: #e8f7ef;
  color: var(--color-success);
  border-color: #bfe6cf;
}

.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 7px;
  color: var(--color-text);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  display: flex;
  color: var(--color-text-muted);
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
  background-color: #f8fafd;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
}

.form-input::placeholder {
  color: #9aa4b5;
}

.form-input:focus {
  outline: none;
  background-color: var(--color-surface);
  border-color: var(--color-primary-light);
  box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.15);
}

.form-input.is-invalid {
  border-color: var(--color-error);
  background-color: #fef7f7;
}

.form-input.is-invalid:focus {
  box-shadow: 0 0 0 3px rgba(214, 59, 59, 0.15);
}

.field-error {
  display: block;
  min-height: 16px;
  margin-top: 6px;
  font-size: 0.78rem;
  color: var(--color-error);
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-box {
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background-color: var(--color-surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition), border-color var(--transition);
}

.checkbox-box::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid var(--color-secondary);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform var(--transition);
}

.checkbox input:checked + .checkbox-box {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox input:checked + .checkbox-box::after {
  transform: rotate(45deg) scale(1);
}

.checkbox input:focus-visible + .checkbox-box {
  box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.2);
}

.checkbox-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.forgot-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-primary-light);
  text-decoration: none;
  transition: color var(--transition);
}

.forgot-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.btn-primary {
  position: relative;
  width: 100%;
  padding: 13px 16px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-secondary);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color var(--transition), transform var(--transition);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-primary:active {
  transform: scale(0.99);
}

.btn-primary:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--color-secondary);
  border-radius: 50%;
  display: none;
  animation: spin 0.7s linear infinite;
}

.btn-primary.is-loading .spinner {
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 26px;
  text-align: center;
}

.login-footer p {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 22px;
    border-radius: var(--radius-md);
  }

  .login-title {
    font-size: 1.2rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
