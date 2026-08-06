/* ============================================
   PORTFOLIO SKK MIGAS — SCRIPT.JS
   ============================================ */

// ============ LANGUAGE TOGGLE ============
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;

// Navigation link translations
const navTranslations = {
  about: { id: 'TENTANG', en: 'ABOUT' },
  competencies: { id: 'KEAHLIAN', en: 'EXPERTISE' },
  experience: { id: 'PENGALAMAN', en: 'EXPERIENCE' },
  education: { id: 'PENDIDIKAN', en: 'EDUCATION' },
  'why-skk': { id: 'SKK MIGAS', en: 'SKK MIGAS' },
  contact: { id: 'KONTAK', en: 'CONTACT' }
};

// Set initial language
html.lang = 'id';

langToggle.addEventListener('click', () => {
  const currentLang = html.lang;
  const newLang = currentLang === 'id' ? 'en' : 'id';
  html.lang = newLang;
  langToggle.classList.toggle('id');
  langToggle.classList.toggle('en');

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    if (navTranslations[href]) {
      link.textContent = navTranslations[href][newLang];
    }
  });

  // Update document title
  document.title = newLang === 'id'
    ? '[Nama Kamu] — Finance & Accounting Professional | Kandidat SKK Migas'
    : '[Nama Kamu] — Finance & Accounting Professional | SKK Migas Candidate';
});

// ============ SCROLL PROGRESS ============
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';

  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ REVEAL ON SCROLL ============
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate counters
      if (entry.target.querySelector && entry.target.querySelector('.counter')) {
        entry.target.querySelectorAll('.counter').forEach(counter => {
          animateCounter(counter);
        });
      }

      // Animate skill bars
      if (entry.target.querySelector && entry.target.querySelector('.skill-fill')) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const width = fill.getAttribute('data-width');
          setTimeout(() => fill.style.width = width + '%', 200);
        });
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============ COUNTER ANIMATION ============
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ============ PARTICLES (HERO) ============
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 165, 92, ${p.opacity})`;
    ctx.fill();

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const dx = p.x - particles[j].x;
      const dy = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(201, 165, 92, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span><i class="fas fa-spinner fa-spin mr-2"></i><span data-lang="id">Mengirim...</span><span data-lang="en">Sending...</span></span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span><i class="fas fa-check mr-2"></i><span data-lang="id">Terkirim!</span><span data-lang="en">Sent!</span></span>';
    formStatus.innerHTML = html.lang === 'id'
      ? '<span style="color: var(--gold-300);">✓ Terima kasih! Pesan Anda telah dikirim. Saya akan segera membalas.</span>'
      : '<span style="color: var(--gold-300);">✓ Thank you! Your message has been sent. I will reply soon.</span>';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      contactForm.reset();
      formStatus.innerHTML = html.lang === 'id'
        ? 'Pesan akan dikirim langsung ke email kedinasan'
        : 'Message will be sent directly to official email';
    }, 3000);
  }, 1500);
});

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ============ INITIALIZATION LOG ============
console.log('%c🛢️ SKK Migas Portfolio Loaded', 'color: #c9a55c; font-size: 16px; font-weight: bold;');
console.log('%cFinance & Accounting Professional', 'color: #8a96a8; font-size: 12px;');
