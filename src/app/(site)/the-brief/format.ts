/** Brief dates are ISO yyyy-mm-dd; format them without shifting the day. */
const day = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "October 12, 2026" */
export const formatDay = (iso: string) => day.format(asDate(iso));

/** "October 2026" */
export const formatMonth = (iso: string) => month.format(asDate(iso));

/** Where an issue links: its archive page, or the signup in sample mode. */
export const issueHref = (url: string | null) => url ?? "#subscribe";
