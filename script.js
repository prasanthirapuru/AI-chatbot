
    
        // Get elements
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

// Function to append messages to chat window
function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to latest message
}

// Function to show bot typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.id = "typing-indicator";
    typingDiv.textContent = "Bot is typing...";
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to remove bot typing indicator
function removeTypingIndicator() {
    const typingDiv = document.getElementById("typing-indicator");
    if (typingDiv) {
        chatWindow.removeChild(typingDiv);
    }
}

// Function to send message and fetch response from API
async function sendMessage() {
    const userMessage = userInput.value.trim();
    
    if (userMessage) {
        // Append user's message to the chat window
        appendMessage("user", userMessage);
        userInput.value = ""; // Clear input field

        // Show typing indicator
        showTypingIndicator();

        // Call the API
        try {
            const url = `https://api.paxsenix.biz.id/ai/gpt4omini?text=${encodeURIComponent(userMessage)}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'accept': 'application/json' }
            });

            // Remove typing indicator before showing bot response
            removeTypingIndicator();

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.ok && data.message) {
                appendMessage("bot", data.message);  // Display the bot's response
            } else {
                appendMessage("bot", "Sorry, I couldn't find an answer.");
            }
        } catch (error) {
            removeTypingIndicator();
            appendMessage("bot", "Error: Unable to connect to the server.");
        }
    }
}

  
