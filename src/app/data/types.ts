export const PRODUCT_CATEGORIES = ["Bridals", "Bespoke", "Ready-to-Wear"] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: ProductCategory;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface MediaAsset {
  src: string;
  alt: string;
}
