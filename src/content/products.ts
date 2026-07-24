export type ProductStatus = "available" | "low-stock" | "preorder" | "sold-out";

export type Product = {
  id: string;
  handle: string;
  name: string;
  price: number;
  currency: string;
  status: ProductStatus;
  badge?: string;
  colors: string[];
  sizes: string[];
  image: string;
  hoverImage?: string;
  shortDescription: string;
  description: string;
  details: string[];
  care: string[];
  palette: {
    primary: string;
    secondary: string;
  };
  featured: boolean;
  placeholder: boolean;
  shopifyProductId?: string;
  shopifyVariantIds?: Record<string, string>;
};

export const mockProducts: Product[] = [
  {
    id: "concept-001",
    handle: "chromatic-sculpt-dress",
    name: "Chromatic Sculpt Dress",
    price: 185,
    currency: "USD",
    status: "available",
    badge: "New concept",
    colors: ["Couture Pink", "Ultraviolet"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/media/products/chromatic-sculpt-dress.svg",
    shortDescription: "A high-impact silhouette shaped for movement.",
    description:
      "Preview merchandise entry used to demonstrate the product experience. Replace this copy, price, images, variants, and materials with approved client information before launch.",
    details: ["Concept product", "Structured silhouette", "Statement color"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#FF2F9A", secondary: "#824CFF" },
    featured: true,
    placeholder: true,
  },
  {
    id: "concept-002",
    handle: "afterglow-corset-set",
    name: "Afterglow Corset Set",
    price: 160,
    currency: "USD",
    status: "low-stock",
    badge: "Preview",
    colors: ["Blush", "Hyper Blue"],
    sizes: ["XS", "S", "M", "L"],
    image: "/media/products/afterglow-corset-set.svg",
    shortDescription: "A two-piece concept with sculpted contrast.",
    description:
      "Preview merchandise entry used to demonstrate the product experience. Replace all content with approved catalog data before accepting orders.",
    details: ["Concept product", "Two-piece styling", "Adjustable fit placeholder"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#F27CA0", secondary: "#2779FF" },
    featured: true,
    placeholder: true,
  },
  {
    id: "concept-003",
    handle: "electric-bloom-mini",
    name: "Electric Bloom Mini",
    price: 140,
    currency: "USD",
    status: "preorder",
    badge: "Preview preorder",
    colors: ["Electric Green", "Acid Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/media/products/electric-bloom-mini.svg",
    shortDescription: "Compact volume with an electric finish.",
    description:
      "Preview merchandise entry used to demonstrate the product experience. Preorder language is not final and must be replaced with approved timing and terms.",
    details: ["Concept product", "Mini length", "Color-block finish"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#4CFF78", secondary: "#F1FF3D" },
    featured: true,
    placeholder: true,
  },
  {
    id: "concept-004",
    handle: "midnight-ribbon-gown",
    name: "Midnight Ribbon Gown",
    price: 240,
    currency: "USD",
    status: "available",
    badge: "Editorial preview",
    colors: ["Midnight", "Ultraviolet"],
    sizes: ["XS", "S", "M", "L"],
    image: "/media/products/midnight-ribbon-gown.svg",
    shortDescription: "A dark runway line with a luminous edge.",
    description:
      "Preview merchandise entry used to demonstrate the product experience. Replace this placeholder with final garment specifications.",
    details: ["Concept product", "Full length", "Ribbon detail placeholder"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#824CFF", secondary: "#2779FF" },
    featured: true,
    placeholder: true,
  },
  {
    id: "concept-005",
    handle: "acid-petal-two-piece",
    name: "Acid Petal Two-Piece",
    price: 175,
    currency: "USD",
    status: "available",
    badge: "Concept drop",
    colors: ["Acid Yellow", "Electric Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "/media/products/acid-petal-two-piece.svg",
    shortDescription: "A vivid set built around layered petal forms.",
    description:
      "Preview merchandise entry used to demonstrate the product experience. Replace with final product media and approved selling copy.",
    details: ["Concept product", "Two-piece set", "Layered form"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#F1FF3D", secondary: "#4CFF78" },
    featured: false,
    placeholder: true,
  },
  {
    id: "concept-006",
    handle: "ultraviolet-motion-top",
    name: "Ultraviolet Motion Top",
    price: 95,
    currency: "USD",
    status: "sold-out",
    badge: "Preview",
    colors: ["Ultraviolet", "Couture Pink"],
    sizes: ["XS", "S", "M", "L"],
    image: "/media/products/ultraviolet-motion-top.svg",
    shortDescription: "A sharp upper silhouette with saturated color.",
    description:
      "Preview merchandise entry used to demonstrate sold-out and restock states. Replace before launch.",
    details: ["Concept product", "Statement neckline", "Fitted shape placeholder"],
    care: ["Replace with approved care instructions"],
    palette: { primary: "#824CFF", secondary: "#FF2F9A" },
    featured: false,
    placeholder: true,
  },
];

export function findMockProduct(handle: string): Product | undefined {
  return mockProducts.find((product) => product.handle === handle);
}
