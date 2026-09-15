"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/src/lib/navigation";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`about-section ${
        visible ? "about-visible" : ""
      }`}
      id="about"
    >
      <div className="container">
        <div className="about-grid">

          {/* =====================================
              IMAGE SIDE
          ===================================== */}

          <div className="about-image-wrapper">
            <div className="about-image-frame">
              <Image
                src="/about/about.png"
                alt="Premium custom letter board signage"
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
                className="about-image"
              />
            </div>

            {/* Decorative Border */}

            <div className="about-image-border" />

            {/* Experience Badge */}

            <div className="about-experience">
              <span className="about-experience-number">
                10+
              </span>

              <span className="about-experience-text">
                Years of
                <br />
                Experience
              </span>
            </div>

            {/* Small Label */}

            <div className="about-image-label">
              <span />
              PREMIUM CRAFTSMANSHIP
            </div>
          </div>

          {/* =====================================
              CONTENT SIDE
          ===================================== */}

          <div className="about-content">

            {/* Section Label */}

            <div className="section-eyebrow">
              <span className="section-eyebrow-line" />

              <span>About AD Imperial</span>
            </div>

            {/* Heading */}

            <h2 className="about-title">
              We Turn Ideas Into
              <span> Remarkable Signage.</span>
            </h2>

            {/* Description */}

            <p className="about-lead">
              Your sign is often the first thing people notice
              about your business. We create premium signage
              that makes that first impression unforgettable.
            </p>

            <p className="about-description">
              From elegant stainless-steel letters and acrylic
              signage to illuminated boards and custom
              letter boards, every project is carefully designed
              and crafted to represent your brand with
              confidence. AD Imperial provides custom letter board
              and signage solutions for businesses, retail stores,
              offices and commercial properties across{" "}
              <Link href={routes.locations}>West Bengal and Jharkhand</Link>,
              and nationally across India.
            </p>

            {/* =================================
                FEATURES
            ================================= */}

            <div className="about-features">

              <div className="about-feature">
                <div className="about-feature-icon">
                  <span>01</span>
                </div>

                <div>
                  <h3>Premium Materials</h3>

                  <p>
                    Quality materials selected for durability,
                    finish and visual impact.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="about-feature-icon">
                  <span>02</span>
                </div>

                <div>
                  <h3>Precision Craftsmanship</h3>

                  <p>
                    Every detail is carefully crafted for a
                    refined professional finish.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="about-feature-icon">
                  <span>03</span>
                </div>

                <div>
                  <h3>Made for Your Brand</h3>

                  <p>
                    Custom solutions designed around your
                    business and identity.
                  </p>
                </div>
              </div>

            </div>

            {/* =================================
                CTA
            ================================= */}

            <div className="about-footer">

              <Link
                href={routes.about}
                className="about-cta"
              >
                <span>Discover Our Story</span>

                <i className="bi bi-arrow-up-right" />
              </Link>

              <div className="about-signature">
                <span>Crafted with</span>
                <strong>Precision</strong>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}