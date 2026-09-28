import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationDetail from "@/src/components/LocationDetail";
import { cities, cityPath, getCity, getState } from "@/src/data/locations";
import { getProjectImage } from "@/src/data/projectImages";
import { buildMetadata } from "@/src/lib/seo";

// Only configured state/city pairs exist; e.g. /locations/bihar/kolkata 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ state: city.stateSlug, city: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city: slug } = await params;
  const city = getCity(state, slug);
  if (!city) return {};

  const lead = city.projectImages?.[0] ? getProjectImage(city.projectImages[0]) : undefined;

  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: cityPath(city),
    keywords: city.keywords,
    image: lead ? { url: lead.src, alt: lead.alt } : undefined,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: stateSlug, city: slug } = await params;
  const city = getCity(stateSlug, slug);
  const state = getState(stateSlug);
  if (!city || !state) notFound();

  return <LocationDetail entry={city} state={state} />;
}
