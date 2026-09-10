<template>
  <section class="panel panel-deportistas">
    <div class="panel-head panel-head-spaced">
      <div>
        <p class="panel-overline">Directorio del club</p>
        <h2 class="panel-title">Deportistas</h2>
        <p class="panel-subtitle">Administra los datos, acudientes y situación de cada niño.</p>
      </div>
      <button type="button" class="btn-primary btn-new-deportista" @click="isFormOpen = true">+ Nuevo deportista</button>
    </div>

    <div class="deportistas-toolbar">
      <div class="deportistas-search">
        <span class="input-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="search"
          v-model="search"
          placeholder="Buscar deportista o acudiente..."
          aria-label="Buscar deportista o acudiente"
        />
      </div>

      <div class="deportistas-filters">
        <select v-model="categoryFilter" aria-label="Filtrar por categoría">
          <option value="">Todas las categorías</option>
          <option v-for="category in categoryOptions" :key="category" :value="category">{{ category }}</option>
        </select>
        <select v-model="statusFilter" aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <div class="panel-head panel-head-subtle">
      <p class="panel-note"><strong>{{ filteredDeportistas.length }}</strong> deportistas</p>
      <p class="panel-note">Sede: San Valentín</p>
    </div>

    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th>Deportista</th>
            <th>Sede</th>
            <th>Acudiente</th>
            <th>Vencimiento</th>
            <th class="ta-right">Saldo</th>
            <th>Estado</th>
            <th class="ta-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="deportista in filteredDeportistas" :key="deportista.id">
            <td>
              <div class="cell-client">
                <span class="cell-avatar" :style="{ backgroundColor: deportista.avatarColor }">{{ deportista.initials }}</span>
                <div>
                  <strong>{{ deportista.name }}</strong>
                  <div class="field-secondary">ID {{ deportista.id }}</div>
                </div>
              </div>
            </td>
            <td>
              <div>{{ deportista.site || 'San Valentín' }}</div>
              <div class="field-secondary">{{ deportista.category }}</div>
            </td>
            <td>
              <div>{{ deportista.guardian }}</div>
              <div class="field-secondary">{{ deportista.guardianPhone }}</div>
            </td>
            <td>{{ deportista.dueDate }}</td>
            <td class="ta-right cell-amount">{{ deportista.balance }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'badge-danger': deportista.status === 'En mora',
                  'badge-success': deportista.status === 'Al día',
                  'badge-warning': deportista.status === 'Próximo',
                  'badge-inactive': deportista.status === 'Inactivo'
                }"
              >{{ deportista.status }}</span>
            </td>
            <td class="ta-right action-cell">
              <div class="row-actions">
                <button type="button" class="link-button btn-update" @click="openEditForm(deportista)">Actualizar</button>
                <button type="button" class="link-button" @click="registerPayment(deportista)">Registrar pago</button>
                <button type="button" class="link-button" @click="viewWallet(deportista)">Ver cartera</button>
                <button type="button" class="link-button link-button-danger" @click="deactivateDeportista(deportista)">Inactivar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <DeportistaFormModal
    v-if="isFormOpen"
    :categories="categoryOptions"
    :initial-data="selectedDeportista"
    @close="closeForm"
    @saved="saveDeportista"
  />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DeportistaFormModal from '../components/deportistas/DeportistaFormModal.vue';

const router = useRouter();
const search = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');
const isFormOpen = ref(false);
const selectedDeportista = ref(null);

// Datos locales de demostración; posteriormente pueden reemplazarse por datos de una API.
const deportistas = ref([
  { id: '100241', name: 'Salomé Solórzano', initials: 'SS', category: 'Mini', site: 'San Valentín', guardian: 'Laura Solórzano', guardianPhone: '310 456 8021', dueDate: '23 jul. 2026', balance: '$ 65.000', status: 'En mora', avatarColor: '#d95c82' },
  { id: '100242', name: 'Sara Sepúlveda', initials: 'SP', category: 'Juvenil', site: 'San Valentín', guardian: 'Carlos Sepúlveda', guardianPhone: '312 883 9012', dueDate: '20 ago. 2026', balance: '$ 0', status: 'Al día', avatarColor: '#de9d4b' },
  { id: '100243', name: 'Samuel Hinestroza', initials: 'SH', category: 'Infantil', site: 'San Valentín', guardian: 'María Hinestroza', guardianPhone: '315 201 6407', dueDate: '28 jul. 2026', balance: '$ 0', status: 'Próximo', avatarColor: '#3b7bb1' },
  { id: '100244', name: 'Valentina García', initials: 'VG', category: 'Premini', site: 'San Valentín', guardian: 'Mónica García', guardianPhone: '301 771 2045', dueDate: '15 jun. 2026', balance: '$ 110.000', status: 'En mora', avatarColor: '#7b5fc8' },
  { id: '100245', name: 'Martín Rojas', initials: 'MR', category: 'Mini', site: 'San Valentín', guardian: 'Diana Rojas', guardianPhone: '316 720 4511', dueDate: '02 ago. 2026', balance: '$ 0', status: 'Al día', avatarColor: '#1f9d5b' },
  { id: '100246', name: 'Luciana Pérez', initials: 'LP', category: 'Infantil', site: 'San Valentín', guardian: 'Andrés Pérez', guardianPhone: '300 610 9928', dueDate: '09 jul. 2026', balance: '$ 45.000', status: 'En mora', avatarColor: '#c47a65' }
]);

