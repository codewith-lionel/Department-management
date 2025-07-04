function loadVideo(url, el) {
  // Change video
  document.getElementById("videoPlayer").src = url;

  // Remove 'selected' from all cards
  document.querySelectorAll(".video-card").forEach((card) => {
    card.classList.remove("selected");
  });

  // Add 'selected' to the clicked card
  if (el) {
    el.classList.add("selected");
  }

  // Animate the video player
  const player = document.getElementById("videoPlayer");
  player.classList.remove("animate");
  void player.offsetWidth; // trigger reflow
  player.classList.add("animate");
}

/*slide bar */
function closeSidebar() {
  document.getElementById("sidebar").classList.add("closed");
}

function openSidebar() {
  document.getElementById("sidebar").classList.remove("closed");
}

// Hamburger and Side Nav functionality
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideNav = document.getElementById("sideNav");
const sideNavOverlay = document.getElementById("sideNavOverlay");
const sideNavCloseBtn = document.getElementById("sideNavCloseBtn");

function openSideNav() {
  sideNav.classList.add("open");
  sideNavOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeSideNav() {
  sideNav.classList.remove("open");
  sideNavOverlay.style.display = "none";
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", openSideNav);
sideNavOverlay.addEventListener("click", closeSideNav);
sideNavCloseBtn.addEventListener("click", closeSideNav);

// Optional: Close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeSideNav();
});
