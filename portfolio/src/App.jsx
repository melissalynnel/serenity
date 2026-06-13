import React, { useEffect, useRef, useState } from "react";

const sparkles = Array.from({ length: 48 }).map((_, i) => {
  const angle = i * 0.5;
  return {
    id: `sp-${i}`,
    x: Math.cos(angle) * (220 + (i % 6) * 90),
    y: Math.sin(angle) * (180 + (i % 5) * 100),
    size: 6 + (i % 5) * 2,
    delay: (i % 8) * 0.3,
  };
});

const bokeh = Array.from({ length: 16 }).map((_, i) => {
  const angle = i * 0.7;
  return {
    id: `bk-${i}`,
    x: Math.cos(angle) * (260 + (i % 4) * 180),
    y: Math.sin(angle) * (220 + (i % 3) * 200),
    size: 120 + (i % 6) * 40,
    delay: (i % 6) * 0.4,
  };
});

const quickLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/melissalynnel/",
    iconUrl: `${import.meta.env.BASE_URL}icons/instagram.svg`,
    whiteIcon: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/melissaleavenworth/",
    iconUrl: `${import.meta.env.BASE_URL}icons/linkedin.png`,
  },
  {
    label: "GitHub",
    href: "https://github.com/melissalynnel",
    iconUrl: `${import.meta.env.BASE_URL}icons/github.svg`,
    whiteIcon: true,
  },
];

const techGroups = [
  {
    label: "Ops + Project",
    items: [
      { name: "Airtable", logo: "airtable.png" },
      { name: "Asana", logo: "asana.png" },
      { name: "Notion", logo: "notion.png" },
      { name: "GitHub", logo: "github.png" },
      { name: "Discord", logo: "discord.png" },
      { name: "Codex", logo: "openai.png" },
      { name: "Claude", logo: "claude.svg" },
    ],
  },
  {
    label: "Marketing + Analytics",
    items: [
      { name: "Google Analytics", logo: "googleanalytics.png" },
      { name: "Google Suite", logo: "googleworkspace.png" },
      { name: "MailChimp", logo: "mailchimp.png" },
      { name: "Later.com", logo: "later.png" },
    ],
  },
  {
    label: "Creative",
    items: [
      { name: "Photoshop", logo: "adobephotoshop.svg" },
      { name: "Lightroom", logo: "adobelightroom.svg" },
      { name: "Illustrator", logo: "adobeillustrator.svg" },
      { name: "Premiere Pro", logo: "adobepremierepro.svg" },
      { name: "Canva", logo: "canva.png" },
      { name: "Capcut", logo: "capcut.png" },
      { name: "Figma", logo: "figma.svg" },
      { name: "Pixieset", logo: "pixieset.png" },
    ],
  },
  {
    label: "Social + Ads",
    items: [
      { name: "Facebook", logo: "facebook.png" },
      { name: "Instagram", logo: "instagram.png" },
      { name: "Meta Ads", logo: "meta.png" },
      { name: "X.com", logo: "x.png" },
      { name: "TikTok", logo: "tiktok.png" },
    ],
  },
  {
    label: "Web + Commerce",
    items: [
      { name: "Shopify", logo: "shopify.png" },
      { name: "Squarespace", logo: "squarespace.png" },
      { name: "Wix", logo: "wix.png" },
      { name: "WordPress", logo: "wordpress.png" },
      { name: "Amazon", logo: "amazon.png" },
      { name: "Salsify", logo: "salsify.png" },
    ],
  },
];

function TechStackContent() {
  return techGroups.map((group) => (
    <div key={group.label} className="tech-group">
      <h4>{group.label}</h4>
      <div className="tech-items">
        {group.items.map((item) => (
          <div key={item.name} className="tech-item">
            <img
              src={`${import.meta.env.BASE_URL}logos/${item.logo}`}
              alt={item.name}
              loading="lazy"
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showTechStack, setShowTechStack] = useState(false);
  const [hue, setHue] = useState(0);
  const boopAudioRef = useRef(null);
  const techStackRef = useRef(null);
  const techStackMobilePanelRef = useRef(null);
  const techStackOverlayPointerRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!showAbout && !showTechStack) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowAbout(false);
        setShowTechStack(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAbout, showTechStack]);

  useEffect(() => {
    if (!showTechStack) return undefined;
    const handleOutside = (event) => {
      if (event.target.closest?.(".tech-stack-mobile-overlay")) return;
      if (techStackRef.current?.contains(event.target)) return;
      if (techStackMobilePanelRef.current?.contains(event.target)) return;
      setShowTechStack(false);
    };
    window.addEventListener("pointerdown", handleOutside);
    return () => window.removeEventListener("pointerdown", handleOutside);
  }, [showTechStack]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      if (!touch) return;
      pointerRef.current = { x: touch.clientX, y: touch.clientY };
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationFrame;
    const positions = Array.from({ length: 12 }).map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const animate = () => {
      const { x, y } = pointerRef.current;
      positions[0].x += (x - positions[0].x) * 0.22;
      positions[0].y += (y - positions[0].y) * 0.22;

      for (let i = 1; i < positions.length; i += 1) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positions[0].x}px, ${positions[0].y}px)`;
      }

      trailRefs.current.forEach((el, index) => {
        if (!el) return;
        el.style.transform = `translate(${positions[index + 1].x}px, ${positions[index + 1].y}px)`;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const playBoop = () => {
    if (!boopAudioRef.current) return;
    const audio = boopAudioRef.current;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const playBoopOnInteractiveClick = (event) => {
    const target = event.target.closest("a, button, input, [role='link'], [tabindex]");
    if (!target) return;
    playBoop();
  };

  const handleTechStackOverlayPointerDown = (event) => {
    techStackOverlayPointerRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  const handleTechStackOverlayPointerUp = (event) => {
    const start = techStackOverlayPointerRef.current;
    techStackOverlayPointerRef.current = null;
    if (!start) return;

    const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (distance < 8) {
      setShowTechStack(false);
    }
  };

  return (
    <div
      className="scene"
      style={{ "--hue": `${hue}deg` }}
      onClick={playBoopOnInteractiveClick}
    >
      <div className="scene-filter">
        <div className="cursor-layer" aria-hidden="true">
          <div className="cursor-dot" ref={cursorRef} />
          {Array.from({ length: 11 }).map((_, index) => (
            <span
              key={`trail-${index}`}
              className="cursor-trail"
              ref={(el) => {
                trailRefs.current[index] = el;
              }}
            />
          ))}
        </div>
        <div className="backdrop" />
        <div className="bokeh-layer">
          {bokeh.map((orb) => (
            <div
              key={orb.id}
              className="bokeh"
              style={{
                "--x": `${orb.x}px`,
                "--y": `${orb.y}px`,
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="sparkle-layer">
          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="sparkle"
              style={{
                "--sx": `${sparkle.x}px`,
                "--sy": `${sparkle.y}px`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                animationDelay: `${sparkle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="map">
          <div className="node center">
            <p className="name">
              Melissa
              <span>Leavenworth</span>
            </p>
            <p className="sporkles">⋆₊⁺⋆ mimic the universe by creating ⋆⁺₊⋆</p>
            <div className="icon-list">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  className="icon-button"
                  data-label={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <img
                    className={`icon-img ${link.whiteIcon ? "icon-img-white" : ""}`}
                    src={link.iconUrl}
                    alt=""
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="center-actions-widget">
          <button
            className="center-action-button action-about"
            type="button"
            onClick={() => setShowAbout(true)}
          >
            about
          </button>
          <a
            className="center-action-button action-designs"
            href="https://levity.ltd/work/"
            target="_blank"
            rel="noreferrer"
          >
            See My Designs ➚
          </a>
          <a
            className="center-action-button action-resume resume-download-btn"
            href={`${import.meta.env.BASE_URL}Melissa-Leavenworth_Resume.pdf`}
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
          >
            Resumé
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v10" />
              <path d="M8 10l4 4 4-4" />
              <path d="M6 20h12" />
            </svg>
          </a>
        </div>

        <div className="utility-widgets">
          <div className={`tech-stack-widget${showTechStack ? " is-open" : ""}`} ref={techStackRef}>
            <button
              className="tech-stack-toggle"
              type="button"
              aria-expanded={showTechStack}
              onClick={() => setShowTechStack((prev) => !prev)}
            >
              <span className="widget-label tech-stack-label">tech stack</span>
            </button>
            <div className="tech-stack-panel" aria-hidden={!showTechStack}>
              <TechStackContent />
            </div>
          </div>
        </div>

        <div className="spotify-player" aria-label="Music player">
          <iframe
            title="Spotify player"
            style={{ borderRadius: "16px" }}
            src="https://open.spotify.com/embed/track/33h97Kej5P7Y8ub0S30Aj9?utm_source=generator"
            width="280"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
          />
        </div>

        <audio
          ref={boopAudioRef}
          src={`${import.meta.env.BASE_URL}bubble.wav`}
          preload="auto"
        />

        {showAbout && (
          <div
            className="resume-overlay about-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="About"
            onPointerDown={() => setShowAbout(false)}
          >
            <div className="resume-card about-card" onPointerDown={(event) => event.stopPropagation()}>
              <button
                className="resume-close"
                aria-label="Close about"
                onClick={() => setShowAbout(false)}
              >
                ✕
              </button>
              <div className="resume-header">
                <div>
                  <h2>about</h2>
                </div>
              </div>
               
              <p>
                Melissa Leavenworth is a San Francisco-based founder, product strategist, and designer who works across brand, digital marketing, and UX. She leads her own design agency, taking projects from early-stage brand building through product design and UI.
              </p>
              <p>
                She has built digital marketing programs for live entertainment and retail brands, developed grant-funded civic tech projects, supported local progressive political campaigns, and is deeply embedded in SF startup and AI-forward culture. She believes the best products are designed with care for the people who actually use them, and that the internet should be fun.
              </p>
              <p>
                Outside of client work, Melissa volunteers with organizations like SFMCC and Glide Church, supporting her community through technology and hands-on service. When she is not at her desk, she is probably making something by hand.
              </p> 
              <p>
                🌙 Core Values: integrity • humor • honesty
              </p> 
            </div>
          </div>
        )}

        <div className="hue-control" aria-label="Hue slider">
          <span>hue</span>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(event) => setHue(Number(event.target.value))}
            aria-label="Hue"
          />
        </div>

      </div>
      {showTechStack && (
        <div
          className="tech-stack-mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Tech stack"
          onPointerDownCapture={handleTechStackOverlayPointerDown}
          onPointerUpCapture={handleTechStackOverlayPointerUp}
        >
          <div
            className="tech-stack-mobile-panel"
            ref={techStackMobilePanelRef}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <TechStackContent />
          </div>
        </div>
      )}
    </div>
  );
}
