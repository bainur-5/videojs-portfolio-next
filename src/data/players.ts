import type {
  CinemaCaptionTrack,
  CinemaPlayerLabels,
  PlayerSlug,
} from "@/types/content";

export type Player = {
  slug: PlayerSlug;
  number: string;
  tag: string;
  poster: string;
  src: string;
  posterAlt?: string;
  title: string;
  eyebrow?: string;
  badge?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  captions?: readonly CinemaCaptionTrack[];
  labels?: Partial<CinemaPlayerLabels>;
};

export const players: Player[] = [
  {
    slug: "cinema",
    number: "01",
    tag: "16:9 / cinematic",
    src: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
    poster:
      "https://image.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/thumbnail.webp?time=2",
    posterAlt: "Mountain landscape from the cinema player demo",
    title: "Beyond the Ridge",
    badge: "4K",
    captions: [
      {
        src: "/media/cinema-en.vtt",
        srcLang: "en",
        label: "English",
        default: true,
      },
    ],
    eyebrow: "Original short film",
    labels: {
      player: "Cinema player demo",
      controls: "Video controls",
    },
  },
  {
    slug: "course",
    number: "02",
    tag: "chapters / progress",
    poster: "/images/players/poster-course.svg",
    src: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
    title: "Beyond the Ridge",
  },
  {
    slug: "live",
    number: "03",
    tag: "live / event",
    poster: "/images/players/poster-live.svg",
    src: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
    title: "Beyond the Ridge",
  },
  {
    slug: "product",
    number: "04",
    tag: "demo / docs",
    poster: "/images/players/poster-product.svg",
    src: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
    title: "Beyond the Ridge",
  },
];

export function getPlayer(slug: string) {
  return players.find((player) => player.slug === slug);
}
