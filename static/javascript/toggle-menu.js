window.onload = () => {
  const menu = document.getElementById("menu");
  const main = document.getElementById("shift_div");
  const toggleButton = document.getElementById("menu-toggle");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    main.classList.toggle("shift");
    toggleButton.classList.toggle("hidden");
  });
};
