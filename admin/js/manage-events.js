async function loadEvents() {
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = "<p>Loading...</p>";
  try {
    const res = await fetch("http://localhost:5000/api/events");
    const events = await res.json();
    if (Array.isArray(events) && events.length > 0) {
      eventList.innerHTML = events
        .map(
          (event) => `
        <div class="event-card">
          ${
            event.imageUrl
              ? `<img src="${event.imageUrl}" alt="Event Image" />`
              : ""
          }
          <div class="event-title">${event.title}</div>
          <div class="event-date">${new Date(
            event.date
          ).toLocaleDateString()}</div>
          <div class="event-description">${event.description}</div>
          <button class="delete-btn" onclick="deleteEvent('${
            event._id
          }')">Delete</button>
        </div>
      `
        )
        .join("");
    } else {
      eventList.innerHTML = "<p>No events found.</p>";
    }
  } catch (err) {
    eventList.innerHTML = "<p>Could not load events.</p>";
  }
}

async function deleteEvent(id) {
  if (!confirm("Delete this event?")) return;
  await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
  loadEvents();
}

document.getElementById("event-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("event-title").value;
  const date = document.getElementById("event-date").value;
  const description = document.getElementById("event-description").value;
  const fileInput = document.getElementById("event-image");
  const file = fileInput.files[0];

  let imageUrl = "";
  if (file) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      imageUrl = e.target.result;
      await submitEvent({ title, date, description, imageUrl });
    };
    reader.readAsDataURL(file);
  } else {
    await submitEvent({ title, date, description, imageUrl });
  }
});

async function submitEvent(eventData) {
  await fetch("http://localhost:5000/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  document.getElementById("event-form").reset();
  loadEvents();
}

window.onload = loadEvents;
