
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value.trim(),
      profile: {
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value.trim(),
        blood: document.getElementById("blood").value.trim(),
        allergies: document.getElementById("allergies").value.trim(),
        insurance: document.getElementById("insurance").value.trim(),
        photo: "",
        contacts: []
      }
    };

    let users = [];
    try {
      const stored = JSON.parse(localStorage.getItem("users") || "[]");
      if (Array.isArray(stored)) {
        users = stored;
      }
    } catch (err) {
      users = [];
    }

    if (users.some(u => u.email === user.email)) {
      alert("Email already registered!");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
});


