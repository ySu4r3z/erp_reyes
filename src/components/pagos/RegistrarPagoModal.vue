<template>
  <Teleport to="body">
    <div class="modal-backdrop" role="presentation" @click.self="close">
      <section
        ref="modalElement"
        class="modal-card payment-modal"
        :class="{ 'receipt-modal-card': showReceipt }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <template v-if="!showReceipt">
          <header class="modal-header">
            <div class="modal-header-title">
              <p class="modal-overline">Nuevo movimiento</p>
            </div>
            <button type="button" class="modal-close" aria-label="Cerrar formulario" @click="close">&times;</button>
          </header>

          <div class="payment-form">
            <h2 id="payment-modal-title" class="payment-title">Registrar pago</h2>

            <div class="payment-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Busca y selecciona el deportista</h3>
                <p>Por nombre, identificación o acudiente.</p>
              </div>
            </div>

            <div class="search-box payment-search">
              <span class="input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                v-model="search"
                type="search"
                placeholder="Buscar deportista o acudiente..."
                aria-label="Buscar deportista o acudiente"
              />
            </div>

            <div v-if="search.trim()" class="athlete-results" role="listbox" aria-label="Resultados de deportistas">
              <button
                v-for="athlete in filteredAthletes"
                :key="athlete.id"
                type="button"
                class="athlete-result"
                :class="{ 'is-selected': selectedAthlete && selectedAthlete.id === athlete.id }"
                role="option"
                :aria-selected="selectedAthlete && selectedAthlete.id === athlete.id"
                @click="selectAthlete(athlete)"
              >
                <span class="athlete-avatar" :style="{ backgroundColor: athlete.avatarColor }">{{ athlete.initials }}</span>
                <span class="athlete-main">
                  <strong>{{ athlete.name }}</strong>
                  <small>ID {{ athlete.id }} · Acudiente: {{ athlete.guardian }}</small>
                </span>
              </button>
              <p v-if="!filteredAthletes.length" class="athlete-empty">No se encontraron deportistas.</p>
            </div>

            <button v-if="selectedAthlete" type="button" class="selected-athlete" @click="search = selectedAthlete.name">
              <span class="athlete-avatar" :style="{ backgroundColor: selectedAthlete.avatarColor }">{{ selectedAthlete.initials }}</span>
              <span class="athlete-main">
                <strong>{{ selectedAthlete.name }}</strong>
                <small>{{ selectedAthlete.category }} · {{ selectedAthlete.site }}</small>
              </span>
              <span class="athlete-balance">Saldo pendiente <strong>{{ selectedAthlete.balance }}</strong></span>
            </button>

            <div class="payment-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Elige qué va a pagar</h3>
                <p>Puede combinar mensualidades y otros conceptos.</p>
              </div>
            </div>

            <div class="concept-tabs" role="tablist" aria-label="Conceptos a pagar">
              <button type="button" class="concept-tab is-selected">Mensualidad</button>
              <button type="button" class="concept-tab">Inscripción</button>
              <button type="button" class="concept-tab">Seguro</button>
              <button type="button" class="concept-tab">Uniforme</button>
              <button type="button" class="concept-tab">Otro</button>
            </div>

            <div class="invoice-option is-checked">
              <div class="option-check">
                <input type="checkbox" checked aria-label="Mensualidad vencida" />
              </div>
              <div class="option-copy">
                <strong>Mensualidad vencida · 23 jun. - 23 jul.</strong>
                <small>Saldo pendiente</small>
              </div>
              <div class="option-amount">$65.000</div>
            </div>

            <div class="invoice-option">
              <div class="option-check">
                <input type="checkbox" aria-label="Mensualidad vigente" />
              </div>
              <div class="option-copy">
                <strong>Mensualidad vigente · 23 jul. - 23 ago.</strong>
                <small>Período actual</small>
              </div>
              <div class="option-amount">$65.000</div>
            </div>

            <button type="button" class="add-concept-button">+ Agregar mensualidad anticipada</button>
            <button type="button" class="add-concept-button secondary">+ Agregar otro concepto al mismo recibo</button>

            <div class="field-row">
              <div class="form-field">
                <label for="payment-amount">Valor recibido</label>
                <div class="currency-input">
                  <span>$</span>
                  <input id="payment-amount" v-model="paymentAmount" type="text" inputmode="numeric" />
                </div>
              </div>

              <div class="form-field">
                <label for="payment-method">Medio de pago</label>
                <select id="payment-method" v-model="paymentMethod">
                  <option selected>Efectivo</option>
                  <option>Transferencia</option>
                  <option>Nequi</option>
                  <option>Daviplata</option>
                </select>
              </div>
            </div>

            <div class="form-field wide">
              <label for="payment-observacion">Observación</label>
              <textarea id="payment-observacion" rows="3" placeholder="Escribe una observación opcional..."></textarea>
            </div>

            <div class="pay-total">
              <span>Total a registrar</span>
              <strong>$ 65.000</strong>
            </div>

            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
              <button type="button" class="btn btn-primary" :disabled="!selectedAthlete" @click="confirmReceipt">Confirmar y generar recibo</button>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="receipt-panel">
            <button type="button" class="modal-close receipt-close" aria-label="Cerrar recibo" @click="close">&times;</button>

            <header class="receipt-header">
              <div class="receipt-brand">
                <div class="receipt-logo" aria-hidden="true">
                  <div class="receipt-logo-ring"></div>
                  <span>REYES</span>
                </div>
                <div class="receipt-brand-copy">
                  <div class="receipt-kicker">CLUB DEPORTIVO DE BALONCESTO</div>
                  <div class="receipt-club">REYES HUILA</div>
                  <div class="receipt-meta-line">NIT 901566676-6 · R.D.P. R.D 0021</div>
                  <div class="receipt-meta-line">Neiva · 310 887 1270</div>
                </div>
              </div>

              <div class="receipt-meta-box">
                <div class="receipt-meta-label">RECIBO DE CAJA</div>
                <div class="receipt-number">No. 0001</div>
              </div>
            </header>

            <div class="receipt-rule"></div>

            <div class="receipt-summary-grid">
              <div class="receipt-summary-item">
                <span>Fecha</span>
                <strong>23 de julio de 2026</strong>
              </div>
              <div class="receipt-summary-item">
                <span>Deportista</span>
                <strong>{{ selectedAthlete.name }}</strong>
              </div>
              <div class="receipt-summary-item">
                <span>Sede</span>
                <strong>San Valentín</strong>
              </div>
            </div>

            <div class="receipt-table-head">
              <span>Concepto</span>
              <span>Periodo / detalle</span>
              <span>Valor</span>
            </div>

            <div class="receipt-row">
              <span>Mensualidad</span>
              <span>23 jun. - 23 jul. 2026</span>
              <span>$ 65.000</span>
            </div>

            <div class="receipt-payment-grid">
              <div class="receipt-payment-row">
                <span>Medio de pago</span>
                <strong>{{ paymentMethod }}</strong>
              </div>
              <div class="receipt-payment-row">
                <span>Saldo pendiente</span>
                <strong>$ 0</strong>
              </div>
              <div class="receipt-payment-row total-row">
                <span>Total recibido</span>
                <strong>$ {{ Number(paymentAmount.replace(/\D/g, '') || 0).toLocaleString('es-CO') }}</strong>
              </div>
            </div>

            <div class="receipt-issuer-line">
              <span>Recibido por</span>
              <strong>Iván Darío Macías Delgado</strong>
            </div>

            <div class="receipt-signature-note">
              Comprobante generado digitalmente por el Club Reyes Huila.
            </div>

            <div class="receipt-actions">
              <button type="button" class="btn btn-secondary" @click="close">Anular recibo</button>
              <button type="button" class="btn btn-primary">Compartir</button>
              <button type="button" class="btn btn-primary btn-download">↓ Descargar PDF</button>
            </div>
          </div>
        </template>
      </section>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';

