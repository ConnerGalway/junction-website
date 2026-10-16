"use client";

import { useId } from "react";
import { JuButton } from "./JuButton";

/**
 * The JunctionU email (the list the Work page links to): a Sage band with
 * the pitch, an email field and Subscribe.
 * TODO: wire to the eLearningU / JunctionU email list (no signup exists in
 * the codebase yet); nothing is sent for now.
 */
export function EmailBand() {
  const id = useId();
  return (
    <section id="email" aria-labelledby={`${id}-heading`} className="scroll-mt-20 px-gutter pb-[clamp(72px,9vw,128px)]">
      <div className="mx-auto grid max-w-wide items-center gap-x-12 gap-y-8 rounded-[18px] bg-sage p-[clamp(28px,4.5vw,56px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
        <div>
          <h2 id={`${id}-heading`} className="ju-display m-0 text-[clamp(30px,3.2vw,44px)] text-ju-ground">
            Get the JunctionU email.
          </h2>
          <p className="type-body mt-3 mb-0 text-forest">Weekly marketing tips, new courses and new Tourism Talks, first.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: send to the JunctionU email list.
          }}
          className="flex flex-wrap gap-3"
        >
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            className="min-h-12 min-w-0 flex-[1_1_220px] rounded-control border border-forest/30 bg-newsprint px-4 text-[16px] text-carbon placeholder:text-flint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          />
          <JuButton variant="ground" type="submit">
            Subscribe
          </JuButton>
        </form>
      </div>
    </section>
  );
}
