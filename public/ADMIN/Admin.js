const fil = document.getElementById("fil");
const pendingRestaurants = document.querySelector(".pending-restaurant-verifications");
const pendingOrganizations = document.querySelector(".pending-organization-verifications");
const approvedRestaurants = document.querySelector(".approved-restaurants");
const approvedOrganizations = document.querySelector(".approved-organizations");
const suspendedRestaurants = document.querySelector(".suspended-restaurants");
const suspendedOrganizations = document.querySelector(".suspended-organizations");

fil.addEventListener('change', () => {
  if(fil.value === "Pending Restaurant Approvals") {
    pendingRestaurants.style.display = "block";
    pendingOrganizations.style.display = "none";
    approvedRestaurants.style.display = "none";
    approvedOrganizations.style.display = "none";
    suspendedRestaurants.style.display = "none";
    suspendedOrganizations.style.display = "none";
  } else if(fil.value === "Pending Organization Approvals") {
    pendingRestaurants.style.display = "none";
    pendingOrganizations.style.display = "block";
    approvedRestaurants.style.display = "none";
    approvedOrganizations.style.display = "none";
    suspendedRestaurants.style.display = "none";
    suspendedOrganizations.style.display = "none";
  } else if(fil.value === "Approved Restaurants") {
    pendingRestaurants.style.display = "none";
    pendingOrganizations.style.display = "none";
    approvedRestaurants.style.display = "block";
    approvedOrganizations.style.display = "none";
    suspendedRestaurants.style.display = "none";
    suspendedOrganizations.style.display = "none";
  } else if(fil.value === "Approved Organizations") {
    pendingRestaurants.style.display = "none";
    pendingOrganizations.style.display = "none";
    approvedRestaurants.style.display = "none";
    approvedOrganizations.style.display = "block";
    suspendedRestaurants.style.display = "none";
    suspendedOrganizations.style.display = "none";
  } else if(fil.value === "Suspended Restaurants") {
    pendingRestaurants.style.display = "none";
    pendingOrganizations.style.display = "none";
    approvedRestaurants.style.display = "none";
    approvedOrganizations.style.display = "none";
    suspendedRestaurants.style.display = "block";
    suspendedOrganizations.style.display = "none";
  } else if(fil.value === "Suspended Organizations") {
    pendingRestaurants.style.display = "none";
    pendingOrganizations.style.display = "none";
    approvedRestaurants.style.display = "none";
    approvedOrganizations.style.display = "none";
    suspendedRestaurants.style.display = "none";
    suspendedOrganizations.style.display = "block";
  }
  else {
    pendingRestaurants.style.display = "block";
    pendingOrganizations.style.display = "block";
    approvedRestaurants.style.display = "block";
    approvedOrganizations.style.display = "block";
    suspendedRestaurants.style.display = "block";
    suspendedOrganizations.style.display = "block";
  }
});


const container = document.getElementsByTagName("body")[0];
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    container.style.display="block";
    preloader.style.display = "none";
  }, 2000);
});

const openPopupBtn = document.getElementById("open-popup-btn");
const closePopupBtn = document.getElementById("close-popup-btn");
const popup = document.getElementById("popup");
const userList = document.getElementById("user-list");
const addUserForm = document.getElementById("add-user-form");
const newUserInput = document.getElementById("new-user-name");

// show popup when open button is clicked
openPopupBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

// hide popup when close button is clicked
closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// add new user to list when form is submitted
addUserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = newUserInput.value.trim();
    if (username) {
        const li = document.createElement("li");
        li.textContent = username;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-user-btn");
        li.appendChild(removeBtn);
        userList.appendChild(li);
        newUserInput.value = "";
    }
});

// remove user from list when remove button is clicked
userList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-user-btn")) {
        const li = event.target.closest("li");
        userList.removeChild(li);
    }
});