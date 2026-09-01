<template>
  <section class="cartera-panel">
    <div class="cartera-header">
      <div>
        <p class="cartera-overline">Seguimiento de obligaciones</p>
        <h2 class="cartera-title">Cartera</h2>
        <p class="cartera-subtitle">Consulta saldos, abonos y periodos pendientes.</p>
      </div>

      <button type="button" class="btn btn-secondary btn-download">↓ Descargar Excel</button>
    </div>

    <div class="cartera-layout">
      <aside class="cartera-sidebar">
        <div class="sidebar-filters">
          <button type="button" class="filter-pill is-active">En mora 38</button>
          <button type="button" class="filter-pill">Próximos 16</button>
        </div>

        <div class="client-list">
          <button type="button" class="client-item is-selected">
            <span class="client-avatar avatar-gold">SS</span>
            <span class="client-info">
              <strong>Salomé Solórzano</strong>
              <small>ID 100241</small>
            </span>
            <span class="client-amount">$ 65.000</span>
            <span class="client-status status-mora">En mora</span>
          </button>

          <button type="button" class="client-item">
            <span class="client-avatar avatar-gold">SP</span>
            <span class="client-info">
              <strong>Sara Sepúlveda</strong>
              <small>ID 100242</small>
            </span>
            <span class="client-amount">$ 0</span>
            <span class="client-status status-ok">Al día</span>
          </button>

          <button type="button" class="client-item">
            <span class="client-avatar avatar-coral">SH</span>
            <span class="client-info">
              <strong>Samuel Hinestroza</strong>
              <small>ID 100243</small>
            </span>
            <span class="client-amount">$ 0</span>
            <span class="client-status status-pending">Próximo</span>
          </button>

          <button type="button" class="client-item">
            <span class="client-avatar avatar-purple">VG</span>
            <span class="client-info">
              <strong>Valentina García</strong>
              <small>ID 100244</small>
            </span>
            <span class="client-amount">$ 110.000</span>
            <span class="client-status status-mora">En mora</span>
          </button>

          <button type="button" class="client-item">
            <span class="client-avatar avatar-green">MR</span>
            <span class="client-info">
              <strong>Martín Rojas</strong>
              <small>ID 100245</small>
            </span>
            <span class="client-amount">$ 0</span>
            <span class="client-status status-ok">Al día</span>
          </button>
        </div>
      </aside>

      <section class="cartera-detail">
        <div class="detail-header">
          <div class="detail-client">
            <span class="detail-avatar">SP</span>
            <div>
              <h3>Sara Sepúlveda</h3>
              <p>Juvenil · San Valentín</p>
            </div>
          </div>

          <div class="detail-total">
            <span>Saldo total</span>
            <strong>$ 45.000</strong>
          </div>

          <span class="detail-badge">Al día</span>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span>Sede</span>
            <strong>San Valentín</strong>
          </div>
          <div class="info-item">
            <span>Categoría</span>
            <strong>Juvenil</strong>
          </div>
          <div class="info-item">
            <span>Valor mensual</span>
            <strong>$65.000</strong>
          </div>
          <div class="info-item">
            <span>Acudiente</span>
            <strong>Carlos Sepúlveda</strong>
          </div>
        </div>

        <div class="account-header">
          <div>
            <h4>Estado de cuenta</h4>
            <p>Obligaciones y pagos aplicados</p>
          </div>
          <button type="button" class="btn btn-primary register-btn">Registrar pago</button>
        </div>

        <div class="account-list">
          <div class="account-item is-warning">
            <div class="account-date">
              <span class="month">23</span>
              <span class="month-name">JUN</span>
            </div>
            <div class="account-copy">
              <div class="account-title-row">
                <strong>Mensualidad</strong>
                <span class="amount amount-warning">$65.000</span>
              </div>
              <div class="account-subrow">
                <span>23 jun. - 23 jul. 2026</span>
                <span class="tag tag-warning">Abonado</span>
              </div>
              <small>Saldo $45.000</small>
            </div>
          </div>

          <div class="account-item is-pending">
            <div class="account-date">
              <span class="month">23</span>
              <span class="month-name">JUL</span>
            </div>
            <div class="account-copy">
              <div class="account-title-row">
                <strong>Mensualidad</strong>
                <span class="amount amount-danger">$65.000</span>
              </div>
              <div class="account-subrow">
                <span>23 jul. - 23 ago. 2026</span>
                <span class="tag tag-danger">Pendiente</span>
              </div>
              <small>Saldo $65.000</small>
            </div>
          </div>

          <div class="account-item is-success">
            <div class="account-date">
              <span class="month">23</span>
              <span class="month-name">MAY</span>
            </div>
            <div class="account-copy">
              <div class="account-title-row">
                <strong>Mensualidad</strong>
                <span class="amount amount-success">$65.000</span>
              </div>
              <div class="account-subrow">
                <span>23 may. - 23 jun. 2026</span>
                <span class="tag tag-success">Pagado</span>
              </div>
              <small>Recibo #0482 · Transferencia</small>
            </div>
          </div>
        </div>

        <button type="button" class="register-contribution">Registrar donación</button>
      </section>
    </div>
  </section>
