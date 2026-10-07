import Link from "next/link";
import { Header, Footer, Placeholder } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

const stages = [
  "Northern BC Tourism Summit",
  "TIABC",
  "Yukon Go Digital Summit",
  "BC Craft Beer Conference",
];

const topics = [
  {
    num: "01",
    title: "AI and the work only people can do",
    description:
      "How AI takes the admin so people can spend more time on what they're best at. Real examples from contractors, suppliers and service businesses.",
    audience: "Any industry · leadership teams, associations, conferences",
  },
  {
    num: "02",
    title: "Marketing trends worth acting on",
    description:
      "What's changing in search, social, AI assistants and the creator economy, and which changes deserve a slice of your budget this year.",
    audience: "Marketers, business owners, chambers",
  },
  {
    num: "03",
    title: "Tourism strategy and marketing",
    description:
      "Where visitor demand comes from, what travellers actually search for, and how a region builds marketing capacity that outlasts a campaign.",
    audience: "DMOs, tourism summits, operator events",
  },
];

const formats = [
  { title: "Keynote", description: "30 to 60 minutes, main stage" },
  { title: "Workshop", description: "Half or full day, hands-on" },
  { title: "Panel or fireside", description: "Moderator or panellist" },
  { title: "Virtual", description: "Live online, any time zone" },
];

export default function SpeakingPage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        className="bg-carbon text-newsprint"
        style={{ padding: "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="text-accent-1"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "22px",
              }}
            >
              Speaking · Conner Galway
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(46px, 6.8vw, 104px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              Talks that send the room home with a plan.
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.82)",
                maxWidth: "46ch",
                margin: "28px 0 36px",
              }}
            >
              Keynotes, workshops and virtual sessions on AI, marketing trends
              and tourism strategy. Every talk ends with actions people can take
              that week.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <Link
                href="/contact?type=speaking"
                className="text-button bg-newsprint text-carbon rounded-[3px] transition-colors hover:bg-sage"
                style={{ padding: "17px 28px" }}
              >
                Check availability for your date
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium whitespace-nowrap"
                style={{
                  fontSize: "15px",
                  borderBottom: "2px solid #C4963A",
                  paddingBottom: "3px",
                }}
              >
                Book a 20-min call →
              </a>
            </div>
          </div>

          {/* Video placeholder */}
          <Placeholder className="text-newsprint" aspectRatio="16/9">
            [ video: 60-second speaker reel ]
          </Placeholder>
        </div>

        {/* Recent stages */}
        <div
          style={{
            maxWidth: "1320px",
            margin: "56px auto 0",
            paddingTop: "24px",
            borderTop: "1px solid rgba(244, 240, 232, 0.15)",
            display: "flex",
            gap: "12px 36px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(244, 240, 232, 0.78)",
            }}
          >
            Recent stages
          </span>
          {stages.map((s) => (
            <span key={s} style={{ fontSize: "16px", fontWeight: 500 }}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="text-eyebrow text-accent-2 mb-4">Topics</div>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 4.6vw, 64px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              margin: "0 0 44px",
            }}
          >
            Three talks, tailored to your room.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "20px",
            }}
          >
            {topics.map((t) => (
              <div
                key={t.num}
                className="bg-newsprint rounded flex flex-col gap-3.5"
                style={{
                  padding: "clamp(26px, 3vw, 36px)",
                  borderTop: "4px solid #1A4D2E",
                }}
              >
                <span
                  className="font-bebas text-accent-1"
                  style={{ fontSize: "30px" }}
                >
                  {t.num}
                </span>
                <h3
                  className="font-epilogue m-0"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(24px, 2.4vw, 32px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "rgba(28, 28, 26, 0.76)",
                    margin: 0,
                  }}
                >
                  {t.description}
                </p>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(28, 28, 26, 0.72)",
                    marginTop: "auto",
                    paddingTop: "10px",
                  }}
                >
                  {t.audience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            borderTop: "2px solid #1C1C1A",
          }}
        >
          {formats.map((f) => (
            <div
              key={f.title}
              style={{
                padding: "24px 24px 24px 0",
                borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
              }}
            >
              <div style={{ fontSize: "19px", fontWeight: 500, marginBottom: "6px" }}>
                {f.title}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(28, 28, 26, 0.76)",
                }}
              >
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Conner */}
      <section
        className="bg-forest text-newsprint"
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "40px 80px",
            alignItems: "center",
          }}
        >
          <Placeholder className="text-newsprint" aspectRatio="4/5">
            [ photo: Conner on stage ]
          </Placeholder>
          <div>
            <div
              className="text-fern"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Your speaker
            </div>
            <h2
              className="font-epilogue"
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px, 4.6vw, 64px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                margin: "0 0 22px",
              }}
            >
              Conner Galway
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "rgba(244, 240, 232, 0.86)",
                margin: "0 0 28px",
                maxWidth: "52ch",
              }}
            >
              Founder of Junction. Fourteen years advising organizations on
              marketing and technology, 2,000+ people trained, and a Business in
              Vancouver 40 Under 40. He writes The Brief, a weekly newsletter for
              marketers, and he still runs the programs he talks about.
            </p>
            <Placeholder className="text-newsprint">
              [ Event organizer testimonial ]
            </Placeholder>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="start"
        style={{ padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <h2
            className="font-epilogue"
            style={{
              fontWeight: 900,
              fontSize: "clamp(44px, 6.6vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              maxWidth: "15ch",
            }}
          >
            Got a date? Let&apos;s check it.
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 300,
              lineHeight: 1.6,
              color: "rgba(28, 28, 26, 0.76)",
              margin: "24px 0 0",
              maxWidth: "46ch",
            }}
          >
            Send your event, date and audience. You&apos;ll hear back with availability
            and a fee for your format.
          </p>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "36px" }}
          >
            <Link
              href="/contact?type=speaking"
              className="text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
              style={{ padding: "17px 28px" }}
            >
              Check availability
            </Link>
            <a
              href="mailto:conner@wearejunction.com"
              className="font-medium"
              style={{
                fontSize: "15px",
                borderBottom: "2px solid #C4963A",
                paddingBottom: "3px",
              }}
            >
              conner@wearejunction.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
