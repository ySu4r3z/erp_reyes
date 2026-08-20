<template>
  <section class="panel panel-deportistas">
    <div class="panel-head panel-head-spaced">
      <div>
        <p class="panel-overline">Directorio del club</p>
        <h2 class="panel-title">Deportistas</h2>
        <p class="panel-subtitle">Administra los datos, acudientes y situación de cada niño.</p>
      </div>
      <button class="btn-primary">+ Nuevo deportista</button>
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
            <th>Categoría</th>
            <th>Acudiente</th>
            <th>Vencimiento</th>
            <th class="ta-right">Saldo</th>
            <th>Estado</th>
            <th></th>
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
            <td>{{ deportista.category }}</td>
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
                  'badge-warning': deportista.status === 'Próximo'
                }"
              >{{ deportista.status }}</span>
            </td>
            <td class="ta-right">
              <button class="link-button">Registrar pago</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

const search = ref('');
const categoryFilter = ref('');
const statusFilter = ref('');

const deportistas = ref([
  { id: '100241', name: 'Salomé Solórzano', initials: 'SS', category: 'Mini', guardian: 'Laura Solórzano', guardianPhone: '310 456 8021', dueDate: '23 jul. 2026', balance: '$ 65.000', status: 'En mora', avatarColor: '#d95c82' },
  { id: '100242', name: 'Sara Sepúlveda', initials: 'SP', category: 'Juvenil', guardian: 'Carlos Sepúlveda', guardianPhone: '312 883 9012', dueDate: '20 ago. 2026', balance: '$ 0', status: 'Al día', avatarColor: '#de9d4b' },
  { id: '100243', name: 'Samuel Hinestroza', initials: 'SH', category: 'Infantil', guardian: 'María Hinestroza', guardianPhone: '315 201 6407', dueDate: '28 jul. 2026', balance: '$ 0', status: 'Próximo', avatarColor: '#3b7bb1' },
  { id: '100244', name: 'Valentina García', initials: 'VG', category: 'Premini', guardian: 'Mónica García', guardianPhone: '301 771 2045', dueDate: '15 jun. 2026', balance: '$ 110.000', status: 'En mora', avatarColor: '#7b5fc8' },
  { id: '100245', name: 'Martín Rojas', initials: 'MR', category: 'Mini', guardian: 'Diana Rojas', guardianPhone: '316 720 4511', dueDate: '02 ago. 2026', balance: '$ 0', status: 'Al día', avatarColor: '#1f9d5b' },
  { id: '100246', name: 'Luciana Pérez', initials: 'LP', category: 'Infantil', guardian: 'Andrés Pérez', guardianPhone: '300 610 9928', dueDate: '09 jul. 2026', balance: '$ 45.000', status: 'En mora', avatarColor: '#c47a65' }
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
</script>
