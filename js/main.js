document.addEventListener('DOMContentLoaded', async () => {
  const dashboardContainer = document.getElementById('dashboard');

  if (!dashboardContainer) return;

  try {
    const response = await fetch('dashboard.html');

    if (!response.ok) {
      throw new Error(`No se pudo cargar dashboard.html (${response.status})`);
    }

    const html = await response.text();
    console.log(html)
    const parsedDocument = new DOMParser().parseFromString(html, 'text/html');
    dashboardContainer.innerHTML = parsedDocument.body.innerHTML;
  } catch (error) {
    console.error('Error al cargar dashboard.html:', error);
    dashboardContainer.innerHTML = '<p>No se pudo cargar el contenido del dashboard.</p>';
  }
});