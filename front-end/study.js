// Smooth scrolling for nav links
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
/*slide bar */
function closeSidebar() {
  document.getElementById("sidebar").classList.add("closed");
}

function openSidebar() {
  document.getElementById("sidebar").classList.remove("closed");
}
//syllabus
const semesterSubjects = {
  1: [
    "Computing Fundamentals and C Programming",
    "Digital Fundamentals and Computer Architecture",
    "Programming Lab - C",
    "Mathematical Structures for Computer Science",
    "Language I & English I",
    "Environmental Studies",
  ],
  2: [
    "C++ Programming",
    "Programming Lab - C++",
    "Internet Basics",
    "Discrete Mathematics",
    "Language II & Effective English",
    "Human Rights",
  ],
  3: [
    "Data Structures",
    "Java Programming",
    "Programming Lab - Java",
    "Computer Based Optimization Techniques",
    "Software Engineering & Project Management",
    "Yoga / Tamil / Advanced Tamil",
  ],
  4: [
    "System Software & OS",
    "Linux & Shell Programming",
    "Linux Lab",
    "Office Fundamentals (Skill Course)",
    "Business Accounting",
    "Software Project Management Lab",
  ],
  5: [
    "RDBMS & Oracle",
    "Visual Basic",
    "VB & Oracle Lab",
    "Elective I: Python / Networks / OB",
    "Software Testing",
  ],
  6: [
    "Graphics & Multimedia",
    "Project Work",
    "Graphics & Multimedia Lab",
    "Elective II: AI / Web Tech / NSC",
    "Elective III: Data Mining / OSS / IoT",
    "Software Testing Lab",
  ],
};

function showSubjects(sem) {
  const modal = document.getElementById("subjectModal");
  const title = document.getElementById("modal-title");
  const ul = document.getElementById("modal-subjects-list");

  // Clear previous list
  ul.innerHTML = "";

  if (!semesterSubjects[sem]) {
    title.textContent = "No subjects found";
    ul.innerHTML = "<li>Sorry, no data available.</li>";
  } else {
    title.textContent = `Subjects for Semester ${sem}`;
    semesterSubjects[sem].forEach((subj) => {
      const li = document.createElement("li");
      li.textContent = subj;
      ul.appendChild(li);
    });
  }

  // Show modal
  modal.style.display = "block";
}

// Close modal function
function closeModal() {
  document.getElementById("subjectModal").style.display = "none";
}

// Optional: Close modal when clicking outside modal-content
window.onclick = function (event) {
  const modal = document.getElementById("subjectModal");
  if (event.target === modal) {
    closeModal();
  }
};
