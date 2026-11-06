/**
 * ==========================================================================
 * ZEESHAN THE CREATIVE - MAIN SCRIPT
 * ==========================================================================
 * Hydrates content dynamically from CONFIG, handles responsive navigation,
 * animated number counters, scroll animations, justified gallery, and lightbox.
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
  initSmoothScroll();
  initJustifiedGallery();
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
    if (statTopReel) statTopReel.textContent = CONFIG.stats.topReelViews || '628K';
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
      // Store reelUrl on the card for lightbox to read
      if (reel.reelUrl) {
        reelCard.dataset.reelUrl = reel.reelUrl;
      }
      reelCard.innerHTML = `
        <div class="reel-media">
          <img src="assets/images/reel-${index + 1}.png" 
               alt="${escapeHtml(reel.brand)} Reel - ${reel.views} views" 
               loading="lazy" 
               class="zoomable"
               data-caption="${escapeHtml(reel.brand)} \u00b7 ${reel.views} Views \u00b7 ${escapeHtml(reel.caption)}"
               data-reel-url="${escapeHtml(reel.reelUrl || '')}">
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
      const authorLabel = rev.author || `Brand Partner Feedback #${idx + 1}`;
      card.innerHTML = `
        <div class="quote-mark" aria-hidden="true">\u201C</div>
        <p class="quote-text">${escapeHtml(rev.quote)}</p>
        <div class="quote-author-tag">${escapeHtml(authorLabel)}</div>
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
 * Lightbox for screenshots and proof cards.
 * - Reel thumbnails: show image + "Watch On Instagram" button
 * - Other screenshots: show image only
 * Uses clicked image's own src. Never shows placeholder. Handles load errors.
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const reelAction = lightbox.querySelector('.lightbox-reel-action');
  const reelBtn = reelAction ? reelAction.querySelector('.lightbox-reel-btn') : null;
  let lastFocusedElement = null;

  function openLightbox(src, alt, caption, reelUrl) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';
    lightboxCaption.textContent = caption || alt || '';

    // Show/hide reel action button
    if (reelAction && reelBtn) {
      if (reelUrl && reelUrl.length > 5 && !reelUrl.includes('PASTE_')) {
        reelBtn.href = reelUrl;
        reelAction.style.display = '';
      } else {
        reelAction.style.display = 'none';
      }
    }

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
    if (reelAction) reelAction.style.display = 'none';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Delegate click for zoomable images
  document.addEventListener('click', (e) => {
    // Don't intercept clicks on the reel button link itself
    if (e.target.closest('.lightbox-reel-btn')) return;

    const target = e.target.closest('.zoomable');
    if (target && target.tagName === 'IMG') {
      // Only open lightbox if the image actually loaded successfully
      if (!target.naturalWidth || target.naturalWidth === 0) return;
      e.preventDefault();
      const caption = target.getAttribute('data-caption') || target.alt || '';
      const reelUrl = target.getAttribute('data-reel-url') || '';
      openLightbox(target.currentSrc || target.src, target.alt, caption, reelUrl);
    }
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    // Don't close if clicking on the reel button or lightbox content
    if (e.target.closest('.lightbox-reel-btn')) return;
    if (e.target.closest('.lightbox-reel-action')) return;
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
 * Justified Gallery Layout
 * Reads each image's naturalWidth/naturalHeight and sets flex-basis
 * proportionally so all images in a row have the same visual height.
 * Re-runs on window resize.
 */
function initJustifiedGallery() {
  const grids = document.querySelectorAll('.insights-grid, .audience-grid, .shares-saves-grid, .reviews-screenshots-grid');

  function layoutGrid(grid) {
    const cards = grid.querySelectorAll('.screenshot-card');
    cards.forEach(card => {
      const img = card.querySelector('.screenshot-frame img');
      if (!img) return;

      function applyRatio() {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (w && h) {
          // flex-grow proportional to aspect ratio so all images in a row
          // end up the same height when the row fills the container width
          const ratio = w / h;
          card.style.flexGrow = ratio.toFixed(4);
          card.style.flexBasis = (ratio * 180) + 'px'; // base height ~180px
        }
      }

      if (img.complete && img.naturalWidth) {
        applyRatio();
      } else {
        img.addEventListener('load', applyRatio);
      }
    });
  }

  grids.forEach(grid => layoutGrid(grid));

  // Re-layout on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      grids.forEach(grid => layoutGrid(grid));
    }, 200);
  });
}
