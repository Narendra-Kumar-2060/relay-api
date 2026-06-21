const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const usernameInput = document.querySelector("#login-username");
const passwordInput = document.querySelector("#login-password");
const nameInput = document.querySelector("#reg-name");
const regUsernameInput = document.querySelector("#reg-username");
const regPasswordInput = document.querySelector("#reg-password");
const countryInput = document.querySelector("#country");

async function handleLoginClick(event) {
  event.preventDefault();

  const usernameValue = usernameInput.value;
  const passwordValue = passwordInput.value;

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
      window.location.href = `index.html?username=${result.user}`;
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

  const nameValue = nameInput.value;
  const usernameValue = regUsernameInput.value;
  const passwordValue = regPasswordInput.value;
  const countryValue = countryInput.value;

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
