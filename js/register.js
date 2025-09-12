
const knowledgeBase = [
  { q: /create.*account/i, a: "Go to the Register page, fill in your details, and click Register." },
  { q: /log.*in/i, a: "Enter your email and password on the Login page, then click Login." },
  { q: /forgot.*password/i, a: "Right now, the app does not support password recovery. Please re-register." },
  { q: /register.*without.*email/i, a: "No, email is required to register." },
  { q: /switch.*register/i, a: "On the Login page, click the link 'Create account'." },
  { q: /switch.*login/i, a: "On the Register page, click the link 'Already have an account? Login'." },
  { q: /edit.*profile/i, a: "Go to the Profile page and update your details." },
  { q: /update.*email/i, a: "Edit your email in the Profile page and save." },
  { q: /change.*password/i, a: "Go to the Profile page and update your password." },
  { q: /insurance/i, a: "Fill in the Insurance field in your profile." },
  { q: /allergies/i, a: "Enter your allergies in the Allergies field on the Profile page." },
  { q: /profile photo/i, a: "At this time, only the default logo is supported." },
  { q: /add.*medicine/i, a: "Open the Medicine page, fill out the form, and click Add." },
  { q: /edit.*medicine/i, a: "Click the ✏️ icon next to the reminder you want to edit." },
  { q: /delete.*medicine/i, a: "Click the 🗑 icon next to the reminder." },
  { q: /dosage/i, a: "Fill in the Dosage field when adding a medicine reminder." },
  { q: /reason.*medicine/i, a: "Fill in the Reason field when adding a medicine reminder." },
  { q: /start.*end.*dates/i, a: "Use the Start Date and End Date fields when adding a reminder." },
  { q: /multiple.*times.*day/i, a: "Not yet. Currently, one time per medicine is supported." },
  { q: /medicine.*notification/i, a: "Yes, if notifications are enabled in your browser." },
  { q: /add.*calendar/i, a: "Open the Calendar page, fill out the form, and click Add." },
  { q: /edit.*calendar/i, a: "Click the ✏️ icon next to the event." },
  { q: /delete.*calendar/i, a: "Click the 🗑 icon next to the event." },
  { q: /location/i, a: "Use the Location field when creating an event." },
  { q: /notes/i, a: "Use the Notes field when creating an event." },
  { q: /today.*events/i, a: "Go to the Home page to see today’s reminders." },
  { q: /calendar.*notification/i, a: "You’ll get alarms and notifications at the set time." },
  { q: /read.*aloud/i, a: "Type or paste text into the box and click Play Voice." },
  { q: /pause.*voice/i, a: "Click the Pause button." },
  { q: /resume.*voice/i, a: "Click Resume after pausing." },
  { q: /stop.*voice/i, a: "Click the Stop button." },
  { q: /choose.*voice/i, a: "Select a voice from the dropdown menu." },
  { q: /paste.*text/i, a: "Copy and paste text into the box, then click Play." },
  { q: /start.*voice.*input/i, a: "Click Start Listening on the Voice Input page." },
  { q: /stop.*voice.*input/i, a: "Click Stop Listening." },
  { q: /history/i, a: "Your history appears under the History section." },
  { q: /clear.*history/i, a: "Click Clear History." },
  { q: /sensitivity/i, a: "Use the sensitivity slider." },
  { q: /language/i, a: "Currently, it supports English (en-US)." },
  { q: /dark.*mode/i, a: "Go to Settings and toggle on Dark Mode." },
  { q: /disable.*dark/i, a: "Go to Settings and toggle off Dark Mode." },
  { q: /high.*contrast.*mode/i, a: "Enable High Contrast in Settings." },
  { q: /disable.*high.*contrast/i, a: "Disable High Contrast in Settings." },
  { q: /text.*bigger/i, a: "Adjust the Font Size slider in Settings." },
  { q: /font.*size/i, a: "Use the Font Size slider in Settings." },
  { q: /pc.*mode/i, a: "PC Mode makes the app display better on larger screens." },
  { q: /enable.*pc/i, a: "Toggle PC Mode on in Settings." },
  { q: /reset.*settings/i, a: "Click Reset Settings in the Settings page." },
  { q: /today.*reminders/i, a: "Go to the Home page for today’s medicine and events." },
  { q: /emergency/i, a: "Click the Emergency Call button. It will also try to share your location." },
  // Additional questions to reach 100
  { q: /app.*purpose/i, a: "AIDLY helps you manage medicine, appointments, and offers voice/text features." },
  { q: /how.*use.*home/i, a: "The Home page shows quick actions and today's reminders." },
  { q: /how.*use.*quick.*actions/i, a: "Quick Actions let you navigate to Medicine, Calendar, Read Aloud, and Voice Input." },
  { q: /can.*use.*mobile/i, a: "Yes, the app is mobile-friendly and works on phones and tablets." },
  { q: /notification.*permission/i, a: "Allow notifications in your browser settings to get reminders." },
  { q: /how.*read.*long.*text/i, a: "Paste long text in Read Aloud and click Play. It will read sequentially." },
  { q: /can.*select.*voice/i, a: "Yes, select a voice in the Read Aloud page dropdown." },
  { q: /what.*is.*speech.*to.*text/i, a: "Speech to Text converts spoken words into written text." },
  { q: /what.*is.*text.*to.*speech/i, a: "Text to Speech converts written text into spoken words." },
  { q: /how.*pause.*voice.*input/i, a: "Stop Listening and restart when ready. Pausing is not supported." },
  { q: /how.*emergency.*location/i, a: "Emergency Call shares your current location if geolocation is enabled." },
  { q: /how.*alarm.*sound/i, a: "The app plays a default alarm for reminders; it can be changed in app.js." },
  { q: /how.*stop.*alarm/i, a: "Dismiss notifications, or stop the alarm sound." },
  { q: /how.*history.*view/i, a: "Voice Input history is visible in the History section on the Voice Input page." },
  { q: /how.*clear.*history/i, a: "Press Clear History on Voice Input page to remove all entries." },
  { q: /how.*update.*reminder/i, a: "Click the edit ✏️ icon next to the reminder in Medicine or Calendar." },
  { q: /how.*delete.*all.*reminders/i, a: "Currently, reminders must be deleted individually." },
  { q: /can.*change.*color/i, a: "Custom color themes are not supported at this time." },
  { q: /can.*export.*reminders/i, a: "Export feature is not implemented yet." },
  { q: /can.*import.*reminders/i, a: "Import feature is not implemented yet." },
  { q: /how.*voice.*read.*aloud/i, a: "Type or paste text in Read Aloud and click Play Voice to read it aloud." },
  { q: /how.*volume.*voice/i, a: "Volume is controlled by your device system volume." },
  { q: /how.*speed.*voice/i, a: "The app uses default speed; custom speed is not supported." },
  { q: /can.*multiple.*reminders/i, a: "Yes, multiple reminders can be added in Medicine or Calendar pages." },
  { q: /how.*see.*calendar.*events/i, a: "Open the Calendar page to view upcoming events." },
  { q: /how.*notification.*sound/i, a: "Notifications will play the default alarm sound if enabled." },
  { q: /how.*change.*language/i, a: "Currently, only English is supported." },
  { q: /can.*voice.*speak.*answers/i, a: "Yes, answers can be read aloud using SpeechSynthesis." },
  { q: /can.*assistant.*hear/i, a: "Voice input is supported in compatible browsers using Web Speech API." },
  { q: /how.*reset.*app/i, a: "Clear localStorage to reset app data." },
  { q: /what.*pc.*mode/i, a: "PC Mode optimizes layout for larger screens like laptops and desktops." },
  { q: /can.*view.*today.*reminders/i, a: "Home page displays today's reminders for medicine and calendar events." },
  { q: /how.*use.*readaloud.*page/i, a: "Type text and press Play Voice to listen." },
  { q: /how.*use.*voiceinput.*page/i, a: "Press Start Listening and speak to convert voice to text." },
  { q: /can.*app.*offline/i, a: "Some features work offline; notifications require internet." },
  { q: /how.*edit.*notes.*reminder/i, a: "Click the ✏️ icon and update the Notes field
];

let assistantVoices = [];
let assistantRecognition;

function createSlideAssistant() {

  const btn = document.createElement("div");
  btn.id = "assistantToggle";
  btn.textContent = "❓ Need Help";
  btn.style = `
    position:fixed;top:40%;right:0;
    background:#4f46e5;color:white;
    padding:10px 12px;border-radius:8px 0 0 8px;
    cursor:pointer;z-index:9999;
    font-family:sans-serif;font-size:14px;
    writing-mode:vertical-rl;text-orientation:mixed;
  `;
  document.body.appendChild(btn);


  const panel = document.createElement("div");
  panel.id = "assistantPanel";
  panel.style = `
    position:fixed;top:0;right:-100%;
    width:400px;max-width:100%;height:100vh;
    background:white;
    box-shadow:-3px 0 12px rgba(0,0,0,0.3);
    display:flex;flex-direction:column;
    transition:right 0.3s ease;
    z-index:100000;font-family:sans-serif;
  `;
  panel.innerHTML = `
    <div style="background:#4f46e5;color:white;padding:12px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;">
      Smart Assistant
      <span id="assistantClose" style="cursor:pointer;">✖</span>
    </div>
    <div id="assistantMessages" style="flex:1;padding:10px;overflow-y:auto;font-size:14px;"></div>
    <div style="padding:10px;border-top:1px solid #ddd;display:flex;gap:5px;background:#fff;position:sticky;bottom:0;">
      <input id="assistantInput" type="text" placeholder="Ask me..." style="flex:1;padding:6px;border:1px solid #ccc;border-radius:4px;">
      <button id="assistantSend" style="background:#4f46e5;color:white;border:none;border-radius:4px;padding:6px;">📩</button>
      <button id="assistantVoice" style="background:#4f46e5;color:white;border:none;border-radius:4px;padding:6px;">🎤</button>
    </div>
  `;
  document.body.appendChild(panel);

  const closeBtn = document.getElementById("assistantClose");
  const input = document.getElementById("assistantInput");
  const sendBtn = document.getElementById("assistantSend");
  const voiceBtn = document.getElementById("assistantVoice");
  const messages = document.getElementById("assistantMessages");


  btn.addEventListener("click", () => {
    panel.style.right = panel.style.right === "0px" ? "-100%" : "0px";
  });
  closeBtn.addEventListener("click", () => {
    panel.style.right = "-100%";
  });


  function appendMessage(text, from="assistant") {
    const div = document.createElement("div");
    div.style.margin = "5px 0";
    div.style.padding = "6px 8px";
    div.style.borderRadius = "6px";
    div.style.maxWidth = "85%";
    div.style.wordBreak = "break-word";
    if (from === "user") {
      div.style.background = "#e0e7ff";
      div.style.marginLeft = "auto";
    } else {
      div.style.background = "#f3f4f6";
    }
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function answerQuery(query) {
    for (let i = 0; i < knowledgeBase.length; i++) {
      if (knowledgeBase[i].q.test(query)) return knowledgeBase[i].a;
    }
    return "Sorry, I don't know the answer to that.";
  }

  function speakText(text) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    if (assistantVoices.length) utterance.voice = assistantVoices[0];
    speechSynthesis.speak(utterance);
  }

  sendBtn.addEventListener("click", () => {
    const q = input.value.trim();
    if (!q) return;
    appendMessage(q, "user");
    const a = answerQuery(q);
    appendMessage(a, "assistant");
    speakText(a);
    input.value = "";
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });


  voiceBtn.addEventListener("click", () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      alert("Speech Recognition not supported on this browser.");
      return;
    }
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!assistantRecognition) {
      assistantRecognition = new Ctor();
      assistantRecognition.continuous = false;
      assistantRecognition.interimResults = false;
      assistantRecognition.lang = 'en-US';
      assistantRecognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        input.value = transcript;
        sendBtn.click();
      };
    }
    assistantRecognition.start();
  });
}

speechSynthesis.onvoiceschanged = () => { assistantVoices = speechSynthesis.getVoices(); };
document.addEventListener("DOMContentLoaded", createSlideAssistant);

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

