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

type NavigatorWithPerformanceHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

function prefersLowPowerMotion() {
  const navigatorWithHints = navigator as NavigatorWithPerformanceHints;

  return Boolean(
    navigatorWithHints.connection?.saveData ||
      (navigatorWithHints.deviceMemory &&
        navigatorWithHints.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4,
  );
}

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
    const motionRoot = root.current;
    const lowPower = !reduceMotion && prefersLowPowerMotion();
    motionRoot.dataset.motion = reduceMotion
      ? "reduced"
      : lowPower
        ? "low"
        : "full";
    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      const looks = gsap.utils.toArray<HTMLElement>(
        "[data-runway-look]",
        motionRoot,
      );

      function exposeAllLooks() {
        looks.forEach((look) => {
          look.inert = false;
          look.setAttribute("aria-hidden", "false");
        });
      }

      if (reduceMotion) {
        exposeAllLooks();
        gsap.set(
          motionRoot.querySelectorAll(
          "[data-reveal], [data-runway-look], [data-hero-logo], [data-hero-copy], [data-hero-actions], [data-hero-note]",
          ),
          { clearProps: "all", autoAlpha: 1 },
        );
        return;
      }

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
        yPercent: lowPower ? 7 : 14,
        scale: lowPower ? 1.035 : 1.07,
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
            y: lowPower ? 28 : 48,
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

      const trailSpecs = lowPower
        ? [{ target: "[data-trail-pink]", x: 18, y: 80, scrub: 1 }]
        : [
            { target: "[data-trail-pink]", x: 32, y: 110, scrub: 1.15 },
            { target: "[data-trail-violet]", x: -32, y: 165, scrub: 1.35 },
            { target: "[data-trail-blue]", x: 22, y: 230, scrub: 1.55 },
          ];

      trailSpecs.forEach(({ target, x, y, scrub }) => {
        gsap.to(target, {
          xPercent: x,
          yPercent: y,
          ease: "none",
          scrollTrigger: {
            trigger: motionRoot,
            start: "top top",
            end: "bottom bottom",
            scrub,
          },
        });
      });

      gsap.to(".chromatic-trail span", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-drop-club]",
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      });

      media.add("(min-width: 900px)", () => {
        const runway = root.current?.querySelector<HTMLElement>(
          "[data-runway]",
        );
        const stage = root.current?.querySelector<HTMLElement>(
          "[data-runway-stage]",
        );
        const meter = root.current?.querySelector<HTMLElement>(
          ".living-runway__meter span",
        );

        if (!runway || !stage || looks.length < 2) return;

        let activeLook = -1;
        const setActiveLook = (index: number) => {
          if (index === activeLook) return;
          activeLook = index;
          looks.forEach((look, lookIndex) => {
            const active = lookIndex === index;
            look.inert = !active;
            look.setAttribute("aria-hidden", String(!active));
          });
        };

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
        setActiveLook(0);

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: () => {
            const index = Math.min(
              looks.length - 1,
              Math.round(timeline.progress() * (looks.length - 1)),
            );
            setActiveLook(index);
          },
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

        if (!lowPower) {
          gsap.utils
            .toArray<HTMLElement>("[data-product-image]", motionRoot)
            .forEach((image) => {
              const mediaElement = image.querySelector("img");
              if (!mediaElement) return;

              gsap.fromTo(
                mediaElement,
                { yPercent: -3, scale: 1.025 },
                {
                  yPercent: 3,
                  scale: 1.045,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            });
        }

        return () => exposeAllLooks();
      });

      media.add("(max-width: 899px)", () => {
        gsap.utils
          .toArray<HTMLElement>(
            "[data-runway-look]",
            root.current,
          )
          .forEach((look) => {
            look.inert = true;
            look.setAttribute("aria-hidden", "true");
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
                onComplete: () => {
                  look.inert = false;
                  look.setAttribute("aria-hidden", "false");
                },
              },
            );
          });

        return () => exposeAllLooks();
      });

    }, motionRoot);

    return () => {
      media.revert();
      context.revert();
      motionRoot.removeAttribute("data-motion");
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
