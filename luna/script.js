const firefliesContainer = document.getElementById("fireflies");
const pond = document.querySelector(".pond");
const pondRipples = document.getElementById("pondRipples");
const grassCanvas = document.getElementById("grassCanvas");

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


const ambientAudio = document.getElementById("crickets");
const ambientVolume = document.getElementById("ambientVolume");

const galleryModal = document.getElementById("galleryModal");
const galleryGrid = document.getElementById("galleryGrid");
const galleryMarqueeTrack = document.getElementById("galleryMarqueeTrack");
const galleryMarqueeTrackReverse = document.getElementById("galleryMarqueeTrackReverse");
const galleryTitle = document.getElementById("galleryTitle");
const galleryButtons = document.querySelectorAll(".pond-feature[data-gallery]");
let plopAudioContext;
let plopNoiseBuffer;

const ensurePlopAudioContext = () => {
  if (plopAudioContext) return plopAudioContext;
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;
  plopAudioContext = new AudioContextCtor();
  return plopAudioContext;
};

const ensurePlopNoiseBuffer = (ctx) => {
  if (plopNoiseBuffer) return plopNoiseBuffer;
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * 0.22);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  plopNoiseBuffer = buffer;
  return plopNoiseBuffer;
};

const playPlopSound = () => {
  const ctx = ensurePlopAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const toneGain = ctx.createGain();
  const toneFilter = ctx.createBiquadFilter();
  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();
  const noiseFilter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(245 + Math.random() * 22, now);
  osc.frequency.exponentialRampToValueAtTime(86 + Math.random() * 12, now + 0.18);

  toneFilter.type = "lowpass";
  toneFilter.frequency.setValueAtTime(620, now);
  toneFilter.Q.value = 1.1;

  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

  noise.buffer = ensurePlopNoiseBuffer(ctx);
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.setValueAtTime(700 + Math.random() * 120, now);
  noiseFilter.Q.value = 1.4;
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.016, now + 0.004);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

  osc.connect(toneFilter);
  toneFilter.connect(toneGain);
  toneGain.connect(ctx.destination);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.start(now);
  noise.start(now);
  osc.stop(now + 0.21);
  noise.stop(now + 0.045);
};

