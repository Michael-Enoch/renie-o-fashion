import { products } from "../data/products";
import { PRODUCT_CATEGORIES, Product, ProductCategory } from "../data/types";

export type CatalogCategory = "All" | ProductCategory;
export type ProductSortOption = "newest" | "price_asc" | "price_desc";

export interface ProductPageOptions {
  category: CatalogCategory;
  sortBy: ProductSortOption;
  page: number;
  pageSize: number;
}

export interface ProductPageResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = ["All", ...PRODUCT_CATEGORIES];

export function isProductCategory(value: unknown): value is ProductCategory {
  return typeof value === "string" && PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

export function isCatalogCategory(value: unknown): value is CatalogCategory {
  return value === "All" || isProductCategory(value);
}

export function listProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: CatalogCategory): Product[] {
  if (category === "All") return products;
  return products.filter((product) => product.category === category);
}

export function getProductPage({
  category,
  sortBy,
  page,
  pageSize,
}: ProductPageOptions): ProductPageResult {
  const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 12;
  const sorted = [...getProductsByCategory(category)].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return b.id - a.id;
  });
  const total = sorted.length;
  const pageCount = Math.ceil(total / safePageSize);
  const safePage =
    pageCount > 0 && Number.isInteger(page)
      ? Math.min(Math.max(page, 1), pageCount)
      : 1;
  const start = (safePage - 1) * safePageSize;

  return {
    items: sorted.slice(start, start + safePageSize),
    total,
    page: safePage,
    pageSize: safePageSize,
    pageCount,
  };
}

export function getBestSellers(limit?: number): Product[] {
  const items = products.filter((product) => product.isBestSeller);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getReadyToWearBestSellers(limit: number): Product[] {
  return products
    .filter((product) => product.category === "Ready-to-Wear" && product.isBestSeller)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  if (normalized === "new in") return products.filter((product) => product.isNew);

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.category.toLowerCase().includes(normalized)
  );
}
