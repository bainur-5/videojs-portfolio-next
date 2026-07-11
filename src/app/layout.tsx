import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import { headers } from "next/headers";
import "./globals.scss";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});
const notoSerif = Noto_Serif({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Video Player Lab", template: "%s — Video Player Lab" },
  description: "Video interface portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-vpl-locale") ?? "en";
  return (
    <html
      lang={locale}
      className={`${notoSans.variable} ${notoSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
