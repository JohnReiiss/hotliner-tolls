
const sidebar = document.getElementById('sidebar');

sidebar.addEventListener('mouseenter', () => {
  sidebar.classList.remove('collapsed');
});

sidebar.addEventListener('mouseleave', () => {
  sidebar.classList.add('collapsed');
});

window.addEventListener('DOMContentLoaded', () => {
  sidebar.classList.add('collapsed');
});
