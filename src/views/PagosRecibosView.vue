<template>
  <section class="panel panel-deportistas receipts-panel">
    <div class="panel-head panel-head-spaced">
      <div>
        <p class="panel-overline">Movimientos y soportes</p>
        <h2 class="panel-title">Pagos y recibos</h2>
        <p class="panel-subtitle">Consulta recaudos y vuelve a descargar sus comprobantes.</p>
      </div>
      <button type="button" class="btn-primary btn-primary-inline" @click="isPaymentModalOpen = true">+ Registrar pago</button>
    </div>

    <div class="summary-grid" aria-label="Resumen de pagos y recibos">
      <article class="summary-card">
        <div class="summary-icon summary-icon-blue" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div class="summary-meta">
          <p class="summary-label">Recibido hoy</p>
          <p class="summary-amount">$455.000</p>
          <p class="summary-caption">6 movimientos</p>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon summary-icon-green" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
            <polyline points="14 2 18 6 14 6" />
            <path d="M8 13h8M8 17h5" />
          </svg>
        </div>
        <div class="summary-meta">
          <p class="summary-label">Recibos activos</p>
          <p class="summary-amount">508</p>
          <p class="summary-caption">Desde el inicio</p>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-icon summary-icon-red" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="9" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <div class="summary-meta">
          <p class="summary-label">Anulados</p>
          <p class="summary-amount">3</p>
          <p class="summary-caption">Con evidencia</p>
        </div>
      </article>
    </div>

    <div class="panel-head panel-head-subtle movements-toolbar">
      <p class="panel-note"><strong>Últimos movimientos</strong></p>
      <select class="panel-select" aria-label="Seleccionar mes">
        <option selected>Julio 2026</option>
        <option>Agosto 2026</option>
        <option>Junio 2026</option>
      </select>
    </div>

    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th>Recibo</th>
            <th>Fecha</th>
            <th>Deportista</th>
            <th>Conceptos</th>
            <th>Medio</th>
            <th>Total</th>
            <th class="ta-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in movements" :key="movement.id">
            <td>{{ movement.id }}</td>
            <td>{{ movement.date }}</td>
            <td>{{ movement.deportista }}</td>
            <td>{{ movement.concepto }}</td>
            <td>{{ movement.medio }}</td>
            <td class="cell-amount">{{ movement.total }}</td>
            <td class="ta-right">
              <button type="button" class="link-button">Ver recibo</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <RegistrarPagoModal v-if="isPaymentModalOpen" @close="isPaymentModalOpen = false" />
</template>

<script setup>
import { ref } from 'vue';
import RegistrarPagoModal from '../components/pagos/RegistrarPagoModal.vue';

const isPaymentModalOpen = ref(false);

const movements = [
  { id: '#0507', date: '20 jul. 2026', deportista: 'Salomé Solórzano', concepto: 'Inscripción + mensualidad', medio: 'Efectivo', total: '$85.000' },
  { id: '#0511', date: '20 jul. 2026', deportista: 'Sara Sepúlveda', concepto: 'Mensualidades + compartimento', medio: 'Transferencia', total: '$305.000' },
  { id: '#0501', date: '20 jul. 2026', deportista: 'Samuel Hinesroza', concepto: '3 mensualidades', medio: 'Transferencia', total: '$150.000' },
  { id: '#0500', date: '19 jul. 2026', deportista: 'Martín Rojas', concepto: 'Mensualidad', medio: 'Efectivo', total: '$65.000' }
];
</script>
