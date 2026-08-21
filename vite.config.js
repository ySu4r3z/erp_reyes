import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    // Mantiene el servidor de desarrollo en el puerto previsto por el proyecto.
    port: 5173,
    open: false
  }
});
