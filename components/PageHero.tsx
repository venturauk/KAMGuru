import { mediaUrl } from "@/lib/media";

/** Inner-page hero with the signature KAMguru orange diagonal. */
export default function PageHero({
  title,
  subtitle,
  image,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  eyebrow?: string;
}) {
  return (
    <section className="page-hero">
      {image && (
        <div
          className="page-hero__bg"
          style={{ backgroundImage: `url(${mediaUrl(image)})` }}
        />
      )}
      <div className="page-hero__wedge" />
      <div className="container-x relative py-16 sm:py-20">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <>
            <div className="rule-orange mt-5" />
            <p className="mt-4 max-w-2xl text-lg font-medium text-white/90">
              {subtitle}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
