var currentTab=0;
showTab(0);

function showTab(n){
    const tabs = document.getElementsByClassName("tab");
    tabs[n].style.display = "block";
    if(n==0){
        document.getElementById("prev").style.display="none";
    }
    else{
        document.getElementById("prev").style.display="block";
    }
    if(n==(tabs.length-1)){
        document.getElementById("next").innerHTML="Submit";
    }
    else{
        document.getElementById("next").innerHTML="Next";
    }
    fixStepIndicator(n)
}

function changeTab(n){
    if(n==1){
        switch(currentTab){
            case 0 : 
                if(!tab1Validation())return false;
                break;
            case 1 :
                if(!tab2Validation())return false;
                break;
        }
    }
    const tabs = document.getElementsByClassName("tab");
    tabs[currentTab].style.display="none";
    currentTab=currentTab+n;
    if(currentTab>=tabs.length){
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}

function fixStepIndicator(n) {
    
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
   
    x[n].className += " active";
}

const nameElement = document.getElementById("fname");
const mobileNumberElement = document.getElementById("mobileNumber");
const genderElement = document.getElementById("gender");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const cpasswordElement = document.getElementById("cpassword");

function tab1Validation(){
    if(!nameValidation() || !mobileNumberValidation() || !genderValidation())return false;
    return true;
}

function tab2Validation(){
    if(!emailValidation() || !passwordValidation() || !confirmPassword())return false;
    return true;
}


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

function mobileNumberValidation(){

    const validationMsgElement = document.getElementById("mobileNumberError");
    let mobileNumber = mobileNumberElement.value;
    mobileNumberElement.style.borderColor = "red";
    mobileNumberElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(mobileNumber.length==0){
        validationMsgElement.innerText="Mobile Number Required";
        return false;
    }
    else if(mobileNumber.length!=10){
        validationMsgElement.innerText="Mobile Number should have 10 digits";
        return false;
    }
    else if(!mobileNumber.match(/^[6-9]\d{9}$/)){
        validationMsgElement.innerText="Invalid Mobile Number";
        return false;
    }
    else {
        validationMsgElement.innerText="";
        mobileNumberElement.style.borderColor = "green";
        mobileNumberElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }  

}

function genderValidation(){
    const validationMsgElement = document.getElementById("genderError");
    let gender = genderElement.value;
    genderElement.style.borderColor = "red";
    genderElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(gender==0){
        validationMsgElement.innerText = "Please select gender";
        return false;
    }
    else{
        validationMsgElement.innerText="";
        genderElement.style.borderColor = "green";
        genderElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
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

const container = document.querySelector(".container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    container.style.display="flex";
    preloader.style.display = "none";
  }, 2000);
});