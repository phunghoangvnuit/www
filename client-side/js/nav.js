const navLinks = document.querySelectorAll('.nav-item.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // prevent page reload
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});