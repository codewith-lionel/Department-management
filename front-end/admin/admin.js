document.addEventListener("DOMContentLoaded", async () => {
  const facultyListDiv = document.getElementById("adminFacultyList");
  if (!facultyListDiv) return;

  try {
    const res = await fetch("http://localhost:5000/api/faculty");
    const facultyList = await res.json();

    if (facultyList.length === 0) {
      facultyListDiv.innerHTML = "<p>No faculty records found.</p>";
      return;
    }

    facultyListDiv.innerHTML = `
      <table class="faculty-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          ${facultyList.map(faculty => `
            <tr>
              <td>${faculty.name}</td>
              <td>${faculty.designation}</td>
              <td>${faculty.email}</td>
              <td>${faculty.specialization}</td>
              <td>
                <img src="${faculty.imageUrl || '/faculty-image/default.jpg'}" alt="faculty" style="width:50px;height:50px;object-fit:cover;">
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  } catch (err) {
    facultyListDiv.innerHTML = "<p>Error loading faculty data.</p>";
  }
});

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((sec) => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}
