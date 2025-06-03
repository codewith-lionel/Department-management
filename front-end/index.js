// Tabs functionality
// Tab switching (no scrolling)
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active to clicked button and matching tab content
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Smooth scroll for header nav links + activate corresponding tab
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetContent = document.getElementById(targetId);

    if (!targetContent) return;

    // Scroll smoothly to the tab content container (adjust offset if needed)
    window.scrollTo({
      top: targetContent.offsetTop - 60, // 60px for header height, adjust if needed
      behavior: "smooth",
    });

    // Activate the correct tab button and tab content
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Find tab button with matching data-tab
    const activeBtn = Array.from(tabButtons).find(
      (btn) => btn.getAttribute("data-tab") === targetId
    );
    if (activeBtn) activeBtn.classList.add("active");

    targetContent.classList.add("active");
  });
});
const viewBtn = document.getElementById("view-timetable-btn");
const timetableImg = document.getElementById("timetable-img");

viewBtn.addEventListener("click", () => {
  if (timetableImg.style.display === "block") {
    timetableImg.style.display = "none";
  } else {
    timetableImg.style.display = "block";
    timetableImg.scrollIntoView({ behavior: "smooth" });
  }
});

/*slide bar */
function closeSidebar() {
  document.getElementById("sidebar").classList.add("closed");
}

function openSidebar() {
  document.getElementById("sidebar").classList.remove("closed");
}

//faculty animation
function showFacultyDetails(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("show");
  }
}

function hideFacultyDetails(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("show");
  }
}

// Optional: Close on outside click
window.addEventListener("click", function (e) {
  document.querySelectorAll(".faculty-popup").forEach((modal) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});
// Smooth transition on navigation
function navigateWithFade(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url;
  }, 300); // match the CSS transition duration
}
