const mobileNumberElement = document.getElementById("mobileNumber");
const passwordElement = document.getElementById("password");
const loginForm = document.getElementById("loginForm");


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

function passwordValidation(){

    const validationMsgElement = document.getElementById("passwordError");
    let password = passwordElement.value;
    passwordElement.style.borderColor = "red";
    passwordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(password.length==0){
        validationMsgElement.innerText="Password Required";
        return false;
    }
    else {
        validationMsgElement.innerText="";
        passwordElement.style.borderColor = "green";
        passwordElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
        return true;
    }
    
}

loginForm.addEventListener('submit',(e)=>{
    if(!mobileNumberValidation() || !passwordValidation())
    e.preventDefault();
});

const container = document.querySelector(".container");
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    container.style.display="flex";
    preloader.style.display = "none";
  }, 2000);
});