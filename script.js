
document.addEventListener("DOMContentLoaded", () => {
  const heartsContainer = document.querySelector(".hearts-container");
  if (heartsContainer) {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = (10 + Math.random()*20) + "px";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 300);
  }

  const noBtn = document.getElementById("noBtn");
  if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
      noBtn.style.position = "absolute";
      noBtn.style.left = Math.random() * 80 + "%";
      noBtn.style.top = Math.random() * 80 + "%";
    });
  }
});
