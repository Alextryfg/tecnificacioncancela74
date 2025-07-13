document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const hero = document.querySelector(".hero-section");

  setTimeout(() => {
    preloader.style.opacity = "0";

    setTimeout(() => {
      preloader.remove();
      hero.style.display = "flex";

      // Activa animaciones ya definidas por CSS
      document.querySelector(".hero-text").classList.add("fade-in-text");
      document.querySelector(".hero-image").classList.add("fade-in-image");
    }, 1000);
  }, 2000); // 2s de preloader antes de mostrar hero
});
