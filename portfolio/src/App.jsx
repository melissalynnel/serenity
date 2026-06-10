import React, { useEffect, useRef, useState } from "react";

const nodes = [];

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

export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
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
    if (!showAbout && !showMarketing && !showTechStack) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowAbout(false);
        setShowMarketing(false);
        setShowTechStack(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAbout, showMarketing, showTechStack]);

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

  const playBoopOnInteractiveHover = (event) => {
    const target = event.target.closest("a, button, input, [role='link'], [tabindex]");
    if (!target) return;
    if (event.relatedTarget && target.contains(event.relatedTarget)) return;
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
      onPointerOver={playBoopOnInteractiveHover}
      onFocus={playBoopOnInteractiveHover}
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

        <div
          className="map"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
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

          {nodes.map((node) => (
            <div
              key={node.id}
              className={`node node-${node.id} ${node.centered ? "node-centered" : ""}`}
              style={{
                transform: node.centered
                  ? `translate(${node.x}px, ${node.y}px) translate(-50%, 0)`
                  : `translate(${node.x}px, ${node.y}px)`,
              }}
              onClick={() => {
                if (node.link) window.open(node.link, "_blank", "noreferrer");
              }}
              role={node.link ? "link" : undefined}
              tabIndex={node.link ? 0 : undefined}
              onKeyDown={(event) => {
                if (!node.link) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  window.open(node.link, "_blank", "noreferrer");
                }
              }}
            >
              <p className="node-title">{node.title}</p>
              {node.subtitle && <p className="node-subtitle">{node.subtitle}</p>}
              {node.items.length > 0 && (
                <div className="icon-list">
                  {node.items.map((item) =>
                    item.modal ? (
                      <button
                        key={item.label ?? item}
                        className="icon-button"
                        data-label={item.label ?? item}
                        type="button"
                        onClick={() => {
                          if (item.modal === "marketing") setShowMarketing(true);
                        }}
                      >
                        {item.iconUrl ? (
                          <img
                            className="icon-img"
                            src={item.iconUrl}
                            alt=""
                            aria-hidden="true"
                          />
                        ) : (
                          <span aria-hidden="true">✦</span>
                        )}
                      </button>
                    ) : (
                      <a
                        key={item.label ?? item}
                        className="icon-button"
                        data-label={item.label ?? item}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label ?? "Link"}
                      >
                        {item.iconUrl ? (
                          <img
                            className="icon-img"
                            src={item.iconUrl}
                            alt=""
                            aria-hidden="true"
                          />
                        ) : (
                          <span aria-hidden="true">✦</span>
                        )}
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
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
              {techGroups.map((group) => (
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
              ))}
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

        {showMarketing && (
          <div
            className="resume-overlay"
            role="dialog"
            aria-modal="true"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="resume-card marketing-card" onPointerDown={(event) => event.stopPropagation()}>
              <button
                className="resume-close"
                aria-label="Close marketing operations"
                onClick={() => setShowMarketing(false)}
              >
                ✕
              </button>
              <div className="resume-header">
                <div>
                  <h2>Marketing Operations</h2>
                  <p>Live.Laugh.Colorado. workflow systems</p>
                </div>
                <span className="resume-download">Case Study</span>
              </div>
              <div className="marketing-content">
              <div className="marketing-columns">
                <section>
                  <h3>Challenge</h3>
                  <p>
                    The company was scaling to nearly <strong>$100M in annual revenue</strong> across three
                    markets, but marketing systems were fragmented and reliant on manual workflows, making
                    cross-team coordination and performance tracking inconsistent.
                  </p>
                </section>
                <section>
                  <h3>Strategy</h3>
                  <p>
                    Built and managed Asana-based operational systems with standardized campaign templates,
                    automated workflows, and shared dashboards to unify design, content, and operations.
                    Partnered with leadership to establish GTM processes and KPI tracking that enabled scalable,
                    repeatable execution across all markets.
                  </p>
                </section>
                <section>
                  <h3>Impact</h3>
                  <p>
                    Streamlined campaign delivery cycles, improving turnaround speed by <strong>66%</strong> and
                    campaign throughput by <strong>100%</strong>. Provided real-time visibility into performance
                    metrics, supporting a <strong>30% increase</strong> in engagement and inbound leads and
                    aligning marketing operations with ~$100M in annual sales volume.
                  </p>
                </section>
              </div>

              <section>
                <h3>Overarching Marketing Projects</h3>
                <p>
                  The overarching marketing table is considered the “home” and includes projects that span
                  over Listing and Brand Marketing.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-01.png" alt="Overarching marketing overview" />
                  <img src="/marketing/marketing-02.png" alt="Deliverables tracking overview" />
                </div>
              </section>

              <section>
                <h3>Recurring Tasks</h3>
                <p>
                  Ongoing process projects for continuous work (weekly posts, production updates) with
                  automations assigning recurring deadlines.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-06.png" alt="Recurring tasks overview" />
                  <img src="/marketing/marketing-18.png" alt="Retention automation overview" />
                </div>
              </section>

              <section>
                <h3>Marketing Funnels</h3>
                <p>
                  Agents submit requests via Asana forms, triggering the first set of tasks for listing
                  marketing workflows across multiple brokerages.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-03.png" alt="Marketing request form" />
                  <img src="/marketing/marketing-04.png" alt="Marketing request form detail" />
                </div>
              </section>

              <section>
                <h3>Listing Marketing</h3>
                <p>
                  Deadline-driven projects with a clear end date. Each listing moves through the board and
                  gains tasks based on status and deliverables.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-09.png" alt="Listing marketing board" />
                  <img src="/marketing/marketing-10.png" alt="Listing marketing board detail" />
                  <img src="/marketing/marketing-17.png" alt="Listing marketing status detail" />
                  <img src="/marketing/marketing-08.png" alt="Listing marketing task detail" />
                </div>
              </section>

              <section>
                <h3>Workflow Automations</h3>
                <p>
                  Automations move listings through stages, handle relists, and enforce dependencies so work
                  is approved by appropriate parties.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-11.png" alt="Workflow automation board" />
                  <img src="/marketing/marketing-12.png" alt="Workflow automation board detail" />
                  <img src="/marketing/marketing-13.png" alt="Workflow automation rules" />
                </div>
              </section>

              <section>
                <h3>Experimentation</h3>
                <p>
                  A simplified board to capture and ship fast-paced experiments and ideas.
                </p>
                <div className="marketing-grid">
                  <img src="/marketing/marketing-05.png" alt="Experimentation board" />
                </div>
              </section>
              </div>
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
            {techGroups.map((group) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
