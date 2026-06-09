/* ═══════════════════════════════════════════════════════
   ORIGEN COFFEE — main.js
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV: scroll effect ─── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── NAV: mobile burger ─── */
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  burger?.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(26,15,10,0.97)';
    navLinks.style.padding = '1.5rem 2rem';
    navLinks.style.gap = '1.25rem';
    navLinks.style.borderBottom = '1px solid rgba(200,129,58,0.2)';
    if (!open) {
      burger.style.transform = 'rotate(45deg)';
    } else {
      burger.style.transform = '';
    }
  });
  // Close menu on link click
  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        burger.style.transform = '';
      }
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll(
    '.stat, .about__inner, .products__header, .product-card, .process-step, .cta-banner__text, .cta-banner__form, .feature-item'
  );
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards and steps
    const parent = el.closest('.products__grid, .process__steps, .about__features');
    if (parent) {
      const siblings = [...parent.children].filter(c => c === el || c.classList.contains(el.className.split(' ')[0]));
      const idx = [...parent.children].indexOf(el);
      if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 3)}`);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─── COUNTER ANIMATION ─── */
  const counters = document.querySelectorAll('.stat__num');
  let countersStarted = false;

  const runCounters = () => {
    if (countersStarted) return;
    const statsBand = document.querySelector('.stats-band');
    if (!statsBand) return;
    const rect = statsBand.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      countersStarted = true;
      counters.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1600;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }
  };
  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();

  /* ─── PARALLAX: hero beans subtle shift ─── */
  const beansLayer = document.getElementById('beans-layer');
  if (beansLayer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      beansLayer.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

  /* ─── PRODUCT CARD: tilt micro-interaction ─── */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-8px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
      card.style.transition = 'transform 0.1s linear, box-shadow 0.35s, border-color 0.35s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });

  /* ─── SUBSCRIBE FORM ─── */
  window.handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.target;
    const success = document.getElementById('subscribe-success');
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
      success.style.opacity = '0';
      success.style.transform = 'translateY(20px)';
      requestAnimationFrame(() => {
        success.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        success.style.opacity = '1';
        success.style.transform = 'translateY(0)';
      });
    }, 400);
    form.style.transition = 'opacity 0.4s, transform 0.4s';
  };

  /* ─── SMOOTH ANCHOR OFFSET (for fixed nav) ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
