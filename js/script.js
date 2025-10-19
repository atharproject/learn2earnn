/* =========================================
   Future Gateway - Main JavaScript
   Handles: Navigation, Registration, LocalStorage, UI Enhancements
   ========================================= */

// 🔹 Highlight current active page in the navigation bar
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});

// 🔹 Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// 🔹 Go to Register Page (used by Home button)
function goToRegister() {
  window.location.href = "register.html";
}

// 🔹 Registration / Login System
function initAuthSystem() {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value.trim();

      if (!name || !email || !password) {
        alert("Please fill in all fields!");
        return;
      }

      // Save user data
      const user = { name, email, password };
      localStorage.setItem("user_" + email, JSON.stringify(user));

      alert("✅ Registration successful! You can now log in.");
      registerForm.reset();
      window.location.href = "register.html#login";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("logEmail").value.trim();
      const password = document.getElementById("logPassword").value.trim();

      const saved = localStorage.getItem("user_" + email);
      if (!saved) {
        alert("⚠️ No account found with that email.");
        return;
      }

      const user = JSON.parse(saved);
      if (user.password !== password) {
        alert("❌ Incorrect password!");
        return;
      }

      localStorage.setItem("loggedInUser", email);
      alert("✅ Welcome back, " + user.name + "!");
      window.location.href = "index.html";
    });
  }
}

// 🔹 Logout function
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  window.location.href = "index.html";
}

// 🔹 Display logged-in user name in header (if available)
function showUserStatus() {
  const email = localStorage.getItem("loggedInUser");
  if (email) {
    const user = JSON.parse(localStorage.getItem("user_" + email));
    const nav = document.querySelector("header nav");
    const userTag = document.createElement("span");
    userTag.textContent = `👋 Hello, ${user.name}`;
    userTag.style.marginLeft = "15px";
    userTag.style.color = "#fff";
    nav.appendChild(userTag);

    // Add logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.style.marginLeft = "10px";
    logoutBtn.style.background = "white";
    logoutBtn.style.color = "#004aad";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "4px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.onclick = logoutUser;
    nav.appendChild(logoutBtn);
  }
}

// 🔹 Dark / Light mode toggle (optional enhancement)
function initThemeToggle() {
  const toggle = document.createElement("button");
  toggle.textContent = "🌓";
  toggle.style.marginLeft = "15px";
  toggle.style.background = "transparent";
  toggle.style.border = "none";
  toggle.style.cursor = "pointer";
  toggle.style.fontSize = "18px";

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  const nav = document.querySelector("header nav");
  if (nav) nav.appendChild(toggle);

  // Restore saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// 🔹 Apply dark mode styles dynamically
const style = document.createElement("style");
style.innerHTML = `
  body.dark-mode {
    background: #121212;
    color: #ddd;
  }
  body.dark-mode header {
    background: #222;
  }
  body.dark-mode footer {
    background: #222;
  }
  body.dark-mode .card, body.dark-mode .resource-card, 
  body.dark-mode .training-card, body.dark-mode .job-card, 
  body.dark-mode .post {
    background: #1e1e1e;
    color: #eee;
    border-color: #333;
  }
`;
document.head.appendChild(style);

// 🔹 Initialize all common features
document.addEventListener("DOMContentLoaded", () => {
  initAuthSystem();
  showUserStatus();
  initThemeToggle();
});

