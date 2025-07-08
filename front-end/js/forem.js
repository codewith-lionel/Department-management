document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("foremGallery");
  try {
    // Replace with your actual backend endpoint
    const res = await fetch("http://localhost:5000/api/forem-images");
    const images = await res.json();
    if (Array.isArray(images) && images.length > 0) {
      gallery.innerHTML = images
        .map(
          (img) => `
        <div class="image-card">
          <img src="${img.url}" alt="${img.caption || "Forem Event"}" />
          <div class="image-caption">${img.caption || ""}</div>
        </div>
      `
        )
        .join("");
    } else {
      gallery.innerHTML = "<p>No images found.</p>";
    }
  } catch (err) {
    gallery.innerHTML = "<p>Could not load images.</p>";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sideNav = document.getElementById("sideNav");
  const sideNavOverlay = document.getElementById("sideNavOverlay");
  const sideNavCloseBtn = document.getElementById("sideNavCloseBtn");

  function openSideNav() {
    if (sideNav && sideNavOverlay) {
      sideNav.classList.add("open");
      sideNavOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closeSideNav() {
    if (sideNav && sideNavOverlay) {
      sideNav.classList.remove("open");
      sideNavOverlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openSideNav);
  if (sideNavOverlay) sideNavOverlay.addEventListener("click", closeSideNav);
  if (sideNavCloseBtn) sideNavCloseBtn.addEventListener("click", closeSideNav);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSideNav();
  });
});