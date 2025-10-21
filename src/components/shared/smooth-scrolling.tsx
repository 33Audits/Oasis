"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const lenisRef = useRef<Lenis>(null);

  useEffect(() => {
    // Check if smooth scrolling should be disabled for this page
    const shouldDisable = disabled || document.querySelector('[data-disable-smooth-scroll]') !== null;
    if (shouldDisable) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [disabled]);

  useEffect(() => {
    // Check if smooth scrolling should be disabled for this page
    const shouldDisable = disabled || document.querySelector('[data-disable-smooth-scroll]') !== null;
    if (shouldDisable) return;

    // Custom scrollTo function with dynamic offset for sticky navbar
    const scrollToElement = (target: string) => {
      if (!lenisRef.current) return;

      const header = document.querySelector("header.sticky") as HTMLElement | null;
      const headerHeight = header ? header.offsetHeight : 0;
      const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
      const extraPadding = isMobile ? 16 : 32;
      const dynamicOffset = -(headerHeight + extraPadding);

      lenisRef.current.scrollTo(target, {
        offset: dynamicOffset,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };
    (window as any).smoothScrollTo = scrollToElement;

    // Handle hash fragment on page load
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#")) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    }

    // Handle hash changes (for router.push with hash)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#")) {
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      delete (window as any).smoothScrollTo;
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [disabled]);

  return <>{children}</>;
}
