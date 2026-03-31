import { supabase, getPublicUrl } from './supabase'
import { PlaceHolderImages } from './placeholder-images'

export interface Product {
  id: string
  name: string
  price: string
  category: string
  tag: string
  description: string
  image: string
}

export const STATIC_PRODUCTS: Product[] = [
  { id: "c-1", name: "FEETON CARBON FLUX", price: "$540.00", category: "PERFORMANCE", tag: "Performance", description: "A masterpiece of carbon fiber integration.", image: PlaceHolderImages.find(img => img.id === "shoe-1")?.imageUrl || "" },
  { id: "c-2", name: "NEON PULSE XT", price: "$620.00", category: "LIMITED", tag: "Limited", description: "Featuring active illuminating soles.", image: PlaceHolderImages.find(img => img.id === "shoe-2")?.imageUrl || "" },
  { id: "c-3", name: "CRIMSON EDGE 01", price: "$480.00", category: "LIFESTYLE", tag: "Lifestyle", description: "Sharp edges meet soft landings.", image: PlaceHolderImages.find(img => img.id === "shoe-3")?.imageUrl || "" },
];

/**
 * Fetches products from Supabase with a completely silent fallback to static data.
 * This avoids console noise and network-related errors if the table doesn't exist.
 */
export async function getProducts(): Promise<Product[]> {
  // If Supabase is not initialized, return static data immediately.
  if (!supabase) {
    return STATIC_PRODUCTS
  }

  try {
    // We wrap this in a very defensive check to avoid 404 noise where possible
    const { data, error } = await supabase
      .from('products')
      .select('*')
    
    // If there's an error (like a 404 because the table doesn't exist), 
    // we return static products silently without logging.
    if (error || !data || data.length === 0) {
      return STATIC_PRODUCTS
    }

    return data.map((product) => ({
      ...product,
      image: getPublicUrl('products', product.image)
    })) as Product[]
  } catch {
    // Catch-all for network errors or unexpected exceptions.
    return STATIC_PRODUCTS
  }
}
