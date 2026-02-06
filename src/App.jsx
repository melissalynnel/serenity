import React, { useEffect, useRef, useState } from "react";

const nodes = [
  {
    id: "resume",
    title: "Resume",
    subtitle: "Experience + Skills",
    x: -420,
    y: -260,
    curve: { x: -120, y: -120 },
    items: [
      "Lead roles, growth, and impact",
      "Tech stack + tools",
      "Education + certifications",
    ],
  },
  {
    id: "pro",
    title: "Professional Projects",
    subtitle: "Client + Product Work",
    x: 460,
    y: -140,
    curve: { x: 140, y: -80 },
    items: [
      "Case studies with outcomes",
      "Selected launches",
      "Collaboration highlights",
    ],
  },
  {
    id: "art",
    title: "Artistic Expressions",
    subtitle: "Hobby + Creative",
    x: 160,
    y: 380,
    curve: { x: 60, y: 140 },
    items: [
      "Illustrations + visual art",
      "Music, writing, or film",
      "Experiments + sketches",
    ],
  },
];

const starbursts = [
  { id: "s1", x: -720, y: -420, size: 90 },
  { id: "s2", x: 760, y: -480, size: 120 },
  { id: "s3", x: 640, y: 520, size: 110 },
  { id: "s4", x: -620, y: 520, size: 70 },
];

export default function App() {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateCenter = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: rect.height / 2 });
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, []);

  const handlePointerDown = (event) => {
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
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="nebula" />
      <div className="grid" />
      <div
        className="map"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        <svg className="web" viewBox="-1200 -900 2400 1800" aria-hidden>
          <defs>
            <linearGradient id="lineGlow" x1="0" x2="1">
              <stop offset="0" stopColor="#ffb6ff" />
              <stop offset="1" stopColor="#8fe9ff" />
            </linearGradient>
          </defs>
          {nodes.map((node) => {
            const cx = node.curve.x;
            const cy = node.curve.y;
            return (
              <path
                key={node.id}
                d={`M 0 0 Q ${cx} ${cy} ${node.x} ${node.y}`}
                className="web-line"
              />
            );
          })}
        </svg>

        {starbursts.map((star) => (
          <div
            key={star.id}
            className="starburst"
            style={{
              transform: `translate(${star.x}px, ${star.y}px)`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}

        <div className="moon moon-one" />
        <div className="moon moon-two" />

        <div className="node center" style={{ transform: "translate(0px, 0px)" }}>
          <div className="halo" />
          <p className="name">Your Name</p>
          <p className="tagline">Futuristic creator + builder</p>
        </div>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="node"
            style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
          >
            <p className="node-title">{node.title}</p>
            <p className="node-subtitle">{node.subtitle}</p>
            <ul>
              {node.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hint">
        <span>Drag to explore</span>
        <span className="spark">✧</span>
        <span className="spark">✦</span>
      </div>
    </div>
  );
}
