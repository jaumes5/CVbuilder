// Define easterEgg
const easterEgg = document.getElementById('easter-egg');

function showCustomAlert(message) {
  const customAlert = document.getElementById('custom-alert');
  const customAlertMessage = document.getElementById('custom-alert-message');
  const customAlertClose = document.getElementById('custom-alert-close');

  customAlertMessage.textContent = message;
  customAlert.classList.remove('hidden');

  customAlertClose.addEventListener('click', () => {
    customAlert.classList.add('hidden');
  });
}

easterEgg.addEventListener('click', () => {
  // Create the confetti effect
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Show the custom alert box
  showCustomAlert('Congratulations! You found the Easter egg! Please mention "EASTER EGG" in your message to me.');
});