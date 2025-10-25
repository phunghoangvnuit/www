document.querySelectorAll('.nav-item strong').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('fade-out');
    setTimeout(() => {
      item.textContent = item.dataset.en;
      item.classList.remove('fade-out');
    }, 133);
  });

  item.addEventListener('mouseleave', () => {
    item.classList.add('fade-out');
    setTimeout(() => {
      item.textContent = item.dataset.vi;
      item.classList.remove('fade-out');
    }, 133);
  });
});
