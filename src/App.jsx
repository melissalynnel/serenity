import React, { useEffect, useRef, useState } from "react";

const nodes = [
  {
    id: "resume",
    title: "Resume",
    x: 0,
    y: -300,
    centered: true,
    items: [],
  },
  {
    id: "pro",
    title: "Professional Portfolio",
    subtitle: "Operations + Systems",
    x: -450,
    y: 50,
    items: [
      {
        label: "Agentic workflows",
        iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/robot-2.png",
      },
      {
        label: "Marketing operations",
        iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/megaphone.png",
      },
      {
        label: "Content systems",
        iconUrl:
          "https://material-icons.github.io/material-icons-png/png/white/folder/baseline-2x.png",
      },
    ],
  },
  {
    id: "art",
    title: "Artistic Expressions",
    subtitle: "Creative explorations",
    x: 200,
    y: 50,
    items: [
      {
        label: "Photography",
        iconUrl:
          "https://material-icons.github.io/material-icons-png/png/white/photo_camera/baseline-2x.png",
      },
      {
        label: "Websites",
        iconUrl:
          "https://material-icons.github.io/material-icons-png/png/white/language/baseline-2x.png",
      },
      {
        label: "Jewelry",
        iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/diamond.png",
      },
    ],
  },
];

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

export default function App() {
  const draggingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [weatherString, setWeatherString] = useState("SF • --°F");
  const [roulettePick, setRoulettePick] = useState("Tap to pick");
  const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
  const [rouletteBurst, setRouletteBurst] = useState(false);
  const rouletteTimerRef = useRef(null);
  const rouletteAudioRef = useRef(null);

  const rouletteOptions = [
    "make a bracelet",
    "sew something",
    "do a puzzle",
    "go for a run",
    "write a journal entry",
    "do a jig",
    "sing a song",
    "take a walk",
    "snap some pics",
    "stretch a little",
  ];

  useEffect(() => {
    if (!showResume && !showSocial) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowResume(false);
        setShowSocial(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResume, showSocial]);

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
      });
      setTimeString(formatter.format(new Date()));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const spinRoulette = () => {
    if (isRouletteSpinning) return;
    setIsRouletteSpinning(true);
    setRouletteBurst(false);
    let index = 0;
    rouletteTimerRef.current = setInterval(() => {
      setRoulettePick(rouletteOptions[index % rouletteOptions.length]);
      index += 1;
    }, 90);

    setTimeout(() => {
      if (rouletteTimerRef.current) {
        clearInterval(rouletteTimerRef.current);
      }
      const pick =
        rouletteOptions[Math.floor(Math.random() * rouletteOptions.length)];
      setRoulettePick(pick);
      setIsRouletteSpinning(false);
      setRouletteBurst(true);
      if (rouletteAudioRef.current) {
        rouletteAudioRef.current.currentTime = 0;
        rouletteAudioRef.current.play().catch(() => {});
      }
      setTimeout(() => setRouletteBurst(false), 900);
    }, 1200);
  };

  useEffect(() => {
    const weatherCodeToText = (code) => {
      const map = {
        0: "Clear",
        1: "Mostly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",
        71: "Light snow",
        73: "Snow",
        75: "Heavy snow",
        80: "Light showers",
        81: "Showers",
        82: "Heavy showers",
        95: "Thunderstorm",
      };
      return map[code] ?? "Weather";
    };

    const fetchWeather = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles";
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather request failed");
        const data = await response.json();
        const current = data?.current_weather;
        if (!current) throw new Error("Weather unavailable");
        const temp = Math.round(current.temperature);
        const label = weatherCodeToText(current.weathercode);
        setWeatherString(`SF • ${temp}°F • ${label}`);
      } catch (error) {
        setWeatherString("SF • Weather unavailable");
      }
    };

    fetchWeather();
    const timer = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePointerDown = (event) => {
    if (showResume || showSocial) return;
    if (
      event.target.closest(".node") ||
      event.target.closest(".spotify-player") ||
      event.target.closest(".roulette-widget") ||
      event.target.closest(".utility-widgets")
    ) {
      return;
    }
    draggingRef.current = true;
    setIsDragging(true);
    lastRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const dx = event.clientX - lastRef.current.x;
    const dy = event.clientY - lastRef.current.y;
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastRef.current = { x: event.clientX, y: event.clientY };
  };

  const endDrag = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };


  return (
    <div
      className={`scene ${isDragging ? "dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
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
          transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        <div className="node center" onClick={() => setShowSocial(true)}>
          <p className="name">Melissa Leavenworth</p>
          <p className="sporkles">⋆⁺₊⋆ 𖤓 ⋆⁺₊⋆</p> 
          <p className="tagline">mimic the universe by creating</p>
        </div>

        {nodes.map((node) => (
          <div
            key={node.id}
            className={`node ${node.centered ? "node-centered" : ""}`}
            style={{
              transform: node.centered
                ? `translate(${node.x}px, ${node.y}px) translate(-50%, 0)`
                : `translate(${node.x}px, ${node.y}px)`,
            }}
            onClick={() => {
              if (node.id === "resume") setShowResume(true);
            }}
          >
            <p className="node-title">{node.title}</p>
            {node.subtitle && <p className="node-subtitle">{node.subtitle}</p>}
            {node.items.length > 0 && (
              <div className="icon-list">
                {node.items.map((item) => (
                  <button
                    key={item.label ?? item}
                    className="icon-button"
                    data-label={item.label ?? item}
                    type="button"
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
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="utility-widgets">
        <div className="glass-widget">
          <span className="widget-label">Bay Area Time</span>
          <span className="widget-value">{timeString || "—:—"}</span>
        </div>
        <div className="glass-widget">
          <span className="widget-label">Bay Area Weather</span>
          <span className="widget-value">{weatherString}</span>
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
          loading="lazy"
        />
      </div>

      <button className="roulette-widget" onClick={spinRoulette} type="button">
        <span className="widget-label">adhd roulette</span>
        <div
          className={`roulette-result ${rouletteBurst ? "burst" : ""}`}
          aria-live="polite"
        >
          {roulettePick}
        </div>
      </button>
      <audio ref={rouletteAudioRef} src="/fairy-sparkle.mp3" preload="auto" />

      {showResume && (
        <div
          className="resume-overlay"
          role="dialog"
          aria-modal="true"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="resume-card" onPointerDown={(event) => event.stopPropagation()}>
            <button
              className="resume-close"
              aria-label="Close resume"
              onClick={() => setShowResume(false)}
            >
              ✕
            </button>
            <div className="resume-header">
              <div>
                <h2>MELISSA LEAVENWORTH</h2>
                <p>San Francisco, CA • 720-585-5238 • mlleavenworth@gmail.com</p>
              </div>
              <a className="resume-download" href="/resume.pdf" download>
                Download PDF
              </a>
            </div>

            <section>
              <h3>Relevant Experience</h3>
              <div className="resume-item">
                <div className="resume-role">
                  <span>Founder &amp; GTM Consultant</span>
                  <span>Levity Ltd.</span>
                </div>
                <div className="resume-meta">Jan 2023 - Present • Denver, CO</div>
                <ul>
                  <li>
                    Built GTM and operational systems for early-stage founders, reducing execution friction
                    and clarifying priorities across marketing, product, and operations.
                  </li>
                  <li>
                    Designed playbooks and automated workflows that improved outreach efficiency by 66% and
                    reduced manual coordination by 35%.
                  </li>
                  <li>
                    Directed cross-functional execution across 20+ projects, delivering faster GTM readiness
                    and systematized operations.
                  </li>
                  <li>
                    Produced and optimized newsletters achieving 75%+ open rates through improved positioning
                    and audience segmentation.
                  </li>
                  <li>
                    Led narrative and content strategy driving 14M+ combined views, including placement on
                    The Joe Rogan Experience.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="resume-role">
                  <span>Marketing &amp; Content Operations Lead</span>
                  <span>Live.Laugh.Colorado. Real Estate Group</span>
                </div>
                <div className="resume-meta">Sep 2024 – Dec 2025 • Denver, CO</div>
                <ul>
                  <li>
                    Standardized GTM processes, enabling consistent brand execution and measurable ROI across
                    a $100M+ annual revenue pipeline.
                  </li>
                  <li>
                    Led cross-functional initiatives connecting design, content, and operations, improving
                    campaign delivery speed by 100%.
                  </li>
                  <li>
                    Built Asana-based operational systems streamlining listing workflows, reducing turnaround
                    time by 66% across teams in 3 markets.
                  </li>
                  <li>
                    Overhauled digital listing content and distribution, increasing engagement by 30% and
                    strengthening referral pipelines.
                  </li>
                  <li>
                    Produced and optimized newsletters consistently achieving 75%+ open rates through improved
                    positioning and targeting.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="resume-role">
                  <span>Head of Communications</span>
                  <span>Primitive</span>
                </div>
                <div className="resume-meta">May 2022 – Dec 2022 • Remote</div>
                <ul>
                  <li>
                    Shaped GTM storytelling and external communications for an AMM-based fintech product
                    supporting a $9M fundraise.
                  </li>
                  <li>Increased media visibility by 100% through targeted outreach and narrative positioning.</li>
                  <li>
                    Coordinated launch operations across product, engineering, and PR teams, contributing to
                    1.7M TVL.
                  </li>
                  <li>
                    Translated complex blockchain mechanics into investor-ready decks, scripts, and documentation.
                  </li>
                  <li>
                    Edited white papers, technical documentation, and product content for accuracy, clarity,
                    and narrative cohesion.
                  </li>
                  <li>
                    Coordinated closely with founders, engineering, and business development to align storytelling
                    with product strategy and launch goals.
                  </li>
                </ul>
              </div>

              <div className="resume-item">
                <div className="resume-role">
                  <span>Content &amp; Product Operations Coordinator</span>
                  <span>Learning Advantage, Inc.</span>
                </div>
                <div className="resume-meta">Oct 2019 – Dec 2021 • Fort Collins, CO</div>
                <ul>
                  <li>
                    Built workflow automations integrating photography, editing, and publishing pipelines,
                    increasing operational efficiency by 78%.
                  </li>
                  <li>Developed automated asset-sorting scripts, reducing manual filing time by 90%.</li>
                  <li>Partnered with sales/design teams to streamline product rollout workflows.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3>Education</h3>
              <p>
                Colorado State University • Fort Collins, CO
                <br />
                B.A. Journalism &amp; Media Communication &amp; B.S. Psychology
              </p>
              <p>
                Completed Venture Accelerator &amp; Venture Validator programs focused on customer discovery
                and early GTM validation.
              </p>
              <p>
                Editor at Rocky Mountain Collegian &amp; CSU Student Media, coordinating multi-writer coverage
                and enforcing AP Style while building strong deadline discipline and operational foundations.
              </p>
            </section>

            <section>
              <h3>Certifications</h3>
              <ul>
                <li>Notion Certified Admin • Jan 2026</li>
                <li>Notion Academy Essentials • Workflows • Advanced • Dec 2025</li>
              </ul>
            </section>
          </div>
        </div>
      )}

      {showSocial && (
        <div className="resume-overlay" role="dialog" aria-modal="true">
          <div className="resume-card social-card" onPointerDown={(event) => event.stopPropagation()}>
            <button
              className="resume-close"
              aria-label="Close socials"
              onClick={() => setShowSocial(false)}
            >
              ✕
            </button>
            <div className="social-header">
              <h3>Connect</h3>
              <p>Follow or reach out on any platform.</p>
            </div>
            <div className="social-links">
              <a
                className="social-link"
                href="https://www.instagram.com/melissalynnel/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img
                  className="social-icon-img"
                  src="https://cdn.simpleicons.org/instagram/fff"
                  alt=""
                  aria-hidden="true"
                />
              </a>
              <a
                className="social-link"
                href="https://www.linkedin.com/in/melissaleavenworth/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img
                  className="social-icon-img"
                  src="https://logo.svgcdn.com/bxl/linkedin-square-dark.png"
                  alt=""
                  aria-hidden="true"
                />
              </a>
              <a
                className="social-link"
                href="https://github.com/melissalynnel"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <img
                  className="social-icon-img"
                  src="https://cdn.simpleicons.org/github/fff"
                  alt=""
                  aria-hidden="true"
                />
              </a>
            </div>
            <div className="social-details">
              <span>mlleavenworth@gmail.com</span>
              <span>720-585-5238</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
