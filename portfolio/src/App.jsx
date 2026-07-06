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
  previewAspectRatio,
  previewItems,
  previewStackClass,
  alt,
  detailSections,
  summary,
  details,
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
  previewAspectRatio,
  previewItems,
  previewStackClass,
  alt: alt || `${title} project preview`,
  detailSections,
  summary: summary || `${title} is ready for a full project page once the source files and final notes are added.`,
  details: details || [
    "Initial project listing added from the portfolio roadmap.",
    "Source files, visuals, links, and case-study copy can be added in the next pass.",
  ],
});

const portfolioProjects = [
  makeProject({
    id: "sammy-anzer",
    title: "Sammy Anzer",
    type: "Brand Identity and Web Design",
    filters: ["Branding", "Web Design"],
    href: "https://www.sammyanzercomedy.com/",
    image: `${import.meta.env.BASE_URL}projects/sammy-anzer.webp`,
    imageClass: "serenity-project-image logo-fit logo-fit-light",
    previewImageClass: "serenity-project-image middle-preview-fit",
    alt: "Sammy Anzer graffiti-style lettering in orange, pink, and blue",
    detailSections: [
      ["Role", "Solo brand and site direction; brought in an artist to execute the graffiti work itself, since that is not my medium."],
      ["Problem", "No prior branding existed for Sammy when we started."],
      ["Read", "Street energy and storyteller instincts, so I directed a graffiti-inspired identity instead of a standard logo package. The goal was to capture the look and feel of New York, not just gesture at it."],
      ["Key Decision", "A custom Squarespace build made to convert visitors directly into ticket buyers, replacing what Bandsintown does without a middleman taking a cut from fans."],
      ["Outcome", "He also did not have an email list before this. Now he has one he can carry venue to venue to prove to bookers that he can pull a crowd."],
      ["Constraint", "One week."],
    ],
    summary:
      "A Queens-rooted comedy brand identity and website designed to feel slick, street-smart, and immediately recognizable.",
    details: [
      "Levity built Sammy a brand identity that reflects his Queens roots: slick, street-smart, and impossible to look away from.",
      "His custom Squarespace website features seamless events functionality built to replace solutions like Bandsintown at a lower price point for comedians, keeping his audience locked in on where he's performing next, driving ticket sales, and growing his mailing list so he can keep taking his act to new stages.",
    ],
  }),
  makeProject({
    id: "bk-sharad",
    title: "BK Sharad",
    type: "Brand Identity and Web Design",
    filters: ["Branding", "Web Design"],
    href: "https://www.bksharad.com/",
    image: `${import.meta.env.BASE_URL}projects/bk-sharad.webp`,
    imageClass: "serenity-project-image logo-fit logo-fit-dark",
    alt: "BB Shabab lettering in red and teal on black",
    detailSections: [
      ["Role", "Solo, brand and site."],
      ["Problem", "No brand existed before this."],
      ["Read", "BK is a hardcore kid who happens to also do comedy, so I built him an identity that reads like a flyer for a basement show, not a comedy site."],
      ["Key Decision", "The site was built to convert, not just look good: direct ticket sales replacing Bandsintown."],
      ["Outcome", "His first-ever email list, the currency comedians use to prove they can fill a room when pitching bookers."],
      ["Constraint", "One week, start to finish."],
    ],
    summary:
      "A high-contrast comedy identity and website built around BK Sharad's hardcore aesthetic and stage persona.",
    details: [
      "Levity built BK a brand identity that reflects his hardcore aesthetic: bold, high-contrast, and as visually intense as his stage persona.",
      "His custom Squarespace website features seamless events functionality built to replace solutions like Bandsintown at a lower price point for comedians, keeping fans locked in on where he's performing next, driving ticket sales, and growing his mailing list so he can keep expanding his reach to new venues.",
    ],
  }),
  makeProject({
    id: "melly-leaves",
    title: "Melly Leaves",
    type: "Brand Identity and Web Design",
    filters: ["Branding", "Web Design"],
    image: `${import.meta.env.BASE_URL}projects/melly-leaves-dainty-jewelry.webp`,
    imageClass: "serenity-project-image contained",
    previewImageClass: "serenity-project-image middle-preview-fit",
    alt: "Melly Leaves Dainty Jewelry homepage showing handmade jewelry photos and peach floral brand artwork",
    detailSections: [
      ["Role", "Solo, brand, site, and product photography."],
      ["Problem", "No existing brand or e-commerce presence for my seed bead jewelry line. It needed to look and feel as delicate as the product itself."],
      ["Read", "Dainty and delicate, carried through specific font choices and a collaboration with a local relief print artist for the visual identity."],
      ["Key Decision", "Handled every layer myself so the product story stayed consistent from packaging to product shots to purchase flow."],
      ["Outcome", "Landed the brand in boutiques across Colorado. Ran it for two years before relocating it to San Francisco, where it lives now."],
      ["Constraint", "Solo build, a genuine labor of love rather than a client-driven timeline."],
    ],
    summary:
      "A delicate handmade identity for beaded jewelry, floral artwork, boutique-ready product presentation, and soft visual storytelling.",
    details: [
      "This project gives the portfolio room for craft, product, photography, and brand system work beyond client websites.",
      "Future content can include jewelry photography, packaging, boutique placement, and the relief-art collaboration behind the floral motifs.",
    ],
  }),
  makeProject({
    id: "thomas-nichols",
    title: "Thomas Nichols",
    type: "Brand Identity and Web Design",
    filters: ["Branding", "Web Design"],
    image: `${import.meta.env.BASE_URL}projects/thomas-nichols.jpg`,
    imageClass: "serenity-project-image cover",
    alt: "Thomas Nichols homepage with blue comic burst background and orange comic-style lettering",
    detailSections: [
      ["Role", "Solo, brand and site."],
      ["Problem", "No brand existed before this."],
      ["Read", "Thomas does two things, comedy and comic books, so the site had to convert on both fronts instead of making one compete with the other."],
      ["Key Decision", "It sells tickets to shows and runs a storefront for his comics, direct, with no third party in between. Same custom Squarespace build as the others, replacing Bandsintown."],
      ["Outcome", "His first email list, alongside a functioning sales channel for his comics."],
      ["Constraint", "All in the same week."],
    ],
  }),
  makeProject({
    id: "bangbang-von-loola",
    title: "BangBang Von Loola",
    type: "Brand Identity and Web Design",
    filters: ["Branding", "Web Design"],
    image: `${import.meta.env.BASE_URL}projects/bangbang-von-loola.jpg`,
    imageClass: "serenity-project-image cover top-logo-preview",
    alt: "Bang Bang Von Loola homepage with pastel sky background, large pink script logo, and black and white portrait",
    detailSections: [
      ["Role", "Solo, brand and site."],
      ["Problem", "No personal brand existed before this."],
      ["Read", "An airy, classy aesthetic, a deliberate departure from a typical burlesque look, to support her real business: beauty and burlesque consulting."],
      ["Key Decision", "The site was built to bring in consulting clients directly."],
      ["Outcome", "She started gaining traction in LA before she had even moved there."],
      ["Constraint", "Built in a weekend."],
    ],
  }),
  makeProject({
    id: "jokechella-7",
    title: "Jokechella 7",
    type: "Brand Design",
    filters: ["Branding"],
    image: `${import.meta.env.BASE_URL}projects/jokechella-7.webp`,
    imageClass: "serenity-project-image cover",
    previewStackClass: "is-logo-merch",
    previewItems: [
      {
        label: "Logo",
        image: `${import.meta.env.BASE_URL}projects/jokechella-7.webp`,
      },
      {
        label: "Beach Ball",
        image: `${import.meta.env.BASE_URL}projects/jokechella-7-beach-ball.png`,
      },
      {
        label: "Tank Top",
        image: `${import.meta.env.BASE_URL}projects/jokechella-7-tank-top-specs.png`,
      },
    ],
    alt: "Jokechella 7 Ultimate Comedy Festival logo in pink, blue, and black on white",
    detailSections: [
      ["Role", "Founding creative hire at The Comedy Fort, responsible for venue branding overall. For this event, I led merch creation and creative direction on the logo, and created all marketing materials myself."],
      ["Problem", "Jokechella 7, a play on Coachella, is a real three-day comedy festival that needed an identity strong enough to sell out three shows a day across three days."],
      ["Idea", "We hired a local artist to execute the logo under my creative direction. I turned that mark into tank tops, beach balls, and marketing materials that carried the brand everywhere else."],
      ["Outcome", "Both merch items sold out. The entire event sold out too, over 120 seats per show across three shows a day for three days, generating more than $25,000 in ticket revenue."],
      ["Constraint", "Under $5,000 total budget."],
    ],
    summary:
      "Festival brand design for a bright, playful comedy event identity with merch, marketing, and venue-ready visual direction.",
    details: [
      "Jokechella 7 uses a loud tropical palette, handmade lettering, and festival-style energy to make the event feel distinct and memorable.",
      "The project can expand into campaign materials, merch, social assets, venue graphics, and event photos in a fuller case-study pass.",
    ],
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
    previewAspectRatio: "900 / 1530",
    alt: "Unrelatability Rater page with a neon Derek Sheen header and gauge interface",
    detailSections: [
      ["Role", "I built the front end. Zuha handled the backend."],
      ["Problem", "My client was heading out on a national tour, and email signups had gone stale. Audiences had grown numb to the usual email ask."],
      ["Idea", "We built the Unrelatability Rater. Customers submit their most ridiculous, unrelatable experience, and AI rates how common or rare it actually is."],
      ["Outcome", "The comedian gets an email address. The customer gets a moment that feels personal instead of transactional. It also builds a running archive of material for carousel content as the tour continues."],
      ["Constraint", "Token usage and capacity, especially right after a show when submissions spike all at once."],
      ["What It Demonstrates", "I can invent a collection method nobody is using yet and make it feel fun in person, bridging a physical post-show moment with a digital tool."],
    ],
    summary:
      "A loud, comedy-driven rating app that turns audience confessions into an Unrelatability score.",
    details: [
      "Unrelatable uses a high-contrast performer brand, a gauge interaction, and submission form to make audience participation feel like part of the show.",
      "The middle-panel motion preview shows the rater interaction while the project card keeps the full branded screen.",
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
    detailSections: [
      ["Role", "Solo."],
      ["Itch", "I was done paying Notion for chart views I could just build myself. So I did."],
      ["Key Decision", "One page, no scrolling. It tracks the three things I actually stay consistent about: daily to-dos, macros, and workouts, and lets me click between the raw list and a visual read of the same data."],
      ["What It Demonstrates", "I can build something genuinely functional for daily use, not just a portfolio piece, and I have opinions about how information should sit on a screen."],
    ],
    summary:
      "A personal dashboard web app with a desktop motion preview ready for a fuller case-study pass.",
    details: [
      "The middle-panel preview shows the dashboard interface in motion while the project card keeps the glassmorphism dashboard scene.",
      "This project can expand into notes on information architecture, widgets, and the daily workflows it supports.",
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
    previewAspectRatio: "900 / 1788",
    alt: "Wimbly Biscuit refrigerator app with a yellow fridge and certificate note",
    detailSections: [
      ["Role", "Solo."],
      ["Itch", "I believe in expressing gratitude toward the people in my life, loudly and on purpose. The Refrigerator gives adults the childhood fridge moment many people never got."],
      ["Key Decision", "It is one long scrolling fridge covered in my friends' accomplishments from the last few years. Click download and confetti fires, then you get a printable PNG certificate."],
      ["What It Demonstrates", "This is what I mean when I say the internet should be fun. It is also a proof of concept: people have already asked me to build this for their own friends."],
    ],
    summary:
      "A playful Wimbly Biscuit web app that turns accomplishments into fridge-worthy certificates.",
    details: [
      "Refrigerator uses a bright appliance interface, handwritten copy, and collectible certificate framing to make tiny wins feel official.",
      "The middle-panel motion preview shows the refrigerator interaction while the project card keeps the bright fridge scene.",
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
    previewAspectRatio: "900 / 1548",
    alt: "Swimming web app with a teal lyric pool, pink tile background, and a tiny swimmer",
    detailSections: [
      ["Role", "Solo, built at a design event where the prompt was to create something that captured childhood joy."],
      ["Itch", "My grandpa took us to the pool every day one summer when I was a kid. I wanted to rebuild that feeling: a bird's-eye view of a pool with a little swimmer moving through it."],
      ["Key Decision", "Built the wavy water effect using Pretext, so the water itself is made of text. The text is the lyrics from Mac Miller's album Swimming."],
      ["What It Demonstrates", "Technical range paired with a real point of view: using a technical constraint to say something about childhood, growing up, and loss of innocence."],
    ],
    summary:
      "A bright Wimbly Biscuit experiment with a lyric-filled swimming field, pixel movement, and a playful retro interface.",
    details: [
      "Swimming uses a dense text texture, soft motion, and a tiny swimmer interaction to turn a simple screen into a surreal web toy.",
      "The project preview now plays in the center media panel so visitors can see the movement without leaving the portfolio.",
    ],
  }),
  makeProject({
    id: "quantiflow",
    title: "Quantiflow",
    type: "Web Design",
    filters: ["Web Design"],
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
    detailSections: [
      ["Role", "Solo, unsolicited redesign."],
      ["Problem", "The existing site was overloaded with text, overwhelming to read, and lacked a clear design system."],
      ["Key Decision", "Gave it a modern visual overhaul and built a flipping card interaction to replace dense blocks of text, so potential signups could engage with information instead of getting fatigued by it."],
      ["Outcome", "The founder liked the redesign enough that we are now in talks for future projects, a real signal given this was never a paid engagement to begin with."],
      ["Constraint", "Built in one session."],
    ],
    summary:
      "A digital health landing page for objective, accurate measurement of menstrual blood loss.",
    details: [
      "Quantiflow uses a soft clinical palette, high-contrast calls to action, and a concise landing-page structure to introduce the product clearly.",
      "The project card now uses the homepage hero as the logo preview, with stacked before-and-after motion previews in the middle panel.",
    ],
  }),
  makeProject({
    id: "colorado-comedy",
    title: "Colorado Comedy",
    type: "Web Design",
    filters: ["Web Design"],
    image: `${import.meta.env.BASE_URL}projects/colorado-comedy-logo.png`,
    imageClass: "serenity-project-image cover filled-logo-preview top-logo-preview",
    previewVideo: `${import.meta.env.BASE_URL}projects/colorado-comedy-preview.mp4`,
    previewPoster: `${import.meta.env.BASE_URL}projects/colorado-comedy-logo.png`,
    alt: "Colorado Comedy homepage with mountain background and large Colorado Comedy title",
    detailSections: [
      ["Role", "Built with the site's existing manager over one weekend. I led the aesthetic direction, functionality, and layout."],
      ["Problem", "The site existed before, but barely worked. Messy navigation, almost no useful information, nothing a new comedian could actually plan around."],
      ["Idea", "I designed it around a new comedian building a circuit, moving city to city based on when and where open mics run."],
      ["Outcome", "Over 3,000 unique visitors a month. Hundreds of comedians use it, in-state and visiting from out of state. No cost to any of them."],
      ["Why It Matters", "This was not a client ask. I built something the whole Colorado comedy community could use for free, and it still helps people promote their own shows with zero barrier to entry."],
    ],
    summary:
      "A Colorado comedy directory and homepage concept with mountain scenery, bold title treatment, and clear navigation paths.",
    details: [
      "Colorado Comedy is structured as a regional comedy encyclopedia, giving shows, mics, clubs, podcasts, and submissions a single home.",
      "The project card is top-aligned to keep the title visible, and the middle-panel preview shows the homepage in motion.",
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
    previewAspectRatio: "900 / 1542",
    alt: "ADHD Simulator pixel city scene with a dialog window and status panel",
    detailSections: [
      ["Role", "Solo."],
      ["Itch", "An autobiographically rooted, choose-your-own-adventure web game built with a deadpan comedic sensibility. Less explaining ADHD, more letting people feel the texture of it."],
      ["Key Decision", "Built with an 8-bit pixel art aesthetic and a Tabs mechanic that represents unresolved tasks piling up as you play. No fail state; instead it tracks Time, Energy, and Money."],
      ["What It Demonstrates", "I can take something personal and turn it into an interactive system with real mechanics. It also shows range into game design and systems thinking."],
    ],
    summary:
      "A pixel-art life simulator about attention, energy, tabs, money, and trying to get through a day in San Francisco.",
    details: [
      "ADHD Simulator is structured like a playful desktop RPG, using status meters, dialogue windows, and city ambience to turn daily overwhelm into an interactive scene.",
      "The middle-panel motion preview shows the vertical capture while the project card keeps the horizontal logo scene.",
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
    previewAspectRatio: "900 / 1530",
    alt: "World Wide Wimbly homepage with a glowing globe, stars, and playful app links",
    detailSections: [
      ["Role", "Solo."],
      ["Itch", "This is home base for everything I build just because it should exist, no client, no brief. A weird, whimsical corner of the internet built around one belief: the internet should be fun."],
      ["Key Decision", "It houses all my fun, self-initiated apps in one place: playful interaction, offbeat navigation, and a world that does not take itself seriously because it is not supposed to."],
      ["What It Demonstrates", "Pure design sensibility with nothing diluting it, no client constraints, no KPIs. It is the clearest evidence of taste and range I have, because it is entirely mine."],
    ],
    summary:
      "A playful web world for tiny experiments, odd interface moments, sound, movement, and fun-first app design.",
    details: [
      "Wimbly Biscuit gives the portfolio a place to show personality-driven web apps that prioritize delight over strict utility.",
      "The middle-panel preview shows World Wide Wimbly in motion while the project card keeps the expanded homepage logo scene.",
    ],
  }),
];

const projectFilters = ["Branding", "Web Design", "Web Apps", "Just for Fun", "All"];
const mobileProjectsQuery = "(max-width: 720px)";
const defaultProjectId = "adhd-simulator";

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

function ProjectRailScrollbar({ scrollRef, className = "", refreshKey }) {
  const [metrics, setMetrics] = useState({ thumbLeft: 0, thumbWidth: 100 });

  useEffect(() => {
    const rail = scrollRef.current;
    if (!rail) return undefined;

    let animationFrame;
    const updateMetrics = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
        const visibleRatio = rail.scrollWidth > 0 ? rail.clientWidth / rail.scrollWidth : 1;
        const thumbWidth = Math.max(18, Math.min(100, visibleRatio * 100));
        const thumbLeft = maxScroll > 0
          ? (rail.scrollLeft / maxScroll) * (100 - thumbWidth)
          : 0;

        setMetrics({ thumbLeft, thumbWidth });
      });
    };

    updateMetrics();
    rail.addEventListener("scroll", updateMetrics, { passive: true });
    window.addEventListener("resize", updateMetrics);

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(rail);

    return () => {
      cancelAnimationFrame(animationFrame);
      rail.removeEventListener("scroll", updateMetrics);
      window.removeEventListener("resize", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [scrollRef, refreshKey]);

  return (
    <div
      className={`projects-rail-scrollbar${className ? ` ${className}` : ""}`}
      style={{
        "--rail-thumb-left": `${metrics.thumbLeft}%`,
        "--rail-thumb-width": `${metrics.thumbWidth}%`,
      }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

function ProjectsView({
  activeFilter,
  activeProjectPanel,
  activeProject,
  filteredProjects,
  onActivateProject,
  onProjectPanelChange,
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
        <div className="projects-panel-toggle-list" aria-label="Project panel">
          {["preview", "details"].map((panel) => (
            <button
              key={panel}
              className={`projects-panel-toggle${activeProjectPanel === panel ? " is-active" : ""}`}
              type="button"
              onClick={() => onProjectPanelChange(panel)}
              aria-pressed={activeProjectPanel === panel}
            >
              {panel}
            </button>
          ))}
        </div>
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
        <ProjectRailScrollbar scrollRef={projectListRef} refreshKey={filteredProjects.length} />

        <aside
          className={`projects-media-panel projects-panel-surface${activeProjectPanel === "preview" ? " is-active" : ""}`}
          aria-label={`${activeProject.title} media preview`}
        >
          <p className="projects-detail-label">Preview</p>
          {activeProject.previewItems ? (
            <div
              className={`projects-media-stack${activeProject.previewStackClass ? ` ${activeProject.previewStackClass}` : ""}`}
              style={{ "--preview-count": activeProject.previewItems.length }}
            >
              {activeProject.previewItems.map((item) => (
                <div
                  className={`projects-media-frame${item.layout ? ` is-${item.layout}` : ""}`}
                  style={item.aspectRatio ? { "--preview-aspect": item.aspectRatio } : undefined}
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
            <div
              className={`projects-media-frame${activeProject.previewLayout ? ` is-${activeProject.previewLayout}` : ""}`}
              style={activeProject.previewAspectRatio ? { "--preview-aspect": activeProject.previewAspectRatio } : undefined}
            >
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

        <aside
          className={`projects-detail-panel projects-panel-surface${activeProjectPanel === "details" ? " is-active" : ""}`}
          aria-live="polite"
          aria-label={`${activeProject.title} details`}
        >
          <p className="projects-detail-label">Details</p>
          <h2>{activeProject.title}</h2>
          <p className="projects-detail-type">{activeProject.type}</p>
          <div className="projects-detail-copy">
            {activeProject.detailSections ? (
              activeProject.detailSections.map(([label, value]) => (
                <section className="projects-detail-section" key={label}>
                  <h3>{label}</h3>
                  <p>{value}</p>
                </section>
              ))
            ) : (
              <>
                <p>{activeProject.summary}</p>
                {activeProject.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </>
            )}
          </div>
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

function ProjectPreviewMedia({ project }) {
  return project.previewItems ? (
    <div
      className={`projects-media-stack${project.previewStackClass ? ` ${project.previewStackClass}` : ""}`}
      style={{ "--preview-count": project.previewItems.length }}
    >
      {project.previewItems.map((item) => (
        <div
          className={`projects-media-frame${item.layout ? ` is-${item.layout}` : ""}`}
          style={item.aspectRatio ? { "--preview-aspect": item.aspectRatio } : undefined}
          key={item.label}
        >
          {item.video ? (
            <video
              key={item.video}
              src={item.video}
              poster={item.poster || project.image}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : item.image ? (
            <img
              className={item.imageClass || project.imageClass}
              src={item.image}
              alt={`${project.title} ${item.label} preview`}
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
    <div
      className={`projects-media-frame${project.previewLayout ? ` is-${project.previewLayout}` : ""}`}
      style={project.previewAspectRatio ? { "--preview-aspect": project.previewAspectRatio } : undefined}
    >
      {project.previewVideo ? (
        <video
          key={project.previewVideo}
          src={project.previewVideo}
          poster={project.previewPoster || project.image}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : project.previewImage || project.image ? (
        <img
          className={project.previewImageClass || project.imageClass}
          src={project.previewImage || project.image}
          alt={project.alt}
        />
      ) : (
        <div className="serenity-project-placeholder projects-media-placeholder" aria-hidden="true">
          <span>{project.title}</span>
        </div>
      )}
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <>
      <p className="projects-detail-label">Details</p>
      <h2>{project.title}</h2>
      <p className="projects-detail-type">{project.type}</p>
      <div className="projects-detail-copy">
        {project.detailSections ? (
          project.detailSections.map(([label, value]) => (
            <section className="projects-detail-section" key={label}>
              <h3>{label}</h3>
              <p>{value}</p>
            </section>
          ))
        ) : (
          <>
            <p>{project.summary}</p>
            {project.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </>
        )}
      </div>
      {project.href && (
        <a className="projects-open-link" href={project.href} target="_blank" rel="noreferrer">
          Open project
        </a>
      )}
    </>
  );
}

function MobileProjectsView({
  activeFilter,
  activeProjectPanel,
  activeProject,
  filteredProjects,
  onActivateProject,
  onProjectPanelChange,
  onProjectFilterChange,
  onBack,
}) {
  const mobileProjectListRef = useRef(null);

  return (
    <main className="mobile-projects-shell" aria-label="Serenity mobile project portfolio">
      <header className="mobile-projects-topbar">
        <button className="projects-brand-button" type="button" onClick={onBack} aria-label="Return to home">
          <span className="projects-brand-name">Melissa Leavenworth</span>
        </button>
        <h1 className="mobile-projects-title" aria-label="Projects">
          <RepelText text="Projects" />
        </h1>
      </header>

      <div className="mobile-projects-filter-list" aria-label="Project filters">
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

      <section className="mobile-projects-stage" aria-live="polite" aria-label={`${activeProject.title} selected project`}>
        <div className="projects-panel-toggle-list mobile-projects-panel-toggle-list" aria-label="Project panel">
          {["preview", "details"].map((panel) => (
            <button
              key={panel}
              className={`projects-panel-toggle${activeProjectPanel === panel ? " is-active" : ""}`}
              type="button"
              onClick={() => onProjectPanelChange(panel)}
              aria-pressed={activeProjectPanel === panel}
            >
              {panel}
            </button>
          ))}
        </div>
        <div className={`mobile-projects-preview-panel mobile-projects-panel-surface${activeProjectPanel === "preview" ? " is-active" : ""}`}>
          <div className="mobile-projects-hero">
            {activeProject.image ? (
              <img className={activeProject.imageClass} src={activeProject.image} alt={activeProject.alt} />
            ) : (
              <div className="serenity-project-placeholder" aria-hidden="true">
                <span>{activeProject.title}</span>
              </div>
            )}
            <div className="serenity-project-copy">
              <h2>{activeProject.title}</h2>
              <p>{activeProject.type}</p>
            </div>
          </div>

          <div className="mobile-projects-preview" aria-label={`${activeProject.title} media preview`}>
            <ProjectPreviewMedia project={activeProject} />
          </div>
        </div>

        <aside className={`mobile-projects-details mobile-projects-panel-surface${activeProjectPanel === "details" ? " is-active" : ""}`} aria-label={`${activeProject.title} details`}>
          <ProjectDetails project={activeProject} />
        </aside>
      </section>

      <section className="mobile-projects-rail" ref={mobileProjectListRef} aria-label="Choose a project">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            className={`mobile-projects-rail-card${activeProject.id === project.id ? " is-active" : ""}`}
            type="button"
            onClick={() => onActivateProject(project.id)}
            aria-pressed={activeProject.id === project.id}
          >
            {project.image ? (
              <img className={project.imageClass} src={project.image} alt="" loading="lazy" />
            ) : (
              <div className="serenity-project-placeholder" aria-hidden="true">
                <span>{project.title}</span>
              </div>
            )}
            <span>{project.title}</span>
          </button>
        ))}
      </section>
      <ProjectRailScrollbar
        scrollRef={mobileProjectListRef}
        className="mobile-projects-rail-scrollbar"
        refreshKey={filteredProjects.length}
      />
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
  const [activeProjectPanel, setActiveProjectPanel] = useState("preview");
  const [activeProjectId, setActiveProjectId] = useState(defaultProjectId);
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
    || portfolioProjects.find((project) => project.id === defaultProjectId)
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
    setActiveProjectId(nextProjects[0]?.id || defaultProjectId);
  };
  const activateMostVisibleProject = () => {
    const list = projectListRef.current;
    if (!list) return;

    const isScrolledToBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 2;
    if (isScrolledToBottom) {
      setActiveProjectId(filteredProjects[filteredProjects.length - 1]?.id || defaultProjectId);
      return;
    }

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
      <div className="too-smol-message" aria-live="polite">
        too smol! please expand!
      </div>
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
            <MobileProjectsView
              activeFilter={activeProjectFilter}
              activeProjectPanel={activeProjectPanel}
              activeProject={activeProject}
              filteredProjects={filteredProjects}
              onActivateProject={setActiveProjectId}
              onProjectPanelChange={setActiveProjectPanel}
              onProjectFilterChange={changeProjectFilter}
              onBack={showHome}
            />
          ) : (
          <ProjectsView
            activeFilter={activeProjectFilter}
            activeProjectPanel={activeProjectPanel}
            activeProject={activeProject}
            filteredProjects={filteredProjects}
            onActivateProject={setActiveProjectId}
            onProjectPanelChange={setActiveProjectPanel}
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

            <div className="center-actions-widget">
              <button
                className="center-action-button action-designs"
                type="button"
                onClick={showProjects}
              >
                See My Projects
              </button>
            </div>
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
