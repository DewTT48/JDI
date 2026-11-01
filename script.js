(() => {
  'use strict';
  const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwukSqFDCuGT15ZvM9j0b4hUy1qE1rr2v__kt8NQgj09dubVIpJkrFU1Wd_RfUoSqMx/exec';
  const PRODUCT_BASE = 'https://dewtt48.github.io/role-intelligence/product/';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('currentYear')?.replaceChildren(String(new Date().getFullYear()));

  // Responsive menu, links and scroll progress bar.
  const menuButton = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const header = document.querySelector('.site-header');
  const meter = document.getElementById('scrollMeter');
  const closeMenu = () => {
    nav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'เปิดเมนูนำทาง');
  };
  menuButton?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'ปิดเมนูนำทาง' : 'เปิดเมนูนำทาง');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  let scrollPending = false;
  const updateScroll = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (meter) meter.style.width = `${Math.min(100, Math.max(0, window.scrollY / maxScroll * 100))}%`;
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
    scrollPending = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();

  // Product-backed workflow: editable text, no invented functionality.
  const steps = [
    { label: 'COLLECT', heading: 'รับข้อมูลตำแหน่งอย่างมีโครงสร้าง', description: 'ผู้ขอส่งข้อมูลตำแหน่งผ่านแบบฟอร์มที่มีโครงสร้าง รองรับการเพิ่มรายตำแหน่งและการนำเข้าข้อมูลหลายตำแหน่ง', role: 'Requester' },
    { label: 'VALIDATE', heading: 'HR ตรวจความครบถ้วน', description: 'HR ตรวจข้อมูลตั้งต้น กำหนดผู้รับผิดชอบ และส่งคำขอข้อมูลเพิ่มเติมให้ผู้ขอได้ก่อนสร้าง JD', role: 'HR Owner' },
    { label: 'AI DRAFT', heading: 'AI ช่วยสร้างร่าง JD', description: 'ระบบใช้ข้อมูลตำแหน่งและบริบทธุรกิจที่มีช่วยสร้างร่าง JD แต่ร่างยังไม่ถือเป็นเอกสารที่ผ่านการอนุมัติ', role: 'AI-assisted / HR' },
    { label: 'HR REVIEW', heading: 'HR ตรวจ แก้ไข และควบคุมคุณภาพ', description: 'HR ทบทวนเนื้อหา ปรับแก้ และสามารถขอให้ AI สร้างเนื้อหาบางส่วนใหม่ได้ตามขั้นตอนที่ระบบรองรับ', role: 'HR Owner' },
    { label: 'CONFIRM', heading: 'ให้ผู้แทนหน่วยงานยืนยัน', description: 'ผู้แทนหน่วยงานตรวจ JD และเลือกยืนยันหรือขอแก้ไข โดย HR สามารถแก้ไขและส่งกลับให้ตรวจซ้ำได้', role: 'Department Reviewer' },
    { label: 'PUBLISH', heading: 'Finalize และ Publish เป็นข้อมูลกลาง', description: 'เมื่อผ่านการตรวจตามกระบวนการแล้ว HR Finalize และ Publish เข้าสู่ Approved JD Database พร้อม Version Snapshot', role: 'HR Owner' },
    { label: 'DELIVER', heading: 'สร้างเอกสารและส่งมอบ', description: 'ระบบสร้าง Google Doc และส่งลิงก์หรือเอกสารให้ผู้เกี่ยวข้องตามรูปแบบการส่งมอบที่ตั้งค่าไว้', role: 'System / HR' }
  ];
  const stepTabs = Array.from(document.querySelectorAll('[data-step]'));
  const wfPanel = document.getElementById('wf-panel');
  const wfPrev = document.getElementById('wf-prev');
  const wfNext = document.getElementById('wf-next');
  let stepIndex = 0;
  const updateStep = (index, focus = false) => {
    stepIndex = Math.min(steps.length - 1, Math.max(0, index));
    const step = steps[stepIndex];
    document.getElementById('wf-counter').textContent = `STEP ${String(stepIndex + 1).padStart(2, '0')} / 07`;
    document.getElementById('wf-heading').textContent = step.heading;
    document.getElementById('wf-description').textContent = step.description;
    document.getElementById('wf-role').textContent = step.role;
    document.getElementById('wf-graphic-number').textContent = String(stepIndex + 1).padStart(2, '0');
    document.getElementById('wf-graphic-action').textContent = step.label;
    document.getElementById('wf-progress-fill').style.width = `${(stepIndex + 1) / steps.length * 100}%`;
    wfPrev.disabled = stepIndex === 0;
    wfNext.disabled = stepIndex === steps.length - 1;
    stepTabs.forEach((tab, i) => {
      const active = i === stepIndex;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) wfPanel?.setAttribute('aria-labelledby', tab.id);
    });
    if (focus) stepTabs[stepIndex]?.focus();
  };
  stepTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => updateStep(i));
    tab.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        updateStep((i + (event.key === 'ArrowRight' ? 1 : -1) + steps.length) % steps.length, true);
      }
      if (event.key === 'Home') { event.preventDefault(); updateStep(0, true); }
      if (event.key === 'End') { event.preventDefault(); updateStep(steps.length - 1, true); }
    });
  });
  wfPrev?.addEventListener('click', () => updateStep(stepIndex - 1));
  wfNext?.addEventListener('click', () => updateStep(stepIndex + 1));
  if (stepTabs.length) updateStep(0);

  // Actual legacy product screenshots; replace with V1.1.19 approved screenshots when available.
  const products = [
    { image: 'jd-workspace.png', alt: 'ภาพหน้าจอ JD Workspace จากเว็บไซต์ Role Intelligence รุ่นเดิม', kicker: 'WORKFLOW VISIBILITY', title: 'เห็นสถานะ JD และขั้นตอนถัดไปในที่เดียว', body: 'JD Workspace ช่วยให้ HR ติดตามตำแหน่งงาน ผู้รับผิดชอบ และขั้นตอนที่ต้องดำเนินการต่อได้อย่างเป็นระบบ', proof: 'ติดตามข้อมูลตั้งต้นและสถานะการทำ JD' },
    { image: 'company-context.png', alt: 'ภาพหน้าจอ Business Context จากเว็บไซต์ Role Intelligence รุ่นเดิม', kicker: 'BUSINESS CONTEXT', title: 'ให้ JD เชื่อมโยงกับบริบทองค์กร', body: 'ข้อมูลธุรกิจ หน่วยงาน และ Competency เป็นข้อมูลประกอบที่สามารถนำมาใช้ใน Workflow จัดทำ JD', proof: 'ใช้ข้อมูลบริบทองค์กรประกอบการร่าง JD' },
    { image: 'batch-import.png', alt: 'ภาพหน้าจอ Batch Import จากเว็บไซต์ Role Intelligence รุ่นเดิม', kicker: 'STRUCTURED POSITION INTAKE', title: 'รับข้อมูลหลายตำแหน่งด้วยรูปแบบที่มีโครงสร้าง', body: 'รองรับการนำเข้าหลายตำแหน่ง เพื่อให้กระบวนการจัดทำ JD เริ่มจากข้อมูลรูปแบบเดียวกันและติดตามรายการได้', proof: 'นำเข้าตำแหน่งหลายรายการเข้าสู่กระบวนการ' }
  ];
  const productTabs = Array.from(document.querySelectorAll('[data-product]'));
  const productImage = document.getElementById('product-image');
  const productFallback = document.getElementById('product-fallback');
  const productPanel = document.getElementById('product-panel');
  const setProduct = (index, focus = false) => {
    const item = products[index];
    if (!item) return;
    document.getElementById('product-kicker').textContent = item.kicker;
    document.getElementById('product-heading').textContent = item.title;
    document.getElementById('product-description').textContent = item.body;
    document.getElementById('product-proof').textContent = item.proof;
    productFallback.hidden = false;
    productImage.hidden = false;
    productImage.classList.remove('is-loaded');
    productImage.src = PRODUCT_BASE + item.image;
    productImage.alt = item.alt;
    productTabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active) productPanel?.setAttribute('aria-labelledby', tab.id);
    });
    if (focus) productTabs[index]?.focus();
  };
  productImage?.addEventListener('load', () => {
    productImage.classList.add('is-loaded');
    productFallback.hidden = true;
  });
  productImage?.addEventListener('error', () => {
    productImage.classList.remove('is-loaded');
    productImage.hidden = true;
    productFallback.hidden = false;
  });
  productTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => setProduct(i));
    tab.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setProduct((i + (event.key === 'ArrowRight' ? 1 : -1) + productTabs.length) % productTabs.length, true);
      }
    });
  });

  if (productTabs.length) setProduct(0);

  // Demo request form uses existing inquiry endpoint. Do not report success before response.
  const dialog = document.getElementById('demoDialog');
  const form = document.getElementById('demoForm');
  const status = document.getElementById('formStatus');
  const submit = document.getElementById('submitDemo');
  let activeRequestId = '';
  let responseTimer;
  const openDemo = () => {
    closeMenu();
    if (status) status.textContent = '';
    if (dialog?.showModal && !dialog.open) dialog.showModal();
  };
  const closeDemo = () => { if (dialog?.open) dialog.close(); };
  document.querySelectorAll('[data-open-demo]').forEach(el => el.addEventListener('click', openDemo));
  document.getElementById('closeDemo')?.addEventListener('click', closeDemo);
  dialog?.addEventListener('click', event => { if (event.target === dialog) closeDemo(); });
  dialog?.addEventListener('close', () => {
    clearTimeout(responseTimer);
    if (submit) submit.disabled = false;
  });
  const setHidden = (name, value) => {
    const field = form?.elements.namedItem(name);
    if (field) field.value = value;
  };
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'กรุณากรอกข้อมูลที่จำเป็นและยินยอมการติดต่อก่อนส่ง';
      return;
    }
    if (form.elements.namedItem('company_website')?.value) return;
    activeRequestId = crypto.randomUUID?.() ?? ('jdi-' + Date.now() + '-' + Math.random().toString(36).slice(2));
    const painSelect = form.elements.namedItem('pain_focus');
    const painText = painSelect.value ? painSelect.selectedOptions[0].textContent : 'ไม่ได้ระบุ';
    const additional = form.elements.namedItem('additional_message').value.trim();
    const message = 'สนใจ JDI - Role Intelligence\nปัญหาหลัก: ' + painText + (additional ? '\nรายละเอียด: ' + additional : '');
    setHidden('request_id', activeRequestId);
    setHidden('page_url', location.href);
    setHidden('user_agent', navigator.userAgent);
    setHidden('message_body', message);
    setHidden('message', '[เรื่องที่ติดต่อ: ขอเดโม JDI]\n' + message);
    form.action = LEAD_ENDPOINT;
    submit.disabled = true;
    status.textContent = 'กำลังส่งคำขอ...';
    responseTimer = setTimeout(() => {
      submit.disabled = false;
      status.textContent = 'ยังไม่สามารถยืนยันการรับข้อมูลได้ กรุณาลองอีกครั้ง';
    }, 25000);
    HTMLFormElement.prototype.submit.call(form);
  });
  window.addEventListener('message', event => {
    if (!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+[.-])?script\.googleusercontent\.com)$/.test(event.origin)) return;
    const data = event.data;
    if (!data || data.type !== 'JD_LEAD_RESULT' || data.requestId !== activeRequestId) return;
    clearTimeout(responseTimer);
    submit.disabled = false;
    if (data.success) {
      form.reset();
      activeRequestId = '';
      status.textContent = 'ส่งคำขอเรียบร้อยแล้ว ทีมงานจะติดต่อกลับ';
    } else {
      status.textContent = data.message || 'ส่งคำขอไม่สำเร็จ กรุณาลองอีกครั้ง';
    }
  });

  // Restrained reveal transitions and motion preferences.
  if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06, rootMargin: '0px 0px 60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
})();
