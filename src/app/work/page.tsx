import Link from "next/link";
import { Header, Footer } from "@/components";

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-newsprint text-carbon font-dm-sans">
      <Header />

      {/* Hero */}
      <section
        style={{
          padding:
            "clamp(56px, 8vw, 112px) clamp(20px, 4vw, 48px) clamp(40px, 5vw, 72px)",
        }}
      >
        <div
          className="content-container two-col-grid"
          style={{ gap: "24px 72px", alignItems: "end" }}
        >
          <div>
            <div
              className="text-accent-shade"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "22px",
              }}
            >
              Work
            </div>
            <h1 className="text-h1 m-0">Real regions. Real numbers.</h1>
          </div>
          <p
            className="text-body m-0"
            style={{ color: "rgba(28, 28, 26, 0.74)", maxWidth: "46ch" }}
          >
            Four engagements, told with the actual results. Each one links to
            the service that produced it. Soon you'll be able to flip through
            the deliverables too.
          </p>
        </div>
      </section>

      {/* Travel Yukon */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px)" }}>
        <div
          className="content-container"
          style={{
            borderTop: "2px solid #1C1C1A",
            padding: "clamp(40px, 5vw, 72px) 0",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "32px 72px",
          }}
        >
          <div>
            <div
              className="text-accent-shade"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Travel Yukon · Training · 4 years
            </div>
            <div
              className="font-bebas text-accent"
              style={{
                fontSize: "clamp(96px, 13vw, 200px)",
                lineHeight: "0.85",
              }}
            >
              300+
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500, marginTop: "10px" }}>
              Businesses through the Go Digital program
            </div>
          </div>
          <div
            className="flex flex-col justify-end"
            style={{ gap: "28px" }}
          >
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Go Digital program
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.74)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              A territory-wide digital capacity program, from Whitehorse to
              Dawson City. 300+ businesses came through in four years, and
              alumni now lead the program themselves.
            </p>
            <blockquote
              className="m-0"
              style={{ borderLeft: "3px solid #C4963A", paddingLeft: "22px" }}
            >
              <p
                className="font-fraunces text-forest"
                style={{
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                }}
              >
                "Incredibly valuable insights and education for our tourism
                sector."
              </p>
              <cite
                style={{
                  fontStyle: "normal",
                  fontSize: "14px",
                  color: "rgba(28, 28, 26, 0.66)",
                }}
              >
                Avery Bramadat, Travel Yukon
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ITBC */}
      <section
        className="bg-forest text-newsprint"
        style={{ padding: "0 clamp(20px, 4vw, 48px)" }}
      >
        <div
          className="content-container"
          style={{
            padding: "clamp(56px, 7vw, 96px) 0",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "32px 72px",
          }}
        >
          <div>
            <div
              className="text-fern"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Indigenous Tourism BC · Accelerator · 3 months
            </div>
            <div
              className="font-bebas text-fern"
              style={{
                fontSize: "clamp(96px, 13vw, 200px)",
                lineHeight: "0.85",
              }}
            >
              +300%
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500, marginTop: "10px" }}>
              Past engagement goal
            </div>
          </div>
          <div
            className="flex flex-col justify-end"
            style={{ gap: "28px" }}
          >
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Accelerator across ITBC members
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.82)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              Assessments, one-to-one coaching and implementation plans,
              subsidised by ITBC for its member businesses. Engagement landed
              300% past goal, with bookings up across the province inside three
              months.
            </p>
            <Link
              href="/services"
              className="text-fern"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              About the Accelerator →
            </Link>
          </div>
        </div>
      </section>

      {/* Ontario's Southwest */}
      <section style={{ padding: "0 clamp(20px, 4vw, 48px)" }}>
        <div
          className="content-container"
          style={{
            padding: "clamp(56px, 7vw, 96px) 0",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "32px 72px",
          }}
        >
          <div>
            <div
              className="text-accent-shade"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Ontario's Southwest · Research · 2025–26
            </div>
            <div
              className="font-bebas text-accent"
              style={{
                fontSize: "clamp(96px, 13vw, 200px)",
                lineHeight: "0.85",
              }}
            >
              2026
            </div>
            <div style={{ fontSize: "15px", fontWeight: 500, marginTop: "10px" }}>
              Tourism strategy driven by our findings
            </div>
          </div>
          <div
            className="flex flex-col justify-end"
            style={{ gap: "28px" }}
          >
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Traveller Insights Study
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(28, 28, 26, 0.74)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              Region-wide research into who visits Southwest Ontario, why they
              come, and what brings them back. The findings now drive the
              region's 2026 tourism strategy.
            </p>
            <blockquote
              className="m-0"
              style={{ borderLeft: "3px solid #C4963A", paddingLeft: "22px" }}
            >
              <p
                className="font-fraunces text-forest"
                style={{
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: 1.2,
                  margin: "0 0 12px",
                }}
              >
                "Invaluable support to our region, our DMOs and our operators."
              </p>
              <cite
                style={{
                  fontStyle: "normal",
                  fontSize: "14px",
                  color: "rgba(28, 28, 26, 0.66)",
                }}
              >
                Joanne Wolnik, Ontario's Southwest
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Kootenay Rockies */}
      <section
        className="bg-carbon text-newsprint"
        style={{ padding: "0 clamp(20px, 4vw, 48px)" }}
      >
        <div
          className="content-container"
          style={{
            padding: "clamp(56px, 7vw, 96px) 0",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "32px 72px",
            alignItems: "end",
          }}
        >
          <div>
            <div
              className="text-accent"
              style={{
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Kootenay Rockies · Strategy
            </div>
            <p
              className="font-fraunces text-fern"
              style={{
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.08,
                margin: "0 0 20px",
              }}
            >
              "We are a stronger, smarter tourism organization today thanks to
              the work we did with Junction."
            </p>
            <cite
              style={{
                fontStyle: "normal",
                fontSize: "14px",
                color: "rgba(244, 240, 232, 0.7)",
              }}
            >
              Kathy Cooper, CEO, Kootenay Rockies Tourism
            </cite>
          </div>
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <h2
              className="font-epilogue m-0"
              style={{
                fontWeight: 900,
                fontSize: "clamp(28px, 3vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              A region running its own playbook
            </h2>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "rgba(244, 240, 232, 0.82)",
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              Destination marketing strategy. Marketing operations restructured
              around the activities with the most impact, with new investment
              redirected into responsible travel.
            </p>
          </div>
        </div>
      </section>

      {/* Note */}
      <section style={{ padding: "40px clamp(20px, 4vw, 48px)" }}>
        <p
          className="content-container"
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(28, 28, 26, 0.74)",
            margin: 0,
          }}
        >
          More case studies are on the way, including the Okotoks visitor
          economy series and its $900,000 in identified local spend.
        </p>
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
              maxWidth: "15ch",
            }}
          >
            Your region could be the next one here.
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
