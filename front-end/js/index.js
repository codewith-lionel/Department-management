// SideNav logic
const sideNav = document.getElementById("sideNav");
const sideNavOverlay = document.getElementById("sideNavOverlay");

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

sideNavOverlay.addEventListener("click", closeSideNav);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeSideNav();
});

// Typewriter effect
const text =
  "Inspiring the next generation of innovators and leaders in technology.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
window.onload = typeWriter;

// Testimonials carousel
const testimonials = [
  "“The faculty here truly care about our success!” – Priya S.",
  "“The hands-on projects helped me land my dream job.” – Arjun T.",
  "“Great community and amazing events!” – Fatima K.",
];
let tIndex = 0;
function showTestimonial() {
  document.getElementById("testimonial").textContent = testimonials[tIndex];
  tIndex = (tIndex + 1) % testimonials.length;
}
setInterval(showTestimonial, 3500);
window.onload = showTestimonial;

// Statistics counters
function animateStat(id, end) {
  let el = document.getElementById(id),
    n = 0;
  let interval = setInterval(() => {
    n++;
    el.textContent = n;
    if (n >= end) clearInterval(interval);
  }, 30);
}
window.addEventListener("DOMContentLoaded", function () {
  animateStat("stat-students", 320);
  animateStat("stat-faculty", 18);
  animateStat("stat-papers", 75);
  animateStat("stat-awards", 12);
});

// Scroll-to-top button
window.onscroll = function () {
  document.getElementById("scrollTopBtn").style.display =
    window.scrollY > 200 ? "block" : "none";
};
document.getElementById("scrollTopBtn").onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("openCoursesModal").onclick = function () {
  document.getElementById("coursesModal").classList.remove("hidden");
};
document.getElementById("closeCoursesModal").onclick = function () {
  document.getElementById("coursesModal").classList.add("hidden");
};
// Optional: close modal when clicking outside the modal box
document.getElementById("coursesModal").onclick = function (e) {
  if (e.target === this) this.classList.add("hidden");
};

document.getElementById("openEventsModal").onclick = async function () {
  // Fetch event data from home.html
  try {
    const res = await fetch("home.html");
    const html = await res.text();
    // Parse the HTML and extract the event section
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Adjust selector to match your event section in home.html
    const eventSection = doc.querySelector("#eventsSection");
    const eventsModalContent = document.getElementById("eventsModalContent");
    if (eventSection && eventsModalContent) {
      eventsModalContent.innerHTML = eventSection.innerHTML;
    } else {
      eventsModalContent.innerHTML = "<p>No events found.</p>";
    }
  } catch (err) {
    document.getElementById("eventsModalContent").innerHTML =
      "<p>Could not load events.</p>";
  }
  document.getElementById("eventsModal").classList.remove("hidden");
};

document.getElementById("closeEventsModal").onclick = function () {
  document.getElementById("eventsModal").classList.add("hidden");
};
document.getElementById("eventsModal").onclick = function (e) {
  if (e.target === this) this.classList.add("hidden");
};
