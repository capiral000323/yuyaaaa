const startDate = new Date("2026-02-10T00:00:00+08:00");

const counter = document.getElementById("counter");

function updateCounter() {
  const now = new Date();
  let seconds = Math.max(0, Math.floor((now - startDate) / 1000));

  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  counter.textContent =
    `${days} days · ${hours} hours · ${minutes} minutes · ${seconds} seconds`;
}

updateCounter();
setInterval(updateCounter, 1000);

// Music button
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const toast = document.getElementById("toast");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.innerHTML = "♫ <span>Pause our song</span>";
    } else {
      music.pause();
      musicBtn.innerHTML = "♫ <span>Play our song</span>";
    }
  } catch {
    showToast("Add d14u-hellmery.mp3 to the website folder first ♡");
  }
});

// Gentle automatic carousel
let carouselTimer;

function startCarouselAutoPlay() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    if (!document.hidden && !lightbox.classList.contains("open")) {
      updateCarousel(currentPhoto + 1);
    }
  }, 4500);
}

// Photo carousel + lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const carouselTrack = document.getElementById("carouselTrack");
const carouselDots = document.getElementById("carouselDots");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const photoCards = [...document.querySelectorAll(".photo-card")];

let currentPhoto = 0;
let touchStartX = 0;

function updateCarousel(index) {
  currentPhoto = (index + photoCards.length) % photoCards.length;
  carouselTrack.style.transform = `translateX(-${currentPhoto * 100}%)`;

  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentPhoto);
    dot.setAttribute("aria-current", i === currentPhoto ? "true" : "false");
  });
}

photoCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.img;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });

  const dot = document.createElement("button");
  dot.className = "carousel-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show memory ${index + 1}`);
  dot.addEventListener("click", () => updateCarousel(index));
  carouselDots.appendChild(dot);
});

prevPhoto.addEventListener("click", () => updateCarousel(currentPhoto - 1));
nextPhoto.addEventListener("click", () => updateCarousel(currentPhoto + 1));

carouselTrack.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselTrack.addEventListener("touchend", e => {
  const distance = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 45) {
    updateCarousel(currentPhoto + (distance < 0 ? 1 : -1));
  }
}, { passive: true });

document.addEventListener("keydown", e => {
  if (lightbox.classList.contains("open")) return;
  if (e.key === "ArrowLeft") updateCarousel(currentPhoto - 1);
  if (e.key === "ArrowRight") updateCarousel(currentPhoto + 1);
});

updateCarousel(0);

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// Soft click hearts
document.addEventListener("click", e => {
  if (e.target.closest("button, a")) return;

  const heart = document.createElement("div");
  heart.textContent = ["♡", "♥", "✦"][Math.floor(Math.random() * 3)];
  heart.style.position = "fixed";
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  heart.style.color = "#ffb4d4";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "100";
  heart.style.fontSize = `${12 + Math.random() * 12}px`;
  heart.style.transition = "1s ease-out";
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${(Math.random() - .5) * 50}px, -70px) scale(1.5)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => heart.remove(), 1000);
});


/* Surprise message */
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

const surpriseMessages = [
  "I love you more than I can put into one little website. ♡",
  "Thank you for staying, understanding, laughing with me, and making ordinary days special.",
  "Whatever adventures come next, I want more of them with you. ✦",
  "You are one of the best parts of my story, Yuya. Always remember that. ♡"
];

let surpriseIndex = 0;

surpriseBtn.addEventListener("click", () => {
  surpriseText.textContent = surpriseMessages[surpriseIndex];
  surpriseIndex = (surpriseIndex + 1) % surpriseMessages.length;
  surpriseBtn.textContent = "Another one ♡";
  surpriseBtn.classList.add("revealed");
  showToast("For Yuya, with love ♡");
});

startCarouselAutoPlay();


/* Dreamy mode */
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dreamy-mode");
  themeBtn.textContent = document.body.classList.contains("dreamy-mode") ? "☀" : "☾";
});

/* Days together */
const anniversaryDays = document.getElementById("anniversaryDays");
const relationshipStart = new Date("2026-02-10T00:00:00+08:00");

function updateAnniversaryDays() {
  const now = new Date();
  const days = Math.max(0, Math.floor((now - relationshipStart) / 86400000));
  anniversaryDays.textContent = days.toLocaleString();
}

