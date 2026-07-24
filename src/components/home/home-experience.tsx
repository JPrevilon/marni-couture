"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandStory } from "@/components/home/brand-story";
import { ChromaticTrail } from "@/components/home/chromatic-trail";
import { DetailLab } from "@/components/home/detail-lab";
import { DropClub } from "@/components/home/drop-club";
import { Hero } from "@/components/home/hero";
import { LivingRunway } from "@/components/home/living-runway";
import { NewArrivals } from "@/components/home/new-arrivals";
import { ShopTheLook } from "@/components/home/shop-the-look";
import { SocialShowroom } from "@/components/home/social-showroom";
import type { Product } from "@/content/products";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HomeExperience({
  products,
}: {
  products: Product[];
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) {
      gsap.set(
        root.current.querySelectorAll(
          "[data-reveal], [data-runway-look], [data-hero-logo], [data-hero-copy], [data-hero-actions], [data-hero-note]",
        ),
        { clearProps: "all", autoAlpha: 1 },
      );
      return;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-logo]", {
          autoAlpha: 0,
          yPercent: 18,
          duration: 1.15,
        })
        .from(
          "[data-hero-copy]",
          {
            autoAlpha: 0,
            y: 28,
            duration: 0.8,
          },
          "-=0.62",
        )
        .from(
          "[data-hero-actions]",
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
          },
          "-=0.48",
        )
        .from(
          "[data-hero-note]",
          {
            autoAlpha: 0,
            x: 26,
            duration: 0.7,
          },
          "-=0.52",
        );

      gsap.to("[data-hero-media]", {
        yPercent: 16,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const reveals = gsap.utils.toArray<HTMLElement>(
        "[data-reveal]",
        root.current,
      );

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 54,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.to("[data-trail-pink]", {
        xPercent: 42,
        yPercent: 110,
        rotation: 16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.to("[data-trail-violet]", {
        xPercent: -48,
        yPercent: 170,
        rotation: -22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.45,
        },
      });

      gsap.to("[data-trail-blue]", {
        xPercent: 24,
        yPercent: 245,
        rotation: 28,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      media.add("(min-width: 900px)", () => {
        const runway = root.current?.querySelector<HTMLElement>(
          "[data-runway]",
        );
        const stage = root.current?.querySelector<HTMLElement>(
          "[data-runway-stage]",
        );
        const looks = gsap.utils.toArray<HTMLElement>(
          "[data-runway-look]",
          root.current,
        );
        const meter = root.current?.querySelector<HTMLElement>(
          ".living-runway__meter span",
        );

        if (!runway || !stage || looks.length < 2) return;

        gsap.set(looks, {
          autoAlpha: 0,
          yPercent: 8,
          scale: 0.96,
        });
        gsap.set(looks[0], {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
        });
        if (meter) gsap.set(meter, { scaleX: 0 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: () => `+=${looks.length * window.innerHeight}`,
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (meter) {
          timeline.to(
            meter,
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: looks.length,
            },
            0,
          );
        }

        looks.slice(1).forEach((look, index) => {
          const previous = looks[index];
          const position = index + 0.78;

          timeline
            .to(
              previous,
              {
                autoAlpha: 0,
                yPercent: -8,
                scale: 1.03,
                duration: 0.45,
              },
              position,
            )
            .fromTo(
              look,
              {
                autoAlpha: 0,
                yPercent: 10,
                scale: 0.95,
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                scale: 1,
                duration: 0.62,
              },
              position + 0.1,
            );
        });
      });

      media.add("(max-width: 899px)", () => {
        gsap.utils
          .toArray<HTMLElement>(
            "[data-runway-look]",
            root.current,
          )
          .forEach((look) => {
            gsap.fromTo(
              look,
              { autoAlpha: 0, y: 44 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                scrollTrigger: {
                  trigger: look,
                  start: "top 85%",
                  once: true,
                },
              },
            );
          });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, [reduceMotion]);

  const featured = products[0];

  return (
    <div ref={root} className="home-experience">
      <ChromaticTrail />
      <Hero />
      <NewArrivals products={products} />
      <LivingRunway />
      {featured ? <ShopTheLook product={featured} /> : null}
      <DetailLab />
      <BrandStory />
      <SocialShowroom />
      <DropClub />
    </div>
  );
}
