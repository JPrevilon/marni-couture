export type RunwayLook = {
  id: string;
  index: string;
  title: string;
  line: string;
  image: string;
  accent: string;
  productHandle: string;
};

export const runwayLooks: RunwayLook[] = [
  {
    id: "look-01",
    index: "01",
    title: "Color takes shape.",
    line: "The first chapter moves from couture pink into ultraviolet depth.",
    image: "/media/products/chromatic-sculpt-dress.svg",
    accent: "#FF2F9A",
    productHandle: "chromatic-sculpt-dress",
  },
  {
    id: "look-02",
    index: "02",
    title: "Stillness becomes motion.",
    line: "A mannequin-inspired silhouette shifts through layered light.",
    image: "/media/products/electric-bloom-mini.svg",
    accent: "#4CFF78",
    productHandle: "electric-bloom-mini",
  },
  {
    id: "look-03",
    index: "03",
    title: "The night keeps moving.",
    line: "Dark structure meets an ultraviolet runway signal.",
    image: "/media/products/midnight-ribbon-gown.svg",
    accent: "#824CFF",
    productHandle: "midnight-ribbon-gown",
  },
];
