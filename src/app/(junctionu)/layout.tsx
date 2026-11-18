import { Oswald } from "next/font/google";
import { SkipLink } from "@/components";
import { JuFooter, JuNav } from "@/components/junctionu";
import { ELU_LOGO } from "@/lib/junctionuImages";

/** Oswald: eLearningU's lead font (headlines and titles). Loaded for eLearningU pages only. */
const oswald = Oswald({
  variable: "--nf-oswald",
  subsets: ["latin"],
  weight: ["600", "700"],
});

/**
 * The eLearningU sub-brand: its own nav, footer, tokens (.ju) and font, with
 * none of the main site's chrome. Same domain and deploy as the main site.
 */
export default function JunctionULayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ju ${oswald.variable} isolate flex flex-1 flex-col overflow-x-clip`}>
      <SkipLink />
      <JuNav logo={ELU_LOGO} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <JuFooter logo={ELU_LOGO} />
    </div>
  );
}
