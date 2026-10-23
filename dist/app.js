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
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const message = String(values.get('message') || '').trim();
    if (!name || !message) { form.querySelector(!name ? '[name="name"]' : '[name="message"]').focus(); return; }
    if (values.get('_honey')) return;
    const interest = String(values.get('interest'));
    draft = `Hello YUTECH SOLUTIONS,\n\n${message}\n\nTopic: ${interest}\nName: ${name}\nEmail: ${email}`;
    const status = document.querySelector('#enquiry-status');
    const button = form.querySelector('button[type="submit"]');
    sending = true; button.disabled = true; button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    document.querySelector('#email-fallback').hidden = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/yutech075@gmail.com', {
        method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        signal: controller.signal,
        body: JSON.stringify({name, email, message, interest, _subject: 'New YUTECH SOLUTIONS website enquiry', _template: 'table', _honey: ''})
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission rejected');
      status.textContent = /activat|confirm.*email|verify/i.test(String(result.message || ''))
        ? 'The enquiry service needs email verification by YUTECH SOLUTIONS. Please contact us by WhatsApp or email for now.'
        : 'Your enquiry has been accepted for delivery. Thank you for contacting YUTECH SOLUTIONS.';
    } catch (_) {
      status.textContent = 'We could not confirm delivery. Your message is still here. Please contact us by WhatsApp or copy your enquiry and email it. If you retry, a duplicate may be sent.';
      document.querySelector('#email-fallback').hidden = false;
    } finally {
      clearTimeout(timeout); sending = false; button.disabled = false;
      button.textContent = 'Send enquiry'; form.removeAttribute('aria-busy');
    }
  });
  document.querySelector('#copy-enquiry').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try { await navigator.clipboard.writeText(draft); status.textContent = 'Enquiry copied. Paste it into your email.'; }
    catch (_) {
      const area = document.createElement('textarea'); area.value = draft; area.setAttribute('aria-label', 'Your enquiry â€” select and copy'); area.readOnly = true;
      const existing = document.querySelector('#manual-copy'); if (existing) existing.remove();
      area.id = 'manual-copy'; document.querySelector('#email-fallback').append(area); area.focus(); area.select();
      status.textContent = 'Select and copy the enquiry below.';
    }
  });
})();
