document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inscripcion-form");
  const successOverlay = document.getElementById("form-success");
  const fechaSelect = form.querySelector("select[name='fecha']");
  const turnoSelect = form.querySelector("select[name='turno']");
  const estadoTurno = document.getElementById("estado-turno");

  const carousel = new bootstrap.Carousel('#carouselExample', {
    interval: 3000, // tiempo entre imágenes
    ride: 'carousel',
    pause: false,   // sigue aunque el ratón esté encima
    wrap: true      // vuelve al inicio al llegar al final
  });

  async function comprobarDisponibilidad() {
    estadoTurno.innerHTML = ""; // Limpia mensajes anteriores
    const fecha = fechaSelect.value;
    const turno = turnoSelect.value;

    if (!fecha || !turno) return;

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true; // Desactiva mientras se consulta
    var jugadores;
    var porteros;

    jugadores = 0;
    porteros = 0;


    try {
      const res = await fetch("https://hook.eu2.make.com/uflwixgo7cjvcrkrvqtrxxffxdlsrmgw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, turno }),
      });



      const data = await res.json();

      jugadores = data.jugadores || 0;
      porteros = data.porteros || 0;

      document.getElementById("num-jugadores").textContent = `${jugadores}/6`;
      document.getElementById("num-porteros").textContent = `${porteros}/2`;

      const jugadoresCompletos = jugadores >= 6;
      const porterosCompletos = porteros >= 2;

      const rol = form.querySelector("select[name='rol']").value;

      let bloqueo = false;

      if ((rol === "jugador" && jugadoresCompletos) || (rol === "portero" && porterosCompletos)) {
        estadoTurno.innerHTML += `
          <div class="text-danger mt-2 fw-bold">❌ Este turno está completo para tu rol.</div>
        `;
        bloqueo = true;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = bloqueo;
      submitBtn.classList.toggle("btn-disabled", bloqueo);

      

    } catch (error) {
      console.error("Error al comprobar disponibilidad:", error);
      estadoTurno.innerHTML = `<div class="alert alert-danger mt-2">Error al consultar disponibilidad.</div>`;
    }
  }

  fechaSelect.addEventListener("change", comprobarDisponibilidad);
  turnoSelect.addEventListener("change", comprobarDisponibilidad);
  form.querySelector("select[name='rol']").addEventListener("change", comprobarDisponibilidad);

  comprobarDisponibilidad(); // Opcional: ejecutar al cargar

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const json = Object.fromEntries(data.entries());

    fetch("https://hook.eu2.make.com/4skux3goyqwbyris5x17djwpj329rrhv", {
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
