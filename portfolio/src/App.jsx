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
    label: "Professional",
    href: "./artemis/",
    iconUrl: `${import.meta.env.BASE_URL}icons/briefcase.svg`,
  },
  {
    label: "Wimbly",
    href: "https://melissalynnel.github.io/wimbly-biscuit-co/",
    iconUrl: `${import.meta.env.BASE_URL}icons/globe.svg`,
  },
  {
    label: "Artistic",
    href: "./luna/",
    iconUrl: `${import.meta.env.BASE_URL}icons/palette.svg`,
  },
];

const blogArticles = [
  {
    id: "on-arrival",
    title: "on arrival",
    dateLabel: "January 11th, 2026, 7:09am",
    cardDateLabel: "January 2026",
    body: [
      "I am in a perpetual, deep state of gratitude.",
      "Moving to San Francisco feels like one of the best things I have ever done for myself, despite the fact that my condo remains unrented back in Colorado and the impending doom of nearly $4.6k in monthly living expenses will hit on the first next month. Oh, and I still haven't found a job.",
      "There is something extreme motivating behind being on the edge of running your bank account dry. I have been living the healthiest I have in my life, strictly out of necessity. Did you know that Trader Joe's standardizes pricing across the country, so groceries are actually not too bad if you stick to them? It's eating out and apparently gas (my car has been parked in two hour parking for nine days, I am not even sure where to get gas in this city) that break the bank.",
      "Somewhere in between pondering the sale of my 2023 Subaru Crosstrek or renting it on Turo for \"extra income\" (after it covers the $700 in insurance and parking expenses?? it's already paid off 💀), I daydream about buying a Vespa and living my Lizzie McGuire life. The only thing is, I probably have rampant ADHD that I refuse a diagnosis for, and I never took the lien letter from the bank to the DMV. So I don't even have the title to my car, therefore cannot register it, drive it on Turo, or sell it - oh and my registration expired in January (2025). Don't worry, I called the bank and I am solving this lmao.",
      "When I leave my cute ass apartment each day, I pop out right next to a cute ass pizza shop. I live in the heart of San Francisco, Union Square. There are beautiful scenic views down every street and I am consistently captivated by the way the sunlight filters through the clouds to produce a constant golden hour effect. It's a photographer's paradise. I deeply appreciate the Victorian architecture of row homes, painted colorfully and adorned in fire escapes. I am in perpetual awe.",
      "I average walking/running about six miles a day here. My heart doesn't hurt when I run like it did in Colorado. While I traverse this beautiful city, I think a lot about who I am and the person I am becoming. I believe that with perseverance, devotion, and tenacity, everything will \"fall\" into place. I feel extremely hopeful for my trajectory and I genuinely savor that this is a special time, in my special little expensive as fuck apartment in the most stunning city I have ever lived in.",
      "Thank you for having me, San Francisco. I love you so much already.",
      "Best,\nMelissa",
    ],
  },
];

