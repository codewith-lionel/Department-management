const API_URL = "http://localhost:5000/api/faculty";

const facultyForm = document.getElementById("faculty-form");
const facultyList = document.getElementById("faculty-list");

// Load faculty on start
window.addEventListener("DOMContentLoaded", loadFaculty);

// Submit new faculty
facultyForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title").value.trim();
  const specialization = document.getElementById("specialization").value.trim();
  const department = document.getElementById("department").value.trim();
  const imageInput = document.getElementById("image");
  const imageFile = imageInput.files[0];

  if (!name || !title || !specialization || !department || !imageFile) {
    alert("Please fill all fields.");
    return;
  }

  // Convert image to Base64
  const reader = new FileReader();
  reader.onloadend = async () => {
    const imageUrl = reader.result;

    const newFaculty = {
      name,
      title,
      specialization,
      department,
      imageUrl,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFaculty),
      });
      facultyForm.reset();
      loadFaculty();
    } catch (err) {
      console.error("Error adding faculty:", err);
      alert("Failed to add faculty.");
    }
  };

  reader.readAsDataURL(imageFile);
});

// Load all faculty from DB
async function loadFaculty() {
  facultyList.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    data.forEach((faculty) => {
      const card = document.createElement("div");
      card.classList.add("faculty-card");
      card.innerHTML = `
        <img src="${faculty.imageUrl}" alt="${faculty.name}" />
        <h3>${faculty.name}</h3>
        <p>${faculty.title}</p>
        <p>${faculty.specialization}</p>
        <button class="delete-btn" onclick="deleteFaculty('${faculty._id}')">Delete</button>
      `;
      facultyList.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading faculty:", err);
    facultyList.innerHTML = `<p>Failed to load faculty list.</p>`;
  }
}

// Delete
async function deleteFaculty(id) {
  if (confirm("Are you sure to delete this faculty?")) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      loadFaculty();
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
}
