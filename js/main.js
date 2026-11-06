/**
 * ==========================================================================
 * ZEESHAN THE CREATIVE - MAIN SCRIPT
 * ==========================================================================
 * Hydrates content dynamically from CONFIG, handles responsive navigation,
 * animated number counters, scroll animations, image fallbacks, and lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
});

function initPortfolio() {
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG object not found. Ensure js/config.js is loaded first.');
    return;
  }

  hydrateContent();
  initNavbar();
  initStatsCounter();
  initScrollAnimations();
  initLightbox();
  initImageFallbacks();
  initSmoothScroll();
}

/**
 * Build dynamic WhatsApp URL safely
 */
function getWhatsAppUrl(number, message) {
  const cleanNumber = (number || '').replace(/[^\d]/g, '');
  const encodedMsg = encodeURIComponent(message || '');
  if (!cleanNumber || cleanNumber.includes('X') || cleanNumber.length < 5) {
    return `https://wa.me/?text=${encodedMsg}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

/**
 * Check if a link is still a placeholder
 */
function getSafeLink(url, fallback = '#') {
  if (!url || url.includes('PASTE_') || url.includes('XXXXX')) {
    return fallback;
  }
  return url;
}

/**
 * Hydrate dynamic content from CONFIG into HTML
 */
function hydrateContent() {
  const waUrl = getWhatsAppUrl(CONFIG.whatsappNumber, CONFIG.whatsappMessage);
  const igDmUrl = getSafeLink(CONFIG.instagramDM, 'https://www.instagram.com/zeeshan_the_creative?obrf=MWJ1cjBodXludG9ycA==');
  const igUrl = getSafeLink(CONFIG.instagram, 'https://www.instagram.com/zeeshan_the_creative/');
  const ytUrl = getSafeLink(CONFIG.youtube, 'https://youtube.com/@zeeshanthecreative');
  const fbUrl = getSafeLink(CONFIG.facebook, '#');
  const emailUrl = CONFIG.email ? `mailto:${CONFIG.email}` : '#';

  // 1. WhatsApp Action Links (Hero, Navbar, Contact CTA)
  document.querySelectorAll('.js-wa-link').forEach(el => {
    el.href = waUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // 2. Instagram DM Action Links (Hero, Contact CTA)
  document.querySelectorAll('.js-ig-dm-link').forEach(el => {
    el.href = igDmUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // 3. Social Profile Links
  document.querySelectorAll('.js-ig-link').forEach(el => {
    el.href = igUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('.js-yt-link').forEach(el => {
    el.href = ytUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
  document.querySelectorAll('.js-fb-link').forEach(el => {
    el.href = fbUrl;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
    if (fbUrl === '#') {
      el.setAttribute('title', 'Facebook link to be updated in js/config.js');
    }
  });
  document.querySelectorAll('.js-email-link').forEach(el => {
    el.href = emailUrl;
    if (el.classList.contains('js-email-text')) {
      el.textContent = CONFIG.email || 'Email Me';
    }
  });

  // 4. Hero Section Data
  const heroBadge = document.querySelector('.js-hero-badge');
  if (heroBadge && CONFIG.stats && CONFIG.stats.topReelViews) {
    heroBadge.textContent = `Top reel: ${CONFIG.stats.topReelViews} views`;
  }

  // 5. Numbers Strip Data
  if (CONFIG.stats) {
    const statFollowers = document.querySelector('.js-stat-followers');
    const statTopReel = document.querySelector('.js-stat-top-reel');
    const statPosts = document.querySelector('.js-stat-posts');
    const statReach = document.querySelector('.js-stat-reach');
    const statSubline = document.querySelector('.js-stat-subline');

    if (statFollowers) statFollowers.textContent = CONFIG.stats.followers || '8.4K';
    if (statTopReel) statTopReel.textContent = CONFIG.stats.topReelViews || '665K';
    if (statPosts) statPosts.textContent = CONFIG.stats.totalPosts || '173+';
    if (statReach) statReach.textContent = CONFIG.stats.reach || 'Mumbai-wide';

    if (statSubline) {
      statSubline.textContent = `${CONFIG.stats.followers} followers. ${CONFIG.stats.topReelViews} views. Our reels travel beyond our page.`;
    }
  }

  // 6. Viral Reels Grid Hydration
  const reelsGrid = document.querySelector('.js-reels-grid');
  if (reelsGrid && Array.isArray(CONFIG.topReels)) {
    reelsGrid.innerHTML = '';
    CONFIG.topReels.forEach((reel, index) => {
      const isTop = index === 0;
      const reelCard = document.createElement('article');
      reelCard.className = `reel-card ${isTop ? 'reel-card--viral' : ''}`;
      reelCard.innerHTML = `
        <div class="reel-media">
          <img src="assets/images/reel-${index + 1}.png" 
               alt="${reel.brand} Reel - ${reel.views} views" 
               loading="lazy" 
               class="zoomable"
               data-caption="${reel.brand} · ${reel.views} Views · ${reel.caption}">
          ${isTop ? '<span class="badge badge--viral"><span class="badge-dot"></span>VIRAL</span>' : ''}
          <div class="reel-views-pill">
            <svg class="icon icon-eye" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span class="views-count">${reel.views}</span>
          </div>
        </div>
        <div class="reel-details">
          <h3 class="reel-brand">${escapeHtml(reel.brand)}</h3>
          <p class="reel-caption">${escapeHtml(reel.caption)}</p>
        </div>
      `;
      reelsGrid.appendChild(reelCard);
    });
  }

  // 7. Reviews Section (Quote Cards from config)
  const quotesGrid = document.querySelector('.js-review-quotes-grid');
  if (quotesGrid && Array.isArray(CONFIG.reviews)) {
    quotesGrid.innerHTML = '';
    CONFIG.reviews.forEach((rev, idx) => {
      const card = document.createElement('div');
      card.className = 'quote-card';
      card.innerHTML = `
        <div class="quote-mark" aria-hidden="true">“</div>
        <p class="quote-text">${escapeHtml(rev.quote)}</p>
        <div class="quote-author-tag">Brand Partner Feedback #${idx + 1}</div>
      `;
      quotesGrid.appendChild(card);
    });
  }

  // 8. Disclaimer & Trust Note
  const disclaimerEl = document.querySelector('.js-disclaimer-text');
  if (disclaimerEl && CONFIG.disclaimerText) {
    disclaimerEl.textContent = CONFIG.disclaimerText;
  }

  // 9. Footer Auto Year & Info
  const yearEl = document.querySelector('.js-current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * HTML escaper for safety
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Mobile navigation menu toggle and scroll spy
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isExpanded = forceClose ? false : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    navMenu.classList.toggle('nav-links--open', isExpanded);
    document.body.classList.toggle('no-scroll', isExpanded);
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('nav-links--open')) {
        toggleMenu(true);
      }
    });
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && navMenu.classList.contains('nav-links--open')) {
      toggleMenu(true);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('nav-links--open')) {
      toggleMenu(true);
    }
  });
}

/**
 * Smooth anchor scrolling with offset for sticky header
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Set focus for accessibility
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Animated number counters in the stats strip
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawValue = el.textContent.trim();
        animateValue(el, rawValue);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateValue(el, rawValue) {
  // Parse numeric part and suffix
  const match = rawValue.match(/^([\d.]+)(.*)$/);
  if (!match) return; // Non-numeric (e.g. "Mumbai-wide")

  const targetNumber = parseFloat(match[1]);
  const suffix = match[2];
  const isDecimal = match[1].includes('.');
  const duration = 1600; // ms
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = (targetNumber * easeOut);

    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = rawValue;
    }
  }

  requestAnimationFrame(update);
}

/**
 * Subtle Scroll Fade-Up Animations
 */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animTargets = document.querySelectorAll('.animate-fade');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    animTargets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animTargets.forEach(el => observer.observe(el));
}

/**
 * Lightbox for screenshots and proof cards
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  let lastFocusedElement = null;

  function openLightbox(src, alt, caption) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';
    lightboxCaption.textContent = caption || alt || '';
    lightbox.classList.add('lightbox--active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lightboxImg.src = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Delegate click for zoomable images
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.zoomable');
    if (target && target.tagName === 'IMG') {
      e.preventDefault();
      const caption = target.getAttribute('data-caption') || target.alt || '';
      openLightbox(target.currentSrc || target.src, target.alt, caption);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop') || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('lightbox--active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });
}

/**
 * Image Error Fallback - replace missing image with styled placeholder box
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      handleImageError(this);
    });
  });
}

function handleImageError(img) {
  // Prevent infinite loops
  if (img.dataset.hasFallback) return;
  img.dataset.hasFallback = 'true';

  const filename = img.getAttribute('src') ? img.getAttribute('src').split('/').pop() : 'image.png';
  const fallbackBox = document.createElement('div');
  fallbackBox.className = 'image-fallback-placeholder';
  fallbackBox.innerHTML = `
    <div class="fallback-inner">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span class="fallback-tag">REPLACE ME</span>
      <code class="fallback-filename">${escapeHtml(filename)}</code>
      <small class="fallback-tip">Place your real screenshot here</small>
    </div>
  `;

  // Preserve aspect ratio if applied to image parent or self
  if (img.parentElement) {
    img.style.display = 'none';
    img.parentElement.appendChild(fallbackBox);
  }
}
