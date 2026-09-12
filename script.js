/* ==========================================================================
   NEW ALL INTERIORES — PISOS VINÍLICOS & LAMINADOS
   Script Global, Simulador de Ambientes & Conversão
   Pixel Studio
   ========================================================================== */

/* ── CONFIGURAÇÃO CENTRAL DE CONVERSÃO ───────────────────────────────────── */
const CONFIG = {
  targetUrl: 'em-construcao.html',
  respondiFallback: 'https://form.respondi.app/new-all',
  useExternalForm: false
};

document.addEventListener('DOMContentLoaded', () => {
  initCTALinks();
  initHeader();
  initMobileDrawer();
  initSimulator();
  initGallery();
  initFAQ();
  initScrollAnimations();
});

/* ── 1. ROTEAMENTO DE CTAS ───────────────────────────────────────────────── */
function getDestinationUrl(extraParams) {
  const base = CONFIG.useExternalForm ? CONFIG.respondiFallback : CONFIG.targetUrl;
  if (!extraParams) return base;
  const separator = base.includes('?') ? '&' : '?';
  return `${base}${separator}${extraParams}`;
}

function initCTALinks() {
  const currentSearch = window.location.search ? window.location.search.replace('?', '') : '';

  document.querySelectorAll('[data-cta]').forEach(el => {
    const product = el.getAttribute('data-product') || 'geral';
    const params = new URLSearchParams();
    params.set('origem', 'lp-newall');
    params.set('interesse', product);

    if (currentSearch) {
      params.set('ref', currentSearch);
    }

    el.href = getDestinationUrl(params.toString());
  });
}

/* ── 2. HEADER SCROLL & STICKY ───────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ── 3. MENU MOBILE DRAWER ───────────────────────────────────────────────── */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  links.forEach(l => l.addEventListener('click', closeDrawer));
}

/* ── 4. SIMULADOR DE ESCOPO (PISOS VINÍLICOS & LAMINADOS) ────────────────── */
let currentSelectionNewAll = {
  product: 'vinilico',
  name: 'Piso Vinílico Térmico & Resistente à Água',
  sqm: 45
};

function initSimulator() {
  const pills = document.querySelectorAll('.cat-pill-btn');
  const slider = document.getElementById('range-slider-newall');
  const sqmDisplay = document.getElementById('sqm-display-newall');
  const summaryName = document.getElementById('summary-product-newall');
  const summaryScope = document.getElementById('summary-scope-newall');
  const btnAction = document.getElementById('btn-simulador-newall');

  if (!slider || !sqmDisplay) return;

  function updateSimulator() {
    const sqm = slider.value;
    currentSelectionNewAll.sqm = sqm;
    sqmDisplay.textContent = `${sqm} m²`;

    if (summaryName) {
      summaryName.textContent = currentSelectionNewAll.name;
    }

    if (summaryScope) {
      summaryScope.textContent = `Área estimada: ${sqm} m² • Pacote Completo: piso, materiais de instalação e mão de obra especializada.`;
    }

    if (btnAction) {
      const params = new URLSearchParams({
        produto: currentSelectionNewAll.product,
        metragem: sqm,
        origem: 'simulador-newall'
      });
      btnAction.href = getDestinationUrl(params.toString());
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const prod = pill.getAttribute('data-prod');
      currentSelectionNewAll.product = prod;

      if (prod === 'vinilico') {
        currentSelectionNewAll.name = 'Piso Vinílico Térmico & Resistente à Água';
      } else if (prod === 'laminado') {
        currentSelectionNewAll.name = 'Piso Laminado Clicado de Fácil Limpeza';
      }

      updateSimulator();
    });
  });

  slider.addEventListener('input', updateSimulator);
  updateSimulator();
}

/* ── 5. GALERIA & LIGHTBOX ───────────────────────────────────────────────── */
const galleryDataNewAll = [
  { src: 'images/PHOTO (4).jpg', title: 'Espaço Gourmet & Circulação', sub: 'Alta Resistência e Perfeita Harmonização com Mobiliário' },
  { src: 'images/pexels-artbovich-6489122.jpg', title: 'Sala de Estar Contemporânea', sub: 'Texturas Nobres e Acabamento de Revista' },
  { src: 'images/pexels-pixabay-271624.jpg', title: 'Suíte de Casal Iluminada', sub: 'Proteção Acústica e Aconchego Térmico para sua Família' }
];

let currentLightboxIndexNewAll = 0;

function initGallery() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
  });
}

function openLightbox(index) {
  currentLightboxIndexNewAll = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  if (!modal || !img) return;

  const data = galleryDataNewAll[index];
  img.src = data.src;
  img.alt = data.title;
  if (caption) caption.textContent = `${data.title} — ${data.sub}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(dir) {
  currentLightboxIndexNewAll += dir;
  if (currentLightboxIndexNewAll < 0) currentLightboxIndexNewAll = galleryDataNewAll.length - 1;
  if (currentLightboxIndexNewAll >= galleryDataNewAll.length) currentLightboxIndexNewAll = 0;

  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const data = galleryDataNewAll[currentLightboxIndexNewAll];

  if (img) {
    img.src = data.src;
    img.alt = data.title;
  }
  if (caption) {
    caption.textContent = `${data.title} — ${data.sub}`;
  }
}

/* ── 6. FAQ ACCORDION ────────────────────────────────────────────────────── */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-header-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ── 7. ANIMAÇÕES NO SCROLL (REVEAL) ─────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
