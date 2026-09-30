import { describe, expect, it } from "vitest";
import { buildGallery } from "./serviceGallery";

describe("buildGallery", () => {
  it("returns only the 'All' tab for an empty gallery", () => {
    expect(buildGallery([])).toEqual({ items: [], categories: ["All"] });
  });

  it("ignores non-image files", () => {
    const { items } = buildGallery(["video-wall.mp4", "notes.txt", "neon-a.jpg"]);
    expect(items.map((item) => item.key)).toEqual(["neon-a.jpg"]);
  });

  it("orders items by category tab order, not by filename", () => {
    const { items } = buildGallery([
      "neon-z.jpg",
      "channel-letter-a.jpg",
      "acp-board-a.jpg",
      "stainless-steel-a.jpg",
      "led-letter-a.jpg",
    ]);
    expect(items.map((item) => item.category)).toEqual([
      "ACP Sign Boards",
      "Steel Letters",
      "LED Letters",
      "Neon Signage",
      "Channel Letters",
    ]);
  });

  it("puts the more specific ACP cladding rule ahead of ACP boards", () => {
    const { items } = buildGallery(["acp-cladding-x.jpg"]);
    expect(items[0].category).toBe("ACP Cladding");
  });

  it("sorts files without a known category into a trailing fallback tab", () => {
    const { items, categories } = buildGallery(["mystery.jpg", "neon-a.jpg"]);
    expect(items.map((item) => item.key)).toEqual(["neon-a.jpg", "mystery.jpg"]);
    expect(categories).toEqual(["All", "Neon Signage", "Other Signage"]);
  });

  it("orders files within a category by natural filename order", () => {
    const { items } = buildGallery(["neon-10.jpg", "neon-2.jpg", "neon-1.jpg"]);
    expect(items.map((item) => item.key)).toEqual([
      "neon-1.jpg",
      "neon-2.jpg",
      "neon-10.jpg",
    ]);
  });

  it("is deterministic regardless of input order", () => {
    const files = ["neon-b.jpg", "acp-board.jpg", "neon-a.jpg", "other.png"];
    const forward = buildGallery(files).items.map((item) => item.key);
    const reversed = buildGallery([...files].reverse()).items.map(
      (item) => item.key,
    );
    expect(reversed).toEqual(forward);
  });

  it("lists each present category once, in tab order, after 'All'", () => {
    const { categories } = buildGallery([
      "neon-a.jpg",
      "neon-b.jpg",
      "acp-cladding-a.jpg",
      "acp-board-a.jpg",
    ]);
    expect(categories).toEqual([
      "All",
      "ACP Sign Boards",
      "ACP Cladding",
      "Neon Signage",
    ]);
  });

  it("numbers undescribed photos only when a category has several", () => {
    const single = buildGallery(["neon-a.jpg"]).items;
    expect(single[0].title).toBe("Neon Signage");

    const several = buildGallery(["neon-a.jpg", "neon-b.jpg"]).items;
    expect(several.map((item) => item.title)).toEqual([
      "Neon Signage 01",
      "Neon Signage 02",
    ]);
  });

  it("prefers a photo's own description over the category copy", () => {
    const [item] = buildGallery(["neon-sign-pizza.jpeg"]).items;
    expect(item.image).toBe("/services/neon-sign-pizza.jpeg");
    expect(item.title).not.toMatch(/^Neon Signage/);
    expect(item.alt).not.toMatch(/project \d+$/);
  });
});
