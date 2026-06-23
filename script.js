// ===== NAVBAR SCROLL EFFECT =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE BURGER MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  const isOpen = mobileMenu.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ===== SCROLL ANIMATIONS (IntersectionObserver) =====
const animatedEls = document.querySelectorAll(
  '.spot-card, .vessel__feature, .timeline__item, .review-card, .pricing-card, .snorkel__card, .about__text, .about__visual, .booking__info, .booking__form-wrap'
);

animatedEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

// ===== BOOKING FORM =====
const form = document.getElementById('bookingForm');
const modal = document.getElementById('successModal');

form.addEventListener('submit', e => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const date = data.get('date');
  const people = data.get('people');
  const modality = data.get('modality');
  const message = data.get('message');

  // Build WhatsApp message
  const modalityMap = {
    snorkel: 'Passeio + Snorkel (R$ 290/pessoa)',
    mergulho: 'Passeio + Mergulho com Cilindro (R$ 490/pessoa)',
    privativo: 'Barco Privativo'
  };

  const waText = encodeURIComponent(
    `Olá! Quero reservar um passeio no Barco Payos.\n\n` +
    `👤 Nome: ${name}\n` +
    `📅 Data: ${date}\n` +
    `👥 Pessoas: ${people}\n` +
    `🤿 Modalidade: ${modalityMap[modality] || modality}\n` +
    (message ? `📝 Observações: ${message}\n` : '')
  );

  // Open WhatsApp in new tab
  window.open(`https://wa.me/5522999999999?text=${waText}`, '_blank', 'noopener');

  modal.classList.add('modal--open');
  form.reset();
});

// Close modal on backdrop click
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('modal--open');
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SET MIN DATE for booking input =====
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate() + 1).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}
