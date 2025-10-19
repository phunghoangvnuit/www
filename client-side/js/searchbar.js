$(document).ready(function () {
  // Chỉ bắt click icon trong khu vực navbar search
  $(".nav-right .searchbar .fa-search").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    // Chỉ toggle khối search của navbar
    $(".nav-right .searchbar .togglesearch").toggle();
    // Chỉ focus đúng ô input trong navbar
    $(".nav-right .searchbar .pc-search input[type='text']").trigger("focus");
  });
});
