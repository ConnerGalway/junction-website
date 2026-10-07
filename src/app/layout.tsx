import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, Fraunces, Epilogue } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "900",
  style: "italic",
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: "900",
});

export const metadata: Metadata = {
  title: "Junction | Strategy & Capacity Building",
  description:
    "Junction is where organizations and technology meet. We build marketing strategy for destinations, and we train the people who deliver it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} ${fraunces.variable} ${epilogue.variable} antialiased`}
    >
      <body className="min-h-screen bg-newsprint text-carbon">{children}</body>
    </html>
  );
}
