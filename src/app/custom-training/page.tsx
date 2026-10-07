import Link from "next/link";
import { Header, Footer, Placeholder } from "@/components";
import { CALENDLY_URL } from "@/lib/constants";

const clients = [
  "Destination BC",
  "Travel Alberta",
  "Travel Yukon",
  "Travel Maine",
  "Visit Mississippi",
  "Ontario Destination Association",
  "Southwest Ontario Tourism Corporation",
  "Northern BC Tourism",
  "4VI",
  "Kootenay Rockies Tourism",
  "Tourism Red Deer",
  "Tourism Golden",
  "South Canadian Rockies Tourism",
  "Town of Okotoks",
];

const dmoFeatures = [
  "Courses on JunctionU, branded for your region",
  "Live workshops and webinar series",
  "Delivery, learner support and progress reporting",
  "You fund 25% to 100% of seats",
];

const leadershipFeatures = [
  "Workshops for leadership teams and boards",
  "Multi-session programs with homework that ships",
  "Built around your goals and your data",
  "Measured against outcomes you set at the start",
];

const formats = [
  {
    num: "01",
    title: "Live workshop",
    description: "Ninety minutes to a full day, in person or virtual.",
  },
  {
    num: "02",
    title: "Webinar series",
    description: "Short sessions over several weeks, each with homework.",
  },
  {
    num: "03",
    title: "Custom course",
    description: "Self-paced on JunctionU, with certificates and reporting.",
  },
  {
    num: "04",
    title: "Leadership program",
    description: "Multi-session, built on your strategy and real decisions.",
  },
];

