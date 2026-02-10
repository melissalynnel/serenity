const firefliesContainer = document.getElementById("fireflies");
const pond = document.querySelector(".pond");
const pondRipples = document.getElementById("pondRipples");
const grassCanvas = document.getElementById("grassCanvas");
const galleryOverlay = document.getElementById("galleryOverlay");
const galleryTitle = document.getElementById("galleryTitle");
const galleryRowTop = document.getElementById("galleryRowTop");
const galleryRowBottom = document.getElementById("galleryRowBottom");
const galleryButtons = document.querySelectorAll(".pond-feature");

if (firefliesContainer) {
  const fireflyCount = 32;
  for (let i = 0; i < fireflyCount; i += 1) {
    const firefly = document.createElement("span");
    firefly.className = "firefly";
    const size = Math.random() * 4 + 3;
    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;
    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${Math.random() * 100}%`;
    firefly.style.animationDelay = `${Math.random() * 8}s`;
    firefly.style.animationDuration = `${6 + Math.random() * 8}s`;
    firefly.style.opacity = `${0.4 + Math.random() * 0.6}`;
    firefliesContainer.appendChild(firefly);
  }
}

if (pond) {
  const rippleTrail = [];
  const maxTrail = 6;
  const rippleNodes = [];

  if (pondRipples) {
    for (let i = 0; i < maxTrail; i += 1) {
      const ripple = document.createElement("div");
      ripple.className = "pond-ripple";
      pondRipples.appendChild(ripple);
      rippleNodes.push(ripple);
    }
  }

  const updateRipple = (clientX, clientY) => {
    const rect = pond.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;
    const within = nx * nx + ny * ny <= 1.05;
    if (!within) {
      pond.style.setProperty("--ripple-x", "0px");
      pond.style.setProperty("--ripple-y", "0px");
      pond.style.setProperty("--glint-x", "50%");
      pond.style.setProperty("--glint-y", "50%");
      pond.style.setProperty("--ring-opacity", "0");
      return;
    }
    const offsetX = (nx * 18).toFixed(2);
    const offsetY = (ny * 18).toFixed(2);
    pond.style.setProperty("--ripple-x", `${offsetX}px`);
    pond.style.setProperty("--ripple-y", `${offsetY}px`);
    pond.style.setProperty("--glint-x", `${x}px`);
    pond.style.setProperty("--glint-y", `${y}px`);
    pond.style.setProperty("--ring-opacity", "0.75");
    const now = performance.now();
    rippleTrail.unshift({ x, y, t: now });
    if (rippleTrail.length > maxTrail) rippleTrail.pop();
  };

  window.addEventListener("pointermove", (event) => {
    updateRipple(event.clientX, event.clientY);
  });

  const renderRipples = () => {
    if (pondRipples) {
      const now = performance.now();
      rippleNodes.forEach((node, index) => {
        const data = rippleTrail[index];
        if (!data) {
          node.style.opacity = "0";
          return;
        }
        const age = Math.min((now - data.t) / 900, 1);
        const opacity = (1 - age) * 0.6;
        const scale = 0.9 + age * 0.2;
        node.style.left = `${data.x}px`;
        node.style.top = `${data.y}px`;
        node.style.opacity = `${opacity.toFixed(2)}`;
        node.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(2)})`;
      });
    }
    requestAnimationFrame(renderRipples);
  };

  renderRipples();
}

