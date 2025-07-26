async function loadForemImages() {
  try {
    const response = await fetch("http://localhost:5000/api/forem-images");
    const images = await response.json();

    const container = document.getElementById("forem-image-list");
    container.innerHTML = "";

    images.forEach((image) => {
      const imageCard = document.createElement("div");
      imageCard.className = "forem-image-card";
      imageCard.innerHTML = `
        <img src="${image.imageUrl}" alt="Forem Image" class="forem-thumbnail">
        <p>${image.description || "No description"}</p>
        <button class="delete-btn" onclick="deleteForemImage('${
          image._id
        }')">Delete</button>
      `;
      container.appendChild(imageCard);
    });
  } catch (error) {
    console.error("Error loading forem images:", error);
  }
}

async function deleteForemImage(id) {
  if (confirm("Are you sure you want to delete this image?")) {
    try {
      await fetch(`http://localhost:5000/api/forem-images/${id}`, {
        method: "DELETE",
      });
      loadForemImages(); // Refresh the list
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
}

document
  .getElementById("forem-image-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("forem-image");
    const descriptionInput = document.getElementById("forem-description"); // This might be null
    const file = fileInput.files[0];

    // Check if description input exists, otherwise use default
    const description = descriptionInput
      ? descriptionInput.value || "Forem Event"
      : "Forem Event";

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
      const base64String = e.target.result;

      try {
        const response = await fetch("http://localhost:5000/api/forem-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: base64String,
            description: description,
          }),
        });

        if (response.ok) {
          fileInput.value = "";
          if (descriptionInput) descriptionInput.value = ""; // Only clear if exists
          loadForemImages();
          alert("Image uploaded successfully!");
        } else {
          alert("Failed to upload image.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
      }
    };

    reader.readAsDataURL(file);
  });

// Load images when page loads
window.onload = loadForemImages;
