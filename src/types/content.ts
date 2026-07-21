export const locales = ["en", "ru", "ky"] as const;
export type Locale = (typeof locales)[number];

export type Dictionary = {
  nav: {
    home: string;
    players: string;
    caseStudy: string;
    about: string;
    contact: string;
    primaryLabel: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
  };
  common: {
    openConcept: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    fullscreen: string;
  };
  home: {
    hero: {
      kicker: string;
      title: string;
      body: string;
      primary: string;
      secondary: string;
      featured: string;
      concept: string;
    };
    featured: { kicker: string; title: string; body: string };
    process: {
      kicker: string;
      title: string;
      body: string;
      items: Array<{ title: string; body: string }>;
    };
    contact: { kicker: string; title: string; body: string };
  };
  players: {
    kicker: string;
    title: string;
    body: string;
    cards: Record<PlayerSlug, { title: string; body: string }>;
  };
  player: {
    concept: string;
    useCase: string;
    focus: string;
    focusValue: string;
    nextBuild: string;
    nextBuildValue: string;
    noteKicker: string;
    noteTitle: string;
    noteBody1: string;
    noteBody2: string;
  };
  caseStudy: {
    kicker: string;
    title: string;
    body: string;
    steps: Array<{ title: string; body: string }>;
    boardLabel: string;
    states: Array<{ title: string; body: string }>;
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    direction: string;
    directionTitle: string;
    directionBody: string;
    stack: string;
    stackTitle: string;
    stackBody: string;
    principles: string;
    principleItems: string[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sent: string;
    availability: string;
    availabilityTitle: string;
    availabilityBody: string;
  };
  footer: { note: string };
};

export type PlayerSlug = "cinema" | "course" | "live" | "product";


export interface CinemaCaptionTrack {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
}

export interface CinemaPlayerLabels {
  player: string;
  controls: string;
  playPause: string;
  seekBackward: string;
  seekForward: string;
  mute: string;
  captions: string;
  playbackRate: string;
  pictureInPicture: string;
  fullscreen: string;
  timeline: string;
  volume: string;
}

export interface CinemaPlayerProps {
  src: string;
  poster?: string;
  posterAlt?: string;
  title: string;
  eyebrow?: string;
  badge?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  captions?: readonly CinemaCaptionTrack[];
  labels?: Partial<CinemaPlayerLabels>;
}