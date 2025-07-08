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
    {
      name: "Computing Fundamentals and C Programming",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1IqWLWSLLUiMn-fQIoJt4O8DBO2Y8dAOZ/view",
        },
        {
          name: "Unit 1 -ppt ",
          pdf: "https://drive.google.com/file/d/1kLicGLqzMqXmN6sbGbz4DgTLI-j_t3DS/view",
        },
        {
          name: "Unit 1 -ppt-part 2 ",
          pdf: "https://drive.google.com/file/d/1cTWDnVmdD8gYwkn8s0gvQWnHyqsXd1Rk/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1cRW87DVtKYD1foutXAxNIKWj4UFpfxLO/view",
        },
        {
          name: "Unit 2-part 2",
          pdf: "https://drive.google.com/file/d/1UoNHl3ZhmzYHFOIyGeTIWSyaK3QHO0Ne/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1q_KXmW_nbtGl3-PTYWqouAQTOnHhzti6/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/1taEXF6yrz-qPf_SpNmAq-F4XHQj6_xnF/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/1LnGceWkhhJdond6W5B3ZBXvTg4lo1BA_/view",
        },
      ],
    },
    {
      name: "Mathematical Structures for Computer Science",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1cXO-AhTBclDq4F2J2Ps3rxEm9r2YxiNm/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1B7NI7CscVvRSAQzCzvv6M-Yn5oBjSmIF/view",
        },
      ],
    },
    {
      name: "Digital Fundamentals architecture",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1E53U0QUxKJ_YfOVRAWHrwzUmltPU7ujs/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1_9Ie1qhwYeWr0PVB0ZB1MyIdPybp1rKo/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1bxbBS2UkM0V2Uy9BnTBOtidHmVp-HPDn/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/118klipSdh8oc7f8rT4sKkKkZHqZcOjoN/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/1mZz5oBEEADQAgVGb92MEzfL9dE41PdyH/view",
        },
      ],
    },
  ],
  2: [
    {
      name: "Digital Fundamentals architecture",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/10X_UC1ZPuerWQA3HXeNubCPjl15uQyQB/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1t_oZjxEahxKbQtFc4wWTLeOPiD4-hghS/view",
        },
      ],
    },
    {
      name: "Discrete Mathematics",
      units: [
        {
          name: "full-pdf",
          pdf: "https://drive.google.com/file/d/16IxEVRRHxMiLiOfcxZQU7rCvdReenzwl/view",
        },
      ],
    },
  ],
  3: [
    {
      name: "java Programming",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1FA8E-JXhNk3GJAv-oRNzeLd9cE43tGxd/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1oZMzOf9Ea8rHzg_d-2uCm4W8BXomP56b/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/1Y210lirzBCDofDgCeiLzCbl5anolVsnh/view",
        },
      ],
    },
    {
      name: "Data Structures",
      units: [
        {
          name: "Text-book",
          pdf: "https://drive.google.com/file/d/1YiupdLRCg76RPN8zdgwRuBfk1P5wvsUq/view",
        },
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1oZMzOf9Ea8rHzg_d-2uCm4W8BXomP56b/view",
        },
        {
          name: "Unit 1 - part 2",
          pdf: "https://drive.google.com/file/d/1E2PsoYJ4tXl2hp5kNBUlUYf1dIv-fI9K/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1gj5K4wmRGdzky-dtzcb5MrGYIMkdtb5x/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/1Bx0kEXcMl9Gz79wrwQhECkrCtOsRNz_2/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/16WMtD6jQwBBXAfCZTJ6YrOIQnDA610Ac/view",
        },
      ],
    },
  ],
  4: [
    {
      name: "SSOS",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1ckWrsZ52Rego1ZfThXEkhIYJG_Czv1SV/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1CCs6ooDkJnwbase2A8guK726tg6fu-yx/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1ThEtaaQcX0ceu7u8bCVar-DII06wMbhO/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/1nRGaAFQbjpxXZUDFz52uBbHYYSJOs_hK/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/16Peq6fXNPOWv6Onlnj8aj2C1GHuOmvnW/view",
        },
      ],
    },
    {
      name: "linux and shell Programming",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1nr9Sn-euOutJDf-ksRsAkBgonzN1KCHh/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1R0q3Kq99EMbaYUPnPnVFrT2GUIqY3SgC/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1qk4na8ytfnEuPVLM4TiSrKja-AJRXr8b/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/1agsQCPpt7aSH0bP6gNHRimFrx53vczfG/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/1UP8ih2sCDTh6w-cx6HGj1OCpyTRV4ZxY/view",
        },
      ],
    },
  ],
  5: [
    {
      name: "RDBMS & Oracle",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/1yQhJPuMwYCT2mLEdBWW7Hw_hndqSN5GB/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1yRJiPwUqcmVm8xSBeN3af16GhWI4GWCA/view",
        },
        {
          name: "Unit 3",
          pdf: "https://drive.google.com/file/d/1HPOUxTbvvI-JZqKYi3bs5AyzC80aFmZB/view",
        },
        {
          name: "Unit 4",
          pdf: "https://drive.google.com/file/d/1zvmm7i12tmcvcxl-pdXMDVyzI0u7qu-0/view",
        },
        {
          name: "Unit 5",
          pdf: "https://drive.google.com/file/d/1JeYLl530NrRA7LWYG-tahZi2z1rvT-ll/view",
        },
      ],
    },
    {
      name: "Visual Basic",
      units: [
        {
          name: "Unit 1",
          pdf: "https://drive.google.com/file/d/12IY6yr3l0JAWITYYENPxDhIL5MUj55xB/view",
        },
        {
          name: "Unit 2",
          pdf: "https://drive.google.com/file/d/1cQFnMOt7M_AlRbd03JZ8eXEEs8g0xUjM/view",
        },
      ],
    },
  ],
  6: [
    {
      name: "Graphics and Multimedia",
      units: [
        {
          name: "full-pdf",
          pdf: "https://drive.google.com/file/d/1wVHU2zQxmwdB1oz7sOFW2WlB8JAWNFXk/view",
        },
      ],
    },
  ],
};

