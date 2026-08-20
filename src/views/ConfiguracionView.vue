<template>
  <!-- Vista de configuración para ajustes de empresa y datos de contacto -->
  <section class="panel">
    <div class="panel-head">
      <div>
        <h2 class="panel-title">Configuración</h2>
        <p class="panel-subtitle">Ajustes del sistema y preferencias del usuario</p>
      </div>
      <button class="btn btn-primary btn-large">Guardar cambios</button>
    </div>

    <div class="form-card">
      <div class="form-grid">
        <div class="form-field">
          <label for="empresa">Nombre de la empresa</label>
          <input id="empresa" type="text" value="Reyes Deportes" readonly />
        </div>
        <div class="form-field">
          <label for="moneda">Moneda principal</label>
          <input id="moneda" type="text" value="PESO MXN" readonly />
        </div>
        <div class="form-field">
          <label for="email">Correo de notificaciones</label>
          <input id="email" type="email" placeholder="notificaciones@empresa.com" />
        </div>
        <div class="form-field">
          <label for="telefono">Teléfono de contacto</label>
          <input id="telefono" type="tel" placeholder="55 1234 5678" />
        </div>
      </div>

      <div class="form-note">
        Ajustes de notificación y datos de empresa. Asegúrate de revisar los datos antes de guardar.
      </div>
    </div>
  </section>
</template>
