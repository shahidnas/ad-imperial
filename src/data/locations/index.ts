/**
 * Location configuration — states and the cities within them.
 *
 * URL architecture:
 *   /locations                      all service areas
 *   /locations/<state>              state page
 *   /locations/<state>/<city>       city page
 *
 * To add a city: add an entry to the state's file, add its slug to the
 * state's `citySlugs`, and it is automatically routed, linked, added to the
 * sitemap and given structured data. Only add cities that AD Imperial can
 * genuinely serve, with content specific to that city.
 */
import { bihar, biharCities } from "./bihar";
import { jharkhand, jharkhandCities } from "./jharkhand";
import type { CityLocation, LocationEntry, StateLocation } from "./types";
import { westBengal, westBengalCities } from "./westBengal";

export type {
  CityLocation,
  LocationEntry,
  LocationFaq,
  ServiceHighlight,
  StateLocation,
} from "./types";

export const states: StateLocation[] = [westBengal, jharkhand, bihar];

export const cities: CityLocation[] = [
  ...westBengalCities,
  ...jharkhandCities,
  ...biharCities,
];

export function getState(slug: string): StateLocation | undefined {
  return states.find((state) => state.slug === slug);
}

export function getCity(stateSlug: string, citySlug: string): CityLocation | undefined {
  return cities.find((city) => city.stateSlug === stateSlug && city.slug === citySlug);
}

/** City lookup by slug alone — slugs are unique across states. */
export function getCityBySlug(slug: string): CityLocation | undefined {
  return cities.find((city) => city.slug === slug);
}

export function citiesInState(stateSlug: string): CityLocation[] {
  const state = getState(stateSlug);
  if (!state) return [];
  return state.citySlugs
    .map((slug) => getCity(stateSlug, slug))
    .filter((city): city is CityLocation => Boolean(city));
}

export function statePath(stateSlug: string): string {
  return `/locations/${stateSlug}`;
}

export function cityPath(city: Pick<CityLocation, "slug" | "stateSlug">): string {
  return `/locations/${city.stateSlug}/${city.slug}`;
}

export function locationPath(entry: LocationEntry): string {
  return entry.type === "state" ? statePath(entry.slug) : cityPath(entry);
}
