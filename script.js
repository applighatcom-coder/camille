(function() {
  // Sticky header shadow
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal observer
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // Modal handling for verified actions & privacy policy
  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalChannels = document.getElementById('modalChannels');
  const modalClose = document.getElementById('modalClose');

  const modalContent = {
    discovery: {
      title: 'Book Your Discovery Call',
      body: 'Connect directly with Dr. Camille Upchurch via email, her official website, or LinkedIn to schedule your Discovery Call.',
      showChannels: true
    },
    coaching: {
      title: 'One-on-One Money Coaching',
      body: 'Inquire directly with Dr. Camille about personalized One-on-One Money Coaching for women physicians.',
      showChannels: true
    },
    codesign: {
      title: 'The Physician Wealth School™ Co-Design',
      body: 'Send an email or DM "DESIGN" to Dr. Camille on LinkedIn for details on The Physician Wealth School™ Co-Design.',
      showChannels: true
    },
    speaking: {
      title: 'Invite Dr. Camille to Speak',
      body: 'For keynotes, workshops, retreats, and physician leadership events, email Dr. Camille or DM "SPEAK" on LinkedIn.',
      showChannels: true
    },
    privacy: {
      title: 'Privacy Policy',
      body: 'This website respects your privacy. No personal tracking cookies or third-party data harvesting scripts are used on this page. Direct inquiries sent via email or LinkedIn are handled confidentially by Dr. Camille Upchurch, MD.',
      showChannels: false
    }
  };

  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-modal-trigger');
      const cfg = modalContent[key] || modalContent.discovery;
      modalTitle.textContent = cfg.title;
      modalBody.textContent = cfg.body;
      modalChannels.style.display = cfg.showChannels ? 'flex' : 'none';
      modal.classList.add('open');
      modalClose.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();
