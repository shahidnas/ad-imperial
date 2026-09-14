import { whatsappHref } from "@/src/lib/site";

/**
 * Fixed, site-wide WhatsApp contact button. Mounted once from the root
 * layout (see app/layout.tsx) so it floats above every page.
 */
export default function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;

  return (
    <a
      href={href}
      className="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="whatsapp-fab-ping" aria-hidden="true" />

      <span className="whatsapp-fab-icon" aria-hidden="true">
        <i className="bi bi-whatsapp" />
      </span>

      <span className="whatsapp-fab-tooltip">Chat with us on WhatsApp</span>
    </a>
  );
}
