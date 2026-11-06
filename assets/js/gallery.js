(function () {
  var items = [].slice.call(document.querySelectorAll('.gallery-item'));
  var modal = document.getElementById('lightbox');
  if (!items.length || !modal) return;
  var img = modal.querySelector('.lb-img'), cap = modal.querySelector('.lb-caption'), i = 0;
  function show(n) {
    i = (n + items.length) % items.length;
    var src = items[i].querySelector('img');
    img.src = src.getAttribute('data-full') || src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = (i + 1) + ' of ' + items.length;
  }
  items.forEach(function (b, n) { b.addEventListener('click', function () { show(n); }); });
  modal.querySelector('.lb-prev').addEventListener('click', function () { show(i - 1); });
  modal.querySelector('.lb-next').addEventListener('click', function () { show(i + 1); });
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
