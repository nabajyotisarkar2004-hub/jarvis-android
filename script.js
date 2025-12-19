const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition not supported");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";

const status = document.getElementById("status");

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}

function startJarvis() {
  recognition.start();
  status.innerText = "Listening...";
}

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript
    .toLowerCase();

  console.log(transcript);

  if (transcript.includes("hey jarvis") || transcript.includes("hello jarvis")) {
    speak("Yes, how can I help you?");
  }

  if (transcript.includes("time")) {
    speak(new Date().toLocaleTimeString());
  }

  if (transcript.includes("date")) {
    speak(new Date().toDateString());
  }
};

recognition.onerror = (e) => {
  status.innerText = "Error: " + e.error;
};
