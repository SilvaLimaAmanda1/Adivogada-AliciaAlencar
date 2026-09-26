/* =========================================================
   CONFIGURAÇÃO RÁPIDA DO SITE
   Edite somente este objeto para trocar os dados principais.
   ========================================================= */
const siteConfig = {
  lawyerName: "Alicia Alencar",
  oab: "OAB/SP 00.000",
  email: "contato@seudominio.com",
  phoneDisplay: "(00) 00000-0000",
  whatsappNumber: "5500000000000", // somente números: país + DDD + telefone
  city: "São Paulo/SP"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function applyConfig() {
  $$('[data-lawyer-name]').forEach(el => el.textContent = siteConfig.lawyerName);
  $$('[data-contact-email]').forEach(el => el.textContent = siteConfig.email);
  $$('[data-contact-phone]').forEach(el => el.textContent = siteConfig.phoneDisplay);
  $$('[data-contact-city]').forEach(el => el.textContent = siteConfig.city);
  $$('[data-contact-email-link]').forEach(el => el.href = `mailto:${siteConfig.email}`);
  $$('[data-whatsapp-link]').forEach(el => {
    const url = `https://wa.me/${siteConfig.whatsappNumber}`;
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
  const oabElements = $$('footer .footer-bottom span:last-child');
  oabElements.forEach(el => el.textContent = siteConfig.oab);
  document.title = `${siteConfig.lawyerName} | Direito do Trabalho e Direito do Consumidor`;
}

function setupMenu() {
  const button = $('.menu-toggle');
  const nav = $('#main-nav');
  if (!button || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    button.innerHTML = '<i class="ri-menu-3-line"></i>';
  };

  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    button.innerHTML = open ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-3-line"></i>';
  });

  $$('.nav-link', nav).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

function setupHeader() {
  const header = $('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 15);
  }, { passive: true });
}

function setupActiveNavigation() {
  const sections = $$('main section[id]');
  const links = $$('.nav-link[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

function setupReveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .13 });
  items.forEach(item => observer.observe(item));
}

function setupArticleModal() {
  const modal = $('#article-modal');
  const title = $('#modal-title');
  if (!modal) return;

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  $$('.read-more').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      title.textContent = link.dataset.article || 'Conteúdo jurídico';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  $$('[data-close-modal]', modal).forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
  });
  $$('a[href="#contato"]', modal).forEach(el => el.addEventListener('click', close));
}

function setupForm() {
  const form = $('#contact-form');
  const status = $('#form-status');
  if (!form || !status) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Revise os campos obrigatórios antes de continuar.';
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('subject'));
    const body = encodeURIComponent([
      `Nome: ${data.get('name')}`,
      `E-mail: ${data.get('email')}`,
      `Telefone: ${data.get('phone') || 'Não informado'}`,
      '',
      'Mensagem:',
      data.get('message')
    ].join('\n'));

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    status.textContent = 'Seu aplicativo de e-mail deve abrir com a mensagem preparada.';
    form.reset();
  });
}

function setupYear() {
  const year = $('#current-year');
  if (year) year.textContent = new Date().getFullYear();
}

applyConfig();
setupMenu();
setupHeader();
setupActiveNavigation();
setupReveal();
setupArticleModal();
setupForm();
setupYear();
