import fs from "node:fs";
import path from "node:path";

/**
 * The privacy policy, read from content/privacy-policy.md at build time and
 * parsed into blocks for /privacy-policy. The wording is rendered exactly as
 * written. Supported Markdown (all the file uses): "# " title, a "Last
 * updated:" line, "## " sections, "### " sub-headings, "- " bullets,
 * paragraphs and **bold**. Email addresses become mailto links.
 *
 * To change the policy, edit content/privacy-policy.md.
 */

export type Inline = { text: string; bold?: boolean; email?: boolean };
export type Block =
  | { type: "p"; content: Inline[] }
  | { type: "h3"; text: string }
  | { type: "ul"; items: Inline[][] };
export type PolicySection = { id: string; title: string; blocks: Block[] };
export type Policy = { title: string; updated?: string; intro: Block[]; sections: PolicySection[] };

const FILE = path.join(process.cwd(), "content", "privacy-policy.md");

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** **bold** and email addresses, as runs of text. */
function inline(text: string): Inline[] {
  const out: Inline[] = [];
  text.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
    if (!part) return;
    if (part.startsWith("**") && part.endsWith("**")) {
      out.push({ text: part.slice(2, -2), bold: true });
      return;
    }
    part.split(/([^\s@]+@[^\s@]+\.[a-z]{2,})/gi).forEach((bit, i) => {
      if (bit) out.push(i % 2 === 1 ? { text: bit, email: true } : { text: bit });
    });
  });
  return out;
}

export function getPrivacyPolicy(): Policy {
  const lines = fs.readFileSync(FILE, "utf8").replace(/\r\n/g, "\n").split("\n");
  const policy: Policy = { title: "Privacy policy", intro: [], sections: [] };
  let target: Block[] = policy.intro;
  let para: string[] = [];
  let list: Inline[][] | null = null;

  const flush = () => {
    if (para.length) target.push({ type: "p", content: inline(para.join(" ")) });
    para = [];
    if (list) target.push({ type: "ul", items: list });
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    if (line.startsWith("# ")) {
      flush();
      policy.title = line.slice(2).trim();
    } else if (line.startsWith("## ")) {
      flush();
      const title = line.slice(3).trim();
      const section: PolicySection = { id: slug(title), title, blocks: [] };
      policy.sections.push(section);
      target = section.blocks;
    } else if (line.startsWith("### ")) {
      flush();
      target.push({ type: "h3", text: line.slice(4).trim() });
    } else if (/^- /.test(line)) {
      if (para.length) flush();
      (list ??= []).push(inline(line.slice(2).trim()));
    } else if (!policy.updated && /^last updated:/i.test(line.trim()) && target === policy.intro && policy.intro.length === 0) {
      flush();
      policy.updated = line.trim();
    } else {
      if (list) flush();
      para.push(line.trim());
    }
  }
  flush();
  return policy;
}
