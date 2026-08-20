<template>
  <!-- Vista principal del dashboard con métricas, gráfico y transacciones recientes -->
  <section>
    <section class="stats-grid" aria-label="Resumen de métricas">
      <article class="stat-card">
        <div class="stat-head">
          <span class="stat-icon stat-icon-primary" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </span>
          <span class="stat-trend is-up">+12.5%</span>
        </div>
        <p class="stat-value">$48,250</p>
        <p class="stat-label">Ingresos del mes</p>
      </article>

      <article class="stat-card">
        <div class="stat-head">
          <span class="stat-icon stat-icon-success" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </span>
          <span class="stat-trend is-up">+8.2%</span>
        </div>
        <p class="stat-value">1,284</p>
        <p class="stat-label">Pagos completados</p>
      </article>

      <article class="stat-card">
        <div class="stat-head">
          <span class="stat-icon stat-icon-warning" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <span class="stat-trend is-down">-3.1%</span>
        </div>
        <p class="stat-value">36</p>
        <p class="stat-label">Pagos pendientes</p>
      </article>

      <article class="stat-card">
        <div class="stat-head">
          <span class="stat-icon stat-icon-danger" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </span>
          <span class="stat-trend is-down">-1.4%</span>
        </div>
        <p class="stat-value">9</p>
        <p class="stat-label">Pagos rechazados</p>
      </article>
    </section>

    <section class="panels-grid">
      <article class="panel panel-chart">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Ingresos por mes</h2>
            <p class="panel-subtitle">Últimos 8 meses (en miles de $)</p>
          </div>
          <span class="panel-badge">2026</span>
        </div>
        <div class="chart-wrapper">
          <canvas ref="chartCanvas" aria-label="Gráfico de barras de ingresos mensuales"></canvas>
        </div>
      </article>

      <article class="panel panel-methods">
        <div class="panel-head">
          <h2 class="panel-title">Métodos de pago</h2>
        </div>
        <ul class="methods-list">
          <li class="method-item" v-for="method in methods" :key="method.name">
            <div class="method-info">
              <span class="method-name">{{ method.name }}</span>
              <span class="method-value">{{ method.value }}%</span>
            </div>
            <div class="progress"><span class="progress-bar" :style="{ width: method.value + '%' }"></span></div>
          </li>
        </ul>
      </article>
    </section>

    <section class="panel panel-table">
      <div class="panel-head">
        <div>
          <h2 class="panel-title">Transacciones recientes</h2>
          <p class="panel-subtitle">Movimientos más recientes registrados</p>
        </div>
        <a href="#" class="forgot-link">Ver todas</a>
      </div>

      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Referencia</th>
              <th scope="col">Fecha</th>
              <th scope="col">Método</th>
              <th scope="col" class="ta-right">Monto</th>
              <th scope="col" class="ta-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in transactions" :key="tx.reference">
              <td>{{ tx.client }}</td>
              <td>{{ tx.reference }}</td>
              <td>{{ tx.date }}</td>
              <td>{{ tx.method }}</td>
              <td class="ta-right">{{ tx.amount }}</td>
              <td class="ta-center">{{ tx.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartCanvas = ref(null);

const methods = [
  { name: 'Tarjeta de crédito', value: 54 },
  { name: 'Transferencia', value: 28 },
  { name: 'Efectivo', value: 12 },
  { name: 'Billetera digital', value: 6 }
];

const transactions = [
  { client: 'María López', reference: 'PAY-1024', date: '2026-07-24', method: 'Tarjeta', amount: '$1,250', status: 'Completado' },
  { client: 'Carlos Ruiz', reference: 'PAY-1023', date: '2026-07-23', method: 'Transferencia', amount: '$850', status: 'Pendiente' },
  { client: 'Ana Torres', reference: 'PAY-1022', date: '2026-07-22', method: 'Efectivo', amount: '$420', status: 'Completado' }
];

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
        datasets: [
          {
            label: 'Ingresos',
            data: [18, 22, 20, 25, 27, 30, 29, 33],
            backgroundColor: ['#4f46e5', '#6366f1', '#818cf8', '#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#0f766e']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
});
</script>
