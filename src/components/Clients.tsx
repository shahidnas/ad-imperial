import Image from "next/image";
import { clients } from "@/src/data/clients";

export default function Clients() {
  return (
    <section className="clients-section" id="clients">
      <div className="clients-glow" aria-hidden="true" />

      <div className="container">
        <div className="clients-header">
          <div className="clients-heading">
            <div className="section-eyebrow clients-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Our Clients</span>
            </div>

            <h2 className="clients-title">
              Trusted By
              <span> Names That Lead.</span>
            </h2>
          </div>

          <div className="clients-intro">
            <p>
              A few of the established businesses that have trusted AD IMPERIAL
              to represent their brand in the physical world.
            </p>
          </div>
        </div>

        <ul className="clients-grid">
          {clients.map((client, index) => (
            <li className="client-item" key={client.name}>
              <span className="client-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              {client.logo ? (
                <span className="client-logo">
                  <Image
                    src={client.logo}
                    alt={client.logoAlt ?? client.name}
                    fill
                    sizes="(max-width: 767px) 60vw, 22vw"
                    className="client-logo-img"
                  />
                </span>
              ) : (
                <span className="client-name">{client.name}</span>
              )}

              {client.fullName && (
                <span className="client-full">{client.fullName}</span>
              )}

              <span className="client-rule" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
