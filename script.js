// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// Enquiry form -> WhatsApp
function sendWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const service = document.getElementById('f-service').value;
  const msg = document.getElementById('f-msg').value.trim();

  const text =
    `Hello Jagruti Solutions,%0A` +
    `I'd like help with my PF.%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Service: ${encodeURIComponent(service)}%0A` +
    `Details: ${encodeURIComponent(msg || '-')}`;

  window.open(`https://wa.me/917997846643?text=${text}`, '_blank');
  return false;
}
