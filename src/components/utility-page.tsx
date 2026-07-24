import type { ReactNode } from "react";

type UtilityPageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  notice?: string;
};

export function UtilityPage({
  eyebrow,
  title,
  intro,
  children,
  notice,
}: UtilityPageProps) {
  return (
    <main className="utility-page">
      <div className="utility-page__inner">
        <header className="utility-page__heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {intro ? <p>{intro}</p> : null}
        </header>
        {notice ? (
          <div className="draft-notice" role="note">
            <strong>Draft notice</strong>
            <p>{notice}</p>
          </div>
        ) : null}
        <div className="utility-page__content">{children}</div>
      </div>
    </main>
  );
}
