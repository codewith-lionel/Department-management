document.addEventListener("DOMContentLoaded", async () => {
  /* -------------------- TABS -------------------- */
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  /* -------------------- TIMETABLE BUTTON -------------------- */
  const viewBtn = document.getElementById("view-timetable-btn");
  const timetableImg = document.getElementById("timetable-img");
  if (viewBtn && timetableImg) {
    viewBtn.addEventListener("click", () => {
      timetableImg.style.display =
        timetableImg.style.display === "block" ? "none" : "block";
      if (timetableImg.style.display === "block") {
        timetableImg.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* -------------------- FACULTY FETCH -------------------- */
  const facultyGrid = document.getElementById("facultyGrid");
  const facultyPopups = document.getElementById("facultyPopups");

  try {
    const res = await fetch("http://localhost:5000/api/faculty");
    const facultyList = await res.json();

    facultyGrid.innerHTML = "";
    facultyPopups.innerHTML = "";

    facultyList.forEach((faculty, idx) => {
      const cardId = `faculty${idx + 1}`;
      facultyGrid.innerHTML += `
        <div class="faculty-card" onclick="showFacultyDetails('${cardId}')">
          <img src="${
            faculty.imageUrl || "/faculty-image/default.jpg"
          }" alt="faculty" />
          <div class="faculty-name">${faculty.name}</div>
        </div>
      `;
      facultyPopups.innerHTML += `
        <div class="faculty-popup" id="${cardId}">
          <div class="popup-content">
            <img src="${
              faculty.imageUrl || "/faculty-image/default.jpg"
            }" alt="faculty" />
            <div class="faculty-details">
              <h3>${faculty.name}</h3>
              <p>🎓 ${faculty.title || faculty.designation || ""}</p>
              <p>📘 ${faculty.specialization || ""}</p>
              <p>📧 ${faculty.email || ""}</p>
            </div>
            <span class="close-btn" onclick="hideFacultyDetails('${cardId}')">&times;</span>
          </div>
        </div>
      `;
    });
  } catch (err) {
    if (facultyGrid)
      facultyGrid.innerHTML = "<p>Error loading faculty data.</p>";
  }

  // Close faculty modal when clicking outside
  window.addEventListener("click", function (e) {
    document.querySelectorAll(".faculty-popup").forEach((modal) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  });

  /* -------------------- SIDEBAR -------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sideNav = document.getElementById("sideNav");
  const sideNavOverlay = document.getElementById("sideNavOverlay");
  const closeBtn = document.getElementById("sideNavCloseBtn");

  if (hamburgerBtn && sideNav && sideNavOverlay && closeBtn) {
    function openSidebar() {
      sideNav.classList.add("open");
      sideNavOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      sideNav.classList.remove("open");
      sideNavOverlay.style.display = "none";
      document.body.style.overflow = "";
    }

    hamburgerBtn.addEventListener("click", openSidebar);
    sideNavOverlay.addEventListener("click", closeSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSidebar();
    });
  }

  /* -------------------- FADE TRANSITION (optional) -------------------- */
  function navigateWithFade(url) {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = url;
    }, 300);
  }

  window.navigateWithFade = navigateWithFade; // in case needed globally

  // Load dynamic events from backend
  async function loadEvents() {
    const eventsList = document.getElementById("upcomingEvents");
    if (!eventsList) return;
    eventsList.innerHTML = "<li>Loading events...</li>";
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const events = await res.json();
      if (!Array.isArray(events) || events.length === 0) {
        eventsList.innerHTML = "<li>No upcoming events.</li>";
        return;
      }
      eventsList.innerHTML = events
        .map(
          (event) => `
        <li style="margin-bottom: 1.2em;">
          <strong>${event.title}</strong>
          <br>
          <span style="color:#666;">${
            event.date ? new Date(event.date).toLocaleDateString() : ""
          }</span>
          <br>
          <span>${event.description || ""}</span>
          ${
            event.image
              ? `<br><img src="${event.image}" alt="${event.title}" style="max-width:120px; margin-top:6px; border-radius:8px;">`
              : ""
          }
        </li>
      `
        )
        .join("");
    } catch {
      eventsList.innerHTML = "<li>Error loading events.</li>";
    }
  }

  loadEvents();
});

/* -------------------- FACULTY MODAL FUNCTIONS (global) -------------------- */
function showFacultyDetails(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("show");
}
function hideFacultyDetails(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("show");
}

// Hamburger and Side Nav functionality
document.addEventListener("DOMContentLoaded", function () {
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

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openSideNav);
  if (sideNavOverlay) sideNavOverlay.addEventListener("click", closeSideNav);
  if (sideNavCloseBtn) sideNavCloseBtn.addEventListener("click", closeSideNav);

  // Optional: Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSideNav();
  });
});
