/**
 * Product pages whose availability the business owner has not yet confirmed.
 *
 * Their content is written (src/data/serviceContent.ts) but they are NOT
 * published: no route is generated (the URL 404s), they're excluded from the
 * sitemap, internal links and the enquiry form, and no other page names them.
 *
 * Evidence in the original site copy:
 * - glow-sign-board: the LED & Neon page mentions "back-lit and edge-lit
 *   boards", but never glow sign / light-box signs specifically.
 * - metal-letters: "metal lettering" and aluminium letter returns are
 *   mentioned, but brass/aluminium letters as a product are not.
 *
 * Once the owner confirms a product is offered, delete its slug here — the
 * page, sitemap entry, links and form option all appear automatically.
 */
export const PENDING_CONFIRMATION_SLUGS: ReadonlySet<string> = new Set([
  "glow-sign-board",
  "metal-letters",
]);

export function isPendingConfirmation(slug: string): boolean {
  return PENDING_CONFIRMATION_SLUGS.has(slug);
}
