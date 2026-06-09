/* ═══════════════════════════════════════════════════════
   ORIGEN COFFEE — main.js v2
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAV scroll ─── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── NAV mobile burger ─── */
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  let menuOpen = false;
  burger?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      navLinks.style.cssText = `
        display:flex; flex-direction:column; position:absolute;
        top:100%; left:0; right:0; background:rgba(26,15,10,0.97);
        padding:1.5rem 2rem; gap:1.25rem;
        border-bottom:1px solid rgba(200,129,58,0.2);
        animation: slideDown 0.3s ease;
      `;
    } else {
      navLinks.style.display = 'none';
    }
    burger.style.transform = menuOpen ? 'rotate(90deg)' : '';
  });
  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        menuOpen = false;
        burger.style.transform = '';
      }
    });
  });

  /* ─── SCROLL REVEAL ─── */
  const revealTargets = [
    '.stat', '.about__inner',
    '.inst-history__media', '.inst-history__text',
    '.mv-card', '.value-card',
    '.catalog__header', '.filter-btn',
    '.pcard', '.process-step',
    '.cta-banner__text', '.cta-banner__form',
    '.timeline-item'
  ];
  document.querySelectorAll(revealTargets.join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    // stagger siblings in grids
    const grid = el.closest('.values-grid, .catalog__grid, .mv-band__inner, .process__steps');
    if (grid) {
      const idx = [...grid.children].indexOf(el);
      if (idx > 0 && idx <= 3) el.classList.add(`reveal-delay-${idx}`);
    }
  });

  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ─── COUNTER ANIMATION ─── */
  let countersStarted = false;
  const runCounters = () => {
    if (countersStarted) return;
    const band = document.querySelector('.stats-band');
    if (!band) return;
    if (band.getBoundingClientRect().top < window.innerHeight * 0.88) {
      countersStarted = true;
      document.querySelectorAll('.stat__num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / 1600, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }
  };
  window.addEventListener('scroll', runCounters, { passive: true });
  runCounters();

  /* ─── PARALLAX on hero beans ─── */
  const beansLayer = document.getElementById('beans-layer');
  const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (beansLayer && !noMotion) {
    window.addEventListener('scroll', () => {
      beansLayer.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }, { passive: true });
  }

  /* ─── CATALOG FILTER ─── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pcards = document.querySelectorAll('.pcard');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Active state
      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      // Show/hide with animation
      pcards.forEach(card => {
        const matches = filter === 'all' || card.dataset.roast === filter;
        if (matches) {
          card.classList.remove('pcard--hidden');
          card.style.animation = 'cardReveal 0.4s ease both';
        } else {
          card.classList.add('pcard--hidden');
        }
      });
    });
  });

  /* ─── PCARD tilt micro-interaction ─── */
  if (!noMotion) {
    document.querySelectorAll('.pcard').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        card.style.transform = `translateY(-8px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
        card.style.transition = 'transform 0.1s linear, box-shadow 0.3s, border-color 0.3s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = '';
      });
    });
  }

  /* ─── SUBSCRIBE FORM ─── */
  window.handleSubscribe = e => {
    e.preventDefault();
    const form = e.target;
    const success = document.getElementById('subscribe-success');
    form.style.cssText = 'opacity:0; transform:translateY(20px); transition:opacity 0.4s,transform 0.4s;';
    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
      success.style.cssText = 'opacity:0; transform:translateY(20px);';
      requestAnimationFrame(() => {
        success.style.cssText = 'opacity:1; transform:translateY(0); transition:opacity 0.5s ease,transform 0.5s ease;';
      });
    }, 420);
  };

  /* ─── SMOOTH SCROLL with nav offset ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

});
