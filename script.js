/* ═══════════════════════════════════════════
   JAGRUTI SOLUTIONS — Interactions & Animations
═══════════════════════════════════════════ */

// ── Year ──
document.getElementById('yr').textContent = new Date().getFullYear();

// ── Nav scroll shadow ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-pills a, .drawer-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ── Hamburger / Drawer ──
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
hamburger.addEventListener('click', () => {
  const isOpen = drawer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  drawer.setAttribute('aria-hidden', !isOpen);
});
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── Scroll-reveal (Intersection Observer) ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay || 0;
    setTimeout(() => entry.target.classList.add('visible'), Number(delay));
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObs.observe(el));

// ── Animated counters ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ── WhatsApp form ──
function sendWhatsApp(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name').value.trim();
  const phone   = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const msg     = document.getElementById('f-msg').value.trim();

  if (!name || !phone) {
    document.getElementById(name ? 'f-phone' : 'f-name').focus();
    return false;
  }

  const text =
    `Hello Jagruti Solutions! 👋%0A` +
    `I need help with my PF.%0A%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Phone:* ${encodeURIComponent(phone)}%0A` +
    `*Service:* ${encodeURIComponent(service)}%0A` +
    `*Details:* ${encodeURIComponent(msg || 'No additional details')}`;

  window.open(`https://wa.me/917997846643?text=${text}`, '_blank', 'noopener');
  return false;
}

// ── Bento card tilt micro-interaction ──
document.querySelectorAll('.bento-card, .hb-card, .why-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
