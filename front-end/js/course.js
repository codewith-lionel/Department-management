document.addEventListener("DOMContentLoaded", function () {
  // Full Stack
  document.getElementById("explore-fsd").onclick = function () {
    window.location.href = "fsd-course.html";
  };
  // Microsoft Tools
  document.getElementById("explore-microsoft").onclick = function () {
    window.location.href = "microsoft-course.html";
  };
  // Hardware & Networking
  document.getElementById("explore-hardware").onclick = function () {
    window.location.href = "hardware-course.html";
  };

  // Side nav logic
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sideNav = document.getElementById('sideNav');
  const sideNavOverlay = document.getElementById('sideNavOverlay');
  const sideNavCloseBtn = document.getElementById('sideNavCloseBtn');

  hamburgerBtn.addEventListener('click', function () {
    sideNav.classList.add('open');
    sideNavOverlay.style.display = 'block';
  });

  sideNavCloseBtn.addEventListener('click', function () {
    sideNav.classList.remove('open');
    sideNavOverlay.style.display = 'none';
  });

  sideNavOverlay.addEventListener('click', function () {
    sideNav.classList.remove('open');
    sideNavOverlay.style.display = 'none';
  });
});
