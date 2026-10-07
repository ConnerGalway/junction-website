import type { Metadata } from "next";
import { Button, Card, Container, Eyebrow, Section, TextLink } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Pick a program and answer a few questions. Conner reads every one and replies personally.",
};

export default function ContactPage() {
  return (
    <>
      {/* Main */}
      <Section spacing="tight">
        <Container className="grid items-start gap-[clamp(40px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]">
          {/* Left column */}
          <div>
            <Eyebrow className="mb-6">Start a conversation</Eyebrow>
            <h1 className="type-display m-0">Tell us what you&apos;re after.</h1>
            <p className="type-lead m-0 mt-7 mb-10">
              Pick a program and answer a few questions. Conner reads every one
              and replies personally.
            </p>

            {/* Rather just talk card */}
            <Card tone="carbon" className="flex max-w-[460px] flex-col gap-3.5">
              <h2 className="type-h3 m-0">Rather just talk?</h2>
              <p className="type-body text-muted m-0">
                Book 20 minutes with Conner. No forms, no prep.
              </p>
              <Button href={CALENDLY_URL} className="self-start">
                Book a 20-min call
              </Button>
            </Card>

            <p className="type-small m-0 mt-6">
              Or email{" "}
              <TextLink href="mailto:conner@wearejunction.com">
                conner@wearejunction.com
              </TextLink>
            </p>
          </div>

          {/* Form */}
          <Card>
            <ContactForm />
          </Card>
        </Container>
      </Section>
    </>
  );
}