const categoryOptions = computed(() => {
  return [...new Set(deportistas.value.map((item) => item.category))];
});

const statusOptions = computed(() => {
  return [...new Set(deportistas.value.map((item) => item.status))];
});

const filteredDeportistas = computed(() => {
  return deportistas.value.filter((item) => {
    const matchesSearch = [item.name, item.guardian].some((value) => value.toLowerCase().includes(search.value.toLowerCase()));
    const matchesCategory = categoryFilter.value ? item.category === categoryFilter.value : true;
    const matchesStatus = statusFilter.value ? item.status === statusFilter.value : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });
});

// Inserta los nuevos registros al inicio para que sean visibles inmediatamente.
function addDeportista(deportista) {
  deportistas.value.unshift(deportista);
}

// Guarda el registro seleccionado para que el modal cargue sus datos actuales.
function openEditForm(deportista) {
  selectedDeportista.value = deportista;
  isFormOpen.value = true;
}

function saveDeportista(deportista) {
  const existingIndex = deportistas.value.findIndex((item) => item.id === deportista.id);

  // Si el id ya existe se actualiza; de lo contrario se trata de un registro nuevo.
  if (existingIndex === -1) {
    addDeportista(deportista);
  } else {
    deportistas.value[existingIndex] = deportista;
  }

  closeForm();
}

function closeForm() {
  isFormOpen.value = false;
  selectedDeportista.value = null;
}

function registerPayment(deportista) {
  router.push({ name: 'pagos-y-recibos', query: { deportistaId: deportista.id } });
}

function viewWallet(deportista) {
  router.push({ name: 'cartera', query: { deportistaId: deportista.id } });
}

function deactivateDeportista(deportista) {
  const confirmed = window.confirm(`¿Inactivar a ${deportista.name}?`);

  if (confirmed) {
    deportista.status = 'Inactivo';
  }
}
</script>

<style scoped>
.panel-deportistas {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.btn-new-deportista {
  width: auto;
  min-width: 180px;
  padding: 11px 18px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 10px 18px rgba(15, 44, 89, 0.12);
}

.deportistas-toolbar {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
}

.deportistas-search {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f8fafd;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12px 14px 12px 44px;
}

.deportistas-search .input-icon {
  position: absolute;
  left: 14px;
  display: flex;
  color: var(--color-text-muted);
}

.deportistas-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
}

.deportistas-filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.deportistas-filters select {
  min-width: 180px;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
  background-color: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.field-secondary {
  font-size: 0.72rem;
  color: var(--color-text-muted);
}

.data-table {
  min-width: 820px;
}

.data-table th {
  padding: 9px 10px;
  font-size: 0.67rem;
}

.data-table td {
  padding: 10px;
  font-size: 0.82rem;
  vertical-align: middle;
}

.cell-client {
  gap: 8px;
}

.cell-client strong {
  font-size: 0.82rem;
}

.cell-avatar {
  width: 30px;
  height: 30px;
  font-size: 0.68rem;
}

.cell-amount {
  font-size: 0.82rem;
}

.badge {
  padding: 4px 9px;
  font-size: 0.68rem;
}

.badge-inactive {
  color: var(--color-text-muted);
  background-color: rgba(107, 118, 136, 0.12);
}

.action-cell {
  min-width: 118px;
}

.row-actions {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  min-width: 112px;
}

.link-button {
  font-size: 0.68rem;
  line-height: 1.35;
  white-space: nowrap;
}

.link-button-danger {
  color: var(--color-error);
}

@media (max-width: 900px) {
  .deportistas-toolbar {
    grid-template-columns: 1fr;
  }

  .deportistas-filters {
    width: 100%;
  }
}
</style>
