const nameElement = document.getElementById("restaurant-name");
const emailElement = document.getElementById("restaurant-email");
const passwordElement = document.getElementById("password");
const cpasswordElement = document.getElementById("cpassword");
const typeElement = document.getElementById("restaurant-type");
const deliveryElement = document.getElementById("delivery-time");
const costElement = document.getElementById("cost");
const locationElement = document.getElementById("location");

function nameValidation(){
   
    let name = nameElement.value;
    const nameValidateMessage = document.getElementById("nameError");
    nameElement.style.borderColor = "red";
    nameElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(name==null || name==""){
        nameValidateMessage.innerHTML="Name Can't be Empty!";
        return false;
    }
    else if(name.length<6){
        nameValidateMessage.innerHTML="Name should have minimum of 6 Characters";
        return false;
    }
    else if(name.length>20){
        nameValidateMessage.innerHTML="Name should have maximum of 20 characters";
        return false;
    }
    else if(!name.match(/^[A-Za-z]{1}/)){
        nameValidateMessage.innerHTML="First Letter in Name Can't be a Number";
        return false;
    }
    else {
        nameValidateMessage.innerHTML="";
        nameElement.style.borderColor = "green";
        nameElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
    
   
}

function emailValidation(){
    let emailValidateMessage = document.getElementById("emailError");
    let email = emailElement.value;
    emailElement.style.borderColor = "red";
    emailElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(email==null || email==""){
        emailValidateMessage.innerText="Email Can't be Empty!";
        return false;
    }
    else if(!email.match(/^[a-zA-Z0-9._%+-]+@gmail.com$/)){
        emailValidateMessage.innerText="Invalid Email";
        return false;
    }
    else {
        emailValidateMessage.innerText="";
        emailElement.style.borderColor = "green";
        emailElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
    
}

function passwordValidation(){
    let password = passwordElement.value;
    const passwordMsg = document.getElementById("passwordError");
    passwordElement.style.borderColor = "red";
    passwordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(password==null || password.length==0){
        passwordMsg.innerText="password cannot be empty";
        return false;
    }
    else if(!password.match(/(?=.*[A-Z])/)){
        passwordMsg.innerText="password should contain atleast 1 uppercase";
        return false;
    }
    else if(!password.match(/(?=.*[a-z])/)){
        passwordMsg.innerText="password should contain atleast 1 lowercase";
        return false;
    }
    else if(!password.match(/(?=.*[!#$%&?@*])/)){
        passwordMsg.innerText="password should contain atleast 1 special character";
        return false;
    }
    else if(!password.match(/(?=.*\d)/)){
        passwordMsg.innerText="password should contain atleast 1 digit";
        return false;
    }
    else if(password.length<6){
        passwordMsg.innerText="password should contain atleast 6 characters";
        return false;
    }
    else{
        passwordMsg.innerText="";
        passwordElement.style.borderColor = "green";
        passwordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }

}

function confirmPassword(){
    let password = passwordElement.value;
    let cpassword = cpasswordElement.value;
    if(cpassword!=password){
        cpasswordElement.style.borderColor = "red";
        cpasswordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
        return false;
    }
    else{
        cpasswordElement.style.borderColor = "green";
        cpasswordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
}

function typeValidation() {
    let type = typeElement.value;
    const errorMessage = document.getElementById("restaurantTypeError");
    typeElement.style.borderColor = "red";
    typeElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(type==null || type==""){
        errorMessage.innerHTML="Can't be Empty!";
        return false;
    } else {
        errorMessage.innerHTML="";
        typeElement.style.borderColor = "green";
        typeElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
}

function locationValidation() {
    let location = locationElement.value;
    const errorMessage = document.getElementById("locationError");
    locationElement.style.borderColor = "red";
    locationElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(location==null || location==""){
        errorMessage.innerHTML="Can't be Empty!";
        return false;
    } else {
        errorMessage.innerHTML="";
        locationElement.style.borderColor = "green";
        locationElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
}

function deliveryValidation() {
    let delivery = deliveryElement.value;
    const errorMessage = document.getElementById("timeError");
    deliveryElement.style.borderColor = "red";
    deliveryElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(delivery==null || delivery==""){
        errorMessage.innerHTML="Can't be Empty!";
        return false;
    } else if(!delivery.match(/^[0-9]*$/)) {
        errorMessage.innerHTML="Invalid Time";
        return false;
    }
    else {
        errorMessage.innerHTML="";
        deliveryElement.style.borderColor = "green";
        deliveryElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
}

function costValidation() {
    let cost = costElement.value;
    const errorMessage = document.getElementById("costError");
    costElement.style.borderColor = "red";
    costElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(cost==null || cost==""){
        errorMessage.innerHTML="Can't be Empty!";
        return false;
    } else if(!cost.match(/^[0-9]*$/)) {
        errorMessage.innerHTML="Invalid Cost";
        return false;
    }
    else {
        errorMessage.innerHTML="";
        costElement.style.borderColor = "green";
        costElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
}