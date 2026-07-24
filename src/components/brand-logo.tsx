import Image from "next/image";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  variant?: "header" | "primary" | "monogram";
  className?: string;
  priority?: boolean;
  alt?: string;
};

const sources = {
  header: {
    src: "/brand/wordmarks/marni-couture-header-transparent.png",
    width: 1800,
    height: 555,
  },
  primary: {
    src: "/brand/wordmarks/marni-couture-primary-transparent.png",
    width: 1800,
    height: 667,
  },
  monogram: {
    src: "/brand/monograms/mc-monogram-transparent-1024.png",
    width: 1024,
    height: 1024,
  },
} as const;

export function BrandLogo({
  variant = "header",
  className,
  priority = false,
  alt = "MARNI COUTURE",
}: BrandLogoProps) {
  const source = sources[variant];

  return (
    <Image
      src={source.src}
      width={source.width}
      height={source.height}
      alt={alt}
      priority={priority}
      className={cn("brand-logo", `brand-logo--${variant}`, className)}
      sizes={
        variant === "monogram"
          ? "(max-width: 768px) 72px, 96px"
          : "(max-width: 768px) 55vw, 420px"
      }
    />
  );
}
