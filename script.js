const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const carouselImage = document.getElementById("carouselImage");

// 🔁 7 images in swipe carousel
const images = [
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg",
  "img4.jpeg",
  "img5.jpeg",
  "img6.jpeg",
  "img7.jpeg"
];

let currentIndex = 0;
let noClickCount = 0;

// Move No button
function moveNoButton() {
  noClickCount++;
  
  if (noClickCount >= 5) {
    noBtn.style.display = "none";
    return;
  }
  
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// iPhone + desktop support
noBtn.addEventListener("touchstart", moveNoButton);
noBtn.addEventListener("mouseover", moveNoButton);

// YES button logic
yesBtn.addEventListener("click", () => {
  document.querySelector(".buttons").style.display = "none";
  result.style.display = "block";
  carouselImage.src = images[currentIndex];
  
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
});

// Swipe handling (iPhone)
let startX = 0;

carouselImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carouselImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  
  if (diff > 50) {
    currentIndex = (currentIndex + 1) % images.length;
  } else if (diff < -50) {
    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
  }
  
  carouselImage.src = images[currentIndex];
});