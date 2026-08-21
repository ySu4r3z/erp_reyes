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
        <header class="modal-header">
          <div>
            <p class="modal-overline">Directorio del club</p>
            <h2 id="deportista-modal-title">{{ isEditing ? 'Editar deportista' : 'Nuevo deportista' }}</h2>
            <p class="modal-subtitle">{{ isEditing ? 'Actualiza los datos del deportista y su acudiente.' : 'Registra los datos básicos del deportista y su acudiente.' }}</p>
          </div>
          <button type="button" class="modal-close" aria-label="Cerrar formulario" @click="close">&times;</button>
        </header>

        <form class="modal-form" novalidate @submit.prevent="submitForm">
          <div v-if="formError" class="form-message is-error" role="alert">{{ formError }}</div>

          <div class="modal-form-grid">
            <div class="form-field modal-field-wide">
              <label for="deportista-name">Nombre completo <span aria-hidden="true">*</span></label>
              <input
                id="deportista-name"
                v-model="form.name"
                type="text"
                maxlength="80"
                autocomplete="name"
                required
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'deportista-name-error' : undefined"
                @input="clearError('name')"
              />
              <span v-if="errors.name" id="deportista-name-error" class="field-error">{{ errors.name }}</span>
            </div>

            <div class="form-field">
              <label for="deportista-category">Categoría <span aria-hidden="true">*</span></label>
              <select
                id="deportista-category"
                v-model="form.category"
                required
                :aria-invalid="Boolean(errors.category)"
                :aria-describedby="errors.category ? 'deportista-category-error' : undefined"
                @change="clearError('category')"
              >
                <option value="">Selecciona una categoría</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
              <span v-if="errors.category" id="deportista-category-error" class="field-error">{{ errors.category }}</span>
            </div>

            <div class="form-field">
              <label for="deportista-due-date">Próximo vencimiento <span aria-hidden="true">*</span></label>
              <input
                id="deportista-due-date"
                v-model="form.dueDate"
                type="date"
                required
                :aria-invalid="Boolean(errors.dueDate)"
                :aria-describedby="errors.dueDate ? 'deportista-due-date-error' : undefined"
                @input="clearError('dueDate')"
              />
              <span v-if="errors.dueDate" id="deportista-due-date-error" class="field-error">{{ errors.dueDate }}</span>
            </div>

            <div class="form-field">
              <label for="deportista-guardian">Acudiente <span aria-hidden="true">*</span></label>
              <input
                id="deportista-guardian"
                v-model="form.guardian"
                type="text"
                maxlength="80"
                autocomplete="name"
                required
                :aria-invalid="Boolean(errors.guardian)"
                :aria-describedby="errors.guardian ? 'deportista-guardian-error' : undefined"
                @input="clearError('guardian')"
              />
              <span v-if="errors.guardian" id="deportista-guardian-error" class="field-error">{{ errors.guardian }}</span>
            </div>

            <div class="form-field">
              <label for="deportista-phone">Teléfono del acudiente <span aria-hidden="true">*</span></label>
              <input
                id="deportista-phone"
                v-model="form.guardianPhone"
                type="tel"
                maxlength="20"
                autocomplete="tel"
                required
                :aria-invalid="Boolean(errors.guardianPhone)"
                :aria-describedby="errors.guardianPhone ? 'deportista-phone-error' : undefined"
                @input="clearError('guardianPhone')"
              />
              <span v-if="errors.guardianPhone" id="deportista-phone-error" class="field-error">{{ errors.guardianPhone }}</span>
            </div>

            <div class="form-field">
              <label for="deportista-balance">Saldo pendiente</label>
              <input
                id="deportista-balance"
                v-model="form.balance"
                type="number"
                min="0"
                max="999999999"
                step="1000"
                inputmode="numeric"
                :aria-invalid="Boolean(errors.balance)"
                :aria-describedby="errors.balance ? 'deportista-balance-error' : undefined"
                @input="clearError('balance')"
              />
              <span v-if="errors.balance" id="deportista-balance-error" class="field-error">{{ errors.balance }}</span>
            </div>
          </div>

          <footer class="modal-actions">
            <button type="button" class="btn btn-secondary" :disabled="isSubmitting" @click="close">Cancelar</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar cambios' : 'Guardar deportista') }}</button>
          </footer>
        </form>
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

// Crea un formulario vacío para nuevos registros o precargado para editar uno existente.
function createInitialForm(data = null) {
  const balance = data ? parseBalance(data.balance) : 0;

  return {
    name: data?.name || '',
    category: data?.category || '',
    guardian: data?.guardian || '',
    guardianPhone: data?.guardianPhone || '',
    dueDate: data ? parseDate(data.dueDate) : '',
    balance
  };
}

