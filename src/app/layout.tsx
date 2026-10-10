import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, Fraunces, Epilogue } from "next/font/google";
import { Footer, Header, SkipLink } from "@/components";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--nf-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bebasNeue = Bebas_Neue({
  variable: "--nf-bebas",
  subsets: ["latin"],
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--nf-fraunces",
  subsets: ["latin"],
  weight: "900",
  style: "italic",
});

const epilogue = Epilogue({
  variable: "--nf-epilogue",
  subsets: ["latin"],
  weight: ["600", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Junction | Strategy & Capacity Building",
    template: "%s | Junction",
  },
  description:
    "Junction is where organizations and technology meet. We build marketing strategy for destinations, and we train the people who deliver it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${bebasNeue.variable} ${fraunces.variable} ${epilogue.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-newsprint font-sans text-carbon">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
