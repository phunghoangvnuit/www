// Handle language hover
document.querySelectorAll('.nav-item strong').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('fade-out');
    setTimeout(() => {
      item.textContent = item.dataset.en;
      item.classList.remove('fade-out');
    }, 150);
  });

  item.addEventListener('mouseleave', () => {
    item.classList.add('fade-out');
    setTimeout(() => {
      item.textContent = item.dataset.vi;
      item.classList.remove('fade-out');
    }, 150);
  });
});

// Handle active tab click
const navLinks = document.querySelectorAll('.nav-item.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active')); // remove old
    link.classList.add('active'); // set new active
  });
});