const carousels = {};

function initCarousel(id) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');

  carousels[id] = {
    index: 0,
    total: items.length,
    carousel,
    interval: null
  };

  createIndicators(id);
  startAutoplay(id);

  carousel.addEventListener('mouseenter', () => stopAutoplay(id));
  carousel.addEventListener('mouseleave', () => startAutoplay(id));
}

function updateCarousel(id) {
  const c = carousels[id];
  const width = c.carousel.querySelector('.carousel-item').offsetWidth;
  c.carousel.style.transform = `translateX(${-c.index * width}px)`;
  updateIndicators(id);
}

function moveCarousel(step, id) {
  const c = carousels[id];
  c.index += step;
  if (c.index >= c.total) c.index = 0;
  if (c.index < 0) c.index = c.total - 1;
  updateCarousel(id);
}

function createIndicators(id) {
  const n = id.split('-')[1];
  const container = document.getElementById(`indicators-${n}`);
  container.innerHTML = '';

  for (let i = 0; i < carousels[id].total; i++) {
    const dot = document.createElement('div');
    dot.className = 'indicator';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => { carousels[id].index = i; updateCarousel(id); };
    container.appendChild(dot);
  }
}

function updateIndicators(id) {
  const n = id.split('-')[1];
  document.querySelectorAll(`#indicators-${n} .indicator`)
    .forEach((dot, i) => dot.classList.toggle('active', i === carousels[id].index));
}

function startAutoplay(id) {
  stopAutoplay(id);
  carousels[id].interval = setInterval(() => moveCarousel(1, id), 5000);
}

function stopAutoplay(id) {
  if (carousels[id].interval) clearInterval(carousels[id].interval);
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel('carousel-1');
  initCarousel('carousel-2');
  initCarousel('carousel-3');
  initCarousel('carousel-4');
  initCarousel('carousel-5');
});
