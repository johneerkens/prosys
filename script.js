document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    if (!name || !email || !validateEmail(email)) {
      msg.style.color = 'crimson'; msg.textContent = 'Please provide a valid name and email.'; return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, message })
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        msg.style.color = 'green'; msg.textContent = 'Thank you — we received your message.';
        form.reset();
        setTimeout(() => { msg.textContent = ''; }, 5000);
      } else {
        throw new Error(j.error || 'API error');
      }
    } catch (err) {
      msg.style.color = 'crimson'; msg.textContent = 'Failed to send message. Try again later.';
      console.error(err);
    }
  });
});
