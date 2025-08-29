let recognition;
let transcriptBox = document.getElementById("transcriptBox");

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    transcriptBox.innerText = transcript;
  };

  recognition.onerror = function(event) {
    transcriptBox.innerText = "Error: " + event.error;
  };
} else {
  transcriptBox.innerText = "Speech Recognition not supported in this browser.";
}

document.getElementById("startBtn").onclick = () => recognition.start();
document.getElementById("stopBtn").onclick = () => recognition.stop();