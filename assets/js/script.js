'use strict';

// Sidebar toggle (Tailwind hidden)
(() => {
  const btn = document.querySelector('[data-sidebar-btn]');
  const more = document.querySelector('[data-sidebar-more]');
  const caret = document.querySelector('[data-caret]');
  if (btn && more) {
    btn.addEventListener('click', () => {
      const isHidden = more.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!isHidden));
      btn.firstElementChild.textContent = isHidden ? 'Show contacts' : 'Hide contacts';
      if (caret) caret.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }
})();

// Page navigation
(() => {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');
  const pageMap = {};
  pages.forEach(p => pageMap[p.dataset.page.toLowerCase()] = p);

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      const target = this.textContent.trim().toLowerCase();
      const page = pageMap[target];
      if (!page) return;

      // Toggle pages
      pages.forEach(p => p.classList.add('hidden'));
      page.classList.remove('hidden');

      // Toggle active button styles
      navLinks.forEach(b => b.classList.remove('bg-gray-900', 'text-white'));
      this.classList.add('bg-gray-900', 'text-white');

      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

// Portfolio filter (buttons + dropdown)
(() => {
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const select = document.querySelector('[data-select]');
  const selectList = document.querySelector('.select-list');
  const selectValue = document.querySelector('[data-selecct-value]');
  const items = document.querySelectorAll('[data-filter-item]');

  const apply = (val) => {
    const v = val.toLowerCase();
    items.forEach(it => {
      const ok = v === 'all' || it.dataset.category === v;
      it.classList.toggle('active', ok);
      it.classList.toggle('hidden', !ok);
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-gray-900', 'text-white'));
      btn.classList.add('active', 'bg-gray-900', 'text-white');
      apply(btn.textContent.trim());
      if (selectValue) selectValue.textContent = btn.textContent.trim();
    });
  });

  if (select && selectList) {
    select.addEventListener('click', () => selectList.classList.toggle('hidden'));
    document.querySelectorAll('[data-select-item]').forEach(opt => {
      opt.addEventListener('click', () => {
        const text = opt.textContent.trim();
        if (selectValue) selectValue.textContent = text;
        selectList.classList.add('hidden');
        apply(text);
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!select.contains(e.target) && !selectList.contains(e.target)) {
        selectList.classList.add('hidden');
      }
    });
  }
})();

// Contact form enable submit
(() => {
  const form = document.querySelector('[data-form]');
  const inputs = document.querySelectorAll('[data-form-input]');
  const btn = document.querySelector('[data-form-btn]');
  if (!form || !inputs.length || !btn) return;

  const check = () => {
    const ok = Array.from(inputs).every(i => i.value && i.value.trim().length > 0);
    btn.disabled = !ok;
  };
  inputs.forEach(i => i.addEventListener('input', check));
  check();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Sent</span>';
    setTimeout(() => {
      form.reset();
      check();
      btn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    }, 1000);
  });
})();