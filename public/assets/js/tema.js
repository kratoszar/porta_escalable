const btn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Cargar preferencia guardada o detectar la del sistema
const guardado = localStorage.getItem('tema');
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (guardado === 'oscuro' || (!guardado && prefiereOscuro)) {
  html.classList.add('dark');
  if (btn) btn.textContent = 'Modo claro';
}

if (btn) {
  btn.addEventListener('click', () => {
    const esOscuro = html.classList.toggle('dark');
    btn.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
  });
}