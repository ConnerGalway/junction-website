import { Container, Eyebrow, QuoteCard, Stat, TextLink } from "@/components";
import type { WorkCase } from "@/lib/workCases";

/**
 * One case chapter's content. Its ground and side come from <ChapterList>
 * (by visible position), so everything here reads the tone's colours:
 * the stat is Newsprint on Forest, gold-on-light on Newsprint, gold on
 * Carbon; the meta line is copper on Newsprint, Fern on dark.
 *
 * Without a stat, the quote leads the chapter (large, on the stat side)
 * and isn't repeated in the story.
 */
export function CaseChapter({ item }: { item: WorkCase }) {
  const { stat, quote, link } = item;
  return (
    <Container className="grid items-center gap-x-[72px] gap-y-10 lg:grid-cols-2">
      <div className="work-chapter-stat min-w-0">
        {stat ? (
          <Stat
            value={stat.value}
            label={<span className="text-[18px]">{stat.label}</span>}
            maxSize="clamp(120px, 16vw, 230px)"
            valueClassName="leading-[0.8]"
          />
        ) : (
          quote && (
            <figure className="m-0">
              <blockquote className="type-quote m-0 text-[clamp(28px,3vw,36px)] text-(--tone-text)">
                {quote.text}
              </blockquote>
              <figcaption className="type-small mt-5 text-muted">{quote.caption}</figcaption>
            </figure>
          )
        )}
      </div>

      <div className="flex min-w-0 flex-col items-start gap-6">
        <Eyebrow className="m-0">{item.meta}</Eyebrow>
        <h2 className="type-h2 m-0 text-[clamp(32px,3.2vw,44px)]">{item.title}</h2>
        <p className="type-body m-0">{item.description}</p>
        {stat && quote && (
          // Sage on Newsprint and Carbon; a Newsprint card on Forest (.quote-adapt).
          <QuoteCard quote={quote.text} caption={quote.caption} className="quote-adapt w-full" />
        )}
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
      </div>
    </Container>
  );
}
