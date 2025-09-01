// SideNav logic
const sideNav = document.getElementById("sideNav");
const sideNavOverlay = document.getElementById("sideNavOverlay");

function openSideNav() {
  sideNav?.classList.add("open");
  if (sideNavOverlay) sideNavOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeSideNav() {
  sideNav?.classList.remove("open");
  if (sideNavOverlay) sideNavOverlay.style.display = "none";
  document.body.style.overflow = "";
}

sideNavOverlay?.addEventListener("click", closeSideNav);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSideNav();
});

// Typewriter effect
const typeText =
  "Inspiring the next generation of innovators and leaders in technology.";
function typeWriter(el, text, speed = 40) {
  if (!el) return;
  el.textContent = "";
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(tick, speed);
    }
  };
  tick();
}

// Testimonials carousel
const testimonials = [
  "“The faculty here truly care about our success!” – Priya S.",
  "“The hands-on projects helped me land my dream job.” – Arjun T.",
  "“Great community and amazing events!” – Fatima K.",
];
function startTestimonials(el, items, interval = 3500) {
  if (!el || !items?.length) return;
  let tIndex = 0;
  el.textContent = items[0];
  setInterval(() => {
    tIndex = (tIndex + 1) % items.length;
    el.textContent = items[tIndex];
  }, interval);
}

// Statistics counters
function animateStat(id, end) {
  const el = document.getElementById(id);
  if (!el) return;
  let n = 0;
  const step = Math.max(1, Math.ceil(end / 60)); // smooth-ish animation
  const interval = setInterval(() => {
    n += step;
    if (n >= end) {
      n = end;
      clearInterval(interval);
    }
    el.textContent = String(n);
  }, 30);
}

// Modals
const coursesModal = document.getElementById("coursesModal");
const openCoursesModal = document.getElementById("openCoursesModal");
const closeCoursesModal = document.getElementById("closeCoursesModal");

const eventsModal = document.getElementById("eventsModal");
const openEventsModal = document.getElementById("openEventsModal");
const closeEventsModal = document.getElementById("closeEventsModal");
const eventsModalContent = document.getElementById("eventsModalContent");

// Scroll-to-top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollTopBtn?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// DOM Ready
document.addEventListener("DOMContentLoaded", async () => {
  // AOS init if available
  if (window.AOS?.init) {
    AOS.init({ duration: 700, once: false });
  }

  // Typewriter
  typeWriter(document.getElementById("typewriter"), typeText);

  // Testimonials
  startTestimonials(document.getElementById("testimonial"), testimonials);

  // Stats
  animateStat("stat-students", 320);
  animateStat("stat-faculty", 18);
  animateStat("stat-papers", 75);
  animateStat("stat-awards", 12);

  // Courses Modal
  openCoursesModal?.addEventListener("click", () => {
    coursesModal?.classList.remove("hidden");
  });
  closeCoursesModal?.addEventListener("click", () => {
    coursesModal?.classList.add("hidden");
  });
  coursesModal?.addEventListener("click", (e) => {
    if (e.target === coursesModal) coursesModal.classList.add("hidden");
  });

  // Events Modal
  openEventsModal?.addEventListener("click", async () => {
    try {
      const res = await fetch("home.html");
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const eventSection = doc.querySelector("#eventsSection");
      if (eventSection && eventsModalContent) {
        eventsModalContent.innerHTML = eventSection.innerHTML;
      } else if (eventsModalContent) {
        eventsModalContent.innerHTML = "<p>No events found.</p>";
      }
    } catch {
      if (eventsModalContent)
        eventsModalContent.innerHTML = "<p>Could not load events.</p>";
    }
    eventsModal?.classList.remove("hidden");
  });
  closeEventsModal?.addEventListener("click", () => {
    eventsModal?.classList.add("hidden");
  });
  eventsModal?.addEventListener("click", (e) => {
    if (e.target === eventsModal) eventsModal.classList.add("hidden");
  });
});
