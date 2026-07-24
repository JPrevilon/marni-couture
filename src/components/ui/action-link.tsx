import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export function ActionLink({
  href,
  children,
  variant = "solid",
  className,
  external = false,
  onClick,
}: ActionLinkProps) {
  const shared = {
    className: cn("action-link", `action-link--${variant}`, className),
    onClick,
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        {...shared}
      >
        <span>{children}</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} {...shared}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
