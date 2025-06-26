function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin123") {
      window.location.href = "admin.html"; // Redirect to your actual admin dashboard
    } else {
      document.getElementById("errorMsg").innerText =
        "Invalid username or password";
    }
  });
