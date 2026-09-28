"use client";

import { useMemo, useState } from "react";
import PortfolioCard from "@/src/components/PortfolioCard";
import type { GalleryItem } from "@/src/lib/serviceGallery";
import { cx } from "@/src/lib/utils";

interface GalleryGridProps {
  items: GalleryItem[];
  categories: string[];
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  return (
    <div className="gallery-grid-wrap">
      <div
        className="work-filters"
        role="tablist"
        aria-label="Filter gallery by signage type"
      >
        {categories.map((category) => {
          const count =
            category === "All"
              ? items.length
              : items.filter((item) => item.category === category).length;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={cx(
                "work-filter",
                activeCategory === category && "work-filter-active",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              <span className="work-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="gallery-grid">
          {filtered.map((item) => (
            <PortfolioCard
              headingLevel="h2"
              key={item.key}
              item={item}
              respectSize={false}
              fit="contain"
              sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
          ))}
        </div>
      ) : (
        <p className="work-empty">No projects in this category yet.</p>
      )}
    </div>
  );
}
