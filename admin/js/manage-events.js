document.addEventListener("DOMContentLoaded", () => {
  const eventForm = document.getElementById("event-form");
  const eventList = document.getElementById("event-list");
  const API_URL = "http://localhost:5000/api/events";

  // Load events
  async function loadEvents() {
    eventList.innerHTML = "<p>Loading events...</p>";
    try {
      const res = await fetch(API_URL);
      const events = await res.json();
      if (!Array.isArray(events) || events.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
        return;
      }
      eventList.innerHTML = events
        .map(
          (event) => `
        <div class="event-card">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <small>${new Date(event.date).toLocaleDateString()}</small>
          ${
            event.registrationLink
              ? `<div class="mt-2"><a href="${event.registrationLink}" target="_blank" class="text-indigo-600 underline">Register</a></div>`
              : ""
          }
          <button class="delete-btn" data-id="${event._id}">&times;</button>
        </div>
      `
        )
        .join("");
    } catch (err) {
      eventList.innerHTML = "<p>Error loading events.</p>";
    }
  }

  // Add event
  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const title = eventForm.title.value;
    const date = eventForm.date.value;
    const description = eventForm.description.value;
    const registrationLink = eventForm.registrationLink.value;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date, description, registrationLink }),
      });
      const data = await res.json();
      if (res.ok) {
        eventForm.reset();
        loadEvents();
      } else {
        alert("Failed to add event: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Error adding event.");
    }
  });

  // Delete event
  eventList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.getAttribute("data-id");
      if (confirm("Delete this event?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadEvents();
      }
    }
  });

  loadEvents();
});
