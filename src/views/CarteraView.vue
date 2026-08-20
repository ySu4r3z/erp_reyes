<template>
  <!-- Vista de cartera con resumen de saldo, clientes activos y movimientos recientes -->
  <section class="panel">
    <div class="panel-head">
      <div>
        <h2 class="panel-title">Cartera</h2>
        <p class="panel-subtitle">Resumen de saldos y cuentas por cobrar</p>
      </div>
      <button class="btn btn-secondary btn-large">Descargar Excel</button>
    </div>

    <div class="profile-card">
      <div class="profile-header">
        <div>
          <h3>Cuenta principal</h3>
          <p class="panel-subtitle">Saldo disponible y metas</p>
        </div>
        <div class="profile-badge">CL</div>
      </div>

      <div class="profile-summary">
        <div>
          <span class="summary-label">Saldo actual</span>
          <span class="summary-value">$ 72.540</span>
        </div>
        <div>
          <span class="summary-label">Por cobrar</span>
          <span class="summary-value">$ 18.900</span>
        </div>
        <div>
          <span class="summary-label">Vencido</span>
          <span class="summary-value">$ 4.120</span>
        </div>
        <div>
          <span class="summary-label">Ingresos proyectados</span>
          <span class="summary-value">$ 13.780</span>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn btn-primary">Ver detalle</button>
      </div>
    </div>

    <div class="card-grid">
      <div class="summary-card">
        <h3>Clientes activos</h3>
        <p class="summary-value">48</p>
        <p class="summary-note">Con facturas abiertas</p>
      </div>
      <div class="summary-card">
        <h3>Último pago</h3>
        <p class="summary-value">$ 5.420</p>
        <p class="summary-note">Recibido el 28 mayo 2026</p>
      </div>
      <div class="summary-card">
        <h3>Notas de crédito</h3>
        <p class="summary-value">$ 2.150</p>
        <p class="summary-note">Saldo disponible</p>
      </div>
    </div>

    <div class="timeline-card">
      <div class="timeline-item">
        <div class="timeline-date">
          <span>28</span>
          <span>May</span>
        </div>
        <div class="timeline-body">
          <div class="timeline-title">Factura #0148</div>
          <div class="timeline-subtitle">Cliente: Deportes Rey</div>
          <div class="timeline-footer">
            <span class="timeline-amount">$ 3.200</span>
            <span class="badge-status badge-paid">Pagado</span>
          </div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">
          <span>27</span>
          <span>May</span>
        </div>
        <div class="timeline-body">
          <div class="timeline-title">Cobranza programada</div>
          <div class="timeline-subtitle">Cliente: Club Olímpico</div>
          <div class="timeline-footer">
            <span class="timeline-amount">$ 2.900</span>
            <span class="badge-status badge-pending">En curso</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
