"use client";

// One-shot motion runtime: staggered scroll reveals, hero count-up stats,
// and pausing the hero art when it scrolls off screen.

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REDUCED = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupScrollReveals(timers: number[]) {
  document.querySelectorAll<HTMLElement>(".reveal-group").forEach((group) => {
    group.querySelectorAll<HTMLElement>(".reveal").forEach((el, idx) => {
      if (!el.classList.contains("is-visible")) {
        el.style.setProperty("--mo-i", String(Math.min(idx, 5)));
      }
    });
  });

  const markVisible = (el: HTMLElement) => {
    el.classList.add("is-visible");
    const timer = window.setTimeout(() => {
      el.style.removeProperty("--mo-i");
    }, 600);
    timers.push(timer);
  };

  if (REDUCED()) {
    document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach(markVisible);
    return () => {};
  }

  const aboveFold: HTMLElement[] = [];
  const belowFold: HTMLElement[] = [];

  document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Reveal anything already above or within the current viewport (handles anchor jumps & restores).
    if (rect.top < window.innerHeight - 40) {
      aboveFold.push(el);
    } else {
      belowFold.push(el);
    }
  });

  const raf = aboveFold.length
    ? requestAnimationFrame(() => aboveFold.forEach(markVisible))
    : 0;

  const observer = new IntersectionObserver(
    (entries) => {
      let anyTriggered = false;
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          markVisible(entry.target as HTMLElement);
          observer.unobserve(entry.target);
          anyTriggered = true;
        }
      }
      if (anyTriggered) sweepAboveViewport();
    },
    { rootMargin: "80px 2400px 80px 2400px", threshold: 0.01 },
  );

  belowFold.forEach((el) => observer.observe(el));

  function sweepAboveViewport() {
    const limit = window.innerHeight + 80;
    for (const el of belowFold) {
      if (el.classList.contains("is-visible")) continue;
      if (el.getBoundingClientRect().top < limit) {
        markVisible(el);
        observer.unobserve(el);
      }
    }
  }

  const fallbackTimer = window.setTimeout(sweepAboveViewport, 350);
  const onHashJump = () => requestAnimationFrame(sweepAboveViewport);
  window.addEventListener("hashchange", onHashJump);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    window.clearTimeout(fallbackTimer);
    window.removeEventListener("hashchange", onHashJump);
    observer.disconnect();
  };
}

function runCountUps() {
  if (REDUCED()) return () => {};
  const frames: number[] = [];

  document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])").forEach((el) => {
    const end = Number(el.dataset.count);
    el.dataset.counted = "1";
    if (!(end > 0) || !el.firstChild) return;

    const text = el.firstChild;
    const start = performance.now() + 140;
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 4);
      text.nodeValue = Math.round(end * eased).toLocaleString("en-IN");
      if (t < 1) {
        frames.push(requestAnimationFrame(tick));
      }
    };

    text.nodeValue = "0";
    frames.push(requestAnimationFrame(tick));
  });

  return () => {
    frames.forEach((id) => cancelAnimationFrame(id));
  };
}

function setupHeroVisibility() {
  const hero = document.querySelector<HTMLElement>(".ep-il-hero");
  if (!hero || typeof IntersectionObserver === "undefined") return () => {};
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        hero.classList.toggle("is-offscreen", !entry.isIntersecting);
      }
    },
    { threshold: 0 },
  );
  observer.observe(hero);
  return () => {
    observer.disconnect();
    hero.classList.remove("is-offscreen");
  };
}

export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const timers: number[] = [];
    const stopReveals = setupScrollReveals(timers);
    const stopCountUps = runCountUps();
    const stopHero = setupHeroVisibility();

    return () => {
      stopReveals();
      stopCountUps();
      stopHero();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
