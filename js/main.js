document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inscripcion-form");
  const successOverlay = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const json = Object.fromEntries(data.entries());

    fetch("https://hook.eu2.make.com/d1uvsbxvjuh3lp6vpz1f3fsj1rsyxxsw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    })
      .then((res) => {
        if (res.ok) {
          form.reset();
          successOverlay.classList.add("show");

          setTimeout(() => {
            successOverlay.classList.remove("show");
          }, 3000);
        } else {
          alert("Error al enviar el formulario.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("No se pudo enviar el formulario.");
      });
  });
});
