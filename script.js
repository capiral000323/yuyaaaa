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

// Photo lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.img;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

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