export default function App() {
  const [showSocial, setShowSocial] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);
  const [showBlogList, setShowBlogList] = useState(false);
  const [activeBlogArticle, setActiveBlogArticle] = useState(null);
  const [timeString, setTimeString] = useState("");
  const [weatherTemp, setWeatherTemp] = useState("--°F");
  const [weatherCondition, setWeatherCondition] = useState("Weather");
  const [roulettePick, setRoulettePick] = useState("Tap to pick");
  const [isRouletteSpinning, setIsRouletteSpinning] = useState(false);
  const [rouletteBurst, setRouletteBurst] = useState(false);
  const [hue, setHue] = useState(0);
  const rouletteTimerRef = useRef(null);
  const rouletteTimeoutRef = useRef(null);
  const rouletteAudioRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });

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
    if (!showSocial && !showMarketing && !showBlogList && !activeBlogArticle) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSocial(false);
        setShowMarketing(false);
        setShowBlogList(false);
        setActiveBlogArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSocial, showMarketing, showBlogList, activeBlogArticle]);

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

  const prepareAudio = () => {
    if (!rouletteAudioRef.current) return;
    const audio = rouletteAudioRef.current;
    audio.load();
    audio.currentTime = 0;
  };

  const spinRoulette = () => {
    if (isRouletteSpinning) return;
    prepareAudio();
    if (rouletteTimerRef.current) {
      clearInterval(rouletteTimerRef.current);
    }
    if (rouletteTimeoutRef.current) {
      clearTimeout(rouletteTimeoutRef.current);
    }
    setIsRouletteSpinning(true);
    setRouletteBurst(false);
    let index = 0;
    rouletteTimerRef.current = setInterval(() => {
      setRoulettePick(rouletteOptions[index % rouletteOptions.length]);
      index += 1;
    }, 90);

    rouletteTimeoutRef.current = setTimeout(() => {
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

  useEffect(
    () => () => {
      if (rouletteTimerRef.current) {
        clearInterval(rouletteTimerRef.current);
      }
      if (rouletteTimeoutRef.current) {
        clearTimeout(rouletteTimeoutRef.current);
      }
    },
    []
  );

  const activeBlogIndex = activeBlogArticle
    ? blogArticles.findIndex((article) => article.id === activeBlogArticle.id)
    : -1;
  const hasPreviousBlog = activeBlogIndex > 0;
  const hasNextBlog = activeBlogIndex >= 0 && activeBlogIndex < blogArticles.length - 1;

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
        setWeatherTemp(`${temp}°F`);
        setWeatherCondition(label);
      } catch (error) {
        setWeatherTemp("--°F");
        setWeatherCondition("Weather unavailable");
      }
    };

    fetchWeather();
    const timer = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="scene"
      style={{ "--hue": `${hue}deg` }}
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
          <div className="node center" onClick={() => setShowSocial(true)}>
            <p className="name">
              Melissa
              <span>Leavenworth</span>
            </p>
            <p className="sporkles">⋆⁺₊⋆ 𖤓 ⋆⁺₊⋆</p>
            <p className="tagline">mimic the universe by creating</p>
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
                    className={`icon-img ${link.label === "Artistic" ? "icon-img-artistic" : ""}`}
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

        <div className="utility-widgets">
          <div className="glass-widget">
            <span className="widget-label">
              Bay Area
              <br />
              Time
            </span>
            <span className="widget-value">{timeString || "—:—"}</span>
          </div>
          <div className="glass-widget">
            <span className="widget-label">
              Bay Area
              <br />
              Weather
            </span>
            <span className="widget-value">
              {weatherTemp} • {weatherCondition}
            </span>
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
        <button
          className="blog-widget"
          type="button"
          aria-label="Blog"
          onClick={() => setShowBlogList((prev) => !prev)}
        >
          <span className="widget-label">blog</span>
          <span className="blog-subtext">tap to expand</span>
        </button>
        {showBlogList && (
          <div className="blog-list" aria-label="Blog articles">
            {blogArticles.map((article) => (
              <button
                key={article.id}
                className="blog-card"
                type="button"
                onClick={() => {
                  setActiveBlogArticle(article);
                  setShowBlogList(false);
                }}
              >
                <span className="blog-card-title">{article.title}</span>
                <span className="blog-card-date">• {article.cardDateLabel}</span>
              </button>
            ))}
          </div>
        )}
        <audio
          ref={rouletteAudioRef}
          src={`${import.meta.env.BASE_URL}fairy-sparkle.mp3`}
          preload="none"
        />

        {showSocial && (
          <div
            className="resume-overlay"
            role="dialog"
            aria-modal="true"
            onPointerDown={() => setShowSocial(false)}
          >
            <div className="resume-card social-card" onPointerDown={(event) => event.stopPropagation()}>
              <div className="social-header">
                <h3>
                  Connect
                  <br />
                  <br />
                </h3>
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
                    src="icons/instagram.svg"
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
                    src="icons/linkedin.png"
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
                    src="icons/github.svg"
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

        {activeBlogArticle && (
          <div
            className="resume-overlay blog-overlay"
            role="dialog"
            aria-modal="true"
            onPointerDown={() => setActiveBlogArticle(null)}
          >
            <div className="blog-panel-wrap" onPointerDown={(event) => event.stopPropagation()}>
              <button
                className="blog-nav blog-nav-prev"
                type="button"
                aria-label="Previous blog post"
                onClick={() => {
                  if (!hasPreviousBlog) return;
                  setActiveBlogArticle(blogArticles[activeBlogIndex - 1]);
                }}
                disabled={!hasPreviousBlog}
              >
                ‹
              </button>
              <div className="resume-card blog-panel">
                <button
                  className="resume-close"
                  aria-label="Close blog article"
                  onClick={() => setActiveBlogArticle(null)}
                >
                  ✕
                </button>
                <div className="resume-header">
                  <div>
                    <h2>{activeBlogArticle.title}</h2>
                    <p>{activeBlogArticle.dateLabel}</p>
                    <br />
                  </div>
                </div>
                <article className="blog-article">
                  {activeBlogArticle.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              </div>
              <button
                className="blog-nav blog-nav-next"
                type="button"
                aria-label="Next blog post"
                onClick={() => {
                  if (!hasNextBlog) return;
                  setActiveBlogArticle(blogArticles[activeBlogIndex + 1]);
                }}
                disabled={!hasNextBlog}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hue-control" aria-label="Hue slider">
        <span>Hue</span>
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
  );
}
