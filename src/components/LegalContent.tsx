import Link from "next/link";
import { Fragment } from "react";
import type { LegalDocument } from "@/src/data/legal";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Render a paragraph string, turning `[label](/href)` fragments into links. */
function renderParagraph(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;

  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={`${href}-${match.index}`} href={href}>
          {label}
        </Link>
      ) : (
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}

export default function LegalContent({ doc }: { doc: LegalDocument }) {
  return (
    <article className="legal-content">
      <p className="legal-summary">{doc.summary}</p>

      {doc.sections.map((section) => (
        <section key={section.heading} className="legal-section">
          <h2>{section.heading}</h2>
          {section.body.map((paragraph, index) => (
            <p key={index}>{renderParagraph(paragraph)}</p>
          ))}
        </section>
      ))}
    </article>
  );
}
