"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceVideoProps {
  src: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Autoplaying, looping, muted background video for a service media card.
 *
 * The video file is only requested once the card is near the viewport — the
 * homepage services list otherwise downloaded the whole multi-megabyte video
 * on every visit, even for visitors who never scrolled that far.
 *
 * React's server renderer doesn't reliably emit the `muted` HTML attribute
 * for `<video>` (a long-standing DOM/SSR quirk), which can silently block
 * autoplay in some browsers. Setting `.muted` on the element directly — and
 * kicking off playback — guarantees it plays.
 */
export default function ServiceVideo({
  src,
  className,
  ariaLabel,
}: ServiceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView) return;

    video.muted = true;
    video.play()?.catch(() => {
      // Autoplay can still be blocked by the browser or a user setting —
      // failing quietly is fine for a decorative background video.
    });
  }, [inView]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={inView ? src : undefined}
      aria-label={ariaLabel}
      autoPlay
      loop
      muted
      playsInline
      preload={inView ? "metadata" : "none"}
    />
  );
}
