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