import type { Metadata } from "next";
import { Button, Container, Section, TextLink } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Pick a program and answer a few questions. Conner reads every one and replies personally.",
};

/**
 * Contact. Two columns from lg (form / 320px aside, 64px gap): the heading
 * sits in row 1 so the aside top-aligns with the form card in row 2. Below
 * lg it's one column in DOM order: heading, form, aside.
 */
export default function ContactPage() {
  return (
    <Section spacing="tight">
      <Container>
        <div className="grid gap-y-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-x-16">
          <div className="lg:col-start-1">
            <h1 className="type-display m-0">Tell us what you&apos;re after.</h1>
            <p className="type-lead m-0 mt-6 max-w-[620px]">
              Pick a program and answer a few questions. Conner reads every one
              and replies personally.
            </p>
          </div>

          {/* The form card (an exception: radius 18, padding 36, card shadow;
              flat on mobile). */}
          <div className="bg-newsprint lg:col-start-1 md:rounded-[18px] md:p-9 md:shadow-card">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-6 lg:col-start-2 lg:row-start-2">
            <div className="tone-sage flex flex-col gap-3 rounded-[14px] bg-sage-25 p-7">
              <h2 className="m-0 font-display text-[20px] leading-tight font-semibold text-forest">
                Rather just talk?
              </h2>
              <p className="type-body m-0">Twenty minutes with Conner, no pitch deck.</p>
              <Button href={CALENDLY_URL} className="mt-2 self-start">
                Book a 20-min call
              </Button>
            </div>
            <ul className="type-small m-0 flex list-none flex-col gap-1.5 p-0">
              <li>
                <TextLink href="mailto:conner@wearejunction.com">conner@wearejunction.com</TextLink>
              </li>
              <li>
                <TextLink href="tel:+16045050444">604-505-0444</TextLink>
              </li>
              <li>7-1238 Homer Street, Vancouver BC</li>
            </ul>
          </aside>
        </div>

        {/* Existing learners and subscribers go to support, not the form. */}
        <p className="type-small m-0 mt-16 border-t border-carbon pt-5">
          Already a JunctionU learner or Industry Scan subscriber? For courses,
          sign-in, certificates or your subscription, email support.{" "}
          {/* TODO: the team's support address (mailto:) and label. */}
          <TextLink href="mailto:" arrow>[ support email ]</TextLink>
        </p>
      </Container>
    </Section>
  );
}
