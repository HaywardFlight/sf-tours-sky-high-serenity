import { PRICE_MAP, type Sku, type Tier, type TierPricing } from "@/data/pricingMap";

export function getSkuPricing(
  sku: Sku,
  tierMap: Record<Sku, Tier>
): TierPricing & { tier: Tier } {
  const tier = tierMap[sku] ?? "STANDARD";
  const entry = PRICE_MAP[sku]?.[tier];

  // Fallback to STANDARD if entry missing or url empty
  if (!entry || !entry.url) {
    const fallback = PRICE_MAP[sku]?.STANDARD;
    return { tier: "STANDARD", price: fallback?.price ?? 0, url: fallback?.url ?? "" };
  }

  return { tier, price: entry.price, url: entry.url };
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}
