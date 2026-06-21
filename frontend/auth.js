const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const usernameInput = document.querySelector("#login-username");
const passwordInput = document.querySelector("#login-password");
const nameInput = document.querySelector("#reg-name");
const regUsernameInput = document.querySelector("#reg-username");
const regPasswordInput = document.querySelector("#reg-password");
const countryInput = document.querySelector("#country");

function trimString(str) {
    return str.trim();
}

async function handleLoginClick(event) {
    event.preventDefault();

    const usernameValue = trimString(usernameInput.value);
    const passwordValue = passwordInput.value;

    if (!usernameValue) {
        alert("Username cannot be empty");
        return;
    }

    const data = {
        username: usernameValue,
        password: passwordValue,
    };

    try {
        const response = await fetch("https://relay-api-zizt.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);

        if (result.status === "success") {
            sessionStorage.setItem("user", result.user);
            window.location.href = "index.html";
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Cannot connect to server");
    }
}

async function handleRegisterClick(event) {
    event.preventDefault();

    const nameValue = trimString(nameInput.value);
    const usernameValue = trimString(regUsernameInput.value);
    const passwordValue = regPasswordInput.value;
    const countryValue = countryInput.value;

    if (!usernameValue) {
        alert("Username cannot be empty");
        return;
    }

    const data = {
        name: nameValue,
        username: usernameValue,
        password: passwordValue,
        country: countryValue,
    };

    try {
        const response = await fetch("https://relay-api-zizt.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);

        if (result.status === "success") {
            window.location.href = `login.html?registered=true`;
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Cannot connect to server");
    }
}

if (loginBtn) {
    loginBtn.addEventListener("click", handleLoginClick);
}

if (registerBtn) {
    registerBtn.addEventListener("click", handleRegisterClick);
}
