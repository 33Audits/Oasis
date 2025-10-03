"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // Custom scrollTo function
    const scrollToElement = (target: string) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: -80,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
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

    return () => {
      delete (window as any).smoothScrollTo;
    };
  }, []);

  return <>{children}</>;
}
