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
  {
    label: "Email",
    href: "mailto:mlleavenworth@gmail.com",
    iconUrl: `${import.meta.env.BASE_URL}icons/envelope.svg`,
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

const makeProject = ({
  id,
  title,
  type,
  filters,
  href,
  image,
  imageClass,
  previewImage,
  previewImageClass,
  previewVideo,
  previewPoster,
  previewLayout,
  previewItems,
  alt,
  summary,
  details,
  meta,
}) => ({
  id,
  title,
  type,
  filters,
  href,
  image,
  imageClass,
  previewImage,
  previewImageClass,
  previewVideo,
  previewPoster,
  previewLayout,
  previewItems,
  alt: alt || `${title} project preview`,
  summary: summary || `${title} is ready for a full project page once the source files and final notes are added.`,
  details: details || [
    "Initial project listing added from the portfolio roadmap.",
    "Source files, visuals, links, and case-study copy can be added in the next pass.",
  ],
  meta: meta || [
    ["Category", filters.join(", ")],
    ["Status", "Queued for build-out"],
  ],
});

const portfolioProjects = [
  makeProject({
    id: "sammy-anzer",
    title: "Sammy Anzer",
    type: "Brand Identity and Web Design",
    filters: ["Branding"],
    href: "https://www.sammyanzercomedy.com/",
    image: `${import.meta.env.BASE_URL}projects/sammy-anzer.webp`,
    imageClass: "serenity-project-image logo-fit logo-fit-light",
    alt: "Sammy Anzer graffiti-style lettering in orange, pink, and blue",
    summary:
      "A Queens-rooted comedy brand identity and website designed to feel slick, street-smart, and immediately recognizable.",
    details: [
      "Levity built Sammy a brand identity that reflects his Queens roots: slick, street-smart, and impossible to look away from.",
      "His custom Squarespace website features seamless events functionality built to replace solutions like Bandsintown at a lower price point for comedians, keeping his audience locked in on where he's performing next, driving ticket sales, and growing his mailing list so he can keep taking his act to new stages.",
    ],
    meta: [
      ["Client", "Sammy Anzer"],
      ["Project", "Brand identity and comedy website"],
    ],
  }),
  makeProject({
    id: "bk-sharad",
    title: "BK Sharad",
    type: "Brand Identity and Web Design",
    filters: ["Branding"],
    href: "https://www.bksharad.com/",
    image: `${import.meta.env.BASE_URL}projects/bk-sharad.webp`,
    imageClass: "serenity-project-image logo-fit logo-fit-dark",
    alt: "BB Shabab lettering in red and teal on black",
    summary:
      "A high-contrast comedy identity and website built around BK Sharad's hardcore aesthetic and stage persona.",
    details: [
      "Levity built BK a brand identity that reflects his hardcore aesthetic: bold, high-contrast, and as visually intense as his stage persona.",
      "His custom Squarespace website features seamless events functionality built to replace solutions like Bandsintown at a lower price point for comedians, keeping fans locked in on where he's performing next, driving ticket sales, and growing his mailing list so he can keep expanding his reach to new venues.",
    ],
    meta: [
      ["Client", "BK Sharad"],
      ["Project", "Brand identity and comedy website"],
    ],
  }),
  makeProject({
    id: "melly-leaves",
    title: "Melly Leaves",
    type: "Brand Identity",
    filters: ["Branding"],
    image: `${import.meta.env.BASE_URL}projects/melly-leaves-dainty-jewelry.webp`,
    imageClass: "serenity-project-image contained",
    alt: "Melly Leaves Dainty Jewelry homepage showing handmade jewelry photos and peach floral brand artwork",
    summary:
      "A delicate handmade identity for beaded jewelry, floral artwork, boutique-ready product presentation, and soft visual storytelling.",
    details: [
      "This project gives the portfolio room for craft, product, photography, and brand system work beyond client websites.",
      "Future content can include jewelry photography, packaging, boutique placement, and the relief-art collaboration behind the floral motifs.",
    ],
    meta: [
      ["Role", "Maker, brand direction"],
      ["Medium", "Jewelry and identity"],
    ],
  }),
  makeProject({
    id: "thomas-nichols",
    title: "Thomas Nichols",
    type: "Brand Identity",
    filters: ["Branding"],
  }),
  makeProject({
    id: "bangbang-von-loola",
    title: "BangBang Von Loola",
    type: "Brand Identity",
    filters: ["Branding"],
  }),
  makeProject({
    id: "unrelatable",
    title: "Unrelatable",
    type: "Web App",
    filters: ["Web Apps"],
    image: `${import.meta.env.BASE_URL}projects/unrelatable-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview top-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/unrelatable-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/unrelatable-logo.png`,
    previewLayout: "portrait",
    alt: "Unrelatability Rater page with a neon Derek Sheen header and gauge interface",
    summary:
      "A loud, comedy-driven rating app that turns audience confessions into an Unrelatability score.",
    details: [
      "Unrelatable uses a high-contrast performer brand, a gauge interaction, and submission form to make audience participation feel like part of the show.",
      "The middle-panel motion preview shows the rater interaction while the project card keeps the full branded screen.",
    ],
    meta: [
      ["Category", "Web Apps"],
      ["Status", "Preview added"],
    ],
  }),
  makeProject({
    id: "personal-dashboard",
    title: "Personal Dashboard",
    type: "Web App",
    filters: ["Web Apps"],
    image: `${import.meta.env.BASE_URL}projects/personal-dashboard-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/personal-dashboard-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/personal-dashboard-logo.png`,
    alt: "Personal Dashboard glassmorphism interface with date, task, workout, and macro panels",
    summary:
      "A personal dashboard web app with a desktop motion preview ready for a fuller case-study pass.",
    details: [
      "The middle-panel preview shows the dashboard interface in motion while the project card keeps the glassmorphism dashboard scene.",
      "This project can expand into notes on information architecture, widgets, and the daily workflows it supports.",
    ],
    meta: [
      ["Category", "Web Apps"],
      ["Status", "Motion preview added"],
    ],
  }),
  makeProject({
    id: "99-names",
    title: "99 Names",
    type: "Web App",
    filters: ["Web Apps"],
    image: `${import.meta.env.BASE_URL}projects/99-names-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/99-names-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/99-names-logo.png`,
    alt: "99 Names web app interface preview",
    summary:
      "A web app exploration with a desktop motion preview ready for the project case study.",
    details: [
      "The middle-panel preview shows the 99 Names interface in motion while the project card keeps a static app preview.",
      "This project is ready for deeper notes on concept, interaction model, and final build details.",
    ],
    meta: [
      ["Category", "Web Apps"],
      ["Status", "Motion preview added"],
    ],
  }),
  makeProject({
    id: "refrigerator",
    title: "Refrigerator",
    type: "Web App",
    filters: ["Web Apps", "Just for Fun"],
    image: `${import.meta.env.BASE_URL}projects/refrigerator-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview fridge-logo-preview top-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/refrigerator-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/refrigerator-logo.png`,
    previewLayout: "portrait",
    alt: "Wimbly Biscuit refrigerator app with a yellow fridge and certificate note",
    summary:
      "A playful Wimbly Biscuit web app that turns accomplishments into fridge-worthy certificates.",
    details: [
      "Refrigerator uses a bright appliance interface, handwritten copy, and collectible certificate framing to make tiny wins feel official.",
      "The middle-panel motion preview shows the refrigerator interaction while the project card keeps the bright fridge scene.",
    ],
    meta: [
      ["Category", "Web App, Just for Fun"],
      ["Status", "Preview added"],
    ],
  }),
  makeProject({
    id: "swimming",
    title: "Swimming",
    type: "Web App",
    filters: ["Web Apps", "Just for Fun"],
    href: "https://melissalynnel.github.io/wimbly-biscuit-co/swimming/",
    image: `${import.meta.env.BASE_URL}projects/swimming-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/swimming-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/swimming-logo.png`,
    previewLayout: "portrait",
    alt: "Swimming web app with a teal lyric pool, pink tile background, and a tiny swimmer",
    summary:
      "A bright Wimbly Biscuit experiment with a lyric-filled swimming field, pixel movement, and a playful retro interface.",
    details: [
      "Swimming uses a dense text texture, soft motion, and a tiny swimmer interaction to turn a simple screen into a surreal web toy.",
      "The project preview now plays in the center media panel so visitors can see the movement without leaving the portfolio.",
    ],
    meta: [
      ["Category", "Web App, Just for Fun"],
      ["Format", "Interactive experiment"],
    ],
  }),
  makeProject({
    id: "quantiflow",
    title: "Quantiflow",
    type: "Website",
    filters: ["Websites"],
    image: `${import.meta.env.BASE_URL}projects/quantiflow-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewItems: [
      {
        label: "After",
        video: `${import.meta.env.BASE_URL}projects/quantiflow-after.mp4`,
        poster: `${import.meta.env.BASE_URL}projects/quantiflow-logo.png`,
      },
      {
        label: "Before",
        video: `${import.meta.env.BASE_URL}projects/quantiflow-before.mp4`,
        poster: `${import.meta.env.BASE_URL}projects/quantiflow-logo.png`,
      },
    ],
    alt: "Quantiflow landing page with a pink gradient hero and waitlist call to action",
    summary:
      "A digital health landing page for objective, accurate measurement of menstrual blood loss.",
    details: [
      "Quantiflow uses a soft clinical palette, high-contrast calls to action, and a concise landing-page structure to introduce the product clearly.",
      "The project card now uses the homepage hero as the logo preview, with stacked before-and-after motion previews in the middle panel.",
    ],
    meta: [
      ["Category", "Website"],
      ["Status", "Preview added"],
    ],
  }),
  makeProject({
    id: "entertainer-template",
    title: "Entertainer Template",
    type: "Website Template",
    filters: ["Websites"],
    summary:
      "A reusable website structure for comedians and performers who need events, mailing-list growth, and a clear home base without reinventing the system each time.",
    details: [
      "This catch-all represents the entertainer website pattern behind comedy sites like Sammy Anzer and BK Sharad.",
      "The template can cover homepage structure, event listings, newsletter capture, media links, and conversion-focused calls to action.",
    ],
    meta: [
      ["Category", "Websites"],
      ["Use case", "Comedians, performers, and entertainers"],
    ],
  }),
  makeProject({
    id: "sam-tallent",
    title: "Sam Tallent",
    type: "Website",
    filters: ["Websites"],
  }),
  makeProject({
    id: "colorado-comedy",
    title: "Colorado Comedy",
    type: "Website",
    filters: ["Websites"],
    image: `${import.meta.env.BASE_URL}projects/colorado-comedy-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview top-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/colorado-comedy-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/colorado-comedy-logo.png`,
    alt: "Colorado Comedy homepage with mountain background and large Colorado Comedy title",
    summary:
      "A Colorado comedy directory and homepage concept with mountain scenery, bold title treatment, and clear navigation paths.",
    details: [
      "Colorado Comedy is structured as a regional comedy encyclopedia, giving shows, mics, clubs, podcasts, and submissions a single home.",
      "The project card is top-aligned to keep the title visible, and the middle-panel preview shows the homepage in motion.",
    ],
    meta: [
      ["Category", "Website"],
      ["Status", "Preview added"],
    ],
  }),
  makeProject({
    id: "adhd-simulator",
    title: "ADHD Simulator",
    type: "Just for Fun Web App",
    filters: ["Just for Fun", "Web Apps"],
    image: `${import.meta.env.BASE_URL}projects/adhd-simulator-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/adhd-simulator-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/adhd-simulator-logo.png`,
    previewLayout: "portrait",
    alt: "ADHD Simulator pixel city scene with a dialog window and status panel",
    summary:
      "A pixel-art life simulator about attention, energy, tabs, money, and trying to get through a day in San Francisco.",
    details: [
      "ADHD Simulator is structured like a playful desktop RPG, using status meters, dialogue windows, and city ambience to turn daily overwhelm into an interactive scene.",
      "The middle-panel motion preview shows the vertical capture while the project card keeps the horizontal logo scene.",
    ],
    meta: [
      ["Category", "Just for Fun, Web Apps"],
      ["Status", "In progress"],
    ],
  }),
  makeProject({
    id: "wimbly-biscuit",
    title: "Wimbly Biscuit",
    type: "Just for Fun",
    filters: ["Just for Fun"],
    href: "https://melissalynnel.github.io/wimbly-biscuit-co/worldwide/",
    image: `${import.meta.env.BASE_URL}projects/wimbly-biscuit-co.webp`,
    imageClass: "serenity-project-image cover filled-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/wimbly-biscuit-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/wimbly-biscuit-co.webp`,
    previewLayout: "portrait",
    alt: "World Wide Wimbly homepage with a glowing globe, stars, and playful app links",
    summary:
      "A playful web world for tiny experiments, odd interface moments, sound, movement, and fun-first app design.",
    details: [
      "Wimbly Biscuit gives the portfolio a place to show personality-driven web apps that prioritize delight over strict utility.",
      "The middle-panel preview shows World Wide Wimbly in motion while the project card keeps the expanded homepage logo scene.",
    ],
    meta: [
      ["Role", "Brand, UI, frontend"],
      ["Format", "Interactive web experiments"],
    ],
  }),
];

const archivedPortfolioProjects = [
  {
    id: "wimbly-biscuit-co",
    title: "Wimbly Biscuit Co.",
    type: "Branding and Web App Design",
    filters: ["Branding", "Websites", "Web Apps", "Just for Fun"],
    href: "https://melissalynnel.github.io/wimbly-biscuit-co/worldwide/",
    image: `${import.meta.env.BASE_URL}projects/wimbly-biscuit-co.webp`,
    imageClass: "serenity-project-image cover",
    alt: "World Wide Wimbly homepage with a glowing globe, stars, and playful app links",
    summary:
      "A playful web world for tiny experiments, odd interface moments, sound, movement, and fun-first app design.",
    details: [
      "Wimbly Biscuit Co. gives the portfolio a place to show personality-driven web apps that prioritize delight over strict utility.",
      "The Serenity version can expand this into individual case studies for World Wide Wimbly, Refrigerator, Valentines, Swimming, and other experiments.",
    ],
    meta: [
      ["Role", "Brand, UI, frontend"],
      ["Format", "Interactive web apps"],
    ],
  },
  {
    id: "jokechella-7",
    title: "Jokechella 7",
    type: "Creative Direction, Merchandising and Festival Marketing",
    filters: ["Branding"],
    image: `${import.meta.env.BASE_URL}projects/jokechella-7.webp`,
    imageClass: "serenity-project-image contained",
    alt: "Jokechella 7 Ultimate Comedy Festival logo in pink, blue, and black on white",
    summary:
      "Festival creative direction that carried through marketing, merch, venue materials, and social promotion.",
    details: [
      "The work shaped a cohesive visual presence for a sold-out three-day comedy festival, keeping the event recognizable from announcement through showtime.",
      "This can become a full Serenity case study with the poster, merch specs, social assets, event photos, and campaign outcomes.",
    ],
    meta: [
      ["Client", "The Comedy Fort"],
      ["Focus", "Campaign system"],
    ],
  },
  {
    id: "melly-leaves",
    title: "Melly Leaves Dainty Jewelry",
    type: "Brand Identity",
    filters: ["Branding"],
    image: `${import.meta.env.BASE_URL}projects/melly-leaves-dainty-jewelry.webp`,
    imageClass: "serenity-project-image contained",
    alt: "Melly Leaves Dainty Jewelry homepage showing handmade jewelry photos and peach floral brand artwork",
    summary:
      "A delicate handmade identity for beaded jewelry, floral artwork, boutique-ready product presentation, and soft visual storytelling.",
    details: [
      "This project gives the portfolio room for craft, product, photography, and brand system work beyond client websites.",
      "Future content can include jewelry photography, packaging, boutique placement, and the relief-art collaboration behind the floral motifs.",
    ],
    meta: [
      ["Role", "Maker, brand direction"],
      ["Medium", "Jewelry and identity"],
    ],
  },
];

const projectFilters = ["Branding", "Websites", "Web Apps", "Just for Fun", "All"];
const mobileProjectsQuery = "(max-width: 720px)";

const sortProjectsByTitle = (projects) =>
  [...projects].sort((firstProject, secondProject) =>
    firstProject.title.localeCompare(secondProject.title, undefined, { sensitivity: "base" })
  );

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

function RepelText({ text }) {
  return text.split("").map((character, index) => (
    <span
      key={`${character}-${index}`}
      className={character === " " ? undefined : "repel-letter"}
      aria-hidden="true"
    >
      {character}
    </span>
  ));
}

function ProjectsView({
  activeFilter,
  activeProject,
  filteredProjects,
  onActivateProject,
  onProjectFilterChange,
  onProjectListScroll,
  projectListRef,
  onBack,
}) {
  return (
    <main className="projects-shell" aria-label="Serenity project portfolio">
      <header className="projects-header">
        <button className="projects-brand-button" type="button" onClick={onBack} aria-label="Return to home">
          <span className="projects-brand-name">Melissa Leavenworth</span>
        </button>
      </header>

      <section className="projects-heading" aria-labelledby="projects-title">
        <h1 className="projects-title" id="projects-title" aria-label="Projects">
          <RepelText text="Projects" />
        </h1>
        <div className="projects-filter-list" aria-label="Project filters">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              className={`projects-filter-button${activeFilter === filter ? " is-active" : ""}`}
              type="button"
              onClick={() => onProjectFilterChange(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="projects-grid" aria-label="Project gallery">
        <div className="projects-list" ref={projectListRef} onScroll={onProjectListScroll}>
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              className={`serenity-project-card${activeProject.id === project.id ? " is-active" : ""}`}
              type="button"
              data-project-id={project.id}
              onClick={() => onActivateProject(project.id)}
            >
              {project.image ? (
                <img
                  className={project.imageClass}
                  src={project.image}
                  alt={project.alt}
                  loading={project.id === filteredProjects[0]?.id ? "eager" : "lazy"}
                />
              ) : (
                <div className="serenity-project-placeholder" aria-hidden="true">
                  <span>{project.title}</span>
                </div>
              )}
              <div className="serenity-project-copy">
                <h2>{project.title}</h2>
                <p>{project.type}</p>
              </div>
            </button>
          ))}
        </div>

        <aside className="projects-media-panel" aria-label={`${activeProject.title} media preview`}>
          <p className="projects-detail-label">Preview</p>
          {activeProject.previewItems ? (
            <div className="projects-media-stack">
              {activeProject.previewItems.map((item) => (
                <div
                  className={`projects-media-frame${item.layout ? ` is-${item.layout}` : ""}`}
                  key={item.label}
                >
                  {item.video ? (
                    <video
                      key={item.video}
                      src={item.video}
                      poster={item.poster || activeProject.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : item.image ? (
                    <img
                      className={item.imageClass || activeProject.imageClass}
                      src={item.image}
                      alt={`${activeProject.title} ${item.label} preview`}
                    />
                  ) : (
                    <div className="serenity-project-placeholder projects-media-placeholder" aria-hidden="true">
                      <span>{item.label}</span>
                    </div>
                  )}
                  <span className="projects-media-badge">{item.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`projects-media-frame${activeProject.previewLayout ? ` is-${activeProject.previewLayout}` : ""}`}>
              {activeProject.previewVideo ? (
                <video
                  key={activeProject.previewVideo}
                  src={activeProject.previewVideo}
                  poster={activeProject.previewPoster || activeProject.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : activeProject.previewImage || activeProject.image ? (
                <img
                  className={activeProject.previewImageClass || activeProject.imageClass}
                  src={activeProject.previewImage || activeProject.image}
                  alt={activeProject.alt}
                />
              ) : (
                <div className="serenity-project-placeholder projects-media-placeholder" aria-hidden="true">
                  <span>{activeProject.title}</span>
                </div>
              )}
            </div>
          )}
        </aside>

        <aside className="projects-detail-panel" aria-live="polite" aria-label={`${activeProject.title} details`}>
          <p className="projects-detail-label">Details</p>
          <h2>{activeProject.title}</h2>
          <p className="projects-detail-type">{activeProject.type}</p>
          <div className="projects-detail-copy">
            <p>{activeProject.summary}</p>
            {activeProject.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
          <dl className="projects-meta-list">
            {activeProject.meta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {activeProject.href && (
            <a className="projects-open-link" href={activeProject.href} target="_blank" rel="noreferrer">
              Open project
            </a>
          )}
        </aside>
      </section>
    </main>
  );
}

function MobileProjectsDisabled({ onBack }) {
  return (
    <main className="mobile-projects-disabled" aria-label="Projects unavailable on mobile">
      <button className="projects-brand-button" type="button" onClick={onBack} aria-label="Return to home">
        <span className="projects-brand-name">Melissa Leavenworth</span>
      </button>
      <section className="mobile-projects-disabled-panel">
        <p className="projects-detail-label">Projects</p>
        <h1>Desktop view</h1>
        <p>Project previews are temporarily available on larger screens only.</p>
        <button className="center-action-button action-about" type="button" onClick={onBack}>
          back home
        </button>
      </section>
    </main>
  );
}

export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showTechStack, setShowTechStack] = useState(false);
  const [hue, setHue] = useState(0);
  const [view, setView] = useState(() => (window.location.hash === "#projects" ? "projects" : "home"));
  const [isMobileProjectsDisabled, setIsMobileProjectsDisabled] = useState(() =>
    window.matchMedia(mobileProjectsQuery).matches
  );
  const [activeProjectFilter, setActiveProjectFilter] = useState("All");
  const [activeProjectId, setActiveProjectId] = useState(portfolioProjects[0].id);
  const boopAudioRef = useRef(null);
  const techStackRef = useRef(null);
  const techStackMobilePanelRef = useRef(null);
  const techStackOverlayPointerRef = useRef(null);
  const projectListRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const filteredProjects = sortProjectsByTitle(
    activeProjectFilter === "All"
      ? portfolioProjects
      : portfolioProjects.filter((project) => project.filters.includes(activeProjectFilter))
  );
  const activeProject = filteredProjects.find((project) => project.id === activeProjectId)
    || filteredProjects[0]
    || portfolioProjects[0];

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileProjectsQuery);
    const handleMediaChange = (event) => setIsMobileProjectsDisabled(event.matches);

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setView(window.location.hash === "#projects" ? "projects" : "home");
      setShowAbout(false);
      setShowTechStack(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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

      document.querySelectorAll(".repel-letter").forEach((letter) => {
        const bounds = letter.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const deltaX = centerX - x;
        const deltaY = centerY - y;
        const distance = Math.hypot(deltaX, deltaY);
        const repelDistance = 150;

        if (distance > 0 && distance < repelDistance) {
          const strength = (repelDistance - distance) / repelDistance;
          const offsetX = (deltaX / distance) * strength * 12;
          const offsetY = (deltaY / distance) * strength * 7;
          letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
          letter.style.transform = "translate(0, 0)";
        }
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
  const showProjects = () => {
    window.location.hash = "projects";
    setView("projects");
  };
  const showHome = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setView("home");
  };
  const changeProjectFilter = (filter) => {
    const nextProjects = sortProjectsByTitle(
      filter === "All"
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.filters.includes(filter))
    );

    setActiveProjectFilter(filter);
    setActiveProjectId(nextProjects[0]?.id || portfolioProjects[0].id);
  };
  const activateMostVisibleProject = () => {
    const list = projectListRef.current;
    if (!list) return;

    const listBounds = list.getBoundingClientRect();
    let bestId = activeProjectId;
    let bestArea = 0;

    list.querySelectorAll("[data-project-id]").forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const visibleWidth = Math.min(bounds.right, listBounds.right) - Math.max(bounds.left, listBounds.left);
      const visibleHeight = Math.min(bounds.bottom, listBounds.bottom) - Math.max(bounds.top, listBounds.top);
      const area = Math.max(0, visibleWidth) * Math.max(0, visibleHeight);

      if (area > bestArea) {
        bestArea = area;
        bestId = card.dataset.projectId;
      }
    });

    setActiveProjectId(bestId);
  };

  return (
    <div
      className="scene"
      style={{ "--hue": `${hue}deg` }}
      onClick={playBoopOnInteractiveClick}
    >
      <div className={`scene-filter${view === "projects" ? " projects-mode" : ""}`}>
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

        {view === "projects" ? (
          isMobileProjectsDisabled ? (
            <MobileProjectsDisabled onBack={showHome} />
          ) : (
          <ProjectsView
            activeFilter={activeProjectFilter}
            activeProject={activeProject}
            filteredProjects={filteredProjects}
            onActivateProject={setActiveProjectId}
            onProjectFilterChange={changeProjectFilter}
            onProjectListScroll={activateMostVisibleProject}
            projectListRef={projectListRef}
            onBack={showHome}
          />
          )
        ) : (
          <>
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

            {!isMobileProjectsDisabled && (
              <div className="center-actions-widget">
                <button
                  className="center-action-button action-designs"
                  type="button"
                  onClick={showProjects}
                >
                  See My Projects
                </button>
              </div>
            )}
          </>
        )}

        <div className="center-actions-widget persistent-about-widget">
          <button
            className="center-action-button action-about"
            type="button"
            onClick={() => setShowAbout(true)}
          >
            about
          </button>
        </div>

        <div className="center-actions-widget persistent-actions-widget">
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

        <div className={`spotify-player${view === "projects" ? " spotify-player-projects" : ""}`} aria-label="Music player">
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
                Hello! My name is Melissa, and I am a maker of many mediums.
              </p>
              <p>
                My marketing career has spanned from fintech to entertainment to real estate, and covered traditional and digital forms. I have crafted social media, print and integrated campaigns that have led to measurably high engagement and conversions.
              </p>
              <p>
                I run my own design agency, <a href="https://levity.ltd/">Levity Ltd.</a>, where I help entertainers, retailers, and early-stage startups with unique branding, websites and web apps that leave a bold impression in their industries. I take pride in creating superior UX and absolutely beautiful UI.
              </p> 
              <p>
                When I am not helping others’ business make their mark, I am crafting delicate seed bead jewelry and other handmade goods.
              </p> 
               <p>
                <a href="mailto:mlleavenworth@gmail.com">Send me an email</a> if you’d like to learn what I can make for you :)
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