export default function CustomTrainingPage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(48px, 7vw, 96px) clamp(20px, 4vw, 48px) clamp(48px, 6vw, 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
            gap: "24px 72px",
            alignItems: "end",
          }}
        >
          <div>
            <div className="text-eyebrow text-accent-shade mb-5">
              Custom training
            </div>
            <h1
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(48px, 7vw, 108px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                textWrap: "balance",
              }}
            >
              Training built around your people.
            </h1>
          </div>
          <div>
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 20px)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.76)",
                margin: "0 0 32px",
                maxWidth: "46ch",
              }}
            >
              Custom courses for the operators in your region, and programs for
              the leaders in your organization. We design it, deliver it, and
              report on what changed.
            </p>
            <div className="flex gap-6 items-center flex-wrap">
              <Link
                href="/contact?type=training"
                className="text-button bg-forest text-newsprint rounded-[3px] transition-colors hover:bg-canopy"
                style={{ padding: "17px 28px" }}
              >
                Scope a program
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
                Or book a 20-min call →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Two Audiences */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "20px",
          }}
        >
          {/* DMO Card */}
          <div
            className="bg-forest text-newsprint rounded flex flex-col gap-4"
            style={{ padding: "clamp(28px, 3.5vw, 48px)" }}
          >
            <div
              className="text-fern"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              For DMOs and tourism organizations
            </div>
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Custom courses for your operators.
            </h2>
            <p
              style={{
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.84)",
                margin: 0,
              }}
            >
              Give every business in your region training that fits their week.
              Your board gets a report showing the capacity you built.
            </p>
            <div
              className="flex flex-col"
              style={{ borderTop: "1px solid rgba(244, 240, 232, 0.2)" }}
            >
              {dmoFeatures.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 0",
                    borderBottom:
                      i < dmoFeatures.length - 1
                        ? "1px solid rgba(244, 240, 232, 0.12)"
                        : "none",
                    fontSize: "16px",
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/contact?type=training"
              className="text-fern font-medium mt-auto"
              style={{ fontSize: "15px" }}
            >
              Scope a regional program →
            </Link>
          </div>

          {/* Leadership Card */}
          <div
            className="bg-carbon text-newsprint rounded flex flex-col gap-4"
            style={{ padding: "clamp(28px, 3.5vw, 48px)" }}
          >
            <div
              className="text-accent"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              For organizations training their leaders
            </div>
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Leadership training on AI and marketing.
            </h2>
            <p
              style={{
                fontSize: "17px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.84)",
                margin: 0,
              }}
            >
              High-quality sessions for senior teams who need to make good
              decisions about AI and marketing, using your strategy and your real
              work.
            </p>
            <div
              className="flex flex-col"
              style={{ borderTop: "1px solid rgba(244, 240, 232, 0.2)" }}
            >
              {leadershipFeatures.map((f, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 0",
                    borderBottom:
                      i < leadershipFeatures.length - 1
                        ? "1px solid rgba(244, 240, 232, 0.12)"
                        : "none",
                    fontSize: "16px",
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
            <Link
              href="/contact?type=training"
              className="text-accent font-medium mt-auto"
              style={{ fontSize: "15px" }}
            >
              Scope a leadership program →
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            className="flex items-baseline justify-between gap-4 flex-wrap"
            style={{ marginBottom: "24px" }}
          >
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Organizations we&apos;ve trained.
            </h2>
            <span style={{ fontSize: "14px", color: "rgba(28, 28, 26, 0.7)" }}>
              Across Canada and the US
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              borderTop: "2px solid #1C1C1A",
              borderLeft: "1px solid rgba(28, 28, 26, 0.14)",
            }}
          >
            {clients.map((c) => (
              <div
                key={c}
                style={{
                  padding: "22px 20px",
                  borderRight: "1px solid rgba(28, 28, 26, 0.14)",
                  borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                  fontSize: "17px",
                  fontWeight: 500,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section
        className="bg-sage"
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "40px 80px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="text-forest"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Town of Okotoks · webinar series
            </div>
            <div
              className="font-bebas text-forest"
              style={{
                fontSize: "clamp(84px, 11vw, 168px)",
                lineHeight: 0.85,
              }}
            >
              $900,000+
            </div>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.82)",
                margin: "18px 0 0",
                maxWidth: "44ch",
              }}
            >
              In potential local spend identified for businesses ahead of 4,500
              visitors. Then we turned it into a three-part series where every
              action took under an hour.
            </p>
          </div>
          <div className="flex flex-col gap-7">
            <div
              className="flex items-baseline gap-4"
              style={{
                borderBottom: "1px solid rgba(26, 77, 46, 0.25)",
                paddingBottom: "22px",
              }}
            >
              <span
                className="font-bebas text-forest"
                style={{ fontSize: "64px", lineHeight: 0.85 }}
              >
                300+
              </span>
              <span style={{ fontSize: "16px" }}>
                businesses through Travel Yukon&apos;s program in four years, now led
                by alumni
              </span>
            </div>
            <blockquote
              className="m-0"
              style={{ borderLeft: "3px solid #1A4D2E", paddingLeft: "22px" }}
            >
              <p
                className="font-fraunces italic text-forest"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                }}
              >
                &quot;Functional, accessible, and personalized. Incredibly valuable
                education for our tourism sector.&quot;
              </p>
              <cite
                style={{
                  fontStyle: "normal",
                  fontSize: "14px",
                  color: "rgba(28, 28, 26, 0.75)",
                }}
              >
                Avery Bramadat, Travel Yukon
              </cite>
            </blockquote>
            <Placeholder className="text-forest">
              [ Leadership training testimonial ]
            </Placeholder>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section
        style={{ padding: "clamp(64px, 8vw, 112px) clamp(20px, 4vw, 48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div className="text-eyebrow text-accent-shade mb-4">Formats</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              borderTop: "2px solid #1C1C1A",
            }}
          >
            {formats.map((f) => (
              <div
                key={f.num}
                style={{
                  padding: "24px 24px 24px 0",
                  borderBottom: "1px solid rgba(28, 28, 26, 0.14)",
                }}
              >
                <div
                  className="font-bebas text-accent"
                  style={{ fontSize: "26px" }}
                >
                  {f.num}
                </div>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: 500,
                    margin: "6px 0",
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: "rgba(28, 28, 26, 0.76)",
                  }}
                >
                  {f.description}
                </div>
              </div>
            ))}
          </div>
          <div
            className="rounded flex items-center justify-between gap-4 flex-wrap"
            style={{
              marginTop: "40px",
              padding: "20px 24px",
              border: "1.5px solid rgba(28, 28, 26, 0.2)",
            }}
          >
            <span style={{ fontSize: "16px" }}>
              <strong style={{ fontWeight: 500 }}>See how we teach first.</strong>{" "}
              <span style={{ fontWeight: 300 }}>
                Watch a free Tourism Talk or a sample lesson.
              </span>
            </span>
            <Link
              href="/junctionu"
              className="font-medium whitespace-nowrap"
              style={{
                fontSize: "14px",
                borderBottom: "2px solid #C4963A",
                paddingBottom: "2px",
              }}
            >
              Watch free →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="start"
        className="bg-forest text-newsprint"
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
            Tell us who needs training. We&apos;ll sketch the program.
          </h2>
          <div
            className="flex items-center gap-7 flex-wrap"
            style={{ marginTop: "40px" }}
          >
            <Link
              href="/contact?type=training"
              className="text-button bg-newsprint text-forest rounded-[3px] transition-colors hover:bg-sage"
              style={{ padding: "17px 28px" }}
            >
              Scope a program
            </Link>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fern"
              style={{
                fontSize: "15px",
                borderBottom: "2px solid #7FC99A",
                paddingBottom: "3px",
              }}
            >
              Or book a 20-min call →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
