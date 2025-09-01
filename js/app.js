if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"))
    .catch(err => console.error("SW registration failed", err));
}

if ("Notification" in window) {
  Notification.requestPermission().then(p => {
    if (p === "granted") {
      console.log("Notification permission granted");
    }
  });
}

function showReminderNotification(text) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification("⏰ Reminder", {
          body: text,
          icon: "logo.png",
          vibrate: [200, 100, 200]
        });
      }
    });
  }
}

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch(e){ return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

function applyThemeFromSettings(){
  const settings = store.get('settings', {dark:false, highContrast:false, fontSize:16, pcMode:false});
  document.documentElement.classList.toggle('dark', !!settings.dark);
  document.body.classList.toggle('hc', !!settings.highContrast);
  document.body.classList.toggle('pc-mode', !!settings.pcMode);
  document.documentElement.style.setProperty('--base-font-size', (settings.fontSize || 16)+'px');
}

function applyLayout(layout) {
  const containers = document.querySelectorAll('[data-layout-container]');
  containers.forEach(container => {
    container.classList.remove('grid-cards','list-cards','minimal-cards');
    if(layout==='grid') container.classList.add('grid-cards');
    if(layout==='list') container.classList.add('list-cards');
    if(layout==='minimal') container.classList.add('minimal-cards');
  });
}

applyThemeFromSettings();

document.addEventListener('DOMContentLoaded', () => {
  applyThemeFromSettings();
  const layout = store.get('layout', 'grid');
  applyLayout(layout);

  const layoutRadios = document.querySelectorAll('input[name="layout"]');
  if (layoutRadios.length > 0) {
    layoutRadios.forEach(r => {
      r.addEventListener('change', () => {
        store.set('layout', r.value);
        applyLayout(r.value);
      });
    });
  }

  if (document.getElementById('todayReminders')) renderTodayReminders();
  const readBtn = document.getElementById('btnReadAloud');
  if (readBtn) readBtn.addEventListener('click', () => readTextFrom('#readText'));
  const listenBtn = document.getElementById('btnListen');
  if (listenBtn) listenBtn.addEventListener('click', startListening);
  startReminderAlarms();
});

async function emergencyCall(){
  let coordsText = 'Location unavailable';
  if ('geolocation' in navigator){
    try {
      const pos = await new Promise((res, rej)=>navigator.geolocation.getCurrentPosition(res, rej, {enableHighAccuracy:true,timeout:5000}));
      const {latitude, longitude} = pos.coords;
      coordsText = `https://maps.google.com/?q=${latitude},${longitude}`;
      store.set('lastLocation', {latitude, longitude, ts: Date.now()});
      alert('Location shared: ' + coordsText);
    } catch (e) {
      alert('Could not get location. Check permissions.');
    }
  } else {
    alert('Geolocation not supported.');
  }
  window.location.href = 'tel:+112';
}

function getAllReminders(){
  const meds = store.get('medicineReminders', []);
  const cal = store.get('calendarReminders', []);
  return meds.map(r=>({...r, type:'medicine'})).concat(cal.map(r=>({...r, type:'calendar'})));
}

function formatTime12h(time24) {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")} ${ampm}`;
}

function renderTodayReminders(){
  const el = document.getElementById('todayReminders');
  if (!el) return;
  const all = getAllReminders();
  const today = new Date();
  const todayStr = today.toISOString().slice(0,10);
  const todays = all.filter(r=>{
    if (r.type==='medicine'){
      if (r.startDate && r.endDate){
        if (todayStr < r.startDate || todayStr > r.endDate) return false;
      }
      return true;
    } else {
      return r.date === todayStr;
    }
  });
  if (todays.length===0){
    el.innerHTML = `<div class="card p-4 text-slate-500">No reminders for today.</div>`;
    return;
  }
  el.innerHTML = '';
  todays.sort((a,b)=> (a.time||'').localeCompare(b.time||''));  
  todays.forEach((r,i)=>{
    const div = document.createElement('div');
    div.className = 'card p-4 flex gap-3 items-start';
    div.innerHTML = `
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div class="font-bold">${r.type==='medicine' ? 'Medicine' : 'Appointment'}: ${r.title || r.name}</div>
          <span class="badge ${r.type==='medicine'?'bg-red-100 text-red-700':'bg-blue-100 text-blue-700'}">${formatTime12h(r.time) || ''}</span>
        </div>
        <div class="text-sm text-slate-600 mt-1">${r.notes || r.reason || ''}</div>
        ${r.type==='medicine' ? `<div class="text-xs text-slate-500 mt-1">${r.dosage?('Dosage: '+r.dosage):''}</div>` : ''}
      </div>
      <button class="btn btn-ghost" onclick="markDone('${r.type}', ${i})">✔</button>
    `;
    el.appendChild(div);
  });
}

function markDone(type, index){
  alert('Marked as done!');
}

let triggeredReminders = new Set();
let alarmEnabled = false;
let alarmSound;

document.addEventListener("click", () => {
  if (!alarmEnabled) {
    alarmSound = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    alarmSound.load();
    alarmEnabled = true;
  }
});

function startReminderAlarms() {
  setInterval(() => {
    if (!alarmEnabled) return;
    const all = getAllReminders();
    const now = new Date();
    const todayStr = now.toISOString().slice(0,10);
    const currentTime = formatTime12h(now.toTimeString().slice(0,5));
    all.forEach(r => {
      let shouldAlarm = false;
      let id = `${r.type}-${r.title || r.name}-${r.date || todayStr}-${r.time}`;
      if (r.type === "medicine") {
        if (r.startDate && r.endDate) {
          if (todayStr < r.startDate || todayStr > r.endDate) return;
        }
        if (formatTime12h(r.time) === currentTime) shouldAlarm = true;
      } else if (r.type === "calendar") {
        if (r.date === todayStr && formatTime12h(r.time) === currentTime) shouldAlarm = true;
      }
      if (shouldAlarm && !triggeredReminders.has(id)) {
        triggeredReminders.add(id);
        if (alarmSound) alarmSound.play();
        const msg = new SpeechSynthesisUtterance(`Reminder: ${r.title || r.name}`);
        msg.lang = "en-US";
        speechSynthesis.speak(msg);
        showReminderNotification(`Reminder: ${r.title || r.name}`);
      }
    });
  }, 100);
}

function readTextFrom(selector){
  const node = document.querySelector(selector);
  const text = node?.value || node?.innerText || '';
  if (!text) return;
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}

let recognition;
function startListening(){
  const out = document.getElementById('liveTranscript');
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
    alert('Speech Recognition not supported on this browser.');
    return;
  }
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!recognition){
    recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onresult = (e)=>{
      let interim = '';
      let final = '';
      for (let i= e.resultIndex; i< e.results.length; i++){
        const res = e.results[i];
        if (res.isFinal) final += res[0].transcript + ' ';
        else interim += res[0].transcript;
      }
      if (out){
        out.innerHTML = `<div class="text-slate-700">${final}</div><div class="text-slate-400">${interim}</div>`;
      }
    };
    recognition.onerror = (e)=> console.warn(e);
  }
  recognition.start();
}

function stopListening(){ if (recognition) recognition.stop(); }

window.emergencyCall = emergencyCall;
window.readTextFrom = readTextFrom;
window.startListening = startListening;
window.stopListening = stopListening;
