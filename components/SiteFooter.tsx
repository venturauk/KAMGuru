import Link from "next/link";
import { nav } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-[var(--bg-soft)]">
      <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl("/wp-content/uploads/logo_240.png")}
            alt="KAMguru"
            className="h-10 w-auto"
          />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            The UK&apos;s leading key account management consultancy — helping you
            build profitable partnerships with your most important customers.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            {nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-ink-soft hover:text-brand">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/consultancy/" className="text-ink-soft hover:text-brand">Consultancy</Link></li>
            <li><Link href="/services/coaching/" className="text-ink-soft hover:text-brand">Coaching</Link></li>
            <li><Link href="/services/training/" className="text-ink-soft hover:text-brand">Training</Link></li>
            <li><Link href="/services/speaking/" className="text-ink-soft hover:text-brand">Speaking</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
            Get in touch
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact/" className="text-ink-soft hover:text-brand">Contact us</Link></li>
            <li><Link href="/podcast/" className="text-ink-soft hover:text-brand">KAMCast podcast</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} KAMguru. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy/" className="hover:text-brand">Privacy Policy</Link>
            <Link href="/terms-and-conditions/" className="hover:text-brand">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
