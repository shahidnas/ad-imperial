/**
 * Minimal in-memory fixed-window rate limiter, keyed by client IP.
 *
 * Dependency-free and good enough to stop obvious repeated spam against the
 * contact endpoint. Counters live in this server process's memory, so on a
 * multi-instance / serverless deployment each instance keeps its own count
 * (the limit is per instance, and resets on a cold start). For stricter,
 * shared limits, swap this for a store-backed limiter (e.g. Redis).
 */

interface Window {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the current window resets. */
  retryAfter: number;
}

export function createRateLimiter(options: { limit: number; windowMs: number }) {
  const windows = new Map<string, Window>();
  let lastSweep = Date.now();

  function sweep(now: number) {
    // Drop expired entries at most once per window so the map can't grow
    // without bound.
    if (now - lastSweep < options.windowMs) return;
    lastSweep = now;
    for (const [key, entry] of windows) {
      if (entry.resetAt <= now) windows.delete(key);
    }
  }

  return function check(key: string): RateLimitResult {
    const now = Date.now();
    sweep(now);

    let entry = windows.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + options.windowMs };
      windows.set(key, entry);
    }

    entry.count += 1;
    return {
      allowed: entry.count <= options.limit,
      retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  };
}

/** Best-effort client IP from the standard proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
