const usernameField = document.querySelector("#username-box");
const textField = document.querySelector("#text-box");
const sendBtn = document.querySelector("#send-text");
const currentUser = document.querySelector("#current-user");
const logoutBtn = document.querySelector("#logout-btn");

function isoTimeToString(isoStr) {
    const dateObj = new Date(isoStr);
    const localTime12 = dateObj.toLocaleTimeString("en-US", { hour12: true });
    return localTime12;
}

function trimString(str) {
    return str.trim();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

async function editMessage(id) {
    const newText = prompt("Edit your message:");

    if (!newText || newText.trim() === "") return;

    try {
        const response = await fetch(`https://relay-api-zizt.onrender.com/messages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: newText.trim(),
            }),
        });

        if (response.ok) {
            const messageDiv = document.querySelector(
                `.single-message[data-id="${id}"]`,
            );
            if (messageDiv) {
                const messageSpan = messageDiv.querySelector(".message");
                messageSpan.textContent = newText.trim();
            }
        } else {
            alert("Failed to edit message");
        }
    } catch (error) {
        console.error("Edit error:", error);
        alert("Cannot connect to server");
    }
}

async function deleteMessage(id) {
    const confirmDelete = confirm("Delete this message?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`https://relay-api-zizt.onrender.com/messages/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const messageDiv = document.querySelector(
                `.single-message[data-id="${id}"]`,
            );
            if (messageDiv) {
                messageDiv.remove();

                const messageArea = document.querySelector("#message-area");
                const remainingMessages =
                    messageArea.querySelectorAll(".single-message");
                if (remainingMessages.length === 0) {
                    messageArea.innerHTML = `
                        <div class="empty-state" id="empty-state">
                            <p>No messages yet. Say hello! 👋</p>
                        </div>
                    `;
                }
            }
        } else {
            alert("Failed to delete message");
        }
    } catch (error) {
        console.error("Delete error:", error);
        alert("Cannot connect to server");
    }
}

async function loadMessages() {
    const url = "https://relay-api-zizt.onrender.com/messages";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        const messageArea = document.querySelector("#message-area");
        messageArea.innerHTML = "";

        data.messages.forEach((msg) => {
            loadMessageToUI(msg);
        });
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}
loadMessages();


let refreshInterval = null;

function startAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }

    refreshInterval = setInterval(async () => {
        try {
            const response = await fetch("https://relay-api-zizt.onrender.com/messages");
            const data = await response.json();

            const existingIds = new Set();
            document.querySelectorAll('.single-message').forEach(msgDiv => {
                const id = msgDiv.dataset.id;
                if (id) existingIds.add(parseInt(id));
            });

            if (data.messages) {
                data.messages.forEach(msg => {
                    if (!existingIds.has(msg.id)) {
                        loadMessageToUI(msg);
                    }
                });
            }
        } catch (error) {
            console.error("Auto-refresh error:", error);
        }
    }, 3000);
}

startAutoRefresh();

async function sendMessage() {
    const text = textField.value.trim();
    if (!text) return;

    sendBtn.disabled = true;

    try {
        const response = await fetch("https://relay-api-zizt.onrender.com/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username, 
                message: text,
            }),
        });

        if (response.ok) {
            const newMessage = await response.json();
            loadMessageToUI(newMessage);
            textField.value = "";
            textField.focus();
        }
    } catch (error) {
        console.error("Send error:", error);
        alert("Could not send message");
    } finally {
        sendBtn.disabled = false;
    }
}

function loadMessageToUI(messageData) {
    const isOwn = messageData.username === username;
    const messageDiv = document.createElement("div");
    messageDiv.className = "single-message" + (isOwn ? " own" : "");
    messageDiv.dataset.id = messageData.id;

    const firstLetter = messageData.username.charAt(0).toUpperCase();
    const timeString = isoTimeToString(messageData.created_at);

    messageDiv.innerHTML = `
        <div class="profile-logo">${firstLetter}</div>
        <div class="message-content">
            <span class="username">${escapeHtml(messageData.username)}</span>
            <span class="message">${escapeHtml(messageData.message)}</span>
            <span class="time">${timeString}</span>
            ${isOwn
            ? `
                <div class="message-actions">
                    <button class="edit-btn" data-id="${messageData.id}">✏️ Edit</button>
                    <button class="delete-btn" data-id="${messageData.id}">🗑 Delete</button>
                </div>
            `
            : ""
        }
        </div>
    `;

    const messageArea = document.querySelector("#message-area");
    messageArea.appendChild(messageDiv);

    if (isOwn) {
        const editBtn = messageDiv.querySelector(".edit-btn");
        const deleteBtn = messageDiv.querySelector(".delete-btn");

        editBtn.addEventListener("click", () => editMessage(messageData.id));
        deleteBtn.addEventListener("click", () => deleteMessage(messageData.id));
    }
}

const username = sessionStorage.getItem("user");
if (!username) {
    window.location.href = "login.html";
}

usernameField.value = username;
currentUser.textContent = username;
sendBtn.addEventListener("click", sendMessage);

textField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
        sessionStorage.removeItem("user");
        window.location.href = "login.html";
    }
});
