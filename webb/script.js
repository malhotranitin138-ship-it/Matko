function sayYes(){
window.location.href="next.html";
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function(){

let noBtn=document.getElementById("noBtn");

if(noBtn){
function move(){
noBtn.style.position="absolute";
noBtn.style.top=Math.random()*80+"%";
noBtn.style.left=Math.random()*80+"%";
}

noBtn.addEventListener("mouseover",move);
noBtn.addEventListener("touchstart",move);
}

// 💕 Floating Hearts
function createHeart(){
const container=document.querySelector(".hearts-container");
if(!container) return;

const heart=document.createElement("div");
heart.classList.add("heart");

const hearts=["💖","💕","💗","💓"];
heart.innerText=hearts[Math.floor(Math.random()*hearts.length)];

heart.style.left=Math.random()*100+"%";
heart.style.fontSize=(Math.random()*20+15)+"px";
heart.style.animationDuration=(Math.random()*3+4)+"s";

container.appendChild(heart);

setTimeout(()=>heart.remove(),6000);
}

setInterval(createHeart,300);

});