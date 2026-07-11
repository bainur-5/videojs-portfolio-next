import type { Dictionary } from "@/types/content";

const dictionary: Dictionary = {
  nav: {
    home: "Home",
    players: "Players",
    caseStudy: "Case study",
    about: "About",
    contact: "Contact",
    primaryLabel: "Primary navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },
  common: {
    openConcept: "Open concept",
    play: "Play",
    pause: "Pause",
    mute: "Mute",
    unmute: "Unmute",
    fullscreen: "Fullscreen",
  },
  home: {
    hero: {
      kicker: "Video interface portfolio",
      title: "Player systems designed for real products.",
      body: "A focused portfolio about custom video experiences: streaming, education, product media and cinematic interfaces.",
      primary: "Explore players",
      secondary: "Read the case study",
      featured: "Featured concept",
      concept: "Cinema / 01",
    },
    featured: {
      kicker: "Selected work / 2026",
      title: "Selected player concepts",
      body: "Four scenarios, each built around a different user need rather than a recycled template.",
    },
    process: {
      kicker: "System thinking",
      title: "How the work is structured",
      body: "Clear interaction logic, reusable architecture and careful responsive behaviour.",
      items: [
        {
          title: "Interaction hierarchy",
          body: "Primary controls remain visible. Secondary controls appear only when they are useful.",
        },
        {
          title: "Reusable structure",
          body: "Each concept shares a system without looking like the same component copied four times.",
        },
        {
          title: "Responsive behaviour",
          body: "Player size, spacing and control density adapt to the real viewing context.",
        },
      ],
    },
    contact: {
      kicker: "Start a conversation",
      title: "Have a player interface in mind?",
      body: "Let’s turn it into a clear, testable product concept.",
    },
  },
  players: {
    kicker: "Collection / 04 concepts",
    title: "Player concepts",
    body: "A compact collection of product-focused video interfaces.",
    cards: {
      cinema: {
        title: "Cinema player",
        body: "Minimal chrome, cinematic framing and deliberate content hierarchy.",
      },
      course: {
        title: "Course player",
        body: "Chapters, lesson progress and practical learning controls.",
      },
      live: {
        title: "Live stream",
        body: "Low-distraction controls for events, talks and live broadcasts.",
      },
      product: {
        title: "Product media",
        body: "A compact player for demos, documentation and launch pages.",
      },
    },
  },
  player: {
    concept: "player concept",
    useCase: "Use case",
    focus: "Focus",
    focusValue: "Hierarchy & controls",
    nextBuild: "Next build",
    nextBuildValue: "React + Video.js v10",
    noteKicker: "Design note",
    noteTitle: "Built around viewing intent, not decorative effects.",
    noteBody1:
      "The layout keeps the content frame dominant. Controls sit on a quiet baseline, and all secondary information moves outside the player instead of competing with the video.",
    noteBody2:
      "In the Next.js version, the player becomes a reusable component with typed props, clean lifecycle management and separate UI states.",
  },
  caseStudy: {
    kicker: "Process / case study",
    title: "Case study",
    body: "How a generic video component becomes a product-specific interface.",
    steps: [
      {
        title: "The problem",
        body: "Most player demos stop at visual styling. Real products need clear states, accessible controls, responsive behaviour and a component model that can survive new features.",
      },
      {
        title: "The approach",
        body: "Start from user intent, define the control hierarchy, prototype the critical states and only then build the reusable component architecture.",
      },
      {
        title: "The result",
        body: "A portfolio system that feels coherent while each player still has its own purpose and interaction model.",
      },
    ],
    boardLabel: "Player state map",
    states: [
      { title: "Idle", body: "Poster + intent" },
      { title: "Playing", body: "Focus on content" },
      { title: "Paused", body: "Context returns" },
      { title: "Complete", body: "Next action" },
    ],
  },
  about: {
    kicker: "About / focus",
    title: "About the project",
    body: "A frontend portfolio focused on video interfaces, streaming UI and media-heavy product experiences.",
    direction: "Direction",
    directionTitle: "Frontend work for media-rich products.",
    directionBody:
      "Video is not only a rectangle with controls. It changes how users learn, compare, watch, continue and decide.",
    stack: "Planned production stack",
    stackTitle: "Next.js / React / TypeScript",
    stackBody:
      "Next.js, React, TypeScript and SCSS Modules. The static prototype is intentionally dependency-free.",
    principles: "Design principles",
    principleItems: [
      "Less decoration, more hierarchy.",
      "Controls must explain themselves.",
      "Responsive behaviour is part of the design, not a final patch.",
    ],
  },
  contact: {
    kicker: "Contact / project inquiry",
    title: "Contact",
    body: "For custom players, frontend implementation or product interface work.",
    name: "Name",
    email: "Email",
    message: "Project details",
    send: "Send request",
    sent: "Sent",
    availability: "Availability",
    availabilityTitle: "Open for selected frontend and player interface work.",
    availabilityBody:
      "Best fit: custom media UI, product demos, course platforms and streaming frontends.",
  },
  footer: { note: "Static design prototype • EN / RU / KY" },
};

export default dictionary;
