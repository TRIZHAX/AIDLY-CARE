const form = document.getElementById('loginForm');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert(data.message);
    localStorage.setItem('loggedInUser', email); // keep logged in
    window.location.href = 'index.html';
  } catch (err) {
    alert(err.message);
  }
});
