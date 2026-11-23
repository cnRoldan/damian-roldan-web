const contacto = {
  zona: "Barcelona",
  whatsapp: "", // Incluye el código de país.
  correo: "",
};

if (contacto.zona) {
  const zona = document.getElementById("zona");
  zona.textContent = contacto.zona;
  zona.hidden = false;
}

const whatsapp = contacto.whatsapp.replace(/[\s()+.-]/g, "");
const correo = contacto.correo.trim();
const mensaje = "Hola, quisiera hacer una consulta sobre un trámite.";

if (/^[1-9]\d{6,14}$/.test(whatsapp)) {
  const enlace = document.getElementById("whatsapp");
  enlace.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;
  enlace.hidden = false;
}

if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
  const enlace = document.getElementById("correo");
  enlace.href = `mailto:${encodeURIComponent(correo).replace("%40", "@")}?subject=${encodeURIComponent("Consulta sobre un trámite")}`;
  enlace.hidden = false;
}
