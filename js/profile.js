document.addEventListener('DOMContentLoaded', () => {
 
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    alert('Please log in first.');
    window.location.href = 'login.html';
    return;
  }


  const users = JSON.parse(localStorage.getItem('users') || '[]');

  
  const currentUser = users.find(u => u.email === loggedInUser);
  if (!currentUser) {
    alert('User not found!');
    window.location.href = 'login.html';
    return;
  }


  const profile = currentUser.profile || {};


  const profileForm = document.getElementById('profileForm');
  const contactForm = document.getElementById('contactForm');
  const photoInput = document.getElementById('photo');
  const photoPreview = document.getElementById('photoPreview');
  const nameInput = document.getElementById('name');
  const ageInput = document.getElementById('age');
  const bloodInput = document.getElementById('blood');
  const allergiesInput = document.getElementById('allergies');
  const insuranceInput = document.getElementById('insurance');
  const contactsDiv = document.getElementById('contacts');
  const cNameInput = document.getElementById('cName');
  const cRelationInput = document.getElementById('cRelation');
  const cPhoneInput = document.getElementById('cPhone');


  nameInput.value = profile.name || '';
  ageInput.value = profile.age || '';
  bloodInput.value = profile.blood || '';
  allergiesInput.value = profile.allergies || '';
  insuranceInput.value = profile.insurance || '';
  photoPreview.src = profile.photo || 'https://via.placeholder.com/96';

  const renderContacts = () => {
    contactsDiv.innerHTML = '';
    (profile.contacts || []).forEach((c, index) => {
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded mb-2';
      div.innerHTML = `
        <span>${c.name} (${c.relation}) - ${c.phone}</span>
        <button class="btn btn-sm btn-error">Delete</button>
      `;
      const btn = div.querySelector('button');
      btn.addEventListener('click', () => {
        profile.contacts.splice(index, 1);
        saveProfile();
        renderContacts();
      });
      contactsDiv.appendChild(div);
    });
  };

  renderContacts();

  // Save profile to localStorage
  const saveProfile = () => {
    currentUser.profile = profile;
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Profile form submit
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profile.name = nameInput.value.trim();
    profile.age = ageInput.value.trim();
    profile.blood = bloodInput.value.trim();
    profile.allergies = allergiesInput.value.trim();
    profile.insurance = insuranceInput.value.trim();
    saveProfile();
    alert('Profile saved successfully!');
  });

  // Emergency contact form submit
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newContact = {
      name: cNameInput.value.trim(),
      relation: cRelationInput.value.trim(),
      phone: cPhoneInput.value.trim()
    };
    if (!profile.contacts) profile.contacts = [];
    profile.contacts.push(newContact);
    saveProfile();
    renderContacts();
    contactForm.reset();
    alert('Emergency contact added!');
  });

  // Photo upload
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      profile.photo = reader.result;
      photoPreview.src = reader.result;
      saveProfile();
      alert('Photo updated!');
    };
    reader.readAsDataURL(file);
  });
});