const galleries = {
  chinatown: [
    "assets/chinatown/01.05.2026_Chinatown_ 001.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 002.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 003.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 004.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 005.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 006.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 007.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 008.jpg",
    "assets/chinatown/01.05.2026_Chinatown_ 009.jpg",
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
  "bay-bridge": [
    "assets/bay-bridge/sf-001.jpg",
    "assets/bay-bridge/sf-002.jpg",
    "assets/bay-bridge/sf-003.jpg",
    "assets/bay-bridge/sf-004.jpg",
    "assets/bay-bridge/sf-005.jpg",
    "assets/bay-bridge/sf-006.jpg",
    "assets/bay-bridge/sf-007.jpg",
    "assets/bay-bridge/sf-012.jpg",
    "assets/bay-bridge/sf-013.jpg",
    "assets/bay-bridge/sf-014.jpg",
    "assets/bay-bridge/sf-015.jpg",
    "assets/bay-bridge/sf-016.jpg",
    "assets/bay-bridge/sf-017.jpg",
    "assets/bay-bridge/sf-018.jpg",
  ],
  golden: [
    "assets/golden/SF_01212026_001.jpg",
    "assets/golden/SF_01212026_002.jpg",
    "assets/golden/SF_01212026_004.jpg",
    "assets/golden/SF_01212026_005.jpg",
    "assets/golden/SF_01212026_006.jpg",
    "assets/golden/SF_01212026_007.jpg",
    "assets/golden/SF_01212026_009.jpg",
    "assets/golden/SF_01212026_010.jpg",
    "assets/golden/SF_01212026_011.jpg",
    "assets/golden/SF_01212026_012.jpg",
    "assets/golden/SF_01212026_013.jpg",
    "assets/golden/SF_01212026_014.jpg",
    "assets/golden/SF_01212026_015.jpg",
    "assets/golden/SF_01212026_016.jpg",
    "assets/golden/SF_01212026_017.jpg",
    "assets/golden/SF_01212026_018.jpg",
    "assets/golden/SF_01212026_019.jpg",
    "assets/golden/SF_01212026_020.jpg",
  ],
};

const galleryTitles = {
  chinatown: "rainy night in chinatown",
  "bay-bridge": "dusk in the bay",
  golden: "everything is golden",
};

const galleryRows = {
  "bay-bridge": {
    top: [
      "assets/bay-bridge/sf-001.jpg",
      "assets/bay-bridge/sf-002.jpg",
      "assets/bay-bridge/sf-003.jpg",
      "assets/bay-bridge/sf-012.jpg",
      "assets/bay-bridge/sf-013.jpg",
      "assets/bay-bridge/sf-014.jpg",
      "assets/bay-bridge/sf-015.jpg",
      "assets/bay-bridge/sf-016.jpg",
    ],
    bottom: [
      "assets/bay-bridge/sf-004.jpg",
      "assets/bay-bridge/sf-005.jpg",
      "assets/bay-bridge/sf-006.jpg",
      "assets/bay-bridge/sf-007.jpg",
      "assets/bay-bridge/sf-017.jpg",
      "assets/bay-bridge/sf-018.jpg",
    ],
  },
  golden: {
    top: [
      "assets/golden/SF_01212026_001.jpg",
      "assets/golden/SF_01212026_002.jpg",
      "assets/golden/SF_01212026_004.jpg",
      "assets/golden/SF_01212026_005.jpg",
      "assets/golden/SF_01212026_009.jpg",
      "assets/golden/SF_01212026_010.jpg",
      "assets/golden/SF_01212026_011.jpg",
      "assets/golden/SF_01212026_012.jpg",
      "assets/golden/SF_01212026_013.jpg",
    ],
    bottom: [
      "assets/golden/SF_01212026_006.jpg",
      "assets/golden/SF_01212026_007.jpg",
      "assets/golden/SF_01212026_014.jpg",
      "assets/golden/SF_01212026_015.jpg",
      "assets/golden/SF_01212026_016.jpg",
      "assets/golden/SF_01212026_017.jpg",
      "assets/golden/SF_01212026_018.jpg",
      "assets/golden/SF_01212026_019.jpg",
      "assets/golden/SF_01212026_020.jpg",
    ],
  },
};

const closeGallery = () => {
  if (!galleryModal) return;
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  if (galleryGrid) galleryGrid.innerHTML = "";
  if (galleryMarqueeTrack) galleryMarqueeTrack.innerHTML = "";
  if (galleryMarqueeTrackReverse) galleryMarqueeTrackReverse.innerHTML = "";
  if (galleryTitle) galleryTitle.textContent = "";
};

const openGallery = (galleryId) => {
  if (!galleryModal || !galleryGrid) return;
  const images = galleries[galleryId];
  if (!images || images.length === 0) return;
  if (galleryTitle) {
    galleryTitle.textContent = galleryTitles[galleryId] || galleryId.replace(/-/g, " ");
  }
  const rowConfig = galleryRows[galleryId];
  const marqueeImages = rowConfig ? rowConfig.top : [];
  const reverseImages = rowConfig ? rowConfig.bottom : [];
  if (!rowConfig) {
    images.forEach((src, index) => {
      if (index % 2 === 0) {
        marqueeImages.push(src);
      } else {
        reverseImages.push(src);
      }
    });
  }
  galleryGrid.innerHTML = "";
  if (galleryMarqueeTrack) {
    galleryMarqueeTrack.innerHTML = "";
    if (marqueeImages.length > 0) {
      const createGroup = () => {
        const group = document.createElement("div");
        group.className = "gallery-marquee-group";
        marqueeImages.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.loading = "lazy";
          group.appendChild(img);
        });
        return group;
      };
      galleryMarqueeTrack.appendChild(createGroup());
      galleryMarqueeTrack.appendChild(createGroup());
    }
  }
  if (galleryMarqueeTrackReverse) {
    galleryMarqueeTrackReverse.innerHTML = "";
    if (reverseImages.length > 0) {
      const createGroup = () => {
        const group = document.createElement("div");
        group.className = "gallery-marquee-group";
        reverseImages.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          img.loading = "lazy";
          group.appendChild(img);
        });
        return group;
      };
      galleryMarqueeTrackReverse.appendChild(createGroup());
      galleryMarqueeTrackReverse.appendChild(createGroup());
    }
  }
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
};

galleryButtons.forEach((button) => {
  button.addEventListener("mouseenter", playPlopSound);
  button.addEventListener("focus", playPlopSound);
  button.addEventListener("click", () => {
    if (ambientAudio) {
      const reducedVolume = Math.max(0, ambientAudio.volume * 0.6);
      ambientAudio.volume = reducedVolume;
      if (ambientVolume) ambientVolume.value = String(reducedVolume);
    }
    const galleryId = button.getAttribute("data-gallery");
    if (!galleryId) return;
    openGallery(galleryId);
  });
});

if (galleryModal) {
  galleryModal.addEventListener("click", closeGallery);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGallery();
  }
});

if (ambientAudio) {
  if (ambientVolume) {
    ambientAudio.volume = Number(ambientVolume.value);
    ambientVolume.addEventListener("input", () => {
      ambientAudio.volume = Number(ambientVolume.value);
    });
  }

  const tryPlay = () => {
    ambientAudio.volume = 0.21;
    ambientAudio.play().catch(() => {});
    ensurePlopAudioContext();
    document.removeEventListener("click", tryPlay);
    document.removeEventListener("touchstart", tryPlay);
  };

  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { once: true });
}