function parseBalance(value) {
  return Number(String(value).replace(/[^0-9-]/g, '')) || 0;
}

// La tabla muestra la fecha en formato localizado; el input date necesita YYYY-MM-DD.
function parseDate(value) {
  if (!value) return '';
  const [day, monthLabel, year] = value.replace('.', '').split(' ');
  const months = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12' };
  return months[monthLabel?.toLowerCase()] ? `${year}-${months[monthLabel.toLowerCase()]}-${day.padStart(2, '0')}` : value;
}

function clearError(field) {
  delete errors[field];
  formError.value = '';
}

// Centraliza las reglas del formulario para impedir registros incompletos o con datos inválidos.
function validate() {
  Object.keys(errors).forEach((field) => delete errors[field]);
  const requiredFields = [
    ['name', 'Ingresa el nombre completo.'],
    ['category', 'Selecciona una categoría.'],
    ['guardian', 'Ingresa el nombre del acudiente.'],
    ['guardianPhone', 'Ingresa el teléfono del acudiente.'],
    ['dueDate', 'Selecciona una fecha de vencimiento.']
  ];

  requiredFields.forEach(([field, message]) => {
    if (!String(form[field]).trim()) errors[field] = message;
  });

  if (form.guardianPhone && !/^[0-9+()\s-]{7,20}$/.test(form.guardianPhone.trim())) {
    errors.guardianPhone = 'Ingresa un teléfono válido.';
  }

  if (Number(form.balance) < 0 || Number(form.balance) > 999999999) {
    errors.balance = 'El saldo debe estar entre 0 y 999.999.999.';
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
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
}

function formatBalance(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(value) || 0);
}

// Convierte los valores del formulario al modelo que utiliza la tabla y conserva el id al editar.
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
    category: form.category,
    guardian: form.guardian.trim(),
    guardianPhone: form.guardianPhone.trim(),
    dueDate: formatDate(form.dueDate),
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

// Enfoca el primer campo para que el formulario pueda utilizarse inmediatamente con teclado.
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
  background: rgba(15, 44, 89, 0.42);
}

.modal-card {
  width: min(100%, 680px);
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.modal-header,
.modal-actions {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
}

.modal-header { border-bottom: 1px solid var(--color-border); }
.modal-overline { color: var(--color-primary-light); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
.modal-header h2 { margin-top: 4px; color: var(--color-primary); font-size: 1.3rem; }
.modal-subtitle { margin-top: 4px; color: var(--color-text-muted); font-size: 0.88rem; }
.modal-close { border: 0; background: transparent; color: var(--color-text-muted); font-size: 1.7rem; line-height: 1; cursor: pointer; }
.modal-form { padding: 24px; }
.modal-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.modal-field-wide { grid-column: 1 / -1; }
.form-field label { display: block; margin-bottom: 7px; color: var(--color-text); font-size: 0.85rem; font-weight: 600; }
.form-field label span { color: var(--color-error); }
.form-field input,
.form-field select { width: 100%; padding: 11px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: #f8fafd; color: var(--color-text); font: inherit; }
.form-field input:focus,
.form-field select:focus { outline: none; border-color: var(--color-primary-light); box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.15); }
.form-field input[aria-invalid='true'],
.form-field select[aria-invalid='true'] { border-color: var(--color-error); }
.field-error { min-height: 16px; display: block; margin-top: 5px; color: var(--color-error); font-size: 0.78rem; }
.modal-actions { justify-content: flex-end; padding: 20px 0 0; }
.modal-actions .btn {
  min-width: 150px;
  padding: 11px 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition), border-color var(--transition), color var(--transition), box-shadow var(--transition);
}
.modal-actions .btn-primary { background-color: var(--color-primary); color: var(--color-secondary); }
.modal-actions .btn-primary:hover { background-color: var(--color-primary-dark); }
.modal-actions .btn-primary:focus-visible,
.modal-actions .btn-secondary:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(28, 74, 138, 0.2); }
.modal-actions .btn-secondary { background-color: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted); }
.modal-actions .btn-secondary:hover { background-color: var(--color-bg); border-color: var(--color-primary-light); color: var(--color-primary); }
.modal-actions button:disabled { cursor: wait; opacity: 0.65; }

@media (max-width: 620px) {
  .modal-form-grid { grid-template-columns: 1fr; }
  .modal-field-wide { grid-column: auto; }
  .modal-header, .modal-form { padding: 20px; }
}
</style>
