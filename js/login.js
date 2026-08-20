/* ============================================================
   Sistema de Control de Pagos - Lógica de inicio de sesión
   ------------------------------------------------------------
   JavaScript puro (Vanilla JS) organizado en módulos internos:
   - Utilidades (helpers)
   - Validación de campos
   - Mostrar/ocultar contraseña
   - Envío del formulario con indicador de carga
   ============================================================ */

'use strict';

/* Espera a que el DOM esté completamente cargado */
document.addEventListener('DOMContentLoaded', () => {
  /* ----------------------------------------------------------
     1. Referencias a elementos del DOM
     ---------------------------------------------------------- */
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('toggle-password');
  const submitBtn = document.getElementById('submit-btn');
  const formMessage = document.getElementById('form-message');
  const yearSpan = document.getElementById('year');

  /* Mostrar el año actual en el pie */
  yearSpan.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     2. Utilidades (helpers reutilizables)
     ---------------------------------------------------------- */

  /**
   * Muestra un mensaje de error debajo de un campo concreto.
   * @param {HTMLInputElement} input - Campo afectado.
   * @param {string} message - Texto del error.
   */
  function showFieldError(input, message) {
    const errorEl = document.querySelector(`[data-error-for="${input.id}"]`);
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    if (errorEl) errorEl.textContent = message;
  }

  /**
   * Limpia el error de un campo concreto.
   * @param {HTMLInputElement} input - Campo a limpiar.
   */
  function clearFieldError(input) {
    const errorEl = document.querySelector(`[data-error-for="${input.id}"]`);
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = '';
  }

  /**
   * Muestra un mensaje global (error o éxito).
   * @param {string} message - Texto a mostrar.
   * @param {'error'|'success'} type - Tipo de mensaje.
   */
  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('is-error', 'is-success');
    formMessage.classList.add(type === 'success' ? 'is-success' : 'is-error');
    formMessage.hidden = false;
  }

  /** Oculta el mensaje global. */
  function hideFormMessage() {
    formMessage.hidden = true;
    formMessage.textContent = '';
  }

  /**
   * Valida el formato de un correo electrónico.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  /* ----------------------------------------------------------
     3. Validación de campos
     ---------------------------------------------------------- */

  /**
   * Valida todos los campos obligatorios.
   * @returns {boolean} true si el formulario es válido.
   */
  function validateForm() {
    let isValid = true;

    // Validar correo
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      showFieldError(emailInput, 'El correo electrónico es obligatorio.');
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showFieldError(emailInput, 'Ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    // Validar contraseña
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === '') {
      showFieldError(passwordInput, 'La contraseña es obligatoria.');
      isValid = false;
    } else if (passwordValue.length < 6) {
      showFieldError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      clearFieldError(passwordInput);
    }

    return isValid;
  }

  /* Limpia el error de cada campo mientras el usuario escribe */
  emailInput.addEventListener('input', () => clearFieldError(emailInput));
  passwordInput.addEventListener('input', () => clearFieldError(passwordInput));

  /* ----------------------------------------------------------
     4. Mostrar / ocultar contraseña
     ---------------------------------------------------------- */
  toggleBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';

    // Alterna los iconos (ojo / ojo tachado)
    toggleBtn.querySelector('.icon-eye').hidden = isHidden;
    toggleBtn.querySelector('.icon-eye-off').hidden = !isHidden;

    // Accesibilidad
    toggleBtn.setAttribute('aria-pressed', String(isHidden));
    toggleBtn.setAttribute(
      'aria-label',
      isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );
  });

  /* ----------------------------------------------------------
     5. Control del estado de carga del botón
     ---------------------------------------------------------- */
  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Iniciando sesión...';
    } else {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Iniciar sesión';
    }
  }

  /* ----------------------------------------------------------
     6. Simulación de autenticación
     ------------------------------------------------------------
     Reemplaza esta función por una llamada real a tu API
     (fetch/async) cuando conectes el backend.
     ---------------------------------------------------------- */
  function authenticate(email, password) {
    return new Promise((resolve) => {
      // Simula una petición de red de 1.5 segundos
      setTimeout(() => {
        // Credenciales de ejemplo para pruebas
        const DEMO_EMAIL = 'admin@pagos.com';
        const DEMO_PASSWORD = '123456';

        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          resolve({ ok: true });
        } else {
          resolve({ ok: false, message: 'Correo o contraseña incorrectos.' });
        }
      }, 1500);
    });
  }

  /* ----------------------------------------------------------
     7. Envío del formulario
     ---------------------------------------------------------- */
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideFormMessage();

    // Valida antes de continuar
    if (!validateForm()) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    setLoading(true);

    try {
      const result = await authenticate(email, password);

      if (result.ok) {
        showFormMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
        // Redirección al dashboard (ajusta la ruta según tu proyecto)
        setTimeout(() => {
          window.location.href = './dashboard.html';
          console.log('[v0] Redirigir al dashboard aquí.');
        }, 1200);
      } else {
        showFormMessage(result.message, 'error');
        setLoading(false);
      }
    } catch (error) {
      showFormMessage('Ocurrió un error inesperado. Inténtalo de nuevo.', 'error');
      setLoading(false);
      console.log('[v0] Error de autenticación:', error);
    }
  });
});
