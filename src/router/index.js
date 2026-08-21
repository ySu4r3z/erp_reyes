import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AppLayout from '../views/AppLayout.vue';
import DashboardHomeView from '../views/DashboardHomeView.vue';
import DeportistasView from '../views/DeportistasView.vue';
import CarteraView from '../views/CarteraView.vue';
import ReportesView from '../views/ReportesView.vue';
import ConfiguracionView from '../views/ConfiguracionView.vue';

// Definición del árbol de rutas de la aplicación.
// El layout principal `AppLayout` envuelve las rutas internas de la aplicación.
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    component: AppLayout,
    // Todas las rutas hijas reutilizan el sidebar y la barra superior del layout.
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardHomeView
      },
      {
        path: 'deportistas',
        name: 'deportistas',
        component: DeportistasView
      },
      {
        path: 'cartera',
        name: 'cartera',
        component: CarteraView
      },
      {
        path: 'reportes',
        name: 'reportes',
        component: ReportesView
      },
      {
        path: 'configuracion',
        name: 'configuracion',
        component: ConfiguracionView
      }
    ]
  }
];

const router = createRouter({
  // createWebHistory produce URLs limpias; el servidor debe redirigirlas a index.html.
  history: createWebHistory(),
  routes
});

export default router;