const emit = defineEmits(['close', 'saved']);
const modalElement = ref(null);
const search = ref('');
const showReceipt = ref(false);
const paymentAmount = ref('65000');
const paymentMethod = ref('Efectivo');
const athletes = [
  { id: '100241', name: 'Salomé Solórzano', initials: 'SS', category: 'Mini', site: 'San Valentín', guardian: 'Laura Solórzano', balance: '$ 65.000', avatarColor: '#d95c82' },
  { id: '100242', name: 'Sara Sepúlveda', initials: 'SP', category: 'Juvenil', site: 'San Valentín', guardian: 'Carlos Sepúlveda', balance: '$ 0', avatarColor: '#de9d4b' },
  { id: '100243', name: 'Samuel Hinestroza', initials: 'SH', category: 'Infantil', site: 'San Valentín', guardian: 'María Hinestroza', balance: '$ 0', avatarColor: '#3b7bb1' },
  { id: '100244', name: 'Valentina García', initials: 'VG', category: 'Premini', site: 'San Valentín', guardian: 'Mónica García', balance: '$ 110.000', avatarColor: '#7b5fc8' },
  { id: '100245', name: 'Martín Rojas', initials: 'MR', category: 'Mini', site: 'San Valentín', guardian: 'Diana Rojas', balance: '$ 0', avatarColor: '#1f9d5b' },
  { id: '100246', name: 'Luciana Pérez', initials: 'LP', category: 'Infantil', site: 'San Valentín', guardian: 'Andrés Pérez', balance: '$ 45.000', avatarColor: '#c47a65' }
];
const selectedAthlete = ref(null);

