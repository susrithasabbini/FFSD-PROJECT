const organisationIDElement = document.getElementById("organisationID");
const passwordElement = document.getElementById("password");
const selectOrganisationElement = document.getElementById("selectOrganisation");
const loginForm = document.getElementById("loginForm");


function organisationIDValidation(){
    const validationMsgElement = document.getElementById("organisationIDError");
    let organisationID = organisationIDElement.value;
    organisationIDElement.style.borderColor = "red";
    organisationIDElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
    if(organisationID.length==0){
        validationMsgElement.innerText="Organisation ID Required";
        return false;
    }
    else if(!organisationID.match(/^[R|O]20\d{4}$/)){
        validationMsgElement.innerText="Invalid ID";
        return false;
    }
    else {
        validationMsgElement.innerText="";
        organisationIDElement.style.borderColor = "green";
        organisationIDElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
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

// function validateOrgSelection(){
    
//     let organisationSelected = selectOrganisationElement.value;
//     if(organisationSelected==0){
//         selectOrganisationElement.style.borderColor = "red";
//         selectOrganisationElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px red";
//         return false;
//     }else{
//         selectOrganisationElement.style.borderColor = "green";
//         selectOrganisationElement.style.boxShadow = "0.5px 0.5px 0.5px 0.5px green";
//         return true;
//     }
// }

loginForm.addEventListener('submit',(e)=>{
    if( !passwordValidation())
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