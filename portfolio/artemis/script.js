const stars = document.getElementById("stars");
if (stars) {
  const starCount = 180;
  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.setProperty("--x", `${Math.random() * 100}%`);
    star.style.setProperty("--y", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${1 + Math.random() * 2.2}px`);
    star.style.setProperty("--twinkle", `${2 + Math.random() * 4}s`);
    star.style.setProperty("--delay", `${Math.random() * 4}s`);
    stars.appendChild(star);
  }
}

const cursorDot = document.querySelector(".cursor-dot");
const cursorTrails = Array.from(document.querySelectorAll(".cursor-trail"));
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

const handlePointerMove = (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
};

const handleTouchMove = (event) => {
  const touch = event.touches?.[0];
  if (!touch) return;
  pointer.x = touch.clientX;
  pointer.y = touch.clientY;
};

window.addEventListener("pointermove", handlePointerMove);
window.addEventListener("touchstart", handleTouchMove, { passive: true });
window.addEventListener("touchmove", handleTouchMove, { passive: true });

const positions = Array.from({ length: cursorTrails.length + 1 }).map(() => ({
  x: pointer.x,
  y: pointer.y,
}));

const animate = () => {
  positions[0].x += (pointer.x - positions[0].x) * 0.22;
  positions[0].y += (pointer.y - positions[0].y) * 0.22;

  for (let i = 1; i < positions.length; i += 1) {
    positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2;
    positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2;
  }

  if (cursorDot) {
    cursorDot.style.transform = `translate(${positions[0].x}px, ${positions[0].y}px)`;
  }

  cursorTrails.forEach((el, index) => {
    el.style.transform = `translate(${positions[index + 1].x}px, ${positions[index + 1].y}px)`;
  });

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const orbit = document.querySelector(".orbit");
const iconNodes = Array.from(document.querySelectorAll(".icon-node"));
let orbitRotation = 0;
let anchorFrame = null;

const updateOrbit = () => {
  if (!orbit) return;
  const root = document.documentElement;
  root.style.setProperty("--orbit-rotation", `${orbitRotation}deg`);
  root.style.setProperty("--orbit-rotation-neg", `${-orbitRotation}deg`);
  scheduleAnchorUpdate();
};

const updateTooltipAnchors = () => {
  if (!orbit) return;
  const orbitRect = orbit.getBoundingClientRect();
  const centerX = orbitRect.left + orbitRect.width / 2;
  iconNodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const nodeCenterX = rect.left + rect.width / 2;
    const isRightSide = nodeCenterX > centerX + 4;
    node.classList.toggle("tooltip-right", isRightSide);
    node.classList.toggle("tooltip-left", !isRightSide);
  });
};

const scheduleAnchorUpdate = () => {
  if (anchorFrame) return;
  anchorFrame = requestAnimationFrame(() => {
    anchorFrame = null;
    updateTooltipAnchors();
  });
};

const placeNodes = () => {
  if (!orbit || iconNodes.length === 0) return;
  const radius = orbit.clientWidth / 2.1;
  const centerX = orbit.clientWidth / 2;
  const centerY = orbit.clientHeight / 2;
  const step = (Math.PI * 2) / iconNodes.length;

  iconNodes.forEach((node, index) => {
    const angle = -Math.PI / 2 + index * step;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = "translate(-50%, -50%)";
  });
  scheduleAnchorUpdate();
};

let isHoveringTechPanel = false;

const handleWheel = (event) => {
  if (isHoveringTechPanel) return;
  event.preventDefault();
  const delta = event.deltaX - event.deltaY;
  if (delta === 0) return;
  orbitRotation += delta * 0.08;
  updateOrbit();
};

window.addEventListener("wheel", handleWheel, { passive: false });
window.addEventListener("resize", () => {
  placeNodes();
  updateOrbit();
});

placeNodes();
updateOrbit();

const viewData = {
  area: [
    {
      label: "Creative",
      tip: "• Narrative + content strategy (14M+ views)\n• Joe Rogan Experience placement\n• Edited white papers + product content",
    },
    {
      label: "Marketing",
      tip: "• Built GTM systems for early-stage founders\n• Playbooks improved outreach by 66%\n• Standardized GTM across $100M+ pipeline",
    },
    {
      label: "Sales",
      tip: "• Cross-functional execution (20+ projects)\n• Coordinated launch ops (product, eng, PR)\n• Doubled campaign delivery speed",
    },
    {
      label: "Revenue",
      tip: "• Supported $9M fundraise (Primitive)\n• Contributed to 1.7M TVL\n• Enabled $100M+ annual revenue pipeline",
    },
    {
      label: "Ops",
      tip: "• Automated workflows cut coordination 35%\n• Asana system cut turnaround 66%\n• Ops efficiency up 78%",
    },
    {
      label: "Story",
      tip: "• Newsletters at 75%+ open rates\n• Investor-ready decks + scripts\n• Media visibility up 100%",
    },
    {
      label: "Insight",
      tip: "• Audience segmentation + positioning\n• Customer discovery (Venture programs)\n• Alignment across design/eng/sales",
    },
    {
      label: "Systems",
      tip: "• Asset-sorting scripts cut filing 90%\n• GTM ops systems built end-to-end\n• Playbooks streamlined execution",
    },
  ],
  role: [
    {
      label: "Colorado State University\n2014–2018",
      tip: "Colorado State University\n2014–2018\nFort Collins, CO\n• B.A. Journalism & Media Communication\n• B.S. Psychology",
    },
    {
      label: "Venture Programs\n2017–2018",
      tip: "Venture programs\n2017–2018\nCSU\n• Venture Accelerator\n• Venture Validator\n• Customer discovery + early GTM validation",
    },
    {
      label: "Editorial\n2015–2018",
      tip: "Rocky Mountain Collegian + CSU Student Media\n2015–2018\n• Editor coordinating multi-writer coverage\n• Enforced AP Style + deadline rigor",
    },
    {
      label: "Content & Product Operations Coordinator\n2019–2021",
      tip: "Content & Product Operations Coordinator\nOct 2019–Dec 2021\nFort Collins, CO\n• Built workflow automations boosting efficiency by 78%\n• Developed asset-sorting scripts cutting filing time by 90%\n• Streamlined product rollout workflows with sales/design",
    },
    {
      label: "Head of Communications\n2022",
      tip: "Head of Communications\nMay 2022–Dec 2022\nRemote\n• Shaped GTM storytelling supporting a $9M fundraise\n• Increased media visibility by 100%\n• Coordinated launch ops contributing to 1.7M TVL",
    },
    {
      label: "Founder & GTM Consultant\n2023–Now",
      tip: "Founder & GTM Consultant\nJan 2023–Present\nDenver, CO\n• Built GTM + operational systems for early-stage founders\n• Playbooks improved outreach efficiency by 66%\n• Reduced manual coordination by 35% across workflows",
    },
    {
      label: "Marketing & Content Operations Lead\n2024–2025",
      tip: "Marketing & Content Operations Lead\nSep 2024–Dec 2025\nDenver, CO\n• Standardized GTM processes across a $100M+ pipeline\n• Cross-functional initiatives doubled campaign delivery speed\n• Built Asana systems cutting turnaround time by 66% (3 markets)",
    },
    {
      label: "Certifications\n2025–2026",
      tip: "Certifications\nDec 2025 & Jan 2026\n• Notion Certified Admin (Jan 2026)\n• Essentials, Workflows, Advanced (Dec 2025)",
    },
  ],
};

const toggleButtons = Array.from(document.querySelectorAll(".toggle-btn"));

const applyView = (viewKey) => {
  const data = viewData[viewKey];
  if (!data) return;
  iconNodes.forEach((node, index) => {
    const entry = data[index % data.length];
    const label = node.querySelector(".icon-label");
    if (label) label.textContent = entry.label;
    node.setAttribute("data-tip", entry.tip);
  });
};

const setActiveToggle = (viewKey) => {
  toggleButtons.forEach((btn) => {
    const isActive = btn.dataset.view === viewKey;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  applyView(viewKey);
};

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    setActiveToggle(view);
  });
});

setActiveToggle("area");

const techPanel = document.querySelector(".tech-panel");
const techToggle = document.querySelector(".tech-toggle");
const techGrid = document.querySelector(".tech-grid");
const projectsPanel = document.querySelector(".projects-panel");
const projectsToggle = document.querySelector(".projects-toggle");
const projectsGrid = document.querySelector(".projects-grid");

if (techPanel && techToggle) {
  techToggle.addEventListener("click", () => {
    const isOpen = techPanel.classList.toggle("is-open");
    techPanel.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (techGrid) {
      techGrid.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }
  });

  techPanel.addEventListener("mouseenter", () => {
    isHoveringTechPanel = true;
    techPanel.classList.add("is-hovering");
  });

  techPanel.addEventListener("mouseleave", () => {
    isHoveringTechPanel = false;
    techPanel.classList.remove("is-hovering");
  });
}

if (projectsPanel && projectsToggle) {
  projectsToggle.addEventListener("click", () => {
    const isOpen = projectsPanel.classList.toggle("is-open");
    projectsPanel.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (projectsGrid) {
      projectsGrid.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }
  });
}

const techLogos = Array.from(document.querySelectorAll(".tech-item img"));

const makeInitials = (text) => {
  if (!text) return "★";
  const cleaned = text.replace(/logo/i, "").trim();
  if (cleaned.includes("+")) {
    const parts = cleaned.split("+").map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0] || ""}+${parts[1][0] || ""}`.toUpperCase();
    }
  }
  const ignore = new Set(["and", "of", "the", "suite", "business", "ads", "pro", "com"]);
  const words = cleaned.replace(/[^a-z0-9 ]/gi, " ").trim().split(/\s+/);
  const filtered = words.filter((word) => word && !ignore.has(word.toLowerCase()));
  const target = filtered.length ? filtered : words;
  if (target.length === 0) return "★";
  if (target.length === 1) return target[0].slice(0, 2).toUpperCase();
  return `${target[0][0]}${target[1][0]}`.toUpperCase();
};

const createFallbackSvg = (label) => {
  const initials = makeInitials(label);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff8bd7"/>
      <stop offset="100%" stop-color="#7b6dff"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="\"Avenir Next\", \"Helvetica Neue\", Arial, sans-serif" font-size="22" fill="white" letter-spacing="1">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

techLogos.forEach((logo) => {
  logo.referrerPolicy = "no-referrer";
  const label =
    logo.alt ||
    logo.closest(".tech-item")?.querySelector("span")?.textContent ||
    "";
  const handleError = () => {
    if (logo.dataset.fallbackApplied) return;
    logo.dataset.fallbackApplied = "true";
    logo.src = createFallbackSvg(label);
  };
  logo.addEventListener("error", handleError);
});
