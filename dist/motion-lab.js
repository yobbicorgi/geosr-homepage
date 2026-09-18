/* Progressive motion layer: optional GSAP/ScrollTrigger and Three.js enhancements */
(() => {
  'use strict';

  const reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduced = () => Boolean(reducedQuery?.matches);
  const home = document.body?.classList.contains('home-page');
  const hero = document.querySelector('[data-motion-lab-hero]');
  if (!home || !hero) return;

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const THREE = window.THREE;

  function initScrollMotion() {
    if (!gsap || !ScrollTrigger || reduced()) return;
    try {
      gsap.registerPlugin(ScrollTrigger);

      const reveal = (targets, trigger, vars = {}) => {
        const elements = [...document.querySelectorAll(targets)];
        if (!elements.length) return;
        gsap.from(elements, {
          opacity: 0,
          y: 26,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          ...vars,
          scrollTrigger: { trigger, start: 'top 78%', once: true, ...vars.scrollTrigger }
        });
      };

      reveal('.science-intro .science-statement > *', '.science-intro');
      reveal('.digital-title h2, .digital-feature .digital-copy h3', '.digital-section', { y: 32, stagger: 0.12 });
      reveal('.contact-editorial-top, .contact-statement, .contact-editorial-bottom, .site-footer .footer-information, .site-footer .footer-wordmark', '.contact-editorial', { y: 22, stagger: 0.1 });

      const field = document.querySelector('.field-story');
      if (field) {
        let lastChapter = null;
        const animateChapter = () => {
          const chapter = field.querySelector('.field-chapter.is-active');
          if (!chapter || chapter === lastChapter) return;
          lastChapter = chapter;
          gsap.fromTo([...chapter.children], { opacity: 0, y: 18 }, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.06,
            overwrite: 'auto'
          });
        };
        ScrollTrigger.create({
          trigger: field,
          start: 'top 82%',
          end: 'bottom top',
          onEnter: animateChapter,
          onEnterBack: animateChapter,
          onUpdate: animateChapter
        });
      }

      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true, passive: true });
    } catch (_) {
      // CDN or plugin failures leave the authored CSS and native scroll intact.
    }
  }

  function initCredentialTilt() {
    if (reduced()) return;
    const rail = document.querySelector('.credential-rail');
    if (!rail) return;
    rail.classList.add('motion-lab-enabled');
    const reset = card => card.style.setProperty('--pointer-turn', '0deg');
    const enhanced = new WeakSet();
    const enhanceCards = () => [...rail.querySelectorAll('.credential-card')].forEach(card => {
      if (enhanced.has(card)) return;
      enhanced.add(card);
      card.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        const bounds = card.getBoundingClientRect();
        const normalized = (event.clientX - (bounds.left + bounds.width / 2)) / Math.max(1, bounds.width / 2);
        const turn = Math.max(-6, Math.min(6, normalized * 6));
        card.style.setProperty('--pointer-turn', `${turn.toFixed(2)}deg`);
      }, { passive: true });
      card.addEventListener('pointerleave', () => reset(card), { passive: true });
      card.addEventListener('pointercancel', () => reset(card), { passive: true });
    });
    enhanceCards();
    new MutationObserver(enhanceCards).observe(rail, { childList: true });
  }

  function hideCanvas(canvas) {
    canvas.hidden = true;
    hero.classList.remove('motion-lab-ready');
  }

  function initThreeLayer() {
    const canvas = hero.querySelector('[data-motion-lab-canvas]');
    if (!canvas || !THREE || reduced()) {
      if (canvas) hideCanvas(canvas);
      return;
    }

    let webgl;
    try {
      webgl = canvas.getContext('webgl', { alpha: true, antialias: true }) || canvas.getContext('experimental-webgl');
    } catch (_) {
      webgl = null;
    }
    if (!webgl) {
      hideCanvas(canvas);
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setClearColor(0x000000, 0);
    } catch (_) {
      hideCanvas(canvas);
      return;
    }

    try {
      canvas.hidden = false;
      hero.classList.add('motion-lab-ready');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.z = 5.2;
      const mineral = new THREE.Group();
      mineral.rotation.x = -0.22;
      scene.add(mineral);

      const columns = 25;
      const rows = 14;
      const positions = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column / (columns - 1) - 0.5) * 4.8;
          const y = (row / (rows - 1) - 0.5) * 2.3;
          const edge = Math.max(0, Math.abs(x) / 2.4 - 0.72);
          const z = Math.sin(x * 1.6) * 0.08 + Math.cos(y * 2.2) * 0.06 - edge * 0.35;
          positions.push(x, y, z);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0xe8ece4, size: 0.032, transparent: true, opacity: 0.42, depthWrite: false, sizeAttenuation: true });
      mineral.add(new THREE.Points(geometry, material));

      const edgeGeometry = new THREE.BufferGeometry();
      edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
        -2.28, -0.98, -0.12, 2.28, -0.98, -0.12,
        2.28, -0.98, -0.12, 2.28, 0.98, -0.12,
        2.28, 0.98, -0.12, -2.28, 0.98, -0.12,
        -2.28, 0.98, -0.12, -2.28, -0.98, -0.12
      ], 3));
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xcfd7cf, transparent: true, opacity: 0.16, depthWrite: false });
      mineral.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      let frame = 0;
      let active = true;
      const resize = () => {
        const bounds = hero.getBoundingClientRect();
        const width = Math.max(1, bounds.width);
        const height = Math.max(1, bounds.height);
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        renderer.setPixelRatio(ratio);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const render = time => {
        frame = 0;
        if (!active || document.hidden || reduced()) return;
        pointer.x += (target.x - pointer.x) * 0.045;
        pointer.y += (target.y - pointer.y) * 0.045;
        mineral.rotation.y = pointer.x + Math.sin(time * 0.00018) * 0.018;
        mineral.rotation.x = -0.22 + pointer.y;
        mineral.rotation.z = Math.sin(time * 0.00013) * 0.004;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      const setActive = value => {
        active = value;
        if (active && !frame) frame = requestAnimationFrame(render);
      };
      const visibility = new IntersectionObserver(entries => setActive(Boolean(entries[0]?.isIntersecting)), { threshold: 0.01 });
      visibility.observe(hero);
      new ResizeObserver(resize).observe(hero);
      resize();
      hero.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch') return;
        const bounds = hero.getBoundingClientRect();
        target.x = Math.max(-0.12, Math.min(0.12, ((event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5) * 0.24));
        target.y = Math.max(-0.08, Math.min(0.08, ((event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5) * -0.16));
      }, { passive: true });
      hero.addEventListener('pointerleave', () => { target.x = 0; target.y = 0; }, { passive: true });
      document.addEventListener('visibilitychange', () => setActive(!document.hidden), { passive: true });
      frame = requestAnimationFrame(render);
    } catch (_) {
      renderer.dispose?.();
      hideCanvas(canvas);
    }
  }

  initScrollMotion();
  initCredentialTilt();
  initThreeLayer();
})();
