"use client";

import { useState } from "react";
import type { FaqItem } from "@/src/data/faq";
import { cx } from "@/src/lib/utils";

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index open by default. Pass -1 for all collapsed. */
  defaultOpen?: number;
}

export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: FaqAccordionProps) {
  const [active, setActive] = useState(defaultOpen);

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isActive = active === index;

        return (
          <div
            key={faq.question}
            className={cx("faq-item", isActive && "faq-item-active")}
          >
            <button
              type="button"
              className="faq-question"
              onClick={() => setActive(isActive ? -1 : index)}
              aria-expanded={isActive}
            >
              <span className="faq-number">0{index + 1}</span>
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <i className={isActive ? "bi bi-dash" : "bi bi-plus"} />
              </span>
            </button>

            <div
              className={cx("faq-answer", isActive && "faq-answer-open")}
              role="region"
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
