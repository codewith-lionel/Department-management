document.addEventListener("DOMContentLoaded", async () => {
  const awardsList = document.getElementById("awards-list");
  const projectsList = document.getElementById("projects-list");
  const successList = document.getElementById("success-list");

  if (!awardsList || !projectsList || !successList) return;

  try {
    const res = await fetch("http://localhost:5000/api/achievements");
    const achievements = await res.json();

    awardsList.innerHTML = "";
    projectsList.innerHTML = "";
    successList.innerHTML = "";

    achievements.forEach((a) => {
      const card = document.createElement("div");
      card.className = "card achievement-card";
      if (a.imageUrl) {
        card.innerHTML += `<img src="${a.imageUrl}" alt="${a.title}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:12px;">`;
      }
      card.innerHTML += `
        <h3 class="achievement-title">${a.title}</h3>
        <p class="achievement-desc">${a.description}</p>
        <span class="meta-date">${a.date}</span>
        <a href="#" class="meta-link" style="display:block;margin-top:8px;color:#ff9800;text-decoration:underline;">View Details</a>
      `;

      if (a.type === "award") awardsList.appendChild(card);
      else if (a.type === "project") projectsList.appendChild(card);
      else if (a.type === "story") successList.appendChild(card);
    });
  } catch (err) {
    awardsList.innerHTML =
      projectsList.innerHTML =
      successList.innerHTML =
        "<p>Failed to load achievements.</p>";
  }
});

// Navbar hamburger and side nav functionality (same as home.js)
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

// Example: open modal with details
document.addEventListener("DOMContentLoaded", () => {
  // Delegate click for all .meta-link buttons
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("meta-link")) {
      e.preventDefault();
      // Example data, replace with dynamic achievement info
      const card = e.target.closest(".achievement-card");
      const title = card.querySelector(".achievement-title").textContent;
      const desc = card.querySelector(".achievement-desc").textContent;
      const date = card.querySelector(".meta-date").textContent;
      const imgSrc = card.querySelector("img").src;
      document.getElementById("modalDetails").innerHTML = `
        <h2 style="color:#3f51b5;">${title}</h2>
        <img src="${imgSrc}" style="width:100%;border-radius:8px;margin-bottom:1rem;">
        <p>${desc}</p>
        <p style="color:#888;">${date}</p>
      `;
      document.getElementById("achievementModal").style.display = "flex";
    }
    if (
      e.target.id === "modalCloseBtn" ||
      e.target.classList.contains("modal-overlay")
    ) {
      document.getElementById("achievementModal").style.display = "none";
    }
  });
});
