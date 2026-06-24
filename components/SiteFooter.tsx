import Link from "next/link";
import { nav } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

const PHONE = "+44 (0) 203 714 5363";
const PHONE_HREF = "tel:+442037145363";
const EMAIL = "info@kamguru.com";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 text-white">
      {/* contact strip */}
      <div className="bg-brand">
        <div className="container-x grid gap-6 py-8 text-center sm:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Call us</div>
            <a href={PHONE_HREF} className="mt-1 block font-bold">{PHONE}</a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Email us</div>
            <a href={`mailto:${EMAIL}`} className="mt-1 block font-bold uppercase">{EMAIL}</a>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">Social</div>
            <a
              href="https://uk.linkedin.com/company/kamguru"
              target="_blank"
              rel="noopener"
              className="mt-1 block font-bold"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="bg-ink">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("/wp-content/uploads/logo_white_symbol_bg_500px.jpg")}
              alt="KAMguru"
              className="h-12 w-12 rounded"
            />
            <p className="mt-4 font-semibold">Jump Ahead of Your Competitors</p>
            <p className="mt-2 max-w-xs text-sm text-white/70">
              KAMguru helps you to develop profitable partnerships with your most
              important customers.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Menu</h3>
            <ul className="space-y-2 text-sm">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-white/70 hover:text-brand">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
            <p className="text-sm text-white/70">
              We&apos;d love to support you to jump ahead of your competitors. Get
              in touch to start your KAM journey with KAMguru today.
            </p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">Phone us:</span>{" "}
              <a href={PHONE_HREF} className="text-brand hover:underline">{PHONE}</a>
            </p>
            <p className="mt-1 text-sm">
              <span className="font-semibold">Email us:</span>{" "}
              <a href={`mailto:${EMAIL}`} className="text-brand hover:underline">{EMAIL}</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} KAMguru. Key Account Management. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy-policy/" className="hover:text-brand">Privacy Policy</Link>
              <Link href="/terms-and-conditions/" className="hover:text-brand">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
