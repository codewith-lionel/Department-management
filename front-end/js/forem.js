document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("foremGallery");

  try {
    const response = await fetch("http://localhost:5000/api/forem-images");
    const images = await response.json();

    if (Array.isArray(images) && images.length > 0) {
      gallery.innerHTML = images
        .map(
          (img, index) => `
            <div class="image-card" onclick="openImageModal('${img.imageUrl}', '${img.description || 'Forem Event Image'}', ${index})">
              <img src="${img.imageUrl}" alt="Forem Event" />
              <div class="image-overlay">
                <p class="image-title">${img.description || 'Forem Event'}</p>
              </div>
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

// Image Modal Functions
function openImageModal(imageUrl, description, index) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalDesc = document.getElementById("modalDescription");

  modalImg.src = imageUrl;
  modalDesc.textContent = description;
  modal.style.display = "flex";

  // Add pop animation
  modalImg.style.transform = "scale(0.8)";
  modalImg.style.opacity = "0";

  setTimeout(() => {
    modalImg.style.transform = "scale(1)";
    modalImg.style.opacity = "1";
  }, 50);
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  // Add close animation
  modalImg.style.transform = "scale(0.8)";
  modalImg.style.opacity = "0";

  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

// Navigation code
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
    if (e.key === "Escape") {
      closeSideNav();
      closeImageModal(); // Close image modal on Escape
    }
  });
});
