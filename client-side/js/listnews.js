(function () {
  const PAGE_SIZE = 6;

  const loadBtn = document.querySelector('.get-more-post-btn');
  if (!loadBtn) return;

  const listNews = loadBtn.closest('.list-news');

  let posts = [];
  let offset = 0;

  async function init() {
    try {
      const res = await fetch('./data/posts.json'); // đổi sang API thật khi có
      posts = await res.json();
      renderNext(); // mặc định 6
    } catch (e) {
      console.error('Cannot load posts:', e);
      loadBtn.textContent = 'Không tải được dữ liệu';
      loadBtn.disabled = true;
    }
  }

  function postTemplate(p) {
    return `
      <article class="post-item">
        <div class="d-md-flex gap-3">
          <img class="post-thumb mb-3 mb-md-0" src="${p.image}" alt="${p.title}">
          <div>
            ${p.exclusive ? '<span class="exclusive-badge mb-2">EXCLUSIVE</span>' : ''}
            <h2 class="h4 post-title">
              <a class="link-dark text-decoration-none" href="${p.url}">${p.title}</a>
            </h2>
            <div class="post-meta">${p.category} · <a href="#" class="link-secondary text-decoration-none">${p.author}</a> – <i class="fa-regular fa-clock"></i> ${p.date}</div>
            <p class="mt-2 mb-0 text-secondary">${p.excerpt}</p>
          </div>
        </div>
      </article>`;
  }

  // ---- Render tối đa 6 bài khi bấm nút "Xem thêm" ----
  function renderNext() {
    const slice = posts.slice(offset, offset + PAGE_SIZE);
    if (slice.length === 0) {
      loadBtn.disabled = true;
      loadBtn.innerHTML = 'Hết bài';
      return;
    }

    const html = slice.map(postTemplate).join('');
    loadBtn.parentElement.insertAdjacentHTML('beforebegin', html);

    offset += slice.length;

    if (offset >= posts.length) {
      loadBtn.disabled = true;
      loadBtn.innerHTML = 'Hết bài';
    }
  }

  loadBtn.addEventListener('click', renderNext);
  init();
})();
