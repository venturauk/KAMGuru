"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    hbspt?: { forms: { create: (opts: Record<string, unknown>) => void } };
  }
}

/** Embeds a single HubSpot form (loads the v2 embed script once). */
export default function HubSpotForm({
  portalId,
  formId,
  region = "eu1",
}: {
  portalId: string;
  formId: string;
  region?: string;
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const create = () => {
      if (window.hbspt && target && target.childElementCount === 0) {
        window.hbspt.forms.create({ region, portalId, formId, target });
      }
    };

    const SRC = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="hsforms.net/forms/embed/v2.js"]'
    );

    if (window.hbspt) {
      create();
    } else if (existing) {
      existing.addEventListener("load", create);
    } else {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.addEventListener("load", create);
      document.body.appendChild(s);
    }
  }, [portalId, formId, region]);

  return <div ref={targetRef} />;
}
