const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatWindow = document.getElementById("chat-window");

// Event listener for send button
sendBtn.addEventListener("click", sendMessage);

// Event listener for "Enter" key press
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Append messages
function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = message;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Show typing
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "bot");
  typingDiv.id = "typing-indicator";
  typingDiv.textContent = "Bot is typing...";
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Remove typing
function removeTypingIndicator() {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    chatWindow.removeChild(typingDiv);
  }
}

// ✅ Send Message and Fetch Bot Reply using AffiliatePlus API
async function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    appendMessage("user", userMessage);
    userInput.value = "";

    showTypingIndicator();

    try {
      const url = `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(
        userMessage
      )}&botname=ChatBot&ownername=Prasanthi&user=1`;

      const response = await fetch(url);
      const data = await response.json();

      removeTypingIndicator();

      if (data && data.message) {
        appendMessage("bot", data.message);
      } else {
        appendMessage("bot", "Sorry, I couldn't find an answer.");
      }
    } catch (error) {
      removeTypingIndicator();
      appendMessage("bot", "Error: Unable to connect to the server.");
    }
  }
}
