document.addEventListener("DOMContentLoaded", function () {
  const newsList = [
    "Discover these Waterproof and Rugged Smartphones that Go on Sale",
    "Top 10 Cafés in Saigon Loved by Locals",
    "How to Capture Perfect Sunrise Photos with Your Phone",
    "The Secret Behind Minimalist Interior Design",
    "New Street Food Trends Taking Over Hanoi"
  ];

  const textEl = document.getElementById("news-text");
  let index = 0;
  textEl.textContent = newsList[index];

  function showNext() {
    const container = document.getElementById("news-text");
    container.classList.add("fade-out");

    // Đợi hiệu ứng fade-out xong rồi đổi nội dung
    setTimeout(() => {
      index = (index + 1) % newsList.length;
      textEl.textContent = newsList[index];
      container.classList.remove("fade-out");
    }, 400); // thời gian trùng với CSS transition
  }

  // Lặp mỗi 3 giây
  setInterval(showNext, 3000);
});