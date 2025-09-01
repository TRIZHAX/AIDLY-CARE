const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static('public')); 


function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}


function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


app.post('/register', (req, res) => {
  const { email, password } = req.body;
  let users = readUsers();

  if (users.some(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newUser = {
    email,
    password,
    profile: {
      name: '',
      age: '',
      blood: '',
      allergies: '',
      insurance: '',
      contacts: [],
      photo: ''
    }
  };

  users.push(newUser);
  writeUsers(users);
  res.json({ message: 'Registration successful' });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  res.json({ message: 'Login successful', user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
