(() => {
  'use strict';

  // Existing Role Intelligence inquiry service. Keep this source identifier separate
  // to make leads from the JDI commercial site distinguishable from the old landing page.
  const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwukSqFDCuGT15ZvM9j0b4hUy1qE1rr2v__kt8NQgj09dubVIpJkrFU1Wd_RfUoSqMx/exec';
  const PRODUCT_BASE = 'https://dewtt48.github.io/role-intelligence/product/';
  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  function closeMenu() {
    primaryNav?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'เปิดเมนูนำทาง');
  }
  menuButton?.addEventListener('click', () => {
    const opening = !primaryNav?.classList.contains('is-open');
    primaryNav?.classList.toggle('is-open', opening);
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'ปิดเมนูนำทาง' : 'เปิดเมนูนำทาง');
  });
  primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const steps = [
    { label: 'COLLECT', heading: 'รับข้อมูลตำแหน่งอย่างมีโครงสร้าง', description: 'ผู้ขอส่งข้อมูลสำคัญของตำแหน่งผ่านแบบฟอร์มเดียวกัน รองรับทั้งรายตำแหน่งและการนำเข้าหลายรายการ', role: 'Requester', icon: '▤' },
    { label: 'VALIDATE', heading: 'ตรวจข้อมูลตั้งต้นให้พร้อม', description: 'HR ตรวจความครบถ้วน ระบุผู้รับผิดชอบ และส่งคำขอข้อมูลเพิ่มเติมกลับผู้ขอได้ก่อนเริ่มสร้าง JD', role: 'HR Owner', icon: '✓' },
    { label: 'AI DRAFT', heading: 'ให้ AI ช่วยสร้างร่าง JD', description: 'ระบบนำข้อมูลตำแหน่งและข้อมูลประกอบที่มีไปช่วยสร้างร่าง JD โดยยังไม่ถือว่าเป็นเนื้อหาที่ผ่านการอนุมัติ', role: 'AI-assisted / HR', icon: '✦' },
    { label: 'HR REVIEW', heading: 'HR ตรวจและปรับแก้เนื้อหา', description: 'HR ทบทวนความเหมาะสม แก้ไขรายละเอียด และควบคุมคุณภาพของ JD ก่อนส่งให้ผู้แทนหน่วยงาน', role: 'HR Owner', icon: '✎' },
    { label: 'CONFIRM', heading: 'ให้เจ้าของงานยืนยันร่วมกัน', description: 'ผู้แทนหน่วยงานตรวจเนื้อหาและเลือกยืนยันหรือขอแก้ไข โดย HR สามารถส่งกลับเข้าสู่ Workflow ได้', role: 'Department Reviewer', icon: '◎' },
    { label: 'PUBLISH', heading: 'Finalize และจัดเก็บในฐานข้อมูล', description: 'หลังผ่านการตรวจตามขั้นตอน HR Finalize และ Publish เป็น Approved JD Record พร้อม Version Snapshot และประวัติ', role: 'HR Owner', icon: '▦' },
    { label: 'DELIVER', heading: 'สร้างเอกสารและส่งมอบ', description: 'ระบบสร้าง Google Doc และส่งลิงก์หรือเอกสารแก่ผู้เกี่ยวข้องตามการตั้งค่าการติดตั้ง', role: 'System / HR', icon: '↗' },
  ];
  const wfTabs = Array.from(document.querySelectorAll('[data-step]'));
  const wfPanel = document.getElementById('wf-panel');
  const wfPrev = document.getElementById('wf-prev');
  const wfNext = document.getElementById('wf-next');
  let currentStep = 0;
  const wfNode = (id) => document.getElementById(id);
  function setStep(index, focus = false) {
    currentStep = Math.max(0, Math.min(steps.length - 1, index));
    const step = steps[currentStep];
    wfNode('wf-counter').textContent = 'STEP ' + String(currentStep + 1).padStart(2, '0') + ' / 07';
    wfNode('wf-icon').textContent = step.icon;
    wfNode('wf-heading').textContent = step.heading;
    wfNode('wf-description').textContent = step.description;
    wfNode('wf-role').textContent = step.role;
    wfNode('wf-graphic-number').textContent = String(currentStep + 1).padStart(2, '0');
    wfNode('wf-graphic-action').textContent = step.label;
    wfNode('wf-progress-fill').style.width = String(((currentStep + 1) / steps.length) * 100) + '%';
    wfPrev.disabled = currentStep === 0;
    wfNext.disabled = currentStep === steps.length - 1;
    wfTabs.forEach((tab, i) => {
      const selected = i === currentStep;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) wfPanel.setAttribute('aria-labelledby', tab.id);
    });
    if (focus) wfTabs[currentStep]?.focus();
  }
  wfTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setStep(index));
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : null;
      if (next !== null) {
        event.preventDefault();
        setStep((next + steps.length) % steps.length, true);
      }
      if (event.key === 'Home') { event.preventDefault(); setStep(0, true); }
      if (event.key === 'End') { event.preventDefault(); setStep(steps.length - 1, true); }
    });
  });
  wfPrev?.addEventListener('click', () => setStep(currentStep - 1));
  wfNext?.addEventListener('click', () => setStep(currentStep + 1));

  const products = [
    { image: 'jd-workspace.png', alt: 'ตัวอย่างภาพหน้าจอ JD Workspace จากเว็บไซต์ Role Intelligence เดิม', kicker: 'WORKFLOW VISIBILITY', title: 'เห็นสถานะ JD และขั้นตอนถัดไปในที่เดียว', body: 'JD Workspace ช่วยให้ HR ติดตามตำแหน่งงาน ผู้รับผิดชอบ และขั้นตอนที่ต้องดำเนินการต่อได้อย่างเป็นระบบ', proof: 'ติดตามข้อมูลตั้งต้นและสถานะการทำ JD' },
    { image: 'company-context.png', alt: 'ตัวอย่างภาพหน้าจอ Business Context จากเว็บไซต์ Role Intelligence เดิม', kicker: 'BUSINESS CONTEXT', title: 'ให้ JD เชื่อมโยงกับบริบทองค์กร', body: 'ข้อมูลธุรกิจ หน่วยงาน และ Competency เป็นข้อมูลประกอบที่นำมาใช้ในกระบวนการจัดทำ JD ได้', proof: 'ใช้ข้อมูลบริบทขององค์กรประกอบการจัดทำ JD' },
    { image: 'batch-import.png', alt: 'ตัวอย่างภาพหน้าจอ Batch Import จากเว็บไซต์ Role Intelligence เดิม', kicker: 'STRUCTURED INPUT', title: 'เริ่มจากข้อมูลตำแหน่งหลายรายการอย่างมีโครงสร้าง', body: 'รองรับการนำเข้าข้อมูลหลายตำแหน่ง เพื่อลดการเตรียมข้อมูลซ้ำในกระบวนการสร้าง JD ที่มีโครงสร้างเดียวกัน', proof: 'นำข้อมูลตำแหน่งหลายรายการเข้าสู่ Workflow' },
  ];
  const productTabs = Array.from(document.querySelectorAll('[data-product]'));
  const productImg = document.getElementById('product-image');
  const productFallback = document.getElementById('product-fallback');
  const productPanel = document.getElementById('product-panel');
  function setProduct(index, focus = false) {
    const product = products[index];
    if (!product) return;
    document.getElementById('product-kicker').textContent = product.kicker;
    document.getElementById('product-heading').textContent = product.title;
    document.getElementById('product-description').textContent = product.body;
    document.getElementById('product-proof').textContent = product.proof;
    productFallback.hidden = true;
    productImg.hidden = false;
    productImg.alt = product.alt;
    productImg.src = PRODUCT_BASE + product.image;
    productTabs.forEach((tab, i) => {
      const selected = i === index;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) productPanel.setAttribute('aria-labelledby', tab.id);
    });
    if (focus) productTabs[index]?.focus();
  }
  productImg?.addEventListener('error', () => {
    productImg.hidden = true;
    productFallback.hidden = false;
  });
  productTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setProduct(index));
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : null;
      if (next !== null) {
        event.preventDefault();
        setProduct((next + productTabs.length) % productTabs.length, true);
      }
    });
  });

  const dialog = document.getElementById('demoDialog');
  const form = document.getElementById('demoForm');
  const status = document.getElementById('formStatus');
  const submitButton = document.getElementById('submitDemo');
  let activeRequestId = '';
  let responseTimer;
  const openDemo = () => {
    closeMenu();
    status.textContent = '';
    if (dialog?.showModal && !dialog.open) dialog.showModal();
  };
  const closeDemo = () => {
    if (dialog?.open) dialog.close();
  };
  document.querySelectorAll('[data-open-demo]').forEach((button) => button.addEventListener('click', openDemo));
  document.getElementById('closeDemo')?.addEventListener('click', closeDemo);
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeDemo();
  });
  dialog?.addEventListener('close', () => {
    window.clearTimeout(responseTimer);
    submitButton.disabled = false;
  });

  function setHidden(name, value) {
    const field = form.elements.namedItem(name);
    if (field) field.value = value;
  }
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'กรุณากรอกข้อมูลที่จำเป็นและยินยอมการติดต่อก่อนส่ง';
      return;
    }
    if (form.elements.namedItem('company_website').value) return;
    activeRequestId = window.crypto?.randomUUID?.() || ('jdi-' + Date.now() + '-' + Math.random().toString(36).slice(2));
    const painSelect = form.elements.namedItem('pain_focus');
    const painText = painSelect.value ? painSelect.selectedOptions[0].textContent : 'ไม่ได้ระบุ';
    const additional = form.elements.namedItem('additional_message').value.trim();
    setHidden('request_id', activeRequestId);
    setHidden('page_url', window.location.href);
    setHidden('user_agent', navigator.userAgent);
    setHidden('message_body', 'สนใจ JDI - Role Intelligence\nปัญหาหลัก: ' + painText + (additional ? '\nรายละเอียด: ' + additional : ''));
    setHidden('message', '[เรื่องที่ติดต่อ: ขอเดโม JDI]\nปัญหาหลัก: ' + painText + (additional ? '\nรายละเอียด: ' + additional : ''));
    form.action = LEAD_ENDPOINT;
    submitButton.disabled = true;
    status.textContent = 'กำลังส่งคำขอ...';
    responseTimer = window.setTimeout(() => {
      submitButton.disabled = false;
      status.textContent = 'ยังไม่สามารถยืนยันการรับข้อมูลได้ กรุณาลองอีกครั้ง';
    }, 25000);
    // Legacy Google Apps Script service posts the result to this hidden iframe.
    HTMLFormElement.prototype.submit.call(form);
  });
  window.addEventListener('message', (event) => {
    if (!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+[.-])?script\.googleusercontent\.com)$/.test(event.origin)) return;
    const data = event.data;
    if (!data || data.type !== 'JD_LEAD_RESULT' || data.requestId !== activeRequestId) return;
    window.clearTimeout(responseTimer);
    submitButton.disabled = false;
    if (data.success) {
      form.reset();
      status.textContent = 'ส่งคำขอเรียบร้อยแล้ว ทีมงานจะติดต่อกลับ';
      activeRequestId = '';
    } else {
      status.textContent = data.message || 'ส่งคำขอไม่สำเร็จ กรุณาลองอีกครั้ง';
    }
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('has-observer');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px 20px 0px' });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
  }
})();
