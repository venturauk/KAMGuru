import { withMedia } from "@/lib/media";

/** Renders cleaned WordPress HTML with media URLs resolved. */
export default function Html({
  html,
  className = "prose",
}: {
  html: string;
  className?: string;
}) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: withMedia(html) }} />
  );
}
