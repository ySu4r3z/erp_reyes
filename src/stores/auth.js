import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  // Estado mínimo de sesión usado por el login y el layout principal.
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    // La autenticación actual es local y demostrativa; aquí se conectará la API real.
    login(payload) {
      this.user = payload;
      this.isAuthenticated = true;
    },
    // Limpia toda la información de sesión al cerrar la aplicación.
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});
