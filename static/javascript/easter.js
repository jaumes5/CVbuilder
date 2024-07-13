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

export function toggleEasterEgg() {
  const easterEggChance = 0.1; // 10% chance to show the easter egg
  const easterEggDuration = 1000; // Duration of the easter egg in milliseconds

  if (Math.random() < easterEggChance) {
    const easterEggElement = document.getElementById('easter-egg');
    easterEggElement.classList.add('simulate-hover');

    setTimeout(() => {
      easterEggElement.classList.remove('simulate-hover');
    }, easterEggDuration);

    easterEggElement.style.display = 'block'; // Make the easter egg visible
  }
}