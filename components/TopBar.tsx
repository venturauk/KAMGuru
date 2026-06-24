import Link from "next/link";

const PHONE = "+44 (0) 203 714 5363";
const PHONE_HREF = "tel:+442037145363";
const EMAIL = "info@kamguru.com";

export default function TopBar() {
  return (
    <div className="hidden bg-ink text-white/90 sm:block">
      <div className="container-x flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a href={PHONE_HREF} className="flex items-center gap-1.5 hover:text-brand">
            <span aria-hidden>📞</span> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-1.5 hover:text-brand">
            <span aria-hidden>✉️</span> <span className="uppercase tracking-wide">{EMAIL}</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://uk.linkedin.com/company/kamguru"
            target="_blank"
            rel="noopener"
            className="hover:text-brand"
          >
            LinkedIn
          </a>
          <span className="text-white/30">·</span>
          <Link href="/podcast/" className="hover:text-brand">
            KAMCast
          </Link>
        </div>
      </div>
    </div>
  );
}
