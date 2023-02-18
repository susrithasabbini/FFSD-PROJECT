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