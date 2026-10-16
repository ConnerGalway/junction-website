import { Oswald } from "next/font/google";
import { SkipLink } from "@/components";

/** Oswald: JunctionU's lead font (headlines and titles). Loaded for JunctionU pages only. */
const oswald = Oswald({
  variable: "--nf-oswald",
  subsets: ["latin"],
  weight: ["600", "700"],
});

/**
 * The JunctionU sub-brand: its own nav, footer, tokens (.ju) and font, with
 * none of the main site's chrome. Same domain and deploy as the main site.
 */
export default function JunctionULayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ju ${oswald.variable} flex flex-1 flex-col`}>
      <SkipLink />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
    </div>
  );
}
