import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components";

const beliefs = [
  {
    num: "01",
    title: "The best engagement is one you never have to repeat.",
    description:
      "Every plan is built for handover. Every program is built to be owned by the people who run it. Your team should need us less every month.",
  },
  {
    num: "02",
    title: "Independence keeps advice honest.",
    description:
      "We only do strategy and training. Nothing we recommend earns us a commission, so everything we recommend is there on merit.",
  },
  {
    num: "03",
    title: "Plain language, always.",
    description:
      "If an idea can't be explained to a busy operator between two guest check-ins, it needs more work. Jargon usually means someone's hiding.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(56px, 8vw, 112px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)",
        }}
      >
        <div className="content-container">
          <div
            className="text-accent-2"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "22px",
            }}
          >
            About
          </div>
          <h1 className="text-h1 m-0" style={{ maxWidth: "14ch" }}>
            A junction is where routes meet. So are we.
          </h1>
          <div
            className="two-col-grid"
            style={{
              gap: "32px 72px",
              marginTop: "clamp(40px, 5vw, 64px)",
              alignItems: "start",
            }}
          >
            <Image
              src="/assets/photo-mountains.png"
              alt="Mountain town"
              width={800}
              height={533}
              className="w-full rounded object-cover"
              style={{ aspectRatio: "3/2" }}
            />
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "rgba(28, 28, 26, 0.78)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              Junction sits where organizations and technology meet, and where
              consulting meets training. We've spent fourteen years in the
              visitor economy, helping destinations and the businesses inside
              them get measurably better at marketing. In 2026 our training
              platform, eLearningU, became JunctionU and moved under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section
        className="bg-carbon text-newsprint section-padding"
      >
        <div className="content-container">
          <div
            className="text-accent-1"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            What we believe
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "40px 48px",
            }}
          >
            {beliefs.map((belief) => (
              <div
                key={belief.num}
                style={{
                  borderTop: "1px solid rgba(244, 240, 232, 0.25)",
                  paddingTop: "24px",
                }}
              >
                <div
                  className="font-bebas text-accent-1"
                  style={{ fontSize: "32px", marginBottom: "14px" }}
                >
                  {belief.num}
                </div>
                <h3
                  className="font-epilogue m-0"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}
                >
                  {belief.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "rgba(244, 240, 232, 0.78)",
                    margin: 0,
                  }}
                >
                  {belief.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="content-container">
          <div
            className="text-accent-2"
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "32px",
            }}
          >
            Who you'll work with
          </div>
          <div
            className="two-col-grid"
            style={{
              gap: "32px 72px",
              alignItems: "start",
              borderTop: "2px solid #1C1C1A",
              paddingTop: "36px",
            }}
          >
            {/* Initials placeholder */}
            <div
              className="bg-forest rounded flex items-end"
              style={{
                aspectRatio: "4/5",
                maxWidth: "420px",
                padding: "24px",
              }}
            >
              <span
                className="font-bebas text-fern"
                style={{ fontSize: "120px", lineHeight: "0.8" }}
              >
                CG
              </span>
            </div>

            <div>
              <h2 className="text-h2 m-0 mb-2">Conner Galway</h2>
              <div
                className="text-accent-2"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                Founder & Principal
              </div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(28, 28, 26, 0.78)",
                  margin: "0 0 28px",
                  maxWidth: "52ch",
                }}
              >
                Fourteen years advising destinations, operators and the
                organizations behind them. Business in Vancouver 40 Under 40.
                He's spoken at the Northern BC Tourism Summit, TIABC, Yukon's Go
                Digital Summit and the BC Craft Beer Conference, and writes The
                Brief every week.
              </p>
              <Link
                href="/services"
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                Book Conner to speak →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="start"
        className="bg-forest text-newsprint section-padding-cta"
      >
        <div className="content-container">
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(44px, 6.6vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Tell us the goal. We'll be straight with you about the rest.
          </h2>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "40px" }}
          >
            <Link
              href="#"
              className="text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
              style={{ padding: "17px 28px" }}
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
