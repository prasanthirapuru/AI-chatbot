const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");

// 🟢 Knowledge base with multiple possible replies
const responses = {
  "hi": [
    "Hello! How can I help you today?",
    "Hey there! 👋 What’s up?",
    "Hi! 😊 How’s your day going?"
  ],
  "hello": [
    "Hi there! 😊 What can I do for you?",
    "Hello! Need any help today?",
    "Hey 👋 glad to see you here!"
  ],
  "how are you": [
    "I'm doing great, thanks for asking! How about you?",
    "Pretty good, and excited to chat with you! What about you?",
    "I’m awesome 😎 How are you doing?"
  ],
  "who are you": [
    "I'm your personal AI assistant 🤖, created to make your life easier and answer your questions.",
    "I’m an AI chatbot designed to assist you with whatever you need — think of me as your digital buddy 💻.",
    "I’m an AI companion here to chat, assist, and maybe even make you smile 😊."
  ],
  "your name": [
    "I'm your friendly ChatBot, created by Prasanthi 💻",
    "I’m Prasanthi’s AI bot 🤖 nice to meet you!",
    "They call me ChatBot, but you can call me your AI buddy 😉"
  ],
  "what are you doing": [
    "I’m here waiting to chat with you 🤗. That’s my favorite thing to do!",
    "I’m busy helping you out — but I’ve always got time for a conversation 🗨️.",
    "I’m doing what I do best: being your AI assistant 🤖."
  ],
  "do you know me": [
    "I don’t know everything about you yet 👀, but I’d love to learn more!",
    "Not fully… but if you share things, I’ll remember them for this chat 💡.",
    "I only know what you tell me here. But hey, every conversation helps me know you better 😊."
  ],
  "bye": [
    "Goodbye! Have a wonderful day!",
    "See you later 👋",
    "Bye! Stay awesome!"
  ],
  "help": [
    "Sure! You can ask me about general topics, or even fun questions like ‘what’s your name?’.",
    "I’m here to help! Try asking me about my features, or just start a casual chat 😊.",
    "Ask me anything — I’ll do my best to assist you 💡."
  ]
};

// 🟢 Expanded fallback replies (multi-line, more natural)
// 🟢 Extended fallback replies (multi-line, more natural)
const fallbackReplies = [
  "Hmm, that’s an interesting question. I might not know everything about it 🤔, but I’d love to hear your perspective. Could you tell me more so we can explore it together?",
  "I’m not entirely sure about that. But here’s the thing — I’m always learning 📚. Can you rephrase it a little so I can give a better answer?",
  "That’s something new for me! I might not know the exact details 🤖, but I’m here to keep the conversation going. Want to tell me more?",
  "I don’t have the full answer to that… yet! 🌱 But we can chat about it together. Maybe your thoughts can help me understand better!",
  "Good question! Honestly, I don’t have a solid reply at the moment, but let’s treat this as a learning moment 🚀. I’m all ears for your insights!",
  "That’s tricky! 😅 I don’t want to give you wrong information. Could you give me a little hint or context so I can respond more accurately?",
  "I’m still figuring that out! 🤓 But I’m here to chat with you and explore different ideas. What do you think about it?",
  "Interesting point! I may not have the perfect answer right now, but discussing it with you helps me learn. Shall we dive deeper together?",
  "Wow, that’s a new topic for me! 🌟 I’m curious — could you tell me more so we can figure it out together?",
  "I might not fully understand it yet, but I love learning new things. Could you explain it in another way or give me an example?",
  "I’m still learning about that topic, but I’m excited to talk with you about it! Every chat helps me get smarter 🤖."
];


// 🟢 Friendly greetings before user types anything
const greetings = [
  "Hi! 👋 How can I help you today?",
  "Hey there! 😊 What’s up?",
  "Hello! 💡 Looking for something specific?",
  "Yo! 😎 Need a hand with something?",
  "Hiya! 🤖 I’m your chatbot assistant, ask me anything!"
];

// 🟢 Fake API request (simulate delay + keyword matching)
function fakeAPIRequest(userMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let cleaned = userMessage.toLowerCase();

      // Try keyword similarity
      let foundKey = Object.keys(responses).find(key => cleaned.includes(key));

      if (foundKey) {
        // Pick a random response from that category
        const replyOptions = responses[foundKey];
        resolve(replyOptions[Math.floor(Math.random() * replyOptions.length)]);
      } else {
        // Fallback random reply
        resolve(fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)]);
      }
    }, 800 + Math.random() * 600); // variable delay for realism
  });
}

// 🟢 Append messages with avatars
function appendMessage(sender, message) {
  const messageRow = document.createElement("div");
  messageRow.classList.add("message-row", sender);

  const icon = document.createElement("div");
  icon.classList.add("icon");
  icon.textContent = sender === "user" ? "🧑" : "🤖";

  const text = document.createElement("div");
  text.classList.add("text");
  text.textContent = message;

  messageRow.appendChild(icon);
  messageRow.appendChild(text);
  chatWindow.appendChild(messageRow);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 🟢 Typing indicator
function showTypingIndicator() {
  const typingRow = document.createElement("div");
  typingRow.classList.add("message-row", "bot");
  typingRow.id = "typing-indicator";

  const icon = document.createElement("div");
  icon.classList.add("icon");
  icon.textContent = "🤖";

  const text = document.createElement("div");
  text.classList.add("text");
  text.textContent = "Bot is typing...";

  typingRow.appendChild(icon);
  typingRow.appendChild(text);
  chatWindow.appendChild(typingRow);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    chatWindow.removeChild(typingDiv);
  }
}

// 🟢 Send message handler
async function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    appendMessage("user", userMessage);
    userInput.value = "";
    showTypingIndicator();

    try {
      const botReply = await fakeAPIRequest(userMessage);
      removeTypingIndicator();
      appendMessage("bot", botReply);
    } catch (error) {
      removeTypingIndicator();
      appendMessage("bot", "⚠️ Error: something went wrong.");
    }
  }
}

// Send on click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// 🟢 First random bot greeting when chat loads
window.onload = () => {
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  appendMessage("bot", greeting);
};
