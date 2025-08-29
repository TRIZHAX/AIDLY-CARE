
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calendarForm');
  const list = document.getElementById('calendarList');
  let events = JSON.parse(localStorage.getItem('calendarReminders') || '[]');

  function render(){
    list.innerHTML = '';
    if (events.length===0){
      list.innerHTML = `<div class="card p-4 text-slate-500">No calendar events yet.</div>`;
      return;
    }
    events.sort((a,b)=> (a.date+a.time).localeCompare(b.date+b.time));
    events.forEach((ev, i)=>{
      const div = document.createElement('div');
      div.className = 'card p-4 flex justify-between items-start';
      div.innerHTML = `
        <div>
          <div class="font-bold">${ev.title} <span class="badge bg-blue-100 text-blue-700 ml-2">${ev.date} ${ev.time}</span></div>
          <div class="text-sm text-slate-600">${ev.location ? 'Location: ' + ev.location : ''}</div>
          <div class="text-sm text-slate-600">${ev.reason ? 'Reason: ' + ev.reason : ''}</div>
          <div class="text-xs text-slate-500 mt-1">${ev.notes || ''}</div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-ghost" onclick="editEvent(${i})">✏️</button>
          <button class="btn btn-danger" onclick="deleteEvent(${i})">🗑</button>
        </div>
      `;
      list.appendChild(div);
    });
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const ev = {
      title: document.getElementById('evTitle').value.trim(),
      date: document.getElementById('evDate').value,
      time: document.getElementById('evTime').value,
      location: document.getElementById('evLocation').value.trim(),
      reason: document.getElementById('evReason').value.trim(),
      notes: document.getElementById('evNotes').value.trim()
    };
    events.push(ev);
    localStorage.setItem('calendarReminders', JSON.stringify(events));
    form.reset();
    render();
    alert('Event added.');
  });

  window.deleteEvent = (i)=>{
    events.splice(i,1);
    localStorage.setItem('calendarReminders', JSON.stringify(events));
    render();
  };

  window.editEvent = (i)=>{
    const ev = events[i];
    document.getElementById('evTitle').value = ev.title;
    document.getElementById('evDate').value = ev.date;
    document.getElementById('evTime').value = ev.time;
    document.getElementById('evLocation').value = ev.location || '';
    document.getElementById('evReason').value = ev.reason || '';
    document.getElementById('evNotes').value = ev.notes || '';
    events.splice(i,1);
    localStorage.setItem('calendarReminders', JSON.stringify(events));
    render();
  };

  render();
});
