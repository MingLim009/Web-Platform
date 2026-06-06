"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated stat number that counts up from 0 to `value` when scrolled
 * into view, then settles. Used in the "Growing together" stats strip
 * on /sobre. Pairs with the gradient text fill defined in fixes.css.
 *
 * The number renders inside a span with a `is-counting` / `is-done`
 * class so we can additionally animate brightness in CSS.
 */
export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  // Start the count-up when at least 30% of the element enters the viewport.
  useEffect(() => {
    if (started || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // Easing + animation loop.
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span
      ref={ref}
      className={`animated-stat${started ? " is-counting" : ""}${done ? " is-done" : ""} ${className}`.trim()}
      aria-label={`${prefix}${value}${suffix}`}
    >
      <span aria-hidden>{prefix}{formatted}{suffix}</span>
    </span>
  );
}
