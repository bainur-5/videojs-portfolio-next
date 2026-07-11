import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", "aria-hidden": true } as const;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}
export function PauseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
    </svg>
  );
}
export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function VolumeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 10v4h4l5 4V6l-5 4H4zM16 9c1.2.8 2 1.8 2 3s-.8 2.2-2 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function VolumeMutedIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 10v4h4l5 4V6l-5 4H4zM17 9l4 6M21 9l-4 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function FullscreenIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M4 6h16v12H4zM4 7l8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5 12l4 4 10-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
