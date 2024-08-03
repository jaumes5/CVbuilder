import { toggleEasterEgg } from './easter.js';

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle-design');
  if (toggleButton) {
    toggleButton.addEventListener('click', function() {
      toggleEasterEgg();
      toggleButton.classList.toggle('active');
      const currentLink = document.getElementById('design-link');
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.id = 'design-link';

      if (currentLink.getAttribute('href') === '/static/stylesheets/style-no-grid.css') {
        newLink.href = '/static/stylesheets/style-grid.css';
      } else {
        newLink.href = '/static/stylesheets/style-no-grid.css';
      }

      document.head.replaceChild(newLink, currentLink);
    });
  }
});