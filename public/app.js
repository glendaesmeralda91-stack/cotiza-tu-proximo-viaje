const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fd = new FormData(form);

  const nombre = fd.get('nombre') || '';
  const telefono = fd.get('telefono') || '';
  const correo = fd.get('correo') || '';
  const origen = fd.get('origen') || '';
  const destino = fd.get('destino') || '';
  const salida = fd.get('salida') || '';
  const regreso = fd.get('regreso') || '';
  const pasajeros = fd.get('pasajeros') || '';
  const tipo = fd.get('tipo') || '';
  const servicios = fd.getAll('servicios').join(', ');
  const presupuesto = fd.get('presupuesto') || '';
  const observaciones = fd.get('observaciones') || '';

  const mensaje =
`Hola, quisiera solicitar información y una cotización de viaje.

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo}
Origen: ${origen}
Destino: ${destino}
Salida: ${salida}
Regreso: ${regreso}
Pasajeros: ${pasajeros}
Tipo de viaje: ${tipo}
Servicios: ${servicios}
Presupuesto: ${presupuesto}
Observaciones: ${observaciones}

Quisiera recibir información sobre disponibilidad y precios. ¡Gracias!`;

  const whatsappUrl =
    'https://wa.me/50487900263?text=' + encodeURIComponent(mensaje);

  statusEl.textContent = 'Abriendo WhatsApp...';

  window.open(whatsappUrl, '_blank', 'noopener');
});