if (grassCanvas) {
  const ctx = grassCanvas.getContext("2d");
  const blades = [];
  let pointer = { x: -9999, y: -9999 };
  let pointerActive = false;
  let needsDraw = true;
  let lastMove = 0;

  const densityX = 53;
  const densityY = 32;
  const influenceRadius = 110;
  const maxTilt = 0.35;

  const resizeCanvas = () => {
    const rect = grassCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    grassCanvas.width = rect.width * dpr;
    grassCanvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildBlades(rect.width, rect.height);
    needsDraw = true;
  };

  const buildBlades = (width, height) => {
    blades.length = 0;
    const spacingX = width / densityX;
    const spacingY = height / densityY;
    for (let y = 0; y < densityY; y += 1) {
      for (let x = 0; x < densityX; x += 1) {
        blades.push({
          x: (x + Math.random() * 0.8) * spacingX,
          y: (y + Math.random() * 0.8) * spacingY,
          h: 30 + Math.random() * 60,
          base: -0.12 + Math.random() * 0.24,
        });
      }
    }
  };

  const draw = (time) => {
    if (!needsDraw && !pointerActive && time - lastMove > 200) return;
    needsDraw = false;
    ctx.clearRect(0, 0, grassCanvas.width, grassCanvas.height);
    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    blades.forEach((blade) => {
      const dx = pointer.x - blade.x;
      const dy = pointer.y - blade.y;
      const dist = Math.hypot(dx, dy);
      let tilt = blade.base;
      if (pointerActive && dist < influenceRadius) {
        const force = 1 - dist / influenceRadius;
        tilt += (dx / influenceRadius) * maxTilt * force;
      }
      const x2 = blade.x + Math.sin(tilt) * blade.h;
      const y2 = blade.y - Math.cos(tilt) * blade.h;
      const grad = ctx.createLinearGradient(blade.x, blade.y, x2, y2);
      grad.addColorStop(0, "rgba(14, 28, 18, 0.9)");
      grad.addColorStop(0.5, "rgba(36, 84, 52, 0.85)");
      grad.addColorStop(1, "rgba(120, 180, 120, 0.65)");
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(blade.x, blade.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  };

  window.addEventListener("pointermove", (event) => {
    const rect = grassCanvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    pointerActive = true;
    lastMove = performance.now();
    needsDraw = true;
    requestAnimationFrame(draw);
  });

  window.addEventListener("pointerleave", () => {
    pointerActive = false;
    needsDraw = true;
    lastMove = performance.now();
    requestAnimationFrame(draw);
  });

  window.addEventListener("resize", () => {
    clearTimeout(window.__grassCanvasTimer);
    window.__grassCanvasTimer = setTimeout(resizeCanvas, 120);
  });

  resizeCanvas();
  requestAnimationFrame(draw);
}

const galleryData = {
  lotus: {
    title: "chinatown, sf",
    items: [
      "assets/chinatown/01.05.2026_Chinatown_ 001.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 002.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 003.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 004.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 005.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 006.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 007.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 008.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 009.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 010.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 011.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 012.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 013.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 014.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 015.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 016.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 017.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 018.jpg",
      "assets/chinatown/01.05.2026_Chinatown_ 019.jpg",
    ],
  },
  "lily-one": {
    title: "Nocturne Botanica",
    items: ["Set 01", "Set 02", "Set 03", "Set 04", "Set 05"],
  },
  "lily-two": {
    title: "Still Water",
    items: ["Frame 01", "Frame 02", "Frame 03", "Frame 04", "Frame 05", "Frame 06"],
  },
  "lily-three": {
    title: "Moonlit Studies",
    items: ["Study 01", "Study 02", "Study 03", "Study 04"],
  },
  "lily-four": {
    title: "Soft Light",
    items: ["Light 01", "Light 02", "Light 03", "Light 04", "Light 05"],
  },
};

const buildRow = (rowEl, items) => {
  rowEl.innerHTML = "";
  const track = document.createElement("div");
  track.className = "gallery-track";
  const doubleItems = [...items, ...items];
  doubleItems.forEach((entry) => {
    const tile = document.createElement("div");
    tile.className = "gallery-tile";
    if (typeof entry === "string" && entry.startsWith("assets/")) {
      const img = document.createElement("img");
      img.src = entry;
      img.alt = "Gallery image";
      tile.appendChild(img);
    } else {
      const fallback = document.createElement("div");
      fallback.className = "gallery-fallback";
      fallback.textContent = entry;
      tile.appendChild(fallback);
    }
    track.appendChild(tile);
  });
  rowEl.appendChild(track);
};

const openGallery = (key) => {
  if (!galleryOverlay || !galleryTitle || !galleryRowTop || !galleryRowBottom) return;
  const data = galleryData[key];
  if (!data) return;
  galleryTitle.textContent = data.title;
  const topItems = data.items.filter((_, index) => index % 2 === 0);
  const bottomItems = data.items.filter((_, index) => index % 2 === 1);
  buildRow(galleryRowTop, topItems);
  buildRow(galleryRowBottom, bottomItems);
  galleryOverlay.classList.add("is-active");
  galleryOverlay.setAttribute("aria-hidden", "false");
};

const closeGallery = () => {
  if (!galleryOverlay) return;
  galleryOverlay.classList.remove("is-active");
  galleryOverlay.setAttribute("aria-hidden", "true");
};

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openGallery(button.dataset.gallery);
  });
});

document.addEventListener("click", (event) => {
  if (!galleryOverlay || !galleryOverlay.classList.contains("is-active")) return;
  if (galleryOverlay.contains(event.target)) {
    closeGallery();
  }
});

const ambientAudio = document.getElementById("crickets");

if (ambientAudio) {
  const tryPlay = () => {
    ambientAudio.volume = 0.35;
    ambientAudio.play().catch(() => {});
    document.removeEventListener("click", tryPlay);
    document.removeEventListener("touchstart", tryPlay);
  };

  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { once: true });
}
