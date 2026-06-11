import React, { useEffect, useMemo, useState } from "react";

export type MediaType = "image" | "gif" | "video";

export interface MediaDemoProps {
  type?: MediaType | string;
  src?: string;
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
}: {
  message?: string;
}) {
  return (
    <div
      role="img"
      aria-label={message}
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
  alt = "Exercise demonstration",
  caption,
  className,
}: MediaDemoProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src, type]);

  const fallbackMessage = useMemo(() => {
    if (!isUsableMediaSource(src)) {
      return "No media has been provided for this exercise.";
    }

    if (!isSupportedMediaType(type)) {
      return "This media type is not supported.";
    }

    return "This media could not be loaded.";
  }, [src, type]);

  if (!isUsableMediaSource(src) || !isSupportedMediaType(type) || hasError) {
    return <MediaFallback message={fallbackMessage} />;
  }

  const sharedMediaStyles: React.CSSProperties = {
    aspectRatio: "16 / 9",
    background: "#111827",
    borderRadius: 16,
    display: "block",
    objectFit: "cover",
    width: "100%",
  };

  return (
    <figure className={className} style={{ margin: 0 }}>
      {type === "video" ? (
        <video
          aria-label={alt}
          controls
          onError={() => setHasError(true)}
          preload="metadata"
          src={src}
          style={sharedMediaStyles}
        />
      ) : (
        <img
          alt={alt}
          onError={() => setHasError(true)}
          src={src}
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
