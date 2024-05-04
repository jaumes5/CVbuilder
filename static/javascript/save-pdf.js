// Get the button element
const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', () => {
  // Get the HTML content of the page
  const content = document.body.cloneNode(true);

  const navMenu = content.querySelector('#menu');
  const main = content.querySelector('#shift_div');
  const toggleButton = content.querySelector('#menu-toggle');

  // Hide the navigation menu
  navMenu.style.display = 'none';
  toggleButton.style.display = 'none';
  main.style.marginLeft = '0';


  // Create a new instance of html2pdf and save the PDF
  html2pdf().set({ html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } }).from(content).save("CVJaimeBoixados.pdf").then(() => {
  });
});