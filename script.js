document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    if (!name || !email || !validateEmail(email)) {
      msg.style.color = 'crimson'; msg.textContent = 'Please provide a valid name and email.'; return;
    }
    // Indicate sending state and prevent duplicate submits
    try {
      if (submitBtn) { submitBtn.disabled = true; }
      msg.style.color = '#666'; msg.textContent = 'Sending message…';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, service, message })
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        msg.style.color = 'green';
        msg.textContent = "Thank you — we've received your message. We'll contact you as soon as possible.";
        form.reset();
        setTimeout(() => { msg.textContent = ''; }, 8000);
      } else {
        throw new Error(j.error || 'API error');
      }
    } catch (err) {
      msg.style.color = 'crimson'; msg.textContent = 'Failed to send message. Try again later.';
      console.error(err);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; }
    }
  });
});
