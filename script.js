(() => {
  const portfolioUrl = 'https://simondiaz-marketing.vercel.app/';
  const profileImage = 'https://simondiaz-marketing.vercel.app/assets/img/perfil.jpg';
  const socialUrl = 'https://www.instagram.com/simondiaz.marketing';
  const youtubeUrl = 'https://www.youtube.com/@simondiaz.marketingdigital';
  const layout = document.querySelector('.layout');
  const sidebar = document.querySelector('.side');
  const header = document.querySelector('.top');

  document.querySelector('style')?.remove();
  document.documentElement.classList.add('js-ready');

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.href = '#inicio';
    brand.removeAttribute('target');
    brand.removeAttribute('rel');
    brand.innerHTML = 'Simón Díaz <span>· Marketing Digital</span>';
    brand.setAttribute('aria-label', 'Volver al inicio de la guía');
  }

  const videoSection = document.createElement('section');
  videoSection.className = 'video-section';
  videoSection.id = 'video';
  videoSection.setAttribute('aria-labelledby', 'video-title');
  const videoPlayer = location.protocol === 'file:'
    ? '<div class="video-placeholder">El reproductor se muestra al abrir esta guía desde un sitio web. <a href="https://www.youtube.com/watch?v=VoZrB3RvJJI" target="_blank" rel="noopener noreferrer">Abrir el video en YouTube ↗</a></div>'
    : '<iframe src="https://www.youtube-nocookie.com/embed/VoZrB3RvJJI?rel=0" title="Cómo hacer para que mi web aparezca en Google – Search Console, por Simón Díaz" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  videoSection.innerHTML = `<div class="video-copy"><div class="kicker">EL VIDEO QUE ACOMPAÑA ESTA GUÍA</div><h2 id="video-title">De tu web a Google</h2><p>Seguí el recorrido completo en el canal de Simón Díaz y usá esta guía como material de apoyo.</p><a class="video-link" href="https://www.youtube.com/watch?v=VoZrB3RvJJI" target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a></div><div class="video-frame">${videoPlayer}</div>`;
  document.querySelector('.hero')?.insertAdjacentElement('afterend', videoSection);

  if (sidebar) {
    const sidebarTitle = sidebar.querySelector('strong');
    const toggle = document.createElement('button');
    toggle.className = 'side-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Minimizar barra lateral');
    toggle.innerHTML = '<span class="side-toggle-icon" aria-hidden="true">‹</span><span class="side-toggle-label">Minimizar menú</span>';
    sidebar.insertBefore(toggle, sidebarTitle);

    sidebar.querySelectorAll('nav a').forEach((link, index) => {
      link.dataset.short = index === 0 ? '⌂' : String(index).padStart(2, '0');
    });
    const navigation = sidebar.querySelector('nav');
    const videoLink = document.createElement('a');
    videoLink.href = '#video';
    videoLink.textContent = 'Video del canal';
    videoLink.dataset.short = '▶';
    navigation?.insertBefore(videoLink, navigation.children[1] || null);

    const profileCard = document.createElement('section');
    profileCard.className = 'personal-card';
    profileCard.innerHTML = `<img src="${profileImage}" alt="Retrato de Simón Díaz" loading="lazy"><div><strong>Simón Díaz</strong><span>Marketing Digital · Posadas, Misiones</span></div><a href="${portfolioUrl}" target="_blank" rel="noopener noreferrer">Conocé mi trabajo ↗</a><a href="${socialUrl}" target="_blank" rel="noopener noreferrer">@simondiaz.marketing ↗</a><a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer">Canal de YouTube ↗</a>`;
    sidebar.appendChild(profileCard);

    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-trigger';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'guide-navigation');
    menuButton.innerHTML = '<span aria-hidden="true">☰</span> Menú';
    if (header) header.insertBefore(menuButton, header.querySelector('.small'));
    sidebar.querySelector('nav')?.setAttribute('id', 'guide-navigation');

    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.appendChild(backdrop);

    const closeMobileMenu = () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('is-visible');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isCollapsed = layout.classList.toggle('sidebar-collapsed');
      toggle.setAttribute('aria-expanded', String(!isCollapsed));
      toggle.setAttribute('aria-label', isCollapsed ? 'Expandir barra lateral' : 'Minimizar barra lateral');
      toggle.querySelector('.side-toggle-icon').textContent = isCollapsed ? '›' : '‹';
      toggle.querySelector('.side-toggle-label').textContent = isCollapsed ? 'Expandir menú' : 'Minimizar menú';
    });

    menuButton.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('is-visible', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    backdrop.addEventListener('click', closeMobileMenu);
    sidebar.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    });
  }

  const logoByResource = {
    'Visual Studio Code': 'visualstudiocode',
    Git: 'git',
    GitHub: 'github',
    'GitHub Copilot': 'githubcopilot',
    Netlify: 'netlify',
    Vercel: 'vercel',
    'Google Search Console': 'googlesearchconsole',
  };

  document.querySelectorAll('#herramientas .card').forEach((card) => {
    const name = card.querySelector('h3')?.textContent.trim();
    const icon = logoByResource[name];
    if (!icon) return;

    const image = document.createElement('img');
    image.className = 'resource-mark';
    image.src = `https://cdn.jsdelivr.net/npm/simple-icons@12/icons/${icon}.svg`;
    image.alt = '';
    image.loading = 'lazy';
    image.setAttribute('aria-hidden', 'true');
    image.addEventListener('error', () => {
      image.src = 'https://cdn.jsdelivr.net/npm/simple-icons@12/icons/google.svg';
    }, { once: true });
    card.insertBefore(image, card.firstChild);
  });

  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `Una guía de <a href="${portfolioUrl}" target="_blank" rel="noopener noreferrer">Simón Díaz · Marketing Digital</a>. <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer">Ver el canal de YouTube ↗</a>. La indexación depende de Google.`;
  }

  const revealItems = document.querySelectorAll('.hero, .video-section, .chapter');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    revealItems.forEach((item) => {
      item.classList.add('reveal');
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = sidebar?.querySelectorAll('nav a');
  if (sections.length && navLinks && 'IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isActive);
          if (isActive) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -65% 0px' });

    sections.forEach((section) => activeObserver.observe(section));
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'particle-field';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const context = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (context && !reducedMotion.matches) {
    const particles = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(42, Math.max(16, Math.floor((width * height) / 28000)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.16 + 0.035,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const renderParticles = (time) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const drift = Math.sin(time * 0.00025 + particle.phase) * 0.25;
        particle.y -= particle.speed;
        particle.x += drift;
        if (particle.y < -4) particle.y = height + 4;
        if (particle.x < -4) particle.x = width + 4;
        if (particle.x > width + 4) particle.x = -4;
        context.beginPath();
        context.fillStyle = 'rgba(177, 194, 255, 0.38)';
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      animationFrame = window.requestAnimationFrame(renderParticles);
    };

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(renderParticles);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
      } else {
        animationFrame = window.requestAnimationFrame(renderParticles);
      }
    });
    reducedMotion.addEventListener?.('change', (event) => {
      if (event.matches) window.cancelAnimationFrame(animationFrame);
      else animationFrame = window.requestAnimationFrame(renderParticles);
    });
  }
})();
