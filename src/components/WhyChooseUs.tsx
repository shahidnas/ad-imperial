"use client";

import { useState } from "react";
import BrandLogo from "@/src/components/BrandLogo";
import { companyStats } from "@/src/lib/constants";
import { cx } from "@/src/lib/utils";

const reasons = [
  {
    number: "01",
    title: "Premium Materials",
    text: "We use carefully selected ACP, stainless steel, acrylic and premium lighting materials for a refined finish.",
  },
  {
    number: "02",
    title: "Precision Craftsmanship",
    text: "Every letter, edge and finish is produced with attention to detail for a clean and professional appearance.",
  },
  {
    number: "03",
    title: "Custom Design",
    text: "From concept to final signage, every project is tailored around your brand, space and visual identity.",
  },
  {
    number: "04",
    title: "Professional Installation",
    text: "Our installation approach focuses on accuracy, safety and a flawless final presentation.",
  },
];

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);

  return (
    <section className="why-section" id="why-us">
      <div className="container">

        {/* HEADER */}
        <div className="why-header">

          <div className="why-heading">

            <div className="section-eyebrow why-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Why AD IMPERIAL</span>
            </div>

            <h2 className="why-title">
              Crafted For
              <span> A Lasting Impression.</span>
            </h2>

          </div>

          <div className="why-intro">
            <p>
              Great signage is more than a name on a wall.
              It is the first impression of your business.
              We combine premium materials, thoughtful design
              and skilled craftsmanship to make that impression count.
            </p>
          </div>

        </div>


        {/* MAIN CONTENT */}
        <div className="why-layout">

          {/* LEFT BRAND PANEL */}
          <div className="why-brand-panel">

            <div className="why-brand-top">
              <BrandLogo tone="light" className="why-brand-top-image" />
              <span className="visually-hidden">AD Imperial</span>
            </div>

            <div className="why-brand-center">
              <div className="why-ring">
                <span>10+</span>
                <small>YEARS OF</small>
                <small>CRAFTSMANSHIP</small>
              </div>
            </div>

            <div className="why-brand-bottom">
              <span>DESIGN</span>
              <i />
              <span>CRAFT</span>
              <i />
              <span>DETAIL</span>
            </div>

          </div>


          {/* RIGHT REASONS */}
          <div className="why-reasons">

            {reasons.map((reason, index) => (
              <button
                type="button"
                key={reason.number}
                className={cx("why-item", active === index && "why-item-active")}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
              >

                <span className="why-number">
                  {reason.number}
                </span>

                <div className="why-item-main">

                  <h3>{reason.title}</h3>

                  <div className="why-item-text">
                    <p>{reason.text}</p>
                  </div>

                </div>

                <span className="why-arrow">
                  <i className="bi bi-arrow-up-right" />
                </span>

              </button>
            ))}

          </div>

        </div>


        {/* BOTTOM STATS */}
        <div className="why-stats">
          {companyStats.map((stat) => (
            <div className="why-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}