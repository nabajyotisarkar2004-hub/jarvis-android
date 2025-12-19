const statusText = document.getElementById("status");
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  output.innerText = transcript;

  // Wake word
  if (transcript.includes("hey jarvis") || transcript.includes("hello jarvis")) {
    speak("Yes, how can I help you?");
    statusText.innerText = "Listening...";
    return;
  }

  // Commands
  if (transcript.includes("time")) {
    speak(new Date().toLocaleTimeString());
  }
  else if (transcript.includes("date")) {
    speak(new Date().toDateString());
  }
  else if (transcript.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://youtube.com", "_blank");
  }
  else if (transcript.includes("open google")) {
    speak("Opening Google");
    window.open("https://google.com", "_blank");
  }
  else if (transcript.includes("search")) {
    const query = transcript.replace("search", "");
    speak("Searching " + query);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  }
  else {
    speak("Sorry, I didn't understand");
  }
};

startBtn.onclick = () => {
  recognition.start();
  speak("Jarvis is online");
  statusText.innerText = "Listening...";
};
