
/* ===============================
   GLOBAL VARIABLES
================================ */
const typedSections = {};
const typingTimers = {};

/* ===============================
   LOVE COUNTER
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const loveTime = document.getElementById("loveTime");
  if (!loveTime) return;

  const startDate = new Date("2025-12-28T00:00:00");

  function updateLoveCounter() {
    const now = new Date();
    const diff = Math.max(0, now - startDate);

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    loveTime.textContent =
      `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds ❤️`;
  }

  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);
});

/* ===============================
   CELEBRATION AND MUSIC
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const celebrateBtn = document.getElementById("celebrateBtn");
  const overlay = document.getElementById("celebration-overlay");
  const closeBtn = document.getElementById("closeOverlay");
  const music = document.getElementById("celebrationMusic");

  if (!celebrateBtn || !overlay || !closeBtn) return;

  function closeCelebration() {
    overlay.style.display = "none";

    if (music) {
      music.pause();
      music.currentTime = 0;
    }
  }

  celebrateBtn.addEventListener("click", () => {
    overlay.style.display = "flex";

    if (music) {
      music.currentTime = 0;
      music.play().catch(() => {});
    }
  });

  closeBtn.addEventListener("click", closeCelebration);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeCelebration();
    }
  });
});

/* ===============================
   BIRTHDAY MESSAGE CARDS
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("specialPopup");
  const messageText = document.getElementById("specialMessageText");
  const popupMusic = document.getElementById("messageMusic");
  const closeBtn = document.querySelector(".close-btn");

  if (!popup || !messageText || !closeBtn) return;

  document.querySelectorAll(".read-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const card = event.currentTarget.closest(".memory-card");
      if (!card) return;

      messageText.textContent =
        card.dataset.message || "Happy Birthday, Amma! ❤️";

      popup.style.display = "flex";

      if (popupMusic) {
        popupMusic.pause();
        popupMusic.currentTime = 0;

        if (card.dataset.music) {
          popupMusic.src = card.dataset.music;
          popupMusic.play().catch(() => {});
        }
      }
    });
  });

  function closePopup() {
    popup.style.display = "none";

    if (popupMusic) {
      popupMusic.pause();
      popupMusic.currentTime = 0;
    }
  }

  closeBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
});

/* ===============================
   LETTER CONTENT
================================ */
const letters = [
  `Dear Mummy... 💕 

Today is a very special day for me.
Because the most precious person in my life
was born on this beautiful day.

Happy Birthday, Amma! 🎂🌷

You are my first love,
my biggest strength,
and my forever best friend. ❤️`,

  `Thank You for Everything, Amma! 💗

Thank you for every hug,
every sacrifice, and every silent prayer.

Thank you for loving me even on my
worst days and always wishing the best for me.

I may not say it every day,
but I notice all the little things you do.

I am so lucky to be your daughter. 🥹💐`,

  `You Are My Safe Place 🫂💖

Whenever the world feels difficult,
your love makes everything feel okay.

Your smile is my happiness.
Your hugs are my comfort.
Your love is my greatest blessing.

No matter how old I grow,
I will always be your little girl. 🎀❤️`,

  `One Last Thing, Amma... 💌

I don't need a perfect life,
because having you as my mom
already makes my life special.

If my love could become a gift,
I would give you the whole universe.

You are my today, my tomorrow,
and my forever.

I wish you endless happiness,
good health, and beautiful memories.

Happy Birthday, my Queen! 👑❤️

I LOVE YOU ENDLESSLY, AMMA!

Forever your little girl. 🎀💕`
];

/* ===============================
   TYPEWRITER EFFECT
================================ */
function typeText(el, text, btn, last = false) {
  if (!el) return;

  // Stop an earlier animation on the same element.
  if (typingTimers[el.id]) {
    clearInterval(typingTimers[el.id]);
    delete typingTimers[el.id];
  }

  let i = 0;
  el.textContent = "";

  if (btn) {
    btn.style.display = "none";
  }

  typingTimers[el.id] = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(typingTimers[el.id]);
      delete typingTimers[el.id];

      if (!last && btn) {
        btn.style.display = "inline-block";
      }
    }
  }, 40);
}

/* ===============================
   SECTION TYPING LOGIC
================================ */
function startTyping(n) {
  const section = document.getElementById(`s${n}`);
  const textEl = document.getElementById(`t${n}`);
  const btn = document.querySelector(`#s${n} .next-btn`);

  if (!section || !textEl || !letters[n - 1]) return;

  section.style.display = "flex";

  // Do not type the same section twice.
  if (typedSections[n]) return;

  typedSections[n] = true;

  typeText(textEl, letters[n - 1], btn, n === letters.length);

  // Special effects for the final letter.
  if (n === letters.length) {
    startFireflies();

    if (typeof startEnding === "function") {
      setTimeout(() => {
        startEnding();
      }, 4000);
    }
  }
}

/* ===============================
   NEXT SECTION BUTTON
================================ */
function goNext(n) {
  const section = document.getElementById(`s${n}`);

  if (!section) return;

  section.style.display = "flex";

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  setTimeout(() => {
    startTyping(n);
  }, 500);
}

/* ===============================
   FIREFLY ANIMATION
================================ */
let fireflyInterval = null;

function startFireflies() {
  if (fireflyInterval) return;

  const container = document.getElementById("fireflies");
  if (!container) return;

  fireflyInterval = setInterval(() => {
    const firefly = document.createElement("div");

    firefly.className = "firefly";
    firefly.style.left = Math.random() * 100 + "vw";
    firefly.style.animationDuration =
      10 + Math.random() * 10 + "s";

    container.appendChild(firefly);

    setTimeout(() => {
      firefly.remove();
    }, 20000);
  }, 700);
}

/* ===============================
   APPEND TEXT EFFECT
================================ */
function typeTextAppend(el, text, speed = 40) {
  if (!el) return;

  let i = 0;

  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(timer);
    }
  }, speed);
}

/* ===============================
   SHOW NEXT BUTTON
================================ */
function showNext(btn, delay = 800) {
  if (!btn) return;

  btn.style.display = "none";

  setTimeout(() => {
    btn.style.display = "inline-block";
  }, delay);
}

/* ===============================
   INITIALIZE WEBSITE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  startTyping(1);
});
