// ===== Lightbox para las imágenes de los proyectos =====

// Creamos el overlay una sola vez, oculto, y lo dejamos listo en el <body>
const overlay = document.createElement("div");
overlay.className = "lightbox-overlay";
overlay.innerHTML = `<img class="lightbox-overlay__img" alt="">`;
document.body.appendChild(overlay);

const imagenGrande = overlay.querySelector(".lightbox-overlay__img");

// Las tarjetas de proyecto se crean dinámicamente (vía fetch + innerHTML en main.js),
// así que no existen todavía cuando este script corre. Por eso escuchamos el click
// en el CONTENEDOR (#projects-list), que sí existe desde el arranque, y preguntamos
// si lo que se clickeó fue una imagen de proyecto. Esto se llama "delegación de eventos".
document.getElementById("projects-list").addEventListener("click", (evento) => {
    if (evento.target.classList.contains("project-card__image")) {
        imagenGrande.src = evento.target.src;
        imagenGrande.alt = evento.target.alt;
        overlay.classList.add("lightbox-overlay--visible");
    }
});

// Cerrar al tocar en cualquier lado del overlay (sea la imagen o el fondo oscuro)
overlay.addEventListener("click", () => {
    overlay.classList.remove("lightbox-overlay--visible");
});

// Cerrar también con la tecla Escape
window.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        overlay.classList.remove("lightbox-overlay--visible");
    }
});