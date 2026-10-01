import { describe, expect, it } from "vitest";
import { localBusinessSchema } from "./schema";

const business = localBusinessSchema();

describe("localBusinessSchema", () => {
  it("publishes the confirmed opening hours", () => {
    expect(business.openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ]);
  });

  it("publishes the founding year, map pin and Google Business Profile", () => {
    expect(business.foundingDate).toBe("2010");
    expect(business.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: 22.570736,
      longitude: 88.356736,
    });
    expect(business.hasMap).toBe("https://maps.google.com/?cid=9300404611108403039");
    expect(business.sameAs).toContain("https://maps.google.com/?cid=9300404611108403039");
  });

  it("uses the public contact details", () => {
    expect(business.telephone).toBe("+91 97094 67647");
    expect(business.email).toBe("nayeem.akhtar181@gmail.com");
  });

  it("never publishes the internal second number", () => {
    expect(JSON.stringify(business)).not.toMatch(/7908061782|79080 61782/);
  });

  it("publishes no ratings, reviews or prices", () => {
    for (const key of ["aggregateRating", "review", "priceRange", "offers"]) {
      expect(business).not.toHaveProperty(key);
    }
  });
});
