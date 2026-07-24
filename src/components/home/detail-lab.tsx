import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";

const details = [
  {
    number: "01",
    title: "Stitch",
    copy: "Show seams, embellishment, closures, and construction at close range.",
    image: "/media/details/stitch-detail.svg",
  },
  {
    number: "02",
    title: "Fabric",
    copy: "Use moving macro footage to communicate texture, weight, and drape.",
    image: "/media/details/fabric-detail.svg",
  },
  {
    number: "03",
    title: "Finish",
    copy: "Turn care, fit, and material information into an elegant buying aid.",
    image: "/media/details/finish-detail.svg",
  },
];

export function DetailLab() {
  return (
    <section
      className="detail-lab section-shell"
      id="detail-lab"
    >
      <div className="section-shell__inner">
        <SectionHeading
          eyebrow="Detail lab"
          title="Luxury is visible up close."
          body="These abstract textures reserve space for the original product macro photography and video."
        />

        <div className="detail-lab__grid">
          {details.map((detail) => (
            <article key={detail.number} data-reveal>
              <div className="detail-lab__image">
                <Image
                  src={detail.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 90vw, 30vw"
                />
              </div>
              <div className="detail-lab__copy">
                <span>{detail.number}</span>
                <h3>{detail.title}</h3>
                <p>{detail.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
