// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Close mobile menu after choosing a link
document.querySelectorAll('#nav .nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    var nav = document.getElementById('nav');
    if (nav.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  });
});

// Hide the social list if no links have been added yet
var social = document.getElementById('social');
if (social && !social.children.length) { social.hidden = true; }
