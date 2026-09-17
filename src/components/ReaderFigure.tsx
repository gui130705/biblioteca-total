type ReaderFigureProps = {
  src: string;
  alt: string;
  caption: string;
  variant?: "engraving" | "cover";
  eager?: boolean;
};

export function ReaderFigure({
  src,
  alt,
  caption,
  variant = "engraving",
  eager = false,
}: ReaderFigureProps) {
  const isCover = variant === "cover";

  return (
    <figure className={isCover ? "reader-figure reader-figure-cover" : "reader-figure"}>
      <div className="reader-figure-frame">
        <img
          src={src}
          alt={alt}
          width={isCover ? 1024 : 1536}
          height={isCover ? 1536 : 1024}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}