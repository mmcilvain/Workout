import { useEffect, useMemo, useState, type CSSProperties } from "react";

export type MediaType = "image" | "gif" | "video";

export interface MediaDemoProps {
  type?: MediaType | string;
  src?: string;
  fallbackSrc?: string;
  alt?: string;
  caption?: string;
  className?: string;
}

const supportedMediaTypes = new Set<MediaType>(["image", "gif", "video"]);

function isSupportedMediaType(type: MediaDemoProps["type"]): type is MediaType {
  return typeof type === "string" && supportedMediaTypes.has(type as MediaType);
}

function isUsableMediaSource(src: MediaDemoProps["src"]) {
  return typeof src === "string" && src.trim().length > 0;
}

export function MediaFallback({
  message = "Media preview unavailable",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={message}
      className={className}
      style={{
        alignItems: "center",
        background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        border: "1px dashed #9ca3af",
        borderRadius: 16,
        color: "#4b5563",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        justifyContent: "center",
        minHeight: 180,
        padding: 24,
        textAlign: "center",
        width: "100%",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 32 }}>
        🏋️
      </span>
      <strong>{message}</strong>
      <span style={{ fontSize: 14 }}>
        Follow the written instructions and move with control.
      </span>
    </div>
  );
}

export function MediaDemo({
  type,
  src,
  fallbackSrc,
  alt = "Exercise demonstration",
  caption,
  className,
}: MediaDemoProps) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const canUseFallbackSource =
    isUsableMediaSource(fallbackSrc) && fallbackSrc !== activeSrc;
  const displayType = activeSrc?.startsWith("data:image/") ? "image" : type;

  useEffect(() => {
    setActiveSrc(src);
    setHasError(false);
  }, [src, type, fallbackSrc]);

  const fallbackMessage = useMemo(() => {
    if (!isUsableMediaSource(activeSrc)) {
      return "No media has been provided for this exercise.";
    }

    if (!isSupportedMediaType(displayType)) {
      return "This media type is not supported.";
    }

    return "This media could not be loaded.";
  }, [activeSrc, displayType]);

  const handleMediaError = () => {
    if (canUseFallbackSource) {
      setActiveSrc(fallbackSrc);
      setHasError(false);
      return;
    }

    setHasError(true);
  };

  if (
    !isUsableMediaSource(activeSrc) ||
    !isSupportedMediaType(displayType) ||
    hasError
  ) {
    return <MediaFallback className={className} message={fallbackMessage} />;
  }

  const sharedMediaStyles: CSSProperties = {
    aspectRatio: "16 / 9",
    background: "#111827",
    borderRadius: 16,
    display: "block",
    objectFit: "cover",
    width: "100%",
  };

  return (
    <figure className={className} style={{ margin: 0 }}>
      {displayType === "video" ? (
        <video
          aria-label={alt}
          controls
          onError={handleMediaError}
          preload="metadata"
          src={activeSrc}
          style={sharedMediaStyles}
        />
      ) : (
        <img
          alt={alt}
          onError={handleMediaError}
          src={activeSrc}
          style={sharedMediaStyles}
        />
      )}
      {caption ? (
        <figcaption style={{ color: "#6b7280", fontSize: 14, marginTop: 8 }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default MediaDemo;
