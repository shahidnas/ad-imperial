"use client";

import { useState } from "react";
import { testimonials } from "@/src/data/testimonials";
import { cx } from "@/src/lib/utils";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const goPrev = () =>
    setActive((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );

  const goNext = () =>
    setActive((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );

  return (
    <section className="testimonial-section" id="testimonials">
      <div className="container">
        <div className="testimonial-header">
          <div>
            <div className="section-eyebrow testimonial-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Client Stories</span>
            </div>

            <h2 className="testimonial-title">
              Trusted By
              <span> Businesses.</span>
            </h2>
          </div>

          <p className="testimonial-intro">
            We believe the best measure of our work is how our clients feel when
            they see the finished result.
          </p>
        </div>

        <div className="testimonial-layout">
          <div className="testimonial-brand">
            <div className="testimonial-brand-top">
              <span>AD</span>
              <span>IMPERIAL</span>
            </div>

            <div className="testimonial-quote-mark" aria-hidden="true">
              &ldquo;
            </div>

            <div className="testimonial-brand-bottom">
              <span>CRAFT</span>
              <i />
              <span>QUALITY</span>
              <i />
              <span>TRUST</span>
            </div>
          </div>

          <div className="testimonial-main">
            <div className="testimonial-stars" aria-hidden="true">
              <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <small>5.0 / 5.0</small>
            </div>

            <blockquote>&ldquo;{testimonial.text}&rdquo;</blockquote>

            <div className="testimonial-client">
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.name.charAt(0)}
              </div>

              <div>
                <h3>{testimonial.name}</h3>
                <p>
                  {testimonial.company}
                  <span>&bull;</span>
                  {testimonial.project}
                </p>
              </div>
            </div>
          </div>

          <div className="testimonial-navigation">
            <span className="testimonial-counter">
              0{active + 1}
              <i />0{testimonials.length}
            </span>

            <div className="testimonial-nav-buttons">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goPrev}
              >
                <i className="bi bi-arrow-left" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goNext}
              >
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="testimonial-mini-list">
          {testimonials.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={cx(
                "testimonial-mini",
                active === index && "testimonial-mini-active",
              )}
              onClick={() => setActive(index)}
            >
              <span>0{item.id}</span>

              <div>
                <strong>{item.name}</strong>
                <small>{item.project}</small>
              </div>

              <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
