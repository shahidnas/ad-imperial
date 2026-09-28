"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/src/lib/navigation";

interface HeroSlide {
  image: string;
  /** Describes the photo itself — the title is marketing copy, not a description. */
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    image: "/hero/bhikharam-chandmal-shop-sign-board.jpeg",
    alt: "Yellow ACP shop sign board with red lettering on the Bhikharam Chandmal storefront",
    eyebrow: "Letter Board & Signage Manufacturer",
    title: "Premium Letter Boards & Signage Across West Bengal, Jharkhand & Bihar.",
    description:
      "Custom letter boards, sign boards and signage solutions designed, fabricated and installed for businesses across West Bengal, Jharkhand, Bihar and India — from our studio in Kolkata.",
  },
  {
    image: "/hero/healing-touch-nursing-home-signage.webp",
    alt: "Building signage on the facade of Healing Touch Nursing Home, a multi-speciality and critical care centre",
    eyebrow: "Custom Letter Boards",
    title: "Designed to Make a Lasting Impression.",
    description:
      "From concept to installation, we create premium signage that perfectly represents your business.",
  },
  {
    image: "/hero/i-love-kolkata-illuminated-letters.webp",
    alt: "Illuminated 3D \"I love Kolkata\" letters reflected in water at night",
    eyebrow: "Precision. Quality. Finish.",
    title: "Details That Define Your Brand.",
    description:
      "High-quality materials, precision workmanship and refined finishing come together in every project.",
  },
  {
    image: "/hero/shahjan-sons-showroom-facade-signage.webp",
    alt: "Illuminated facade signage on the Shahjan Sons & Co. family fashion showroom",
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
      aria-label="Premium letter board and signage solutions across West Bengal, Jharkhand, Bihar and India"
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
              alt={slide.alt}
              fill
              preload={index === 0}
              fetchPriority={index === 0 ? "high" : "low"}
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
        {/*
          Every slide's text sits in the same grid cell, so the block is
          always as tall as the longest slide and doesn't jump (layout
          shift) when slides change. Only the active slide is visible and
          interactive; it alone carries the page's single <h1>. Its key
          changes with the slide so the entrance animation replays.
        */}
        <div className="hero-content hero-content-stack">
          {slides.map((slide, index) => {
            const active = index === activeSlide;
            const Title = active ? "h1" : "p";

            return (
              <div
                className={`hero-content-inner${active ? "" : " hero-content-inner-hidden"}`}
                key={active ? `active-${activeSlide}` : slide.image}
                aria-hidden={!active}
                inert={!active}
              >
                {/* Eyebrow */}

                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-line" />

                  <span>{slide.eyebrow}</span>
                </div>

                {/* Heading */}

                <Title className="hero-title">{slide.title}</Title>

                {/* Paragraph */}

                <p className="hero-description">{slide.description}</p>

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

                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                  </Link>

                  {/* Secondary */}

                  <Link
                    href={routes.gallery}
                    className="hero-secondary-btn"
                    aria-label="Explore Our Work"
                  >
                    <span>Explore Our Work</span>

                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
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
          role="group"
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