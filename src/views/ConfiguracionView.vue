<template>
  <section class="panel settings-panel">
    <div class="settings-heading">
      <div>
        <p class="panel-overline">Administración</p>
        <h2 class="settings-title">Configuración</h2>
        <p class="panel-subtitle">Valores de referencia y datos de los comprobantes.</p>
      </div>
    </div>

    <div class="settings-grid">
      <form class="settings-card" @submit.prevent="saveInstitutionalData">
        <h3 class="settings-card-title">Datos institucionales</h3>

        <div class="logo-row">
          <div
            class="club-mark"
            :class="{ 'has-logo': logoPreview }"
            :style="logoPreview ? { backgroundImage: `url(${logoPreview})` } : undefined"
            aria-label="Logo del club"
          >
            <span v-if="!logoPreview">RH</span>
          </div>
          <button type="button" class="btn btn-secondary logo-button" @click="selectLogo">
            Cambiar logo
          </button>
          <input ref="logoInput" class="visually-hidden" type="file" accept="image/*" @change="handleLogoChange" />
        </div>

        <div class="form-field">
          <label for="nombre-club">Nombre del club</label>
          <input id="nombre-club" v-model="institutionalData.clubName" type="text" />
        </div>

        <div class="form-grid">
          <div class="form-field">
            <label for="nit">NIT</label>
            <input id="nit" v-model="institutionalData.nit" type="text" />
          </div>
          <div class="form-field">
            <label for="rd">R.D.R.</label>
            <input id="rd" v-model="institutionalData.registration" type="text" />
          </div>
        </div>

        <div class="form-field">
          <label for="responsable">Responsable de recibido</label>
          <input id="responsable" v-model="institutionalData.receiver" type="text" />
        </div>

        <button type="submit" class="btn btn-primary settings-action">Guardar cambios</button>
      </form>

      <form class="settings-card" @submit.prevent="saveFees">
        <h3 class="settings-card-title">Mensualidad por sede</h3>

        <div v-for="site in sites" :key="site.name" class="fee-field">
          <label :for="site.id">{{ site.name }}</label>
          <div class="currency-input">
            <span aria-hidden="true">$</span>
            <input :id="site.id" v-model="site.amount" type="number" min="0" step="1000" />
          </div>
        </div>

        <div class="form-note">
          Los cambios solo afectan periodos futuros. Los valores individuales se administran desde cada deportista.
        </div>

        <button type="submit" class="btn btn-primary settings-action">Guardar valores</button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const logoInput = ref(null);
const logoPreview = ref('');
const institutionalData = ref({
  clubName: 'Club Deportivo de Baloncesto Reyes Huila',
  nit: '901566676-6',
  registration: '001 de 2021',
  receiver: 'Iván Darío Macías Delgado'
});

const sites = ref([
  { id: 'alamos-norte', name: 'Álamos Norte', amount: 65000 },
  { id: 'san-valentin', name: 'San Valentín', amount: 65000 },
  { id: 'la-orquidea', name: 'La Orquídea', amount: 65000 },
  { id: 'mirador-del-sur', name: 'Mirador del Sur', amount: 55000 }
]);

function selectLogo() {
  logoInput.value?.click();
}

function handleLogoChange(event) {
  const file = event.target.files?.[0];

  if (file) {
    logoPreview.value = URL.createObjectURL(file);
  }
}

function saveInstitutionalData() {
}

function saveFees() {
}
</script>

<style scoped>
.settings-panel {
  padding: 0;
  background-color: transparent;
  border: 0;
  box-shadow: none;
}

.settings-heading {
  margin-bottom: 28px;
}

.settings-title {
  color: var(--color-primary);
  font-size: 1.9rem;
  line-height: 1.1;
}

.settings-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
}

.settings-card {
  display: flex;
  flex-direction: column;
  gap: 17px;
  min-width: 0;
  min-height: 473px;
  padding: 24px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.settings-card-title {
  font-size: 1.1rem;
  color: var(--color-text);
}

.logo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 64px;
}

.club-mark {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  border: 3px solid var(--color-primary);
  border-radius: 50%;
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  background-color: #f4f7fc;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.club-mark.has-logo {
  border-color: var(--color-border);
}

.logo-button {
  width: auto;
}

.form-grid {
  gap: 12px;
}

.form-field,
.fee-field {
  display: grid;
  gap: 7px;
}

.form-field label,
.fee-field label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.form-field input,
.currency-input input {
  width: 100%;
  min-width: 0;
  height: 39px;
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 0.82rem;
  outline: none;
}

.form-field input:focus,
.currency-input:focus-within {
  border-color: var(--color-primary-light);
  box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.12);
}

.currency-input {
  display: flex;
  align-items: center;
  height: 39px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text-muted);
}

.currency-input span {
  padding-left: 12px;
  font-size: 0.78rem;
}

.currency-input input {
  flex: 1;
  width: auto;
  height: 37px;
  min-width: 0;
  padding: 9px 12px 9px 8px;
  border: 0;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  box-shadow: none;
}

.currency-input input::-webkit-inner-spin-button,
.currency-input input::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}

.form-note {
  margin-top: -2px;
  padding: 12px;
  font-size: 0.75rem;
  line-height: 1.45;
}

.settings-action {
  align-self: flex-start;
  margin-top: auto;
  width: auto;
  padding: 11px 16px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 760px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .settings-card {
    min-height: 0;
  }

  .settings-title {
    font-size: 1.55rem;
  }
}
</style>
