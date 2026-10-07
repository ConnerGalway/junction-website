import Link from "next/link";
import { Header, Footer } from "@/components";

const services = [
  {
    num: "01",
    title: "Marketing strategy",
    description:
      "Research-led strategy for destinations and the organizations behind them. Traveller research, positioning, investment priorities, and an operating model your team runs after handover.",
  },
  {
    num: "02",
    title: "Marketing training",
    description:
      "Workshops, webinar series and custom programs. Plain language, and every action doable in under an hour, like the Okotoks series that prepped a town for 4,500 visitors.",
  },
  {
    num: "03",
    title: "The Accelerator",
    description:
      "A full digital assessment, a one-to-one coaching session, and a three-page plan you can start Monday. 25–100% covered through a destination partnership.",
    price: "$2,500",
  },
  {
    num: "04",
    title: "AI training",
    description:
      "The 30-day program: 4 live sessions, a custom dashboard, a prompt library, a 90-day plan, and at least one bottleneck automated before day 30. Open to teams beyond tourism.",
    price: "30 days",
    isNew: true,
  },
  {
    num: "05",
    title: "Destination partnerships",
    description:
      "Fund JunctionU seats for every operator in your region, from 25% to fully covered. We handle delivery, support and reporting, so your board sees exactly what capacity you built.",
  },
  {
    num: "06",
    title: "Speaking",
    description:
      "Keynotes, workshops, conference sessions and virtual talks on AI, tourism innovation and marketing trends. Recent stages: Northern BC Tourism Summit, TIABC, Yukon Go Digital Summit.",
  },
];

export default function ServicesPage() {
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
              Services
            </div>
            <h1 className="text-h1 m-0" style={{ textWrap: "balance" }}>
              We build the plan. We train the people.
            </h1>
          </div>
          <p
            className="text-body m-0"
            style={{ color: "rgba(28, 28, 26, 0.74)", maxWidth: "46ch" }}
          >
            Every engagement ends with your team holding the keys. We only do
            strategy and training, so no websites, ad buying or social
            management. Every recommendation is there because it works for you.
          </p>
        </div>
      </section>

      {/* Service list */}
      <section
        style={{ padding: "0 clamp(20px, 4vw, 48px) clamp(64px, 8vw, 112px)" }}
      >
        <div
          className="content-container"
          style={{ borderTop: "2px solid #1C1C1A" }}
        >
          {services.map((service) => (
            <Link
              key={service.num}
              href="#start"
              className="block transition-colors hover:bg-[rgba(196,150,58,0.08)]"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "12px 48px",
                alignItems: "baseline",
                padding: "36px 0",
                borderBottom: "1px solid rgba(28, 28, 26, 0.15)",
              }}
            >
              <div
                className="flex items-baseline flex-wrap"
                style={{ gap: "20px" }}
              >
                <span
                  className="font-bebas text-accent"
                  style={{ fontSize: "32px" }}
                >
                  {service.num}
                </span>
                <h2
                  className="font-epilogue m-0"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(26px, 2.8vw, 40px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {service.title}
                </h2>
                {service.isNew && (
                  <span
                    className="bg-break text-white self-center"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 9px 3px",
                      borderRadius: "2px",
                    }}
                  >
                    New
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: "rgba(28, 28, 26, 0.74)",
                    margin: 0,
                    maxWidth: "56ch",
                  }}
                >
                  {service.description}
                </p>
                {service.price && (
                  <span
                    className="font-bebas text-forest"
                    style={{ fontSize: "30px", lineHeight: 1 }}
                  >
                    {service.price}
                  </span>
                )}
              </div>
            </Link>
          ))}
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
              maxWidth: "15ch",
            }}
          >
            Not sure which route? That's what the call is for.
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
            <span
              style={{
                fontSize: "17px",
                fontWeight: 300,
                color: "rgba(244, 240, 232, 0.82)",
              }}
            >
              Thirty minutes, no pitch deck.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
