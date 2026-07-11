import type { PlayerSlug } from "@/types/content";

export type Player = {
  slug: PlayerSlug;
  number: string;
  tag: string;
  poster: string;
};

export const players: Player[] = [
  {
    slug: "cinema",
    number: "01",
    tag: "16:9 / cinematic",
    poster: "/images/players/poster-cinema.svg",
  },
  {
    slug: "course",
    number: "02",
    tag: "chapters / progress",
    poster: "/images/players/poster-course.svg",
  },
  {
    slug: "live",
    number: "03",
    tag: "live / event",
    poster: "/images/players/poster-live.svg",
  },
  {
    slug: "product",
    number: "04",
    tag: "demo / docs",
    poster: "/images/players/poster-product.svg",
  },
];

export function getPlayer(slug: string) {
  return players.find((player) => player.slug === slug);
}