const filteredAthletes = computed(() => {
  const query = normalize(search.value);

  return athletes.filter((athlete) => {
    return [athlete.name, athlete.id, athlete.guardian].some((value) => normalize(value).includes(query));
  });
});

function selectAthlete(athlete) {
  selectedAthlete.value = athlete;
  search.value = '';
}

function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function confirmReceipt() {
  if (!selectedAthlete.value) {
    return;
  }

  emit('saved', {
    deportista: selectedAthlete.value.name,
    concepto: 'Mensualidad',
    medio: paymentMethod.value,
    amount: Number(paymentAmount.value.replace(/\D/g, '')) || 0
  });
  showReceipt.value = true;
}

function close() {
  emit('close');
}

onMounted(async () => {
  await nextTick();
  modalElement.value?.querySelector('input, select, button')?.focus();
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(15, 44, 89, 0.42);
}

.modal-card {
  width: min(100%, 780px);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 12px;
}

.modal-overline {
  color: var(--color-primary-light);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modal-close {
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}

.payment-form {
  padding: 0 24px 24px;
}

.payment-title {
  margin: 0 0 18px;
  font-size: 2.2rem;
  line-height: 1.1;
  color: var(--color-primary);
  font-weight: 800;
  overflow-wrap: anywhere;
}

.payment-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 18px 0 12px;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-secondary);
  display: grid;
  place-items: center;
  font-size: 0.82rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.step-content h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-primary);
}

.step-content p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.payment-search {
  margin-bottom: 16px;
}

.athlete-results {
  max-height: 220px;
  overflow-y: auto;
  margin-top: -8px;
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.athlete-result {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 0;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.athlete-result:last-child {
  border-bottom: 0;
}

.athlete-result:hover,
.athlete-result.is-selected {
  background: #f5f8fd;
}

.athlete-empty {
  margin: 0;
  padding: 14px;
  color: var(--color-text-muted);
  font-size: 0.88rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafd;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12px 14px 12px 42px;
  position: relative;
}

.search-box .input-icon {
  position: absolute;
  left: 14px;
  display: flex;
  color: var(--color-text-muted);
}

.search-box input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.96rem;
  color: var(--color-text);
}

.selected-athlete {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
  text-align: left;
  cursor: pointer;
}

.athlete-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #d9a13b;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.athlete-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.athlete-main strong,
.option-copy strong,
.receipt-summary-item strong,
.receipt-issuer-line strong {
  overflow-wrap: anywhere;
}

.athlete-main strong {
  color: var(--color-text);
  font-size: 1.05rem;
}

.athlete-main small {
  color: var(--color-text-muted);
}

.athlete-balance {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  overflow-wrap: anywhere;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.athlete-balance strong {
  color: var(--color-text);
  font-size: 1rem;
}

.concept-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.concept-tab {
  border: 1px solid var(--color-border);
  background: #fff;
  color: var(--color-text);
  border-radius: 999px;
  padding: 9px 16px;
  font-weight: 600;
  cursor: pointer;
}

.concept-tab.is-selected {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.invoice-option {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
  margin-bottom: 12px;
}

.invoice-option.is-checked {
  background: #f5f8fd;
  border-color: var(--color-primary-light);
}

.option-check {
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-check input {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
}

.option-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.option-copy strong {
  font-size: 1.02rem;
  color: var(--color-text);
}

.option-copy small {
  color: var(--color-text-muted);
}

.option-amount {
  font-weight: 700;
  color: var(--color-text);
  font-size: 1.05rem;
  white-space: nowrap;
}

.add-concept-button {
  display: block;
  width: 100%;
  border: 1px dashed var(--color-primary-light);
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  margin-top: 12px;
  cursor: pointer;
}

.add-concept-button.secondary {
  margin-top: 10px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-field.wide {
  margin-top: 18px;
}

.form-field label {
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
}

.currency-input {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
  padding: 12px 14px;
}

.currency-input span {
  color: var(--color-text-muted);
  font-weight: 600;
}

.currency-input input,
.form-field select,
.form-field textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--color-text);
  font: inherit;
  padding: 12px 14px;
  resize: vertical;
}

.currency-input input {
  border: none;
  padding: 0;
  background: transparent;
}

.form-field textarea {
  min-height: 80px;
}

.pay-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  padding: 18px 18px;
  background: #f3f6fb;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  font-size: 1.1rem;
  color: var(--color-text);
}

.pay-total strong {
  font-size: 1.6rem;
  color: var(--color-primary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 26px;
}

.modal-actions .btn {
  min-width: 150px;
  padding: 12px 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

.modal-actions .btn-primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.modal-actions .btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.modal-actions .btn-secondary {
  background-color: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

.modal-actions .btn-secondary:hover {
  background-color: var(--color-bg);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}

.receipt-modal-card {
  width: min(100%, 930px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.receipt-panel {
  position: relative;
  padding: 18px 22px 24px;
  background: var(--color-surface);
}

.receipt-close {
  position: absolute;
  right: 18px;
  top: 12px;
  font-size: 1.8rem;
}

.receipt-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 4px 8px 0;
}

.receipt-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.receipt-logo {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f7d85b, #e2b527);
  border: 3px solid var(--color-primary);
  color: var(--color-primary);
  font-weight: 800;
  font-size: 0.62rem;
  letter-spacing: 0.04em;
}

.receipt-logo-ring {
  position: absolute;
  inset: 9px;
  border: 2px solid rgba(15, 44, 89, 0.8);
  border-radius: 50%;
}

.receipt-logo span {
  position: relative;
  z-index: 1;
}

.receipt-brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.receipt-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: var(--color-primary-light);
  font-weight: 700;
}

.receipt-club {
  font-size: 1.82rem;
  line-height: 1.1;
  font-weight: 800;
  color: var(--color-primary);
  overflow-wrap: anywhere;
}

.receipt-meta-line {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.receipt-meta-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  padding-top: 10px;
}

.receipt-meta-label {
  color: var(--color-primary-light);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.receipt-number {
  color: var(--color-primary);
  font-size: 1.35rem;
  font-weight: 800;
}

.receipt-rule {
  margin-top: 16px;
  border-top: 2px solid var(--color-primary);
}

.receipt-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
  background-color: #f7f9fb;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
}

.receipt-summary-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.receipt-summary-item span {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.receipt-summary-item strong {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--color-text);
}

.receipt-table-head,
.receipt-row {
  display: grid;
  grid-template-columns: 1.3fr 1.3fr 0.7fr;
  gap: 12px;
  align-items: center;
  padding: 13px 14px;
}

.receipt-table-head {
  margin-top: 18px;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 12px 14px;
}

.receipt-row {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: none;
  color: var(--color-text);
  font-size: 0.94rem;
  padding: 13px 14px;
}

.receipt-row span:last-child,
.receipt-row span:nth-child(3) {
  text-align: right;
}

.receipt-payment-grid {
  margin-top: 18px;
  max-width: 360px;
  margin-left: auto;
}

.receipt-payment-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 44, 89, 0.12);
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.receipt-payment-row strong {
  color: var(--color-text);
}

.total-row {
  margin-top: 6px;
  padding: 12px 14px;
  background-color: #f5efd8;
  border: 1px solid rgba(15, 44, 89, 0.08);
  border-radius: var(--radius-sm);
  font-weight: 700;
  color: var(--color-primary);
}

.total-row strong {
  font-size: 1.08rem;
}

.receipt-issuer-line {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid rgba(15, 44, 89, 0.12);
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.receipt-issuer-line strong {
  color: var(--color-text);
  font-weight: 700;
}

.receipt-signature-note {
  margin-top: 18px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.88rem;
}

.receipt-actions {
  margin-top: 26px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.receipt-actions .btn {
  min-width: 150px;
  padding: 12px 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
}

.receipt-actions .btn-primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
}

.receipt-actions .btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.receipt-actions .btn-secondary {
  background-color: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

.receipt-actions .btn-secondary:hover {
  background-color: var(--color-bg);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}

.btn-download {
  min-width: 190px;
}

@media (max-width: 640px) {
  .modal-backdrop {
    padding: 8px;
    place-items: start center;
  }

  .modal-card {
    max-height: calc(100vh - 16px);
  }

  .modal-header {
    padding: 14px 16px 10px;
  }

  .payment-form {
    padding: 0 16px 18px;
  }

  .field-row {
    grid-template-columns: 1fr;
  }

  .payment-title {
    font-size: 1.8rem;
  }

  .selected-athlete {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .athlete-balance {
    width: 100%;
    padding-left: 48px;
  }

  .invoice-option {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .option-amount {
    grid-column: 2;
  }

  .receipt-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .receipt-summary-grid {
    grid-template-columns: 1fr;
  }

  .receipt-panel {
    padding: 16px 14px 18px;
  }

  .receipt-table-head {
    display: none;
  }

  .receipt-row {
    grid-template-columns: 1fr;
    gap: 4px;
    text-align: left;
  }

  .receipt-row span:last-child,
  .receipt-row span:nth-child(3) {
    text-align: left;
  }

  .receipt-issuer-line {
    align-items: flex-start;
    flex-direction: column;
  }

  .modal-actions,
  .receipt-actions {
    flex-direction: column-reverse;
  }

  .modal-actions .btn,
  .receipt-actions .btn {
    width: 100%;
  }
}
</style>
