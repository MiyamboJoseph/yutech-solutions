(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width:601px)').addEventListener('change', closeMenu);
  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('[data-enquiry]').addEventListener('click', event => { document.querySelector('#interest').value = event.currentTarget.dataset.enquiry; });
  const privacy = document.querySelector('#privacy-toggle');
  privacy.addEventListener('click', () => {
    const open = privacy.getAttribute('aria-expanded') !== 'true';
    privacy.setAttribute('aria-expanded', String(open)); document.querySelector('#privacy-note').hidden = !open;
  });
  const form = document.querySelector('#enquiry-form');
  let draft = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('name')).trim();
    const email = String(values.get('email')).trim();
    const message = String(values.get('message')).trim();
    if (!name || !message) { form.querySelector(!name ? '[name="name"]' : '[name="message"]').focus(); return; }
    const interest = String(values.get('interest'));
    draft = `Hello YUTECH SOLUTIONS,\n\n${message}\n\nTopic: ${interest}\nName: ${name}\nEmail: ${email}`;
    document.querySelector('#email-fallback').hidden = false;
    window.location.href = `mailto:yutech075@gmail.com?subject=${encodeURIComponent(`Yutech enquiry: ${interest}`)}&body=${encodeURIComponent(draft)}`;
  });
  document.querySelector('#copy-enquiry').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try { await navigator.clipboard.writeText(draft); status.textContent = 'Enquiry copied. Paste it into your email.'; }
    catch (_) {
      const area = document.createElement('textarea'); area.value = draft; area.setAttribute('aria-label', 'Your enquiry — select and copy'); area.readOnly = true;
      const existing = document.querySelector('#manual-copy'); if (existing) existing.remove();
      area.id = 'manual-copy'; document.querySelector('#email-fallback').append(area); area.focus(); area.select();
      status.textContent = 'Select and copy the enquiry below.';
    }
  });
})();
