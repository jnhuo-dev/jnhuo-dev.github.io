import { useState } from "react";
import { resolveAssetPath } from "../../utils/assets";

type SafeImageProps = {
  src?: string;
  alt: string;
  title?: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export default function SafeImage({
  src,
  alt,
  title = "Image will be added later",
  className,
  loading = "lazy",
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = hasError ? undefined : resolveAssetPath(src);

  if (!resolvedSrc) {
    return (
      <div className={`image-placeholder ${className ?? ""}`} role="img" aria-label={alt}>
        <span>{title}</span>
        <small>Image will be added later</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
}
