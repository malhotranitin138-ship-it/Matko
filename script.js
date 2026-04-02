document.addEventListener("DOMContentLoaded", () => {

  const heartsContainer = document.querySelector(".hearts-container");

  if (heartsContainer) {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "💖";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = (12 + Math.random() * 18) + "px";
      heart.style.opacity = Math.random();

      heartsContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 6000);
    }, 300);
  }

  const noBtn = document.getElementById("noBtn");

  if (noBtn) {
    const moveButton = () => {
      const maxX = window.innerWidth - noBtn.offsetWidth - 20;
      const maxY = window.innerHeight - noBtn.offsetHeight - 20;

      const x = Math.random() * maxX;
      const y = Math.random() * maxY;

      noBtn.style.position = "fixed";
      noBtn.style.left = x + "px";
      noBtn.style.top = y + "px";
    };

    noBtn.addEventListener("mouseover", moveButton);
    noBtn.addEventListener("touchstart", moveButton);
  }

  const slideImg = document.getElementById("slide");
  const caption = document.getElementById("caption");

  if (slideImg && caption) {
    const images = [
      "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg",
      "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"
    ];

    const captions = [
      "💖", "💖", "💖", "💖",
      "💖", "💖", "💖", "💖"
    ];

    let index = 0;

    const showSlide = () => {
      if (index >= images.length) return; 

      slideImg.style.opacity = 0;

      setTimeout(() => {
        slideImg.src = images[index];
        caption.innerText = captions[index];
        caption.style.opacity = 1;

        setTimeout(() => {
          caption.style.opacity = 0;
        }, 2000);

        slideImg.style.opacity = 1;
      }, 300);

      index++;

      if (index < images.length) {
        setTimeout(showSlide, 5000); 
      }
    };

    showSlide();
  }

});
