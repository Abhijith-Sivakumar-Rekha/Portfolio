const progress = document.querySelector('.scroll-progress');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max ? window.scrollY / max : 0})`;
}, {passive:true});

window.addEventListener('pointermove', (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, {passive:true});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .12;
    const y = (e.clientY - r.top - r.height / 2) * .12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = '');
});

document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

document.getElementById('year').textContent = new Date().getFullYear();
