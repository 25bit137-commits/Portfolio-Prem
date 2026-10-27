/**
 * Prem S.B - Portfolio JavaScript
 * Features:
 *  - Dynamic Typing Animation
 *  - Gmail Toggle Dispatcher (Web Gmail vs Client mailto vs Instant Copy to newpremramesh@gmail.com)
 *  - Interactive Sports Tournament System Simulation (Search & Sport Filtering)
 *  - Color Theme Switcher (Apex Crimson, Cyber Sapphire, Neon Emerald, Champion Gold, Clean Light)
 *  - Interactive 3D Tilt Effect on Portrait Card
 *  - Ambient Canvas Particle Background
 *  - ScrollSpy & Sticky Header
 *  - Architecture Modal & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. COLOR THEME SWITCHER
     ========================================================================== */
  const themeBtn = document.getElementById('theme-btn');
  const themeMenu = document.getElementById('theme-menu');
  const themeOptBtns = document.querySelectorAll('.theme-opt-btn');
  const activeThemeDot = document.getElementById('active-theme-dot');
  const htmlRoot = document.documentElement;

  const themeColors = {
    crimson: '#f43f5e',
    sapphire: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
    light: '#e11d48'
  };

  // Load saved theme or default to crimson
  const savedTheme = localStorage.getItem('prem_theme') || 'crimson';
  applyTheme(savedTheme, false);

  if (themeBtn && themeMenu) {
    // Toggle dropdown menu
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeMenu.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!themeMenu.contains(e.target) && !themeBtn.contains(e.target)) {
        themeMenu.classList.remove('open');
      }
    });

    // Handle theme option selection
    themeOptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedTheme = btn.getAttribute('data-theme-value');
        applyTheme(selectedTheme, true);
        themeMenu.classList.remove('open');
      });
    });
  }

  function applyTheme(themeName, showToastMsg) {
    if (!themeColors[themeName]) themeName = 'crimson';
    
    htmlRoot.setAttribute('data-theme', themeName);
    localStorage.setItem('prem_theme', themeName);

    // Update active button state
    themeOptBtns.forEach(b => {
      if (b.getAttribute('data-theme-value') === themeName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Update color dot
    if (activeThemeDot) {
      activeThemeDot.style.backgroundColor = themeColors[themeName];
      activeThemeDot.style.boxShadow = `0 0 6px ${themeColors[themeName]}`;
    }

    // Update canvas particle colors
    if (window.updateCanvasColors) {
      window.updateCanvasColors();
    }

    if (showToastMsg) {
      const themeDisplayNames = {
        crimson: 'Apex Crimson',
        sapphire: 'Cyber Sapphire',
        emerald: 'Neon Emerald',
        amber: 'Champion Gold',
        light: 'Clean Light'
      };
      showToast(`Palette changed to ${themeDisplayNames[themeName]} ✨`);
    }
  }

  /* ==========================================================================
     2. DYNAMIC TYPING EFFECT (HERO)
     ========================================================================== */
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const roles = [
      "KGCAS Student · Second Year",
      "Java & OOP Software Developer",
      "Sports Tournament Systems Architect",
      "Erode, Tamil Nadu, India",
      "Creator: Tournament Result System",
      "Clean Code & Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 45;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of text
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 450; // Pause before new word
      }

      setTimeout(typeLoop, typingDelay);
    }

    setTimeout(typeLoop, 800);
  }

  /* ==========================================================================
     3. GMAIL TOGGLE & DISPATCHER (CONTACT SECTION)
     Configured for: newpremramesh@gmail.com
     ========================================================================== */
  const TARGET_EMAIL = 'newpremramesh@gmail.com';
  let activeMailMode = 'web'; // 'web' | 'client' | 'copy'

  const modePills = document.querySelectorAll('.mode-pill');
  const modeStatusText = document.getElementById('mode-status-text');
  const directGmailLink = document.getElementById('direct-gmail-link');
  const copyEmailTrigger = document.getElementById('copy-email-trigger');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  const sendBtnText = document.getElementById('send-btn-text');
  const contactForm = document.getElementById('contact-form');

  // Mode Selection Toggle
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-checked', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-checked', 'true');

      activeMailMode = pill.getAttribute('data-mode');
      updateMailModeUI();
    });
  });

  function updateMailModeUI() {
    if (activeMailMode === 'web') {
      modeStatusText.innerHTML = `Mode: <strong>Web Gmail</strong> · Opens direct Google Mail composer to <strong>${TARGET_EMAIL}</strong> in your browser.`;
      if (sendBtnText) sendBtnText.textContent = 'Compose in Gmail';
      if (directGmailLink) {
        directGmailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${TARGET_EMAIL}&su=Portfolio%20Inquiry%20for%20Prem%20S.B`;
        directGmailLink.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg> <span>Launch Web Gmail Compose ↗</span>`;
      }
    } else if (activeMailMode === 'client') {
      modeStatusText.innerHTML = `Mode: <strong>Default Mail Client</strong> · Triggers system default application (Outlook, Apple Mail, etc.) to <strong>${TARGET_EMAIL}</strong>.`;
      if (sendBtnText) sendBtnText.textContent = 'Open Mail Client';
      if (directGmailLink) {
        directGmailLink.href = `mailto:${TARGET_EMAIL}?subject=Portfolio%20Inquiry%20for%20Prem%20S.B`;
        directGmailLink.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> <span>Open Mail Application ↗</span>`;
      }
    } else if (activeMailMode === 'copy') {
      modeStatusText.innerHTML = `Mode: <strong>Copy Email Address</strong> · One-click copy <strong>${TARGET_EMAIL}</strong> directly to your clipboard.`;
      if (sendBtnText) sendBtnText.textContent = 'Copy Address & Details';
      copyToClipboard(TARGET_EMAIL);
    }
  }

  // Quick Copy button listener
  if (copyEmailTrigger) {
    copyEmailTrigger.addEventListener('click', () => {
      copyToClipboard(TARGET_EMAIL);
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      if (copyBtnLabel) {
        const originalText = copyBtnLabel.textContent;
        copyBtnLabel.textContent = 'Copied! ✓';
        setTimeout(() => {
          copyBtnLabel.textContent = originalText;
        }, 2200);
      }
      showToast(`Copied ${text} to clipboard! 📋`);
    }).catch(() => {
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast(`Copied ${text}! 📋`);
    });
  }

  // Contact Form Submission Handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('email-subject').value.trim();
      const message = document.getElementById('email-body').value.trim();

      if (!name || !subject || !message) {
        showToast('Please fill in your name, subject, and message.');
        return;
      }

      const formattedSubject = `[Portfolio] ${subject}`;
      const formattedBody = `Hello Prem,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email || 'Not provided'}`;

      if (activeMailMode === 'web') {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
        window.open(gmailUrl, '_blank');
        showToast('Opening Web Gmail Composer! 🚀');
      } else if (activeMailMode === 'client') {
        const mailtoUrl = `mailto:${encodeURIComponent(TARGET_EMAIL)}?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;
        window.location.href = mailtoUrl;
        showToast('Launching default email application...');
      } else {
        copyToClipboard(TARGET_EMAIL);
        showToast('Email address copied to clipboard!');
      }
    });
  }

  /* ==========================================================================
     4. INTERACTIVE TOURNAMENT SYSTEM SIMULATION (PROJECTS SECTION)
     ========================================================================== */
  const tournamentTabBar = document.getElementById('tournament-tab-bar');
  const catPills = tournamentTabBar ? tournamentTabBar.querySelectorAll('.cat-pill') : [];
  const tournamentSearchInput = document.getElementById('tournament-search-input');
  const tournamentContainer = document.getElementById('mock-tournament-container');
  const matchItems = tournamentContainer ? tournamentContainer.querySelectorAll('.contact-card-item') : [];
  const termStatusMsg = document.getElementById('term-status-msg');

  let activeSport = 'ALL';
  let searchQuery = '';

  if (tournamentTabBar) {
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeSport = pill.getAttribute('data-sport');
        filterSimulatedMatches();
      });
    });
  }

  if (tournamentSearchInput) {
    tournamentSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterSimulatedMatches();
    });
  }

  function filterSimulatedMatches() {
    let visibleCount = 0;

    matchItems.forEach(item => {
      const itemSport = item.getAttribute('data-sport');
      const team1 = (item.getAttribute('data-team1') || '').toLowerCase();
      const team2 = (item.getAttribute('data-team2') || '').toLowerCase();
      const fullText = item.textContent.toLowerCase();

      const matchesSport = (activeSport === 'ALL' || itemSport.toUpperCase() === activeSport.toUpperCase());
      const matchesSearch = (searchQuery === '' || team1.includes(searchQuery) || team2.includes(searchQuery) || itemSport.toLowerCase().includes(searchQuery) || fullText.includes(searchQuery));

      if (matchesSport && matchesSearch) {
        item.classList.remove('hidden');
        visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (termStatusMsg) {
      if (visibleCount === 0) {
        termStatusMsg.textContent = `Search Query: "${searchQuery}" · No matches found in tournament database`;
      } else {
        termStatusMsg.textContent = `Sport Category: [${activeSport}] · Showing ${visibleCount} fixtures`;
      }
    }
  }

  /* ==========================================================================
     5. 3D CARD TILT EFFECT ON PORTRAIT PHOTO
     ========================================================================== */
  const portraitCard = document.getElementById('portrait-card');
  const portraitWrapper = document.getElementById('portrait-wrapper');

  if (portraitCard && portraitWrapper && window.matchMedia('(pointer: fine)').matches) {
    portraitWrapper.addEventListener('mousemove', (e) => {
      const rect = portraitCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 12;

      portraitCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitWrapper.addEventListener('mouseleave', () => {
      portraitCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  /* ==========================================================================
     6. AMBIENT PARTICLES CANVAS BACKGROUND
     ========================================================================== */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    let particleColor = 'rgba(244, 63, 94, 0.45)';
    let lineColor = 'rgba(244, 63, 94, 0.12)';

    window.updateCanvasColors = function() {
      const activeTheme = htmlRoot.getAttribute('data-theme') || 'crimson';
      if (activeTheme === 'sapphire') {
        particleColor = 'rgba(59, 130, 246, 0.45)';
        lineColor = 'rgba(59, 130, 246, 0.12)';
      } else if (activeTheme === 'emerald') {
        particleColor = 'rgba(16, 185, 129, 0.45)';
        lineColor = 'rgba(16, 185, 129, 0.12)';
      } else if (activeTheme === 'amber') {
        particleColor = 'rgba(245, 158, 11, 0.45)';
        lineColor = 'rgba(245, 158, 11, 0.12)';
      } else if (activeTheme === 'light') {
        particleColor = 'rgba(225, 29, 72, 0.35)';
        lineColor = 'rgba(225, 29, 72, 0.08)';
      } else {
        particleColor = 'rgba(244, 63, 94, 0.45)';
        lineColor = 'rgba(244, 63, 94, 0.12)';
      }
    };

    window.updateCanvasColors();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with subtle glowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ==========================================================================
     7. NAVIGATION, SCROLLSPY & STICKY HEADER
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky Header effect
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute('data-nav') === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     8. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileDrawer();
      });
    });

    function openMobileDrawer() {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMobileDrawer() {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  /* ==========================================================================
     9. ARCHITECTURE & CODE SPECS MODAL
     ========================================================================== */
  const openSpecsBtn = document.getElementById('open-specs-btn');
  const specsModal = document.getElementById('specs-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const closeSpecsDismissBtn = document.getElementById('close-specs-dismiss-btn');

  function openModal() {
    if (!specsModal) return;
    specsModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!specsModal) return;
    specsModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (openSpecsBtn) openSpecsBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeSpecsDismissBtn) closeSpecsDismissBtn.addEventListener('click', closeModal);

  if (specsModal) {
    specsModal.addEventListener('click', (e) => {
      if (e.target === specsModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !specsModal.hasAttribute('hidden')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     10. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  const toastNotification = document.getElementById('toast-notify');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;

    if (toastTimeout) clearTimeout(toastTimeout);

    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

});
