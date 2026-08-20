<template>
  <div class="app-body">
    <div class="sidebar-overlay" id="sidebar-overlay" hidden></div>

    <div class="app-layout">
      <aside class="sidebar" id="sidebar" aria-label="Navegación principal">
        <div class="sidebar-brand">
          <div class="login-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" stroke-width="1.8" />
              <path d="M2 9h20" stroke="currentColor" stroke-width="1.8" />
              <path d="M6 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
          <span class="sidebar-brand-name">Control de Pagos</span>
        </div>

        <nav class="sidebar-nav">
          <p class="nav-section-label">Principal</p>
          <router-link to="/dashboard" class="nav-item" active-class="is-active" exact-active-class="is-active">
            <span>Inicio</span>
          </router-link>
          <router-link to="/deportistas" class="nav-item" active-class="is-active" exact-active-class="is-active">
            <span>Deportistas</span>
          </router-link>
          <router-link to="/cartera" class="nav-item" active-class="is-active" exact-active-class="is-active">
            <span>Cartera</span>
          </router-link>
          <router-link to="/reportes" class="nav-item" active-class="is-active" exact-active-class="is-active">
            <span>Reportes</span>
          </router-link>

          <p class="nav-section-label">Sistema</p>
          <router-link to="/configuracion" class="nav-item" active-class="is-active" exact-active-class="is-active">
            <span>Configuración</span>
          </router-link>
          <button type="button" class="nav-item nav-logout" @click="logoutAndGoHome">
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>

      <div class="app-main">
        <header class="topbar">
          <div class="topbar-left">
            <button type="button" class="icon-btn menu-toggle" aria-label="Abrir menú">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div class="topbar-title">
              <h1>Dashboard</h1>
              <p class="topbar-subtitle">Bienvenido de nuevo</p>
            </div>
          </div>

          <div class="topbar-right">
            <div class="search-box">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="search" placeholder="Buscar…" aria-label="Buscar en el sistema" />
            </div>

            <div class="user-chip">
              <span class="user-avatar" aria-hidden="true">AD</span>
              <span class="user-meta">
                <span class="user-name">Administrador</span>
                <span class="user-role">Admin</span>
              </span>
            </div>
          </div>
        </header>

        <main class="content" role="main">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

function logoutAndGoHome() {
  auth.logout();
  router.push('/');
}
</script>
