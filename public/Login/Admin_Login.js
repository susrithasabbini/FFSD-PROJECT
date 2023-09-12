const container = document.querySelector(".login-container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    container.style.display = "block";
    preloader.style.display = "none";
  }, 2000);
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("adminLoginForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        const response = await fetch("/Admin_Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.status === 200) {
          window.location.href = "/Admin";
        } else {
          console.log("Wrong Credentials");
          alert("Login Failed. Please try again!");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    });
});
