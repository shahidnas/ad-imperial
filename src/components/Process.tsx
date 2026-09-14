"use client";

import { useState } from "react";

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    short: "Tell us your vision",
    text: "We understand your business, space, branding requirements and the type of signage you want to create.",
  },
  {
    number: "02",
    title: "Design",
    short: "Shape the concept",
    text: "Our team develops a refined signage concept that balances your brand identity, dimensions, materials and visual impact.",
  },
  {
    number: "03",
    title: "Fabrication",
    short: "Craft every detail",
    text: "Once approved, your signage is carefully fabricated using premium materials and precise finishing techniques.",
  },
  {
    number: "04",
    title: "Installation",
    short: "Make it stand out",
    text: "Our installation team positions and installs your signage with precision for a clean, professional final result.",
  },
];

export default function OurProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="process-section" id="process">
      <div className="container">

        {/* HEADER */}
        <div className="process-header">

          <div>
            <div className="section-eyebrow process-eyebrow">
              <span className="section-eyebrow-line" />
              <span>Our Process</span>
            </div>

            <h2 className="process-title">
              From Vision
              <span> To Reality.</span>
            </h2>
          </div>

          <div className="process-intro">
            <p>
              From the first conversation to the final installation,
              every stage is handled with care, precision and a
              commitment to exceptional craftsmanship.
            </p>
          </div>

        </div>


        {/* PROCESS */}
        <div className="process-wrapper">

          {/* TOP LINE */}
          <div className="process-line">
            <span
              className="process-line-active"
              style={{
                width: `${activeStep === 0 ? 0 : (activeStep / 3) * 100}%`,
              }}
            />
          </div>


          {/* STEPS */}
          <div className="process-steps">

            {processSteps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                className={`process-step ${
                  activeStep === index ? "process-step-active" : ""
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >

                <div className="process-step-top">

                  <span className="process-number">
                    {step.number}
                  </span>

                  <span className="process-circle">
                    <i className="bi bi-arrow-up-right" />
                  </span>

                </div>

                <div className="process-step-content">

                  <span className="process-short">
                    {step.short}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>

                </div>

              </button>
            ))}

          </div>

        </div>


        {/* BOTTOM STATEMENT */}
        <div className="process-bottom">

          <div className="process-bottom-mark">
            <span>AD</span>
          </div>

          <div className="process-bottom-text">
            <span>CRAFTED WITH PURPOSE</span>
            <p>
              Every project is different.
              Every detail matters.
            </p>
          </div>

          <div className="process-bottom-line" />

        </div>

      </div>
    </section>
  );
}