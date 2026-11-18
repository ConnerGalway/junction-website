import { Container, Eyebrow, QuoteCard, Stat, TextLink } from "@/components";
import type { WorkCase } from "@/lib/workCases";
import { SHOW_WORK_DELIVERABLES } from "@/lib/flags";
import { DeliverablesPreview } from "./DeliverablesPreview";

/**
 * One case chapter's content. Its ground and side come from <ChapterList>
 * (by visible position), so everything here reads the tone's colours:
 * the stat is Newsprint on Forest, gold-on-light on Newsprint, gold on
 * Carbon; the meta line is copper on Newsprint, Fern on dark.
 *
 * Without a stat, the quote leads the chapter (large, on the stat side)
 * and isn't repeated in the story. With neither (Kootenay Rockies while its
 * quote is unverified), the sample pages move to the lead side, so the
 * chapter still reads as two balanced columns: pages, then title and copy.
 * With the sample pages hidden too (SHOW_WORK_DELIVERABLES off), such a
 * chapter is one column: the title and a larger description, so nothing
 * looks missing. Sides still alternate for the two-column chapters.
 */
export function CaseChapter({ item }: { item: WorkCase }) {
  const { stat, quote, link, moreQuotes = [] } = item;
  const hasLead = !!stat || !!quote;
  const deliverables = SHOW_WORK_DELIVERABLES ? (
    <DeliverablesPreview title={item.title} {...item.deliverables} className="w-full max-w-[560px]" />
  ) : null;

  // No stat, no quote, no sample pages: one column, the description leads.
  if (!hasLead && !deliverables) {
    return (
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow className="m-0">{item.meta}</Eyebrow>
        <h2 className="type-h2 m-0 max-w-[20ch] text-[clamp(32px,3.2vw,44px)]">{item.title}</h2>
        <p className="type-lead m-0 max-w-[52ch]">{item.description}</p>
        {moreQuotes.map((mq) => (
          <QuoteCard key={mq.caption + mq.text} quote={mq.text} caption={mq.caption} className="quote-adapt w-full max-w-[760px]" />
        ))}
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
      </Container>
    );
  }

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
        ) : !quote ? (
          deliverables
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
        {moreQuotes.map((mq) => (
          <QuoteCard key={mq.caption + mq.text} quote={mq.text} caption={mq.caption} className="quote-adapt w-full" />
        ))}
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
        {hasLead && deliverables && <div className="mt-4 w-full max-w-[560px]">{deliverables}</div>}
      </div>
    </Container>
  );
}
