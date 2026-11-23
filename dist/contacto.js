const contacto = {
  nombre: "Damián Roldán",
  zona: "Barcelona",
  whatsapp: "", // Incluye el código de país.
  correo: "",
};

if (contacto.nombre) {
  document.title = [contacto.nombre, contacto.zona ? `Gestión jurídica en ${contacto.zona}` : "Gestión jurídica"].join(" | ");
  document.querySelectorAll("[data-brand]").forEach((elemento) => {
    elemento.textContent = contacto.nombre;
  });
  document.querySelector(".brand").setAttribute("aria-label", `${contacto.nombre}, inicio`);
}

if (contacto.zona) {
  const zona = document.getElementById("zona");
  zona.textContent = contacto.zona;
  zona.hidden = false;
}

const whatsapp = contacto.whatsapp.replace(/[\s()+.-]/g, "");
const correo = contacto.correo.trim();
const mensaje = "Hola, quisiera hacer una consulta sobre un trámite.";
let hayContacto = false;

if (/^[1-9]\d{6,14}$/.test(whatsapp)) {
  const enlace = document.getElementById("whatsapp");
  enlace.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;
  enlace.hidden = false;
  hayContacto = true;
}

if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
  const enlace = document.getElementById("correo");
  enlace.href = `mailto:${encodeURIComponent(correo).replace("%40", "@")}?subject=${encodeURIComponent("Consulta sobre un trámite")}`;
  enlace.hidden = false;
  hayContacto = true;
}

document.getElementById("contacto-pendiente").hidden = hayContacto;
