"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/media";
import type { Video } from "@/lib/content";

export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="relative aspect-video bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://muse.ai/embed/${video.muse}?logo=0&links=0&search=0&autoplay=1`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play: ${video.title}`}
          >
            {video.thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaUrl(video.thumb)}
                alt={video.title}
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/15 transition group-hover:bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-ink">{video.title}</h3>
      </div>
    </div>
  );
}
