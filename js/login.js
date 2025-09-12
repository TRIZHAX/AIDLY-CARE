
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", email);
      alert("Login successful!");
      window.location.href = "index.html"; 
    } else {
      alert("Invalid email or password");
    }
  });
});



