import { supabase, getPublicUrl } from "./supabase";
import { PlaceHolderImages } from "./placeholder-images";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  gallery: string[];
  colorway: string;
  releaseStatus: string;
  dropDate: string;
  supportingNote: string;
  story: string;
  highlights: string[];
  specs: ProductSpec[];
  sizes: string[];
}

const placeholderImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id)?.imageUrl || "";

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const withRepeatedGallery = (image: string) => [
  image,
  image,
  image,
];

const normalizeImageSource = (value: unknown) =>
  typeof value === "string" ? getPublicUrl("products", value) : "";

export const STATIC_PRODUCTS: Product[] = [
  {
    id: "c-1",
    slug: "feeton-carbon-flux",
    name: "FEETON CARBON FLUX",
    price: "$540.00",
    category: "PERFORMANCE",
    tag: "Performance",
    description: "A masterpiece of carbon fiber integration.",
    image: placeholderImage("shoe-1"),
    gallery: withRepeatedGallery(placeholderImage("shoe-1")),
    colorway: "Obsidian / Ember",
    releaseStatus: "Ready To Ship",
    dropDate: "May 14, 2026",
    supportingNote: "Built for explosive return and disciplined daily mileage.",
    story:
      "Carbon Flux is the purest expression of Feeton's performance language: aggressive geometry, stripped excess, and propulsion tuned for fast-forward motion.",
    highlights: [
      "Full-length carbon propulsion plate",
      "Race-tuned upper with pressure mapped ventilation",
      "Heel cradle engineered for locked directional changes",
    ],
    specs: [
      { label: "Weight", value: "248g" },
      { label: "Stack", value: "36mm / 28mm" },
      { label: "Ride", value: "Reactive" },
      { label: "Use Case", value: "Tempo / Race Day" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
  },
  {
    id: "c-2",
    slug: "neon-pulse-xt",
    name: "NEON PULSE XT",
    price: "$620.00",
    category: "LIMITED",
    tag: "Limited",
    description: "Featuring active illuminating soles.",
    image: placeholderImage("shoe-2"),
    gallery: withRepeatedGallery(placeholderImage("shoe-2")),
    colorway: "Signal Red / Plasma",
    releaseStatus: "Drop Access",
    dropDate: "June 02, 2026",
    supportingNote: "A collector's build with kinetic lighting and scarce allocation.",
    story:
      "Neon Pulse XT turns movement into spectacle. Every contour, panel break, and light channel is designed to make velocity visible after dark.",
    highlights: [
      "Pressure-reactive illuminated sole units",
      "Reflective shell built for night movement",
      "Limited-run serialization inside each pair",
    ],
    specs: [
      { label: "Weight", value: "286g" },
      { label: "Stack", value: "34mm / 26mm" },
      { label: "Ride", value: "Expressive" },
      { label: "Use Case", value: "Collector / City Night" },
    ],
    sizes: ["40", "41", "42", "43", "44"],
  },
  {
    id: "c-3",
    slug: "crimson-edge-01",
    name: "CRIMSON EDGE 01",
    price: "$480.00",
    category: "LIFESTYLE",
    tag: "Lifestyle",
    description: "Sharp edges meet soft landings.",
    image: placeholderImage("shoe-3"),
    gallery: withRepeatedGallery(placeholderImage("shoe-3")),
    colorway: "Crimson / Smoke",
    releaseStatus: "Core Archive",
    dropDate: "April 20, 2026",
    supportingNote: "An architectural everyday silhouette tuned for long urban wear.",
    story:
      "Crimson Edge 01 softens brutalist lines with quiet cushioning. It is the bridge between runway object and all-day city uniform.",
    highlights: [
      "Angular shell language with softened underfoot foam",
      "Textured sidewalls inspired by industrial facades",
      "Balanced profile for everyday rotation wear",
    ],
    specs: [
      { label: "Weight", value: "301g" },
      { label: "Stack", value: "32mm / 24mm" },
      { label: "Ride", value: "Balanced" },
      { label: "Use Case", value: "Daily / Lifestyle" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
  },
];

function normalizeProduct(product: any): Product {
  const image = normalizeImageSource(product.image);
  const name = typeof product.name === "string" ? product.name : "FEETON PROTOTYPE";
  const description =
    typeof product.description === "string"
      ? product.description
      : "A future-facing silhouette from the Feeton lab.";
  const category = typeof product.category === "string" ? product.category : "UNSPECIFIED";

  return {
    id: typeof product.id === "string" ? product.id : createSlug(name),
    slug: typeof product.slug === "string" ? product.slug : createSlug(name),
    name,
    price: typeof product.price === "string" ? product.price : "$0.00",
    category,
    tag: typeof product.tag === "string" ? product.tag : category,
    description,
    image,
    gallery:
      Array.isArray(product.gallery) && product.gallery.length > 0
        ? product.gallery.map((entry: any) => normalizeImageSource(entry))
        : withRepeatedGallery(image),
    colorway: typeof product.colorway === "string" ? product.colorway : "Lab Spec",
    releaseStatus:
      typeof product.releaseStatus === "string" ? product.releaseStatus : 
      typeof product.release_status === "string" ? product.release_status : "Catalogue",
    dropDate: typeof product.dropDate === "string" ? product.dropDate : 
              typeof product.drop_date === "string" ? product.drop_date : "TBD",
    supportingNote:
      typeof product.supportingNote === "string" ? product.supportingNote :
      typeof product.supporting_note === "string" ? product.supporting_note :
      "Engineered to move between concept and everyday wear.",
    story:
      typeof product.story === "string"
        ? product.story
        : "A directional product designed with Feeton's cinematic performance language.",
    highlights:
      Array.isArray(product.highlights) && product.highlights.length > 0
        ? product.highlights.map(String)
        : [
            "Adaptive upper geometry",
            "Cushioning tuned for long-session wear",
            "Future-luxury detailing throughout",
          ],
    specs:
      Array.isArray(product.specs) && product.specs.length > 0
        ? (product.specs as any[]).map((spec) => {
            const entry = spec as any;
            return {
              label: String(entry.label ?? "Spec"),
              value: String(entry.value ?? "TBD"),
            };
          })
        : [
            { label: "Weight", value: "TBD" },
            { label: "Stack", value: "TBD" },
            { label: "Ride", value: "Adaptive" },
            { label: "Use Case", value: "Multi-purpose" },
          ],
    sizes:
      Array.isArray(product.sizes) && product.sizes.length > 0
        ? product.sizes.map(String)
        : ["40", "41", "42", "43", "44"],
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return STATIC_PRODUCTS;
  }

  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Supabase fetch error:", error);
      return STATIC_PRODUCTS;
    }

    if (!data || data.length === 0) {
      console.warn("No products found in Supabase, using static fallback.");
      return STATIC_PRODUCTS;
    }

    return data.map((product) => normalizeProduct(product));
  } catch (err) {
    console.error("Error in getProducts:", err);
    return STATIC_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export function getStaticProductSlugs() {
  return STATIC_PRODUCTS.map((product) => product.slug);
}
