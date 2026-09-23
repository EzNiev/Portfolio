// ===== Cargar proyectos desde JSON y renderizarlos =====

async function cargarProyectos() {
    const contenedor = document.getElementById("projects-list");

    try {
        const respuesta = await fetch("data/proyectos.json");

        if (!respuesta.ok) {
            throw new Error(`Error al cargar proyectos: ${respuesta.status}`);
        }

        const proyectos = await respuesta.json();

        proyectos.forEach((proyecto) => {
            const tarjeta = crearTarjetaProyecto(proyecto);
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("No se pudieron cargar los proyectos:", error);
        contenedor.textContent = "No se pudieron cargar los proyectos por ahora.";
    }
}

function crearTarjetaProyecto(proyecto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "project-card";

    const tags = proyecto.tags
        .map((tag) => `<li>${tag}</li>`)
        .join("");

    const linkHtml = proyecto.link
        ? `<a href="${proyecto.link}" target="_blank" rel="noopener" class="project-card__link">Ver repo →</a>`
        : "";

    tarjeta.innerHTML = `
    <p class="project-card__status">${proyecto.status}</p>
    <h3 class="project-card__title">${proyecto.title}</h3>
    <p class="project-card__description">${proyecto.description}</p>
    <ul class="project-card__tags">${tags}</ul>
    ${linkHtml}
  `;

    return tarjeta;
}

cargarProyectos();