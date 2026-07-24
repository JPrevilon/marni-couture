import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { runwayLooks } from "@/content/runway";

export function LivingRunway() {
  return (
    <section className="living-runway" id="runway" data-runway>
      <div className="living-runway__stage" data-runway-stage>
        <div className="living-runway__heading">
          <p className="eyebrow">Living runway</p>
          <h2>One scroll. Three shifts in motion.</h2>
        </div>

        <div className="living-runway__looks">
          {runwayLooks.map((look, index) => (
            <article
              key={look.id}
              className="runway-look"
              data-runway-look
              data-index={index}
              style={
                {
                  "--look-accent": look.accent,
                } as CSSProperties
              }
            >
              <div className="runway-look__image">
                <Image
                  src={look.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              </div>
              <div className="runway-look__copy">
                <span>{look.index}</span>
                <h3>{look.title}</h3>
                <p>{look.line}</p>
                <Link href={`/products/${look.productHandle}`}>
                  Enter the look <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="runway-look__signal" aria-hidden="true">
                {look.index}
              </div>
            </article>
          ))}
        </div>

        <div className="living-runway__meter" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
