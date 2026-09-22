import type { Video } from "virtual:content";

/** 페이지 안에서 바로 재생되는 유튜브 영상 */
export default function VideoFig({ video, title }: { video: Video; title: string }) {
  return (
    <figure className="fig">
      <div className="fig__frame video">
        <iframe
          src={video.src}
          title={`${title} — ${video.label}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption>
        <span className="mono">VIDEO</span>
        <span>{video.label}</span>
      </figcaption>
    </figure>
  );
}
