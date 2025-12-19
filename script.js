const status = document.getElementById("status");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

function startListening() {
  recognition.start();
  status.textContent = "Listening...";
}

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  status.textContent = command;

  if (command.includes("hey jarvis") || command.includes("hello jarvis")) {
    speak("Yes sir, how can I help you?");
  }
  else if (command.includes("time")) {
    speak("The time is " + new Date().toLocaleTimeString());
  }
  else {
    speak("Sorry, I did not understand");
  }
};
