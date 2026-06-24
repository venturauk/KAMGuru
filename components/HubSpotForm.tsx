"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    hbspt?: { forms: { create: (opts: Record<string, unknown>) => void } };
  }
}

/** Embeds a single HubSpot form into its own div (target must be a selector). */
export default function HubSpotForm({
  portalId,
  formId,
  region = "eu1",
}: {
  portalId: string;
  formId: string;
  region?: string;
}) {
  const targetId = `hs-form-${useId().replace(/[^a-z0-9]/gi, "")}`;

  useEffect(() => {
    const create = () => {
      const el = document.getElementById(targetId);
      if (window.hbspt && el && el.childElementCount === 0) {
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${targetId}`,
        });
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
  }, [targetId, portalId, formId, region]);

  return <div id={targetId} />;
}
