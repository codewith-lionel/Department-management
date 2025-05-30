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
