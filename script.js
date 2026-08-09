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

/* Envelope interaction */
const openEnvelope = document.getElementById("openEnvelope");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");

if (openEnvelope && letterOverlay) {
  openEnvelope.addEventListener("click", () => {
    openEnvelope.classList.add("open");
    setTimeout(() => {
      letterOverlay.classList.add("show");
      letterOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }, 650);
  });
}
if (closeLetter && letterOverlay) {
  closeLetter.addEventListener("click", () => {
    letterOverlay.classList.remove("show");
    letterOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openEnvelope?.classList.remove("open");
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && letterOverlay?.classList.contains("show")) closeLetter?.click();
});

/* ===== UNEXPECTED FEATURES ===== */
(() => {
  const modal = document.getElementById("surpriseModal");
  const modalContent = document.getElementById("surpriseModalContent");
  const modalClose = document.getElementById("surpriseClose");
  const secretOverlay = document.getElementById("secretCodeOverlay");
  const secretClose = document.getElementById("secretClose");
  const loveFill = document.getElementById("loveFill");
  const lovePercent = document.getElementById("lovePercent");
  const loveMeterText = document.getElementById("loveMeterText");

  const misses = [
    "If you miss me right now, just remember: somewhere in this little website, I left a piece of my heart for you. ♡",
    "Come here. No long explanation. Just one virtual hug from Caps. 🫂",
    "I hope you know that even on busy days, you are still one of my favorite thoughts.",
    "If I could teleport right now, I would probably just sit beside you and annoy you. 😭❤️"
  ];

  const futures = [
    "More beaches. More late-night talks. More random trips. More memories.",
    "Someday we'll look back at this website and laugh at how cute and cheesy we were.",
    "This isn't the end of our memories. It's just the beginning of the ones we haven't made yet.",
    "Our next chapter hasn't been written yet. Let's make it worth remembering."
  ];

  const memories = [
    "MAR 17–19 — One of the best memories with you.",
    "That beach day where you made me feel special.",
    "Every random trip that somehow became a memory.",
    "The little moments that didn't seem big at the time—but stayed with me."
  ];

  function showModal(title, text, button="Aww ♡") {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = `<p class="eyebrow">A little surprise</p><h2>${title}</h2><p>${text}</p><button class="surprise-main-btn" id="surpriseAction">${button}</button>`;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
    document.getElementById("surpriseAction")?.addEventListener("click", closeModal);
  }
  function closeModal(){
    modal?.classList.remove("show");
    modal?.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  }

  document.querySelectorAll(".surprise-card").forEach(card => {
    card.addEventListener("click", () => {
      const type = card.dataset.surprise;
      if(type === "miss") {
        const msg = misses[Math.floor(Math.random()*misses.length)];
        showModal("I miss you too.", msg, "I miss you ♡");
      }
      if(type === "memory") {
        const msg = memories[Math.floor(Math.random()*memories.length)];
        showModal("Memory unlocked 🎞️", msg, "Keep the memories");
      }
      if(type === "future") {
        const msg = futures[Math.floor(Math.random()*futures.length)];
        showModal("Plot twist: we're not done yet. 🔮", msg, "Next chapter ♡");
      }
      if(type === "secret") {
        if(secretOverlay){
          secretOverlay.classList.add("show");
          secretOverlay.setAttribute("aria-hidden","false");
          document.body.style.overflow="hidden";
          let n = Number(localStorage.getItem("capsSecretCount") || 0) + 1;
          localStorage.setItem("capsSecretCount", n);
          const count = document.getElementById("secretCount");
          if(count) count.textContent = "♡ " + n;
        }
      }
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if(e.target === modal) closeModal(); });
  secretClose?.addEventListener("click", () => {
    secretOverlay.classList.remove("show");
    secretOverlay.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
  });

  // Keyboard easter egg: type CAPS anywhere.
  let typed="";
  document.addEventListener("keydown", e => {
    if(e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if(typed === "caps" && secretOverlay){
        secretOverlay.classList.add("show");
        secretOverlay.setAttribute("aria-hidden","false");
        document.body.style.overflow="hidden";
        typed="";
      }
    }
    if(e.key === "Escape"){
      closeModal();
      if(secretOverlay?.classList.contains("show")) secretClose?.click();
    }
  });

  // Love meter slowly "breaks" beyond 100% when clicked.
  let love = 100;
  document.querySelector(".love-meter")?.addEventListener("click", () => {
    love = Math.min(999, love + 1);
    if(loveFill) loveFill.style.width = Math.min(100, love/9.99) + "%";
    if(lovePercent) lovePercent.textContent = love + "%";
    if(loveMeterText) loveMeterText.textContent = love > 100 ? "Error: love exceeded the maximum. 😭❤️" : "Love level: dangerously high.";
  });
})();

/* ================= CINEMATIC LANDING ================= */
(() => {
  const landing = document.getElementById("landingPage");
  const enter = document.getElementById("enterStory");
  if (!landing || !enter) return;

  document.body.classList.add("landing-locked");

  const enterStory = () => {
    landing.classList.add("hide");
    document.body.classList.remove("landing-locked");
    try { sessionStorage.setItem("yuyaLandingSeen","1"); } catch(e) {}
    setTimeout(() => landing.remove(), 1200);
  };

  enter.addEventListener("click", enterStory);

  // Space/Enter also opens the story.
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && !landing.classList.contains("hide")) {
      e.preventDefault();
      enterStory();
    }
  });
})();
