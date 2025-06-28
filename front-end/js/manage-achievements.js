const form = document.getElementById("achievement-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const achievementList = document.getElementById("achievement-list");

// Backend API base URL
const API_URL = "http://localhost:5000/api/achievements"; // change if using hosted backend

// Load existing achievements on page load
window.addEventListener("DOMContentLoaded", loadAchievements);

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!title || !description || !imageFile) {
    alert("All fields are required!");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async () => {
    const imageUrl = reader.result;
    const achievement = {
      title,
      description,
      imageUrl,
      type: document.getElementById("type")?.value || "award",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(achievement),
      });

      const data = await response.json();
      if (response.ok) {
        appendAchievement(data);
        form.reset();
      } else {
        alert(data.message || "Error adding achievement.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  reader.readAsDataURL(imageFile);
});

// Load all achievements from server
async function loadAchievements() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    achievementList.innerHTML = "";
    data.forEach(appendAchievement);
  } catch (err) {
    console.error("Error loading achievements:", err);
  }
}

// Render a single achievement
function appendAchievement(achievement) {
  const card = document.createElement("div");
  card.classList.add("achievement-card");

  card.innerHTML = `
    <img src="${achievement.imageUrl}" alt="${achievement.title}" />
    <h3>${achievement.title}</h3>
    <p>${achievement.description}</p>
    <button class="delete-btn" onclick="deleteAchievement('${achievement._id}')">×</button>
  `;

  achievementList.appendChild(card);
}

// Delete an achievement
async function deleteAchievement(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this achievement?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      loadAchievements();
    } else {
      alert(data.message || "Error deleting achievement.");
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
}
