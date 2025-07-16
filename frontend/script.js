const inputBox = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const chatBox = document.getElementById("chat-box");

let selectedVoice = null;

// Load voices once they're ready
window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  selectedVoice = voices.find(v =>
    v.name.includes("Daniel") || v.name.includes("Google UK English Male") || v.name.includes("Microsoft David")
  );
};

sendBtn.addEventListener("click", () => {
  const msg = inputBox.value.trim();
  if (msg) {
    addMessage("user", msg);
    inputBox.value = "";
    sendToJarvis(msg);
  }
});

micBtn.addEventListener("click", () => {
  const recognition = new webkitSpeechRecognition(); // For Chrome
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.innerText = "🎙️ Listening...";
  recognition.start();

  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    micBtn.innerText = "🎤";
    addMessage("user", voiceInput);
    sendToJarvis(voiceInput);
  };

  recognition.onerror = () => {
    micBtn.innerText = "🎤";
    alert("Mic input failed. Try again.");
  };
});

function sendToJarvis(msg) {
  fetch("http://127.0.0.1:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg }),
  })
    .then((res) => res.json())
    .then((data) => {
      addMessage("bot", data.reply);
      speak(data.reply);
    })
    .catch(() => {
      addMessage("bot", "⚠️ Jarvis failed to reply.");
    });
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = `${sender === "user" ? "🧑 You" : "🤖 Jarvis"}: ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1.8;      // faster
  utter.pitch = 0.8;     // deeper
  utter.lang = "en-GB";  // UK English

  if (selectedVoice) {
    utter.voice = selectedVoice;
  }

  window.speechSynthesis.speak(utter);
}
