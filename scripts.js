const jobsListingsSection = document.querySelector('.jobs-listings');
const container = document.querySelector('.jobs-listings');

const mensaje = document.querySelector('#filter-selected-value');

const filterTechnology = document.querySelector('#filter-technology');
const filterModality = document.querySelector('#filter-modality');
const filterExperience = document.querySelector('#filter-experience-level');

/* EVENTO BOTÓN APLICAR */
jobsListingsSection?.addEventListener('click', function(event) {
  const elemento = event.target;

  if (elemento.classList.contains('button-apply-job')) {
    elemento.textContent = '¡Aplicado!';
    elemento.classList.add('is-applied');
    elemento.disabled = true;
  }
});

/* FUNCIÓN FILTRAR */
function filtrarJobs() {
  const jobs = document.querySelectorAll('.jobs-listings-card');

  const modalidadValue = filterModality.value;
  const techValue = filterTechnology.value;
  const nivelValue = filterExperience.value;

  jobs.forEach(job => {
    const modalidad = job.dataset.modalidad;
    const tech = job.dataset.technology;
    const nivel = job.dataset.nivel;

    const matchModalidad = modalidadValue === '' || modalidad === modalidadValue;
    const matchTech = techValue === '' || tech === techValue;
    const matchNivel = nivelValue === '' || nivel === nivelValue;

    const isShown = matchModalidad && matchTech && matchNivel;

    job.classList.toggle('is-hidden', !isShown);
  });

  // mensaje visual
  mensaje.textContent = modalidadValue || techValue || nivelValue
    ? `Filtro activo`
    : '';
}

/* EVENTOS DE FILTROS */
filterModality.addEventListener('change', filtrarJobs);
filterTechnology.addEventListener('change', filtrarJobs);
filterExperience.addEventListener('change', filtrarJobs);

/* FETCH Y RENDER */
fetch('./data.json')
  .then(response => response.json())
  .then(jobs => {

    jobs.forEach(job => {
      const article = document.createElement('article');
      article.className = 'jobs-listings-card';

      // dataset limpio
      article.dataset.technology = job.data.technology;
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;

      article.innerHTML = `
        <div>
          <h3>${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>
      `;

      container.appendChild(article);
    });

    // IMPORTANTE: aplicar filtro después de renderizar
    filtrarJobs();
  });