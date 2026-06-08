function formatTime(isoString) {
  if (!isoString) return "Just now";
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "Just now";
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addMessageToUI(messageArea, resultData) {
  const singleMessageDiv = document.createElement("div");
  singleMessageDiv.classList.add("single-message");

  const formattedTime = formatTime(resultData.created_at);

  singleMessageDiv.innerHTML = `
    <div class="profile-logo" aria-label="Profile avatar"></div>
    <div class="message-content">
      <span class="username">${escapeHtml(resultData.user)}</span>
      <span class="message">${escapeHtml(resultData.message)}</span>
      <span class="time">${formattedTime}</span>
    </div>
  `;

  messageArea.appendChild(singleMessageDiv);
  messageArea.scrollTop = messageArea.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const mainSendBtn = document.querySelector("#send-text");
  const usernameField = document.querySelector("#username-box");
  const textField = document.querySelector("#text-box");
  const messageArea = document.querySelector(".message-area");

  messageArea.innerHTML = "";

  async function loadChatHistory() {
    try {
      const response = await fetch("http://127.0.0.1:8000/messages");
      const result = await response.json();

      if (result.messages) {
        result.messages.forEach((msg) => {
          addMessageToUI(messageArea, msg);
        });
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }

  async function sendMessage() {
    try {
      const userText = textField.value.trim();
      const userName = usernameField.value.trim();

      if (!userText) return;

      const userData = {
        user: userName || "Anonymous",
        message: userText,
      };

      const response = await fetch("http://127.0.0.1:8000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.id) {
        addMessageToUI(messageArea, result);
      }

      textField.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  mainSendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
  });
  textField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  loadChatHistory();
});
