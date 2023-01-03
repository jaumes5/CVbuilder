const displayForm = document.getElementById('display-options');

displayForm.addEventListener('change', (event) => {
  const section = event.target.name.replace('display-', '');
  const element = document.getElementById(section);
  element.style.display = event.target.checked ? '' : 'none';
});