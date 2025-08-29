
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profileForm');
  const photoInput = document.getElementById('photo');
  const photoPreview = document.getElementById('photoPreview');
  const stored = JSON.parse(localStorage.getItem('profile') || '{}');


  ['name','age','blood','allergies','insurance'].forEach(id=>{
    if (stored[id]) document.getElementById(id).value = stored[id];
  });
  if (stored.photo) photoPreview.src = stored.photo;


  const contactsEl = document.getElementById('contacts');
  let contacts = stored.contacts || [];
  function renderContacts(){
    contactsEl.innerHTML = '';
    if (contacts.length===0){
      contactsEl.innerHTML = `<div class="text-slate-500">No contacts yet.</div>`;
      return;
    }
    contacts.forEach((c,i)=>{
      const d = document.createElement('div');
      d.className = 'card p-3 flex justify-between items-center';
      d.innerHTML = `<div>
          <div class="font-bold">${c.name} (${c.relation})</div>
          <div class="text-sm text-slate-600">${c.phone}</div>
        </div>
        <div class="flex gap-2">
          <a href="tel:${c.phone}" class="btn btn-primary">Call</a>
          <button class="btn btn-danger" onclick="delContact(${i})">Delete</button>
        </div>`;
      contactsEl.appendChild(d);
    });
  }
  renderContacts();


  const cForm = document.getElementById('contactForm');
  cForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const c = {
      name: document.getElementById('cName').value.trim(),
      relation: document.getElementById('cRelation').value.trim(),
      phone: document.getElementById('cPhone').value.trim(),
    };
    contacts.push(c);
    renderContacts();
    cForm.reset();
  });

  window.delContact = (i)=>{
    contacts.splice(i,1);
    renderContacts();
  };

  photoInput.addEventListener('change', ()=>{
    const file = photoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e)=>{
      photoPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value.trim(),
      age: document.getElementById('age').value.trim(),
      blood: document.getElementById('blood').value.trim(),
      allergies: document.getElementById('allergies').value.trim(),
      insurance: document.getElementById('insurance').value.trim(),
      photo: photoPreview.src || '',
      contacts
    };
    localStorage.setItem('profile', JSON.stringify(data));
    alert('Profile saved.');
  });
});