updateAnniversaryDays();
setInterval(updateAnniversaryDays, 60000);

/* Secret message */
const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");

secretBtn.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
  const open = secretMessage.classList.contains("show");
  secretMessage.setAttribute("aria-hidden", String(!open));
  secretBtn.textContent = open ? "Close secret ♡" : "Unlock ♡";
  if (open) showToast("You found the secret ♡");
});

/* Make nav disappear while scrolling down, reappear near top */
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const nav = document.getElementById("loveNav");
  if (window.scrollY > lastScrollY && window.scrollY > 120) {
    nav.style.transform = "translate(-50%, -140%)";
  } else {
    nav.style.transform = "translateX(-50%)";
  }
  lastScrollY = window.scrollY;
}, { passive: true });


/* Unexpected extras */
const introScreen = document.getElementById("introScreen");
const enterLove = document.getElementById("enterLove");
const sparkleLayer = document.getElementById("sparkleLayer");

enterLove.addEventListener("click", () => {
  introScreen.classList.add("hide");
  burstSparkles(window.innerWidth / 2, window.innerHeight / 2, 30);
  showToast("Welcome to our little universe ♡");
});

function burstSparkles(x, y, amount = 16) {
  const symbols = ["✦", "♡", "♥", "·"];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--dx", `${(Math.random() - .5) * 280}px`);
    el.style.setProperty("--dy", `${(Math.random() - .5) * 280}px`);
    el.style.animationDelay = `${Math.random() * .15}s`;
    sparkleLayer.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}

const missBtn = document.getElementById("missBtn");
const randomLoveText = document.getElementById("randomLoveText");
const missCount = document.getElementById("missCount");
let misses = Number(localStorage.getItem("yuyaMissCount") || 0);

const missMessages = [
  "If you miss me, look at our memories. I'm probably missing you too. ♡",
  "Distance, busy days, and time don't change how special you are.",
  "Come here. You owe me one hug. Actually... make it ten.",
  "Somewhere between all my thoughts, you keep showing up.",
  "You are still my favorite notification.",
  "I hope you know how loved you are, even on quiet days.",
  "Okay, enough missing me. Come make another memory with me. ✦"
];

missCount.textContent = misses;

missBtn.addEventListener("click", () => {
  randomLoveText.textContent = missMessages[Math.floor(Math.random() * missMessages.length)];
  misses++;
  missCount.textContent = misses;
  localStorage.setItem("yuyaMissCount", misses);
  missBtn.classList.remove("shake-love");
  void missBtn.offsetWidth;
  missBtn.classList.add("shake-love");
  burstSparkles(
    missBtn.getBoundingClientRect().left + missBtn.offsetWidth / 2,
    missBtn.getBoundingClientRect().top,
    12
  );
});

const randomMemoryBtn = document.getElementById("randomMemoryBtn");

randomMemoryBtn.addEventListener("click", () => {
  const cards = [...document.querySelectorAll(".photo-card")];
  if (!cards.length || typeof updateCarousel !== "function") return;
  const random = Math.floor(Math.random() * cards.length);
  updateCarousel(random);
  document.getElementById("memories").scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => cards[random].click(), 650);
  showToast(`Memory ${String(random + 1).padStart(2, "0")} chose you ♡`);
});

/* Secret keyboard Easter egg: type CAPS */
let secretKeys = "";
document.addEventListener("keydown", (e) => {
  if (e.key.length !== 1) return;
  secretKeys = (secretKeys + e.key.toUpperCase()).slice(-4);
  if (secretKeys === "CAPS") {
    burstSparkles(window.innerWidth / 2, window.innerHeight / 2, 45);
    showToast("CAPS mode unlocked ✦");
    document.body.classList.add("dreamy-mode");
    setTimeout(() => document.body.classList.remove("dreamy-mode"), 5000);
    secretKeys = "";
  }
});

/* Little click surprise anywhere on the page */
let clickCount = 0;
document.addEventListener("click", (e) => {
  if (e.target.closest("button, a, input, textarea")) return;
  clickCount++;
  if (clickCount % 10 === 0) {
    burstSparkles(e.clientX, e.clientY, 18);
  }
});
