"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/src/lib/navigation";

interface HeroSlide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    image: "/hero/bhikaram.jpeg",
    eyebrow: "Letter Board & Signage Manufacturer",
    title: "Premium Letter Boards & Signage Across West Bengal & Jharkhand.",
    description:
      "Custom letter boards, sign boards and signage solutions designed, fabricated and installed for businesses across West Bengal, Jharkhand and India — from our studio in Kolkata.",
  },
  {
    image: "/hero/nursing.webp",
    eyebrow: "Custom Letter Boards",
    title: "Designed to Make a Lasting Impression.",
    description:
      "From concept to installation, we create premium signage that perfectly represents your business.",
  },
  {
    image: "/hero/kolkata.webp",
    eyebrow: "Precision. Quality. Finish.",
    title: "Details That Define Your Brand.",
    description:
      "High-quality materials, precision workmanship and refined finishing come together in every project.",
  },
  {
    image: "/hero/market.webp",
    eyebrow: "Built for Your Business",
    title: "Signage That Speaks Before You Do.",
    description:
      "Create a powerful first impression with professionally designed and expertly installed business signage.",
  },
];

const SLIDE_DURATION = 6000;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = slides.length;

  /*
   * AUTOMATIC SLIDER
   *
   * Every 6 seconds:
   * Image
   * Heading
   * Paragraph
   * Eyebrow
   *
   * sab automatically change hoga.
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => {
        return (current + 1) % totalSlides;
      });
    }, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [totalSlides]);

  /* =========================================
     NEXT SLIDE
  ========================================= */

  const nextSlide = () => {
    setActiveSlide((current) => {
      return (current + 1) % totalSlides;
    });
  };

  /* =========================================
     PREVIOUS SLIDE
  ========================================= */

  const previousSlide = () => {
    setActiveSlide((current) => {
      return (current - 1 + totalSlides) % totalSlides;
    });
  };

  /* =========================================
     GO TO SPECIFIC SLIDE
  ========================================= */

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section
      className="hero-section"
      aria-label="Premium letter board and signage solutions across West Bengal, Jharkhand and India"
    >
      {/* =====================================
          BACKGROUND SLIDES
      ===================================== */}

      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              index === activeSlide
                ? "hero-slide-active"
                : ""
            }`}
            aria-hidden={index !== activeSlide}
          >
            {/* Full-bleed background image (100vw), content overlays it. */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-image"
            />

            <div className="hero-overlay" />
          </div>
        ))}
      </div>

      {/* =====================================
          HERO CONTENT
      ===================================== */}

      <div className="container hero-container">
        <div className="hero-content">
          <div
            className="hero-content-inner"
            key={activeSlide}
          >
            {/* Eyebrow */}

            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />

              <span>
                {slides[activeSlide].eyebrow}
              </span>
            </div>

            {/* Heading */}

            <h1 className="hero-title">
              {slides[activeSlide].title}
            </h1>

            {/* Paragraph */}

            <p className="hero-description">
              {slides[activeSlide].description}
            </p>

            {/* =================================
                BUTTONS
            ================================= */}

            <div className="hero-actions">
              {/* Primary */}

              <Link
                href={routes.contact}
                className="btn-premium hero-primary-btn"
                aria-label="Get a Free Quote"
              >
                <span>Get a Free Quote</span>

                <i
                  className="bi bi-arrow-up-right"
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary */}

              <Link
                href={routes.gallery}
                className="hero-secondary-btn"
                aria-label="Explore Our Work"
              >
                <span>Explore Our Work</span>

                <i
                  className="bi bi-arrow-right"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          BOTTOM CONTROLS
      ===================================== */}

      <div className="hero-bottom">
        {/* =================================
            SLIDE COUNTER
        ================================= */}

        <div
          className="hero-counter"
          aria-label={`Slide ${
            activeSlide + 1
          } of ${totalSlides}`}
        >
          <span className="hero-counter-current">
            {String(activeSlide + 1).padStart(2, "0")}
          </span>

          <span className="hero-counter-divider">
            /
          </span>

          <span>
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>

        {/* =================================
            SLIDE DOTS
        ================================= */}

        <div
          className="hero-dots"
          role="tablist"
          aria-label="Hero slides"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              className={`hero-dot ${
                index === activeSlide
                  ? "hero-dot-active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                index === activeSlide
                  ? "true"
                  : undefined
              }
            />
          ))}
        </div>

        {/* =================================
            PREVIOUS / NEXT
        ================================= */}

        <div className="hero-navigation">
          <button
            type="button"
            className="hero-arrow"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <i
              className="bi bi-arrow-left"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            className="hero-arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <i
              className="bi bi-arrow-right"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* =====================================
          SCROLL INDICATOR
      ===================================== */}

      <div
        className="hero-scroll"
        aria-hidden="true"
      >
        <span>Scroll to Explore</span>

        <i className="bi bi-arrow-down" />
      </div>
    </section>
  );
}