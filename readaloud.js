function speakText() {
  const text = document.getElementById("ttsText").value;
  if (text.trim() === "") return;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}