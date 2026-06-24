"use client";

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl("/wp-content/uploads/logo_240.png")}
            alt="KAMguru"
            className="h-9 w-auto"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-ink-soft hover:text-brand"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-56 rounded-xl border border-line bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-[var(--bg-soft)] hover:text-brand"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/contact/" className="btn ml-2 !py-2 !px-4 text-sm">
            Get in touch
          </Link>
        </nav>

        {/* mobile toggle */}
        <button
          className="lg:hidden inline-flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-line bg-white">
          <div className="container-x py-3">
            {nav.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className="block py-2 font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block py-1.5 text-sm text-ink-soft"
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
