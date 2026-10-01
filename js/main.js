async function cargarProyectos() {
  try {
    const respuesta = await fetch("data/proyectos.json");

    if (!respuesta.ok) {
      throw new Error(`Error al cargar Proyectos: ${respuesta.status}`);
    }

    const proyectos = await respuesta.json();

    // Mapa tag → ícono (Devicon). Si una tag no está acá, se muestra solo como texto.
    const iconosPorTag = {
      "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      "Google Apps Script": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      "Google Sheets": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    };

    proyectos.forEach((proyecto) => {
      const tagsList = proyecto.tags
        .map((tag) => {
          const icono = iconosPorTag[tag];
          const iconoHtml = icono
            ? `<img src="${icono}" alt="" class="tag-icon">`
            : "";
          return `<li>${iconoHtml}${tag}</li>`;
        })
        .join("")

      const linkRepo = proyecto.link;

      const botonRepo = linkRepo
        ? `<a href="${linkRepo}" target="_blank" rel="noopener" class="project-card__link">Ver proyecto</a>`
        : "";

      const imagenHtml = proyecto.image
        ? `<img src="${proyecto.image}" alt="Captura de ${proyecto.title}" class="project-card__image" loading="lazy">`
        : "";

      document.getElementById("projects-list").innerHTML += `
      <article class="project-card">
        ${imagenHtml}
        <h3 class="project-card__title">${proyecto.title}</h3>
        <p class="project-card__description">${proyecto.description}</p>
        <ul class="project-card__tags">
          ${tagsList}
        </ul>
        ${botonRepo}
      </article>
    `;
    });
    console.log("Salio todo OK")
  } catch (error) {
    console.error(error);
    console.log("Salio todo OK'nt")
  }


}

cargarProyectos();