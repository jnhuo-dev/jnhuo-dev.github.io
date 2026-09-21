import type { Figure } from "virtual:content";

type FigProps = {
  figure?: Figure;
  index: number;
  alt: string;
  eager?: boolean;
};

/** 도면처럼 번호가 붙은 이미지. 이미지가 없으면 해치 패턴으로 자리를 표시한다. */
export default function Fig({ figure, index, alt, eager = false }: FigProps) {
  const label = `FIG. ${String(index).padStart(2, "0")}`;

  return (
    <figure className="fig">
      {figure ? (
        <a className="fig__frame" href={figure.src} target="_blank" rel="noreferrer" title="원본 크기로 보기">
          <img
            src={figure.src}
            alt={figure.caption ?? alt}
            width={figure.width}
            height={figure.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      ) : (
        <div className="fig__frame hatch" role="img" aria-label={`${alt} 이미지 준비 중`}>
          <span>이미지 준비 중</span>
        </div>
      )}
      <figcaption>
        <span className="mono">{label}</span>
        {figure?.caption ? <span>{figure.caption}</span> : null}
      </figcaption>
    </figure>
  );
}
