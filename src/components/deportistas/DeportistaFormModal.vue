<template>
  <Teleport to="body">
    <div class="modal-backdrop" role="presentation" @click.self="close">
      <section
        ref="modalElement"
        class="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deportista-modal-title"
      >
        <button type="button" class="modal-close" aria-label="Cerrar formulario" @click="close">&times;</button>

        <div class="modal-inner">
          <header class="modal-header">
            <p class="modal-kicker">GESTIÓN DE DEPORTISTAS</p>
            <h2 id="deportista-modal-title">{{ isEditing ? 'Editar deportista' : 'Crear nuevo deportista' }}</h2>
            <p class="modal-subtitle">Complete la información personal, de contacto y de vinculación al club.</p>
          </header>

          <form class="modal-form" novalidate @submit.prevent="submitForm">
            <div v-if="formError" class="form-message is-error" role="alert">{{ formError }}</div>

            <section class="form-section">
              <h3>Datos del deportista</h3>

              <div class="field-grid two-column">
                <div class="form-field">
                  <label for="deportista-name">Nombre completo</label>
                  <input
                    id="deportista-name"
                    v-model="form.name"
                    type="text"
                    maxlength="80"
                    autocomplete="name"
                    placeholder="Nombres y apellidos"
                    :aria-invalid="Boolean(errors.name)"
                    :aria-describedby="errors.name ? 'deportista-name-error' : undefined"
                    @input="clearError('name')"
                  />
                  <span v-if="errors.name" id="deportista-name-error" class="field-error">{{ errors.name }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-document">Identificación</label>
                  <input
                    id="deportista-document"
                    v-model="form.documentNumber"
                    type="text"
                    maxlength="20"
                    inputmode="numeric"
                    placeholder="Número de documento"
                    :aria-invalid="Boolean(errors.documentNumber)"
                    :aria-describedby="errors.documentNumber ? 'deportista-document-error' : undefined"
                    @input="clearError('documentNumber')"
                  />
                  <span v-if="errors.documentNumber" id="deportista-document-error" class="field-error">{{ errors.documentNumber }}</span>
                </div>
              </div>

              <div class="field-grid three-column mt-14">
                <div class="form-field">
                  <label for="deportista-birth-date">Fecha de nacimiento</label>
                  <input
                    id="deportista-birth-date"
                    v-model="form.birthDate"
                    type="date"
                    placeholder="dd/mm/aaaa"
                    :aria-invalid="Boolean(errors.birthDate)"
                    :aria-describedby="errors.birthDate ? 'deportista-birth-date-error' : undefined"
                    @input="clearError('birthDate')"
                  />
                  <span v-if="errors.birthDate" id="deportista-birth-date-error" class="field-error">{{ errors.birthDate }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-age">Edad calculada</label>
                  <input
                    id="deportista-age"
                    :value="computedAge"
                    type="text"
                    readonly
                    placeholder="0 años"
                  />
                </div>

                <div class="form-field">
                  <label for="deportista-eps">EPS</label>
                  <input
                    id="deportista-eps"
                    v-model="form.eps"
                    type="text"
                    maxlength="60"
                    placeholder="Entidad de salud"
                    :aria-invalid="Boolean(errors.eps)"
                    :aria-describedby="errors.eps ? 'deportista-eps-error' : undefined"
                    @input="clearError('eps')"
                  />
                  <span v-if="errors.eps" id="deportista-eps-error" class="field-error">{{ errors.eps }}</span>
                </div>
              </div>
            </section>

            <section class="form-section">
              <h3>Contacto y acudiente</h3>

              <div class="field-grid two-column">
                <div class="form-field">
                  <label for="deportista-guardian">Acudiente</label>
                  <input
                    id="deportista-guardian"
                    v-model="form.guardian"
                    type="text"
                    maxlength="80"
                    autocomplete="name"
                    placeholder="Nombre completo"
                    :aria-invalid="Boolean(errors.guardian)"
                    :aria-describedby="errors.guardian ? 'deportista-guardian-error' : undefined"
                    @input="clearError('guardian')"
                  />
                  <span v-if="errors.guardian" id="deportista-guardian-error" class="field-error">{{ errors.guardian }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-email">Correo electrónico</label>
                  <input
                    id="deportista-email"
                    v-model="form.email"
                    type="email"
                    maxlength="80"
                    autocomplete="email"
                    placeholder="correo@ejemplo.com"
                    :aria-invalid="Boolean(errors.email)"
                    :aria-describedby="errors.email ? 'deportista-email-error' : undefined"
                    @input="clearError('email')"
                  />
                  <span v-if="errors.email" id="deportista-email-error" class="field-error">{{ errors.email }}</span>
                </div>
              </div>

              <div class="field-grid two-column mt-14">
                <div class="form-field">
                  <label for="deportista-phone">Teléfono principal</label>
                  <input
                    id="deportista-phone"
                    v-model="form.phone"
                    type="tel"
                    maxlength="20"
                    autocomplete="tel"
                    placeholder="Número de contacto"
                    :aria-invalid="Boolean(errors.phone)"
                    :aria-describedby="errors.phone ? 'deportista-phone-error' : undefined"
                    @input="clearError('phone')"
                  />
                  <span v-if="errors.phone" id="deportista-phone-error" class="field-error">{{ errors.phone }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-secondary-phone">Segundo teléfono (opcional)</label>
                  <input
                    id="deportista-secondary-phone"
                    v-model="form.secondaryPhone"
                    type="tel"
                    maxlength="20"
                    autocomplete="tel"
                    placeholder="Número alterno"
                    :aria-invalid="Boolean(errors.secondaryPhone)"
                    :aria-describedby="errors.secondaryPhone ? 'deportista-secondary-phone-error' : undefined"
                    @input="clearError('secondaryPhone')"
                  />
                  <span v-if="errors.secondaryPhone" id="deportista-secondary-phone-error" class="field-error">{{ errors.secondaryPhone }}</span>
                </div>
              </div>

              <div class="field-grid single-column mt-14">
                <div class="form-field">
                  <label for="deportista-address">Dirección de residencia</label>
                  <input
                    id="deportista-address"
                    v-model="form.address"
                    type="text"
                    maxlength="120"
                    autocomplete="street-address"
                    placeholder="Barrio, dirección, ciudad"
                    :aria-invalid="Boolean(errors.address)"
                    :aria-describedby="errors.address ? 'deportista-address-error' : undefined"
                    @input="clearError('address')"
                  />
                  <span v-if="errors.address" id="deportista-address-error" class="field-error">{{ errors.address }}</span>
                </div>
              </div>
            </section>

            <section class="form-section">
              <h3>Vinculación al club</h3>

              <div class="field-grid three-column">
                <div class="form-field">
                  <label for="deportista-membership-date">Fecha inicial de mensualidad</label>
                  <input
                    id="deportista-membership-date"
                    v-model="form.membershipStartDate"
                    type="date"
                    :aria-invalid="Boolean(errors.membershipStartDate)"
                    :aria-describedby="errors.membershipStartDate ? 'deportista-membership-date-error' : undefined"
                    @input="clearError('membershipStartDate')"
                  />
                  <span v-if="errors.membershipStartDate" id="deportista-membership-date-error" class="field-error">{{ errors.membershipStartDate }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-site">Sede</label>
                  <select
                    id="deportista-site"
                    v-model="form.site"
                    :aria-invalid="Boolean(errors.site)"
                    :aria-describedby="errors.site ? 'deportista-site-error' : undefined"
                    @change="clearError('site')"
                  >
                    <option value="">Selecciona una sede</option>
                    <option v-for="siteOption in siteOptions" :key="siteOption" :value="siteOption">{{ siteOption }}</option>
                  </select>
                  <span v-if="errors.site" id="deportista-site-error" class="field-error">{{ errors.site }}</span>
                </div>

                <div class="form-field">
                  <label for="deportista-category">Categoría</label>
                  <select
                    id="deportista-category"
                    v-model="form.category"
                    :aria-invalid="Boolean(errors.category)"
                    :aria-describedby="errors.category ? 'deportista-category-error' : undefined"
                    @change="clearError('category')"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                  </select>
                  <span v-if="errors.category" id="deportista-category-error" class="field-error">{{ errors.category }}</span>
                </div>
              </div>
            </section>

            <footer class="modal-actions">
              <button type="button" class="btn btn-secondary" :disabled="isSubmitting" @click="close">Cancelar</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Crear deportista') }}</button>
            </footer>
          </form>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => ['Premini', 'Mini', 'Infantil', 'Juvenil']
  },
  initialData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'saved']);
const isEditing = computed(() => Boolean(props.initialData));
const modalElement = ref(null);
const formError = ref('');
const isSubmitting = ref(false);
const form = reactive(createInitialForm(props.initialData));
const errors = reactive({});
const siteOptions = ['San Valentín'];

const computedAge = computed(() => {
  if (!form.birthDate) return '';

  const birth = new Date(`${form.birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return '';

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return `${age} ${age === 1 ? 'año' : 'años'}`;
});

function createInitialForm(data = null) {
  const safeData = data || {};

  return {
    name: safeData.name || '',
    documentNumber: safeData.documentNumber || '',
    birthDate: safeData.birthDate || '',
    eps: safeData.eps || '',
    guardian: safeData.guardian || '',
    email: safeData.email || '',
    phone: safeData.guardianPhone || safeData.phone || '',
    secondaryPhone: safeData.secondaryPhone || '',
    address: safeData.address || '',
    membershipStartDate: safeData.membershipStartDate || safeData.dueDate ? parseDate(safeData.membershipStartDate || safeData.dueDate) : '',
    site: safeData.site || 'San Valentín',
    category: safeData.category || '',
    balance: safeData.balance ? parseBalance(safeData.balance) : 0
  };
}

function parseBalance(value) {
  return Number(String(value).replace(/[^0-9-]/g, '')) || 0;
}

function parseDate(value) {
  if (!value) return '';

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const [day, monthLabel, year] = String(value).replace('.', '').split(' ');
  const months = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' };

  if (monthLabel && months[monthLabel.toLowerCase()]) {
    return `${year}-${months[monthLabel.toLowerCase()]}-${String(day).padStart(2, '0')}`;
  }

  return value;
}

function clearError(field) {
  delete errors[field];
  formError.value = '';
}

function validate() {
  Object.keys(errors).forEach((field) => delete errors[field]);

  const requiredFields = [
    ['name', 'Ingresa el nombre completo.'],
    ['documentNumber', 'Ingresa el número de documento.'],
    ['birthDate', 'Selecciona la fecha de nacimiento.'],
    ['guardian', 'Ingresa el nombre del acudiente.'],
    ['email', 'Ingresa el correo electrónico.'],
    ['phone', 'Ingresa el teléfono principal.'],
    ['address', 'Ingresa la dirección de residencia.'],
    ['membershipStartDate', 'Selecciona la fecha inicial de mensualidad.'],
    ['site', 'Selecciona una sede.'],
    ['category', 'Selecciona una categoría.']
  ];

  requiredFields.forEach(([field, message]) => {
    if (!String(form[field]).trim()) errors[field] = message;
  });

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Ingresa un correo válido.';
  }

  if (form.phone && !/^[0-9+()\s-]{7,20}$/.test(form.phone.trim())) {
    errors.phone = 'Ingresa un teléfono válido.';
  }

  if (form.secondaryPhone && !/^[0-9+()\s-]{7,20}$/.test(form.secondaryPhone.trim())) {
    errors.secondaryPhone = 'Ingresa un teléfono válido.';
  }

  return Object.keys(errors).length === 0;
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

function formatBalance(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function submitForm() {
  if (!validate()) {
    formError.value = 'Revisa los campos marcados antes de continuar.';
    return;
  }

  isSubmitting.value = true;
  const balance = Number(form.balance) || 0;

  emit('saved', {
    id: props.initialData?.id || `100${Date.now().toString().slice(-3)}`,
    name: form.name.trim(),
    initials: getInitials(form.name),
    documentNumber: form.documentNumber.trim(),
    birthDate: form.birthDate,
    eps: form.eps.trim(),
    guardian: form.guardian.trim(),
    email: form.email.trim(),
    guardianPhone: form.phone.trim(),
    secondaryPhone: form.secondaryPhone.trim(),
    address: form.address.trim(),
    site: form.site,
    category: form.category,
    membershipStartDate: formatDate(form.membershipStartDate),
    dueDate: formatDate(form.membershipStartDate),
    balance: formatBalance(balance),
    status: balance > 0 ? 'En mora' : 'Al día',
    avatarColor: props.initialData?.avatarColor || '#0f766e'
  });

  isSubmitting.value = false;
  emit('close');
}

function close() {
  if (!isSubmitting.value) emit('close');
}

onMounted(async () => {
  await nextTick();
  modalElement.value?.querySelector('input')?.focus();
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
  background: rgba(15, 44, 89, 0.38);
}

.modal-card {
  position: relative;
  width: min(100%, 980px);
  max-height: calc(100vh - 36px);
  overflow-y: auto;
  background: var(--color-surface);
  border: 1px solid rgba(15, 44, 89, 0.04);
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(15, 44, 89, 0.14);
}

.modal-inner {
  padding: 18px 24px 18px;
}

.modal-header {
  margin-bottom: 18px;
}

.modal-kicker {
  margin: 0 0 10px;
  color: var(--color-primary-light);
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.modal-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(1.8rem, 1.6vw + 1.1rem, 2.5rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.modal-subtitle {
  margin-top: 8px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 2.1rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.8;
}

.modal-close:hover {
  opacity: 1;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section {
  background: rgba(148, 165, 190, 0.07);
  border: 1px solid rgba(148, 165, 190, 0.2);
  border-radius: 12px;
  padding: 16px 18px 12px;
}

.form-section h3 {
  margin: 0 0 15px;
  color: var(--color-primary);
  font-size: 1.06rem;
  font-weight: 700;
}

.field-grid {
  display: grid;
  gap: 12px 16px;
}

.field-grid.two-column {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field-grid.three-column {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.field-grid.single-column {
  grid-template-columns: 1fr;
}

.mt-14 {
  margin-top: 12px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-field label {
  color: var(--color-text);
  font-size: 0.72rem;
  font-weight: 700;
}

.form-field input,
.form-field select {
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.85);
  color: var(--color-text);
  font: inherit;
}

.form-field input::placeholder,
.form-field select::placeholder {
  color: #8b96a9;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: var(--color-primary-light);
  box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.12);
}

.form-field input[readonly] {
  background: rgba(231, 236, 244, 0.78);
  color: var(--color-text-muted);
}

.form-field input[aria-invalid='true'],
.form-field select[aria-invalid='true'] {
  border-color: var(--color-error);
}

.field-error {
  min-height: 14px;
  display: block;
  color: var(--color-error);
  font-size: 0.75rem;
}

.form-message.is-error {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(214, 59, 59, 0.2);
  background: rgba(214, 59, 59, 0.08);
  color: var(--color-error);
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 4px;
}

.modal-actions .btn {
  min-width: 146px;
  padding: 10px 16px;
  border: 1px solid transparent;
  border-radius: 10px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color var(--transition), border-color var(--transition), color var(--transition), box-shadow var(--transition);
}

.modal-actions .btn-secondary {
  background: var(--color-surface);
  border-color: rgba(15, 44, 89, 0.14);
  color: var(--color-text);
}

.modal-actions .btn-primary {
  background: var(--color-primary);
  box-shadow: 0 8px 16px rgba(15, 44, 89, 0.12);
}

.modal-actions .btn-secondary {
  background: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text);
}

.modal-actions .btn-secondary:hover {
  background: var(--color-bg);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}

.modal-actions .btn-primary {
  background: var(--color-primary);
  color: var(--color-secondary);
}

.modal-actions .btn-primary:hover {
  background: var(--color-primary-dark);
}

.modal-actions button:disabled {
  cursor: wait;
  opacity: 0.7;
}

@media (max-width: 860px) {
  .field-grid.two-column,
  .field-grid.three-column {
    grid-template-columns: 1fr;
  }

  .modal-inner {
    padding: 22px 18px 18px;
  }
}
</style>
