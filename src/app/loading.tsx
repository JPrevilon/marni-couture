import { BrandLogo } from "@/components/brand-logo";

export default function Loading() {
  return (
    <main className="loading-screen" aria-live="polite">
      <div className="loading-screen__mark" aria-hidden="true">
        <BrandLogo variant="monogram" alt="" />
      </div>
      <p>Loading the runway…</p>
    </main>
  );
}
