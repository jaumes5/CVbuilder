// Get the button element
const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', () => {
  // Get the HTML content of the page
  const content = document.body.cloneNode(true);

  const navMenu = content.querySelector('#menu');
  const main = content.querySelector('#shift_div');
  const toggleButton = content.querySelector('#menu-toggle');
  const easter_egg = content.querySelector('#easter-egg');

  // Change the design to the no-grid version
  // TODO Make the design compatible with the PDF
  const currentLink = document.getElementById('design-link');
  const newLink = document.createElement('link');
  newLink.rel = 'stylesheet';
  newLink.id = 'design-link';
  const designButton = document.getElementById('toggle-design');

  if (currentLink.getAttribute('href') === '/static/stylesheets/style-grid.css') {
        newLink.href = '/static/stylesheets/style-no-grid.css';
        designButton.classList.toggle('active');
        document.head.replaceChild(newLink, currentLink);
  }

  // Hide the navigation menu
  navMenu.style.display = 'none';
  toggleButton.style.display = 'none';
  easter_egg.style.display = 'none';
  main.style.marginLeft = '0';


  // Create a new instance of html2pdf and save the PDF
  html2pdf().set({ html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(content).save("CVJaimeBoixados.pdf").then(() => {
  });
});