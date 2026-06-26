import { testimonials } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

// Company logo per testimonial (by name).
const LOGOS: Record<string, string> = {
  "Steve Richardson": "/wp-content/uploads/michelin.jpg",
  "Gabi O'Rourke": "/wp-content/uploads/grant-thornton.jpg",
  "Keith Purdom": "/wp-content/uploads/servisair.jpg",
  "Ken Butt": "/wp-content/uploads/tibbett_britten.jpg",
  "Tom Machin": "/wp-content/uploads/bpif.jpg",
  "Bankie Williams": "/wp-content/uploads/homeserve.jpg",
  "Nick Hurrell": "/wp-content/uploads/hogg-robinson.jpg",
};

export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-ink">What our clients say</h2>
          <div className="rule-orange mx-auto mt-4" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t) => {
            const logo = LOGOS[t.name];
            return (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-line bg-[var(--bg-soft)] p-6"
              >
                <div className="text-4xl leading-none text-brand" aria-hidden>
                  &ldquo;
                </div>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                  <div className="min-w-0">
                    <div className="font-bold text-ink">{t.name}</div>
                    {t.role && (
                      <div className="text-xs text-ink-soft">{t.role}</div>
                    )}
                  </div>
                  {logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mediaUrl(logo)}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-8 w-auto max-w-[88px] shrink-0 object-contain opacity-70 grayscale"
                    />
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
