import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import '../css/styles.css';
import '../css/login.css';
import '../css/dashboard.css';

// Punto de entrada de la SPA: registra los servicios globales antes de montar Vue.
const app = createApp(App);
const pinia = createPinia();

// Pinia gestiona el estado compartido y Vue Router controla la navegación entre vistas.
app.use(pinia);
app.use(router);
app.mount('#app');
