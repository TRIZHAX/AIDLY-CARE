
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('medicineForm');
  const list = document.getElementById('medicineList');
  let reminders = JSON.parse(localStorage.getItem('medicineReminders') || '[]');

  function render(){
    list.innerHTML = '';
    if (reminders.length===0){
      list.innerHTML = `<div class="card p-4 text-slate-500">No medicine reminders yet.</div>`;
      return;
    }
    reminders.forEach((r, i)=>{
      const div = document.createElement('div');
      div.className = 'card p-4 flex justify-between items-start';
      div.innerHTML = `
        <div>
          <div class="font-bold">${r.name} <span class="badge bg-red-100 text-red-700 ml-2">${r.time}</span></div>
          <div class="text-sm text-slate-600 mt-1">${r.dosage ? 'Dosage: ' + r.dosage : ''}</div>
          <div class="text-sm text-slate-600">${r.reason ? 'Reason: ' + r.reason : ''}</div>
          <div class="text-xs text-slate-500 mt-1">${r.startDate?('From '+r.startDate):''} ${r.endDate?('to '+r.endDate):''}</div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-ghost" onclick="editReminder(${i})">✏️</button>
          <button class="btn btn-danger" onclick="deleteReminder(${i})">🗑</button>
        </div>
      `;
      list.appendChild(div);
    });
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const r = {
      name: document.getElementById('medName').value.trim(),
      time: document.getElementById('medTime').value,
      dosage: document.getElementById('medDosage').value.trim(),
      reason: document.getElementById('medReason').value.trim(),
      startDate: document.getElementById('medStart').value,
      endDate: document.getElementById('medEnd').value,
    };
    reminders.push(r);
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    form.reset();
    render();
    alert('Medicine reminder added.');
  });

  window.deleteReminder = (i)=>{
    reminders.splice(i,1);
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    render();
  };

  window.editReminder = (i)=>{
    const r = reminders[i];
    document.getElementById('medName').value = r.name;
    document.getElementById('medTime').value = r.time;
    document.getElementById('medDosage').value = r.dosage || '';
    document.getElementById('medReason').value = r.reason || '';
    document.getElementById('medStart').value = r.startDate || '';
    document.getElementById('medEnd').value = r.endDate || '';
    reminders.splice(i,1);
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    render();
  };

  render();
});
