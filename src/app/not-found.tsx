import Link from "next/link";

export default function NotFound() {
  return (
    <main className="utility-page">
      <div className="utility-card utility-card--center">
        <p className="eyebrow">404</p>
        <h1>This look left the runway.</h1>
        <p>
          Return to the main experience or browse the preview
          collection.
        </p>
        <Link href="/" className="action-link action-link--solid">
          Back home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