function showSubjects(sem) {
  const modal = document.getElementById("subjectModal");
  const title = document.getElementById("modal-title");
  const ul = document.getElementById("modal-subjects-list");

  ul.innerHTML = "";

  if (!semesterSubjects[sem]) {
    title.textContent = "No subjects found";
    ul.innerHTML = "<li>No data available.</li>";
  } else {
    title.textContent = `Subjects for Semester ${sem}`;
    semesterSubjects[sem].forEach((subject) => {
      const li = document.createElement("li");
      li.textContent = subject.name;
      li.classList.add("subject-link");
      li.onclick = () => showUnits(subject); // <- Load units here
      ul.appendChild(li);
    });
  }

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
function showUnits(subject) {
  const modal = document.getElementById("subjectModal");
  const title = document.getElementById("modal-title");
  const ul = document.getElementById("modal-subjects-list");

  title.textContent = subject.name;
  ul.innerHTML = "";

  subject.units.forEach((unit) => {
    const li = document.createElement("li");
    li.textContent = unit.name;
    li.classList.add("subject-link");
    li.onclick = () => {
      window.open(unit.pdf, "_blank");
    };
    ul.appendChild(li);
  });
}

// Hamburger and Side Nav functionality
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideNav = document.getElementById("sideNav");
const sideNavOverlay = document.getElementById("sideNavOverlay");

function openSidebar() {
  sideNav.classList.remove("closed");
  sideNav.classList.add("open");
  sideNavOverlay.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeSidebar() {
  sideNav.classList.remove("open");
  sideNav.classList.add("closed");
  sideNavOverlay.style.display = "none";
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", openSidebar);
sideNavOverlay.addEventListener("click", closeSidebar);

const closeBtn = sideNav.querySelector(".close-btn");
if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeSidebar();
});
