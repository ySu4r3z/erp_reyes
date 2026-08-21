<template>
  <!-- Vista de reportes con indicadores, filtros y listado de reportes recientes -->
  <!-- Indicadores y reportes de ejemplo hasta integrar la fuente real de información. -->
  <section class="panel">
    <div class="panel-head">
      <div>
        <h2 class="panel-title">Reportes</h2>
        <p class="panel-subtitle">Informes y análisis del sistema</p>
      </div>
      <button class="btn btn-primary btn-large">Generar reporte</button>
    </div>

    <div class="stats-grid-3">
      <div class="summary-card">
        <h3>Ingresos</h3>
        <p class="summary-value">$ 162.120</p>
        <p class="summary-note">Total del mes actual</p>
      </div>
      <div class="summary-card">
        <h3>Gastos</h3>
        <p class="summary-value">$ 58.430</p>
        <p class="summary-note">Costos operativos y pagos</p>
      </div>
      <div class="summary-card">
        <h3>Balance neto</h3>
        <p class="summary-value">$ 103.690</p>
        <p class="summary-note">Resumen financiero</p>
      </div>
    </div>

    <div class="panel-actions">
      <div class="table-heading-row">
        <h3>Reportes recientes</h3>
        <select>
          <option>Últimos 30 días</option>
          <option>Últimos 7 días</option>
          <option>Últimos 90 días</option>
        </select>
      </div>
    </div>

    <div class="card-list">
      <article class="card-item">
        <div class="card-details">
          <div class="stat-icon">📊</div>
          <div class="card-info">
            <strong>Reporte mensual</strong>
            <span class="card-label">Generado 28 mayo 2026 · Finanzas</span>
          </div>
        </div>
        <div class="timeline-body">
          <span class="timeline-title">Resumen de ingresos</span>
          <span class="badge-status badge-paid">Listo</span>
        </div>
      </article>
      <article class="card-item">
        <div class="card-details">
          <div class="stat-icon">📈</div>
          <div class="card-info">
            <strong>Flujo de caja</strong>
            <span class="card-label">Generado 27 mayo 2026 · Cobranza</span>
          </div>
        </div>
        <div class="timeline-body">
          <span class="timeline-title">Disponible para revisar</span>
          <span class="badge-status badge-pending">En proceso</span>
        </div>
      </article>
      <article class="card-item">
        <div class="card-details">
          <div class="stat-icon">🧾</div>
          <div class="card-info">
            <strong>Reporte de facturas</strong>
            <span class="card-label">Generado 26 mayo 2026 · Cierre</span>
          </div>
        </div>
        <div class="timeline-body">
          <span class="timeline-title">Revisión pendiente</span>
          <span class="badge-status badge-pending">Pendiente</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ReportesView'
};
</script>
