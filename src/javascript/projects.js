// ══ DATA ═══════════════════════════════════════════════════════════════
const projects = [
  {
    title: "TalipaApp Website",
    category: "Web App",
    year: "2026",
    desc: "A real-time analytics dashboard for SaaS metrics with customizable widgets and dark-mode-first design.",
    tags: ["React", "TypeScript", "Recharts", "Tailwind"],
    image: "../src/images/projects/talipaApp_web_dep.png",
    thumb: "../src/images/projects/tali_web.png",
    link: "#",
    github: "#",
  },
  {
    title: "Orbital Store",
    category: "E-Commerce",
    year: "2024",
    desc: "Full-stack e-commerce platform with animated product reveals, cart persistence, and Stripe checkout.",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
    link: "#",
    github: "#",
  },
  {
    title: "Pulse Health",
    category: "Mobile App",
    year: "2023",
    desc: "Cross-platform health tracker featuring biometric syncing, AI insights, and motion-based UI.",
    tags: ["React Native", "Expo", "HealthKit", "AI"],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80",
    link: "#",
    github: "#",
  },
  {
    title: "Luma 3D",
    category: "Creative",
    year: "2023",
    desc: "Interactive 3D product configurator built with Three.js — rotate, texture, and export in real time.",
    tags: ["Three.js", "WebGL", "GSAP", "Blender"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    link: "#",
    github: "#",
  },
  {
    title: "Cipher Chat",
    category: "Fullstack",
    year: "2023",
    desc: "End-to-end encrypted messaging app with disappearing messages, group rooms, and WebSocket sync.",
    tags: ["Node.js", "Socket.io", "MongoDB", "Crypto"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80",
    link: "#",
    github: "#",
  },
  {
    title: "Terrain Gen",
    category: "Experiment",
    year: "2022",
    desc: "Procedural terrain generator using Perlin noise — export heightmaps and fly-through in browser.",
    tags: ["Canvas API", "WebGL", "Algorithms", "Vanilla JS"],
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    link: "#",
    github: "#",
  },
];

// ══ STATE ══════════════════════════════════════════════════════════════
let active = 0,
  bgFlip = false;
let mouseX = 0,
  mouseY = 0,
  targetX = 0,
  targetY = 0;

const bgWrap = document.getElementById("bg-wrap");
const bgA = document.getElementById("bg-a");
const bgB = document.getElementById("bg-b");
const shelf = document.getElementById("shelf");
const detail = document.getElementById("detail");
const navDots = document.getElementById("nav-dots");
const modal = document.getElementById("modal");
const flash = document.getElementById("flash");
const wipeWrap = document.getElementById("wipe-wrap");

// ══ BUILD SHELF ════════════════════════════════════════════════════════
projects.forEach((p, i) => {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.id = "dot-" + i;
  navDots.appendChild(dot);

  const card = document.createElement("div");
  card.className = "game-card";
  card.id = "card-" + i;
  // stagger delay for entry reveal
  card.style.transitionDelay = `${i * 55}ms`;
  card.innerHTML = `<img src="${p.thumb}" alt="${p.title}" loading="lazy"/><div class="card-label">${p.title}</div>`;
  card.addEventListener("click", () => {
    if (active === i) openModal(i);
    else setActive(i);
  });
  shelf.appendChild(card);
});

document
  .getElementById("btn-open")
  .addEventListener("click", () => openModal(active));

// ══ PS5-STYLE ENTRY SEQUENCE ═══════════════════════════════════════════
function runEntryAnimation() {
  // 1. First, load the initial BG behind the veil
  bgA.style.backgroundImage = `url('${projects[0].image}')`;
  bgA.style.opacity = "1";

  // 2. After a tiny breath, shoot horizontal wipe lines across screen
  setTimeout(() => {
    spawnWipeLines();
  }, 80);

  // 3. Lift the black veil
  setTimeout(() => {
    document.getElementById("entry-veil").classList.add("lifted");
  }, 220);

  // 4. Slide in topbar
  setTimeout(() => {
    document.getElementById("topbar").classList.add("show");
  }, 480);

  // 5. Slide in shelf wrapper
  setTimeout(() => {
    document.getElementById("shelf-wrapper").classList.add("show");
  }, 580);

  // 6. Pop each card in with stagger
  setTimeout(() => {
    document
      .querySelectorAll(".game-card")
      .forEach((c) => c.classList.add("revealed"));
  }, 680);

  // 7. Slide up detail panel
  setTimeout(() => {
    setActive(0); // sets data + triggers detail show
  }, 900);
}

// Horizontal wipe lines — PS5 swoosh effect
function spawnWipeLines() {
  const lineCount = 6;
  const positions = [0.12, 0.28, 0.44, 0.58, 0.72, 0.88];
  positions.forEach((pos, i) => {
    const line = document.createElement("div");
    line.className = "wipe-line";
    line.style.top = pos * 100 + "vh";
    wipeWrap.appendChild(line);

    // Animate: shoot right then fade
    setTimeout(() => {
      line.style.transition =
        "left 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease 0.45s";
      line.style.left = "100%";
      line.style.opacity = "0";
      setTimeout(() => line.remove(), 900);
    }, i * 28);
  });
}

// ══ SET ACTIVE ═════════════════════════════════════════════════════════
function setActive(idx) {
  const prev = active;
  active = idx;

  if (idx !== prev) {
    flash.classList.add("pop");
    setTimeout(() => flash.classList.remove("pop"), 140);
  }

  document.getElementById("card-" + prev)?.classList.remove("active");
  document.getElementById("card-" + idx)?.classList.add("active");
  document.getElementById("dot-" + prev)?.classList.remove("active");
  document.getElementById("dot-" + idx)?.classList.add("active");

  const cardW = 136;
  const visible = Math.floor((window.innerWidth - 80) / cardW);
  const offset = Math.max(0, idx - Math.floor(visible / 2)) * cardW;
  shelf.style.transform = `translateX(-${offset}px)`;

  crossfadeBg(idx);
  updateDetail(idx);
}

// ══ CROSSFADE BG ═══════════════════════════════════════════════════════
function crossfadeBg(idx) {
  const url = `url('${projects[idx].image}')`;
  if (!bgFlip) {
    bgB.style.backgroundImage = url;
    requestAnimationFrame(() => {
      bgB.style.opacity = "1";
      bgA.style.opacity = "0";
    });
  } else {
    bgA.style.backgroundImage = url;
    requestAnimationFrame(() => {
      bgA.style.opacity = "1";
      bgB.style.opacity = "0";
    });
  }
  bgFlip = !bgFlip;
}

// ══ DETAIL ═════════════════════════════════════════════════════════════
function updateDetail(idx) {
  const p = projects[idx];
  // quick fade out
  detail.classList.remove("show");
  detail.classList.add("hide");
  setTimeout(() => {
    document.getElementById("d-category").textContent = p.category;
    document.getElementById("d-year").textContent = p.year;
    document.getElementById("d-title").textContent = p.title;
    document.getElementById("d-desc").textContent = p.desc;
    document.getElementById("d-tags").innerHTML = p.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    detail.classList.remove("hide");
    detail.classList.add("show");
  }, 180);
}

// ══ MODAL ══════════════════════════════════════════════════════════════
function openModal(idx) {
  const p = projects[idx];
  document.getElementById("m-category").textContent = p.category;
  document.getElementById("m-year").textContent = p.year;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-desc").textContent = p.desc;
  document.getElementById("m-tags").innerHTML = p.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
  document.getElementById("m-link").href = p.link;
  document.getElementById("m-github").href = p.github;
  modal.classList.add("open");
}
window.closeModal = () => modal.classList.remove("open");
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ══ PARALLAX ═══════════════════════════════════════════════════════════
document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});
(function loop() {
  targetX += (mouseX - targetX) * 0.055;
  targetY += (mouseY - targetY) * 0.055;
  bgWrap.style.transform = `scale(1.09) translate(${targetX * 14}px, ${targetY * 10}px)`;
  requestAnimationFrame(loop);
})();

// ══ KEYBOARD ═══════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeModal();
    return;
  }
  if (e.key === "ArrowRight")
    setActive(Math.min(active + 1, projects.length - 1));
  if (e.key === "ArrowLeft") setActive(Math.max(active - 1, 0));
  if (e.key === "Enter" || e.key === " ") openModal(active);
});

// ══ BACK NAV ═══════════════════════════════════════════════════════════
window.goBack = function () {
  const veil = document.getElementById("exit-veil");
  veil.classList.add("active");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 580);
};

// ══ CLOCK ══════════════════════════════════════════════════════════════
const clockEl = document.getElementById("clock");
(function tickClock() {
  clockEl.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  setTimeout(tickClock, 10000);
})();

// ══ BOOT ═══════════════════════════════════════════════════════════════
runEntryAnimation();
