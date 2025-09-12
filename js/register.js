
  document.body.appendChild(panel);

  const closeBtn = document.getElementById("assistantClose");
  const input = document.getElementById("assistantInput");
  const sendBtn = document.getElementById("assistantSend");
  const voiceBtn = document.getElementById("assistantVoice");
  const messages = document.getElementById("assistantMessages");

  // Slide open/close
  btn.addEventListener("click", () => {
    panel.style.right = panel.style.right === "0px" ? "-100%" : "0px";
  });
  closeBtn.addEventListener("click", () => {
    panel.style.right = "-100%";
  });

  // Messaging
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


