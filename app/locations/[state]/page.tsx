import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationDetail from "@/src/components/LocationDetail";
import { citiesInState, getState, statePath, states } from "@/src/data/locations";
import { getProjectImage } from "@/src/data/projectImages";
import { buildMetadata } from "@/src/lib/seo";

// Only the configured states exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return states.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};

  const lead = state.projectImages?.[0] ? getProjectImage(state.projectImages[0]) : undefined;

  return buildMetadata({
    title: state.metaTitle,
    description: state.metaDescription,
    path: statePath(state.slug),
    keywords: state.keywords,
    image: lead ? { url: lead.src, alt: lead.alt } : undefined,
  });
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  return <LocationDetail entry={state} stateCities={citiesInState(state.slug)} />;
}
