const icon1 = document.getElementById('i1');
const icon2 = document.getElementById('i2');
const icon3 = document.getElementById('i3');
const icon4 = document.getElementById('i4');

const sub1 = document.getElementById('sub1');
const sub2 = document.getElementById('sub2');
const sub3 = document.getElementById('sub3');
const sub4 = document.getElementById('sub4');

icon1.addEventListener('click',()=>{
    sub2.style.display="none";
    sub3.style.display="none";
    sub4.style.display="none";
    sub1.style.display="block";
});

icon2.addEventListener('click',()=>{
    sub1.style.display="none";
    sub3.style.display="none";
    sub4.style.display="none";
    sub2.style.display="block";
});

icon3.addEventListener('click',()=>{
    sub2.style.display="none";
    sub1.style.display="none";
    sub4.style.display="none";
    sub3.style.display="block";
});

icon4.addEventListener('click',()=>{
    sub2.style.display="none";
    sub3.style.display="none";
    sub1.style.display="none";
    sub4.style.display="block";
});