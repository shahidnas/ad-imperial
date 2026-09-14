"use client";

import { useEffect, useRef } from "react";

interface ServiceVideoProps {
  src: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Autoplaying, looping, muted background video for a service media card.
 *
 * React's server renderer doesn't reliably emit the `muted` HTML attribute
 * for `<video>` (a long-standing DOM/SSR quirk), which can silently block
 * autoplay in some browsers before hydration runs. Setting `.muted` on the
 * element directly — and kicking off playback — guarantees it plays.
 */
export default function ServiceVideo({
  src,
  className,
  ariaLabel,
}: ServiceVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play()?.catch(() => {
      // Autoplay can still be blocked by the browser or a user setting —
      // failing quietly is fine for a decorative background video.
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      aria-label={ariaLabel}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}
