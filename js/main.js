document.addEventListener('DOMContentLoaded', () => {

  /* ============ LOADING SCREEN ============ */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen && loadingScreen.classList.add('loaded'), 400);
  });

  /* ============ HEADER SCROLL STATE ============ */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============ MOBILE NAV ============ */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });

  /* ============ SCROLL REVEAL ============ */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ============ HERO TYPEWRITER ============ */
  const typewriterEl = document.getElementById('typewriter');
  const words = ['Guantes de Carnaza', 'Mandiles de Mezclilla', 'Mangas Industriales', 'Capuchas de Soldador', 'Polainas de Protección'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    if (!typewriterEl) return;
    const current = words[wordIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ============ PARTICLES CANVAS (sparks) ============ */
  const canvas = document.getElementById('particles-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const hero = canvas.closest('.hero');

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    function createParticles() {
      const count = Math.min(60, Math.floor(canvas.width / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.35 + 0.08,
        vx: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.15
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,127,0,${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    resize();
    createParticles();
    tick();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ============ CONTACT FORM (mailto) ============ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#cf-name').value.trim();
      const company = contactForm.querySelector('#cf-company').value.trim();
      const product = contactForm.querySelector('#cf-product').value;
      const message = contactForm.querySelector('#cf-message').value.trim();

      const subject = `Solicitud de cotización — ${product || 'Productos GMI Tijuana'}`;
      const body = `Nombre: ${name}\nEmpresa: ${company}\nProducto de interés: ${product}\n\nMensaje:\n${message}`;

      window.location.href = `mailto:Ventas@gmitijuana.com.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ============ FOOTER YEAR ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
