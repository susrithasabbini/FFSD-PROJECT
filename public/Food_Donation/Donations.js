const filter = document.getElementById("filter");
const pendingVerifications = document.getElementById("pendingVerifications");
const acceptedDonations = document.getElementById("acceptedDonations");
const rejectedDonations = document.getElementById("rejectedDonations");
const sendingDonations = document.getElementById("sendingDonations");
const successDonations = document.getElementById("successDonations");
const notSuccessDonations = document.getElementById("notSuccessDonations");

filter.addEventListener("change", () => {
    if(filter.value === "Pending Donations") {
        pendingVerifications.style.display = "block";
        acceptedDonations.style.display = "none";
        rejectedDonations.style.display = "none";
        sendingDonations.style.display = "none";
        successDonations.style.display = "none";
        notSuccessDonations.style.display = "none";
    } else if(filter.value === "Accepted Donations") {
        pendingVerifications.style.display = "none";
        acceptedDonations.style.display = "block";
        rejectedDonations.style.display = "none";
        sendingDonations.style.display = "none";
        successDonations.style.display = "none";
        notSuccessDonations.style.display = "none";
    } else if(filter.value === "Rejected Donations") {
        pendingVerifications.style.display = "none";
        acceptedDonations.style.display = "none";
        rejectedDonations.style.display = "block";
        sendingDonations.style.display = "none";
        successDonations.style.display = "none";
        notSuccessDonations.style.display = "none";
    } else if(filter.value === "Sending Donations") {
        pendingVerifications.style.display = "none";
        acceptedDonations.style.display = "none";
        rejectedDonations.style.display = "none";
        sendingDonations.style.display = "block";
        successDonations.style.display = "none";
        notSuccessDonations.style.display = "none";
    } else if(filter.value === "Successful Donations") {
        pendingVerifications.style.display = "none";
        acceptedDonations.style.display = "none";
        rejectedDonations.style.display = "none";
        sendingDonations.style.display = "none";
        successDonations.style.display = "block";
        notSuccessDonations.style.display = "none";
    } else if(filter.value === "Failed Donations") {
        pendingVerifications.style.display = "none";
        acceptedDonations.style.display = "none";
        rejectedDonations.style.display = "none";
        sendingDonations.style.display = "none";
        successDonations.style.display = "none";
        notSuccessDonations.style.display = "block";
    } else {
        pendingVerifications.style.display = "block";
        acceptedDonations.style.display = "block";
        rejectedDonations.style.display = "block";
        sendingDonations.style.display = "block";
        successDonations.style.display = "block";
        notSuccessDonations.style.display = "block";
    }
});