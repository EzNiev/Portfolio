async function cargarProyectos() {
  try {
    const respuesta = await fetch("data/proyectos.json");

    if (!respuesta.ok) {
      throw new Error(`Error al cargar Proyectos: ${respuesta.status}`);
    }

    const proyectos = await respuesta.json();

    proyectos.forEach((proyecto) => {
      const tagsList = proyecto.tags
        .map((tag) => `<li>${tag}</li>`)
        .join("")

      document.getElementById("projects-list").innerHTML += `
      <article class="project-card">
        <h3 class="project-card__title">${proyecto.title}</h3>
        <p class="project-card__description">${proyecto.description}</p>
        <ul class="skills">
          ${tagsList}
        </ul>
      </article>
    `;
    });
    console.log("Salio todo liso padre")
  } catch (error) {
    console.error(error);
    console.log("Salio todo malllll")
  }


}

cargarProyectos();