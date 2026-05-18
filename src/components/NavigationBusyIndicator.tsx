"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const STALE_NAVIGATION_MS = 8000;
const SETTLE_DELAY_MS = 180;

function getInternalHref(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  const anchor = target.closest("a");

  if (!anchor) {
    return null;
  }

  const href = anchor.getAttribute("href");

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    anchor.hasAttribute("download") ||
    anchor.target === "_blank"
  ) {
    return null;
  }

  const url = new URL(href, window.location.href);

  if (url.origin !== window.location.origin) {
    return null;
  }

  if (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  ) {
    return null;
  }

  return url.href;
}

function NavigationBusyIndicatorInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const [isPending, setIsPending] = useState(false);
  const staleTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (staleTimerRef.current) {
        window.clearTimeout(staleTimerRef.current);
      }

      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const start = () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }

      if (staleTimerRef.current) {
        window.clearTimeout(staleTimerRef.current);
      }

      setIsPending(true);
      staleTimerRef.current = window.setTimeout(() => {
        setIsPending(false);
        staleTimerRef.current = null;
      }, STALE_NAVIGATION_MS);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      if (getInternalHref(event.target)) {
        start();
      }
    };

    const handlePopState = () => {
      start();
    };

    const handleBeforeUnload = () => {
      setIsPending(true);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!isPending) {
      return;
    }

    if (staleTimerRef.current) {
      window.clearTimeout(staleTimerRef.current);
      staleTimerRef.current = null;
    }

    settleTimerRef.current = window.setTimeout(() => {
      setIsPending(false);
      settleTimerRef.current = null;
    }, SETTLE_DELAY_MS);
  }, [pathname, search, isPending]);

  return (
    <div
      aria-hidden={!isPending}
      aria-live="polite"
      className={`navigation-busy-indicator ${
        isPending ? "navigation-busy-indicator--active" : ""
      }`}
    >
      <div className="navigation-busy-indicator__bar" />
    </div>
  );
}

export default function NavigationBusyIndicator() {
  return (
    <Suspense fallback={null}>
      <NavigationBusyIndicatorInner />
    </Suspense>
  );
}
