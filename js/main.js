document.getElementById('inscripcion-form').addEventListener('submit', function(e) {
    // Mensaje de confirmación local (el correo lo envía Formspree/Netlify)
    alert('¡Inscripción enviada! Recibirás un correo de confirmación.');
    // Aquí podrías añadir integración con Google Calendar (ver abajo)
});

// Ejemplo básico de generación de enlace a Google Calendar
function addToGoogleCalendar(nombre, fecha) {
    const event = {
        text: 'Tecnificación Cancela 74',
        dates: fecha.replace(/-/g, '') + 'T100000Z/' + fecha.replace(/-/g, '') + 'T130000Z',
        details: 'Hockey sobre patines - Tecnificación Cancela 74',
        location: 'Pista Cancela 74',
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
}
