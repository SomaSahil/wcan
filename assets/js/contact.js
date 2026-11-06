(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var btn = form.querySelector('button[type="submit"]');

  function say(msg, type) {
    status.className = 'form-status ' + type;
    status.textContent = msg;
    status.focus();
  }
  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(function (e) { e.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
    status.className = ''; status.textContent = '';
  }
  function getToken() {
    return fetch('php/contact.php', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (d) { form.elements.token.value = d.token; })
      .catch(function () {
        say('The form could not load. Please email us instead.', 'error');
        btn.disabled = true;
      });
  }
  getToken();

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearErrors();
    btn.disabled = true;
    fetch('php/contact.php', {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Accept': 'application/json' },
      body: new URLSearchParams(new FormData(form))
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d.ok) { window.location.href = res.d.redirect || 'thank-you.html'; return; }
        if (res.d.errors) {
          Object.keys(res.d.errors).forEach(function (k) {
            var el = form.elements[k], box = document.getElementById('err-' + k);
            if (box) box.textContent = res.d.errors[k];
            if (el) el.setAttribute('aria-invalid', 'true');
          });
          say('Please check the highlighted fields.', 'error');
        } else {
          say(res.d.error || 'Something went wrong. Please try again.', 'error');
        }
        getToken(); btn.disabled = false;
      })
      .catch(function () {
        say('Something went wrong. Please try again, or email us.', 'error');
        getToken(); btn.disabled = false;
      });
  });
})();