</template>

<style scoped>
.cartera-panel {
  background: transparent;
  padding: 0;
}

.cartera-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.cartera-overline {
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: var(--color-primary-light);
  font-weight: 700;
}

.cartera-title {
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1.1;
}

.cartera-subtitle {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.btn-download {
  min-width: 170px;
  width: auto;
  padding: 12px 18px;
  font-weight: 600;
}

.cartera-layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.cartera-sidebar,
.cartera-detail {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.cartera-sidebar {
  padding: 16px 14px;
}

.sidebar-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  background: transparent;
  border-radius: 8px;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.filter-pill.is-active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-secondary);
}

.client-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.client-item {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 12px 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
}

.client-item.is-selected {
  background-color: #eef4ff;
  border-color: #dfeafc;
}

.client-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--color-secondary);
  font-size: 0.78rem;
  font-weight: 700;
}

.avatar-gold { background-color: #d9952e; }
.avatar-coral { background-color: #d46d5d; }
.avatar-purple { background-color: #7b5fc8; }
.avatar-green { background-color: #2d9b6a; }

.client-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.client-info strong {
  font-size: 0.98rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.client-info small {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.client-amount {
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.9rem;
  margin-right: 4px;
}

.client-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: 8px;
}

.status-mora {
  background-color: #fbeaf0;
  color: #c45874;
}

.status-pending {
  background-color: #fff4e2;
  color: #b76a00;
}

.status-ok {
  background-color: #dff5ea;
  color: #187b51;
}

.cartera-detail {
  padding: 20px 18px 18px;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f7f9fb;
}

.detail-client {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #d9a13b;
  color: var(--color-secondary);
  display: grid;
  place-items: center;
  font-weight: 700;
}

.detail-client h3 {
  font-size: 1.12rem;
  color: var(--color-text);
}

.detail-client p {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.detail-total {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-left: auto;
}

.detail-total span {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.detail-total strong {
  color: var(--color-primary);
  font-size: 1.35rem;
}

.detail-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #dff5ea;
  color: #187b51;
  font-weight: 700;
  font-size: 0.72rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
  padding: 0 2px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 10px;
  background: #fcfdff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.info-item span {
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.info-item strong {
  color: var(--color-text);
  font-size: 0.96rem;
}

.account-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 26px;
  margin-bottom: 12px;
}

.account-header h4 {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin: 0;
}

.account-header p {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.register-btn {
  width: auto;
  min-width: 150px;
}

.account-list {
  display: grid;
  gap: 12px;
  margin-top: 8px;
}

.account-item {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  padding: 12px 14px;
}

.account-item.is-warning {
  border-left: 3px solid #d99a2d;
}

.account-item.is-pending {
  border-left: 3px solid #d95b5b;
}

.account-item.is-success {
  border-left: 3px solid #2d9b6a;
}

.account-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 72px;
  background: #eef2f8;
  border-radius: 12px;
  padding: 8px 0;
}

.month {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.month-name {
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  color: var(--color-text-muted);
  font-weight: 700;
}

.account-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.account-title-row,
.account-subrow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.account-title-row strong {
  font-size: 1.02rem;
  color: var(--color-text);
}

.amount {
  font-weight: 700;
  font-size: 0.96rem;
}

.amount-warning { color: var(--color-primary); }
.amount-danger { color: var(--color-error); }
.amount-success { color: var(--color-success); }

.account-subrow {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.account-copy small {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
}

.tag-warning {
  background: #fff4df;
  color: #b86d00;
}

.tag-danger {
  background: #fdecec;
  color: #c74a4a;
}

.tag-success {
  background: #dff5ea;
  color: #187b51;
}

.register-contribution {
  margin-top: 16px;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

@media (max-width: 980px) {
  .cartera-layout {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .cartera-header,
  .account-header,
  .detail-header,
  .account-title-row,
  .account-subrow {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-total {
    align-items: flex-start;
    margin-left: 0;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .account-item {
    grid-template-columns: 1fr;
  }

  .btn-download,
  .register-btn {
    width: 100%;
  }
}
</style>
