import { PRICE_MAP, type Sku, type Tier, type TierPricing } from "@/data/pricingMap";

const debugPricing =
  (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debugPricing")) ||
  (import.meta.env?.DEV ?? false);

export function getSkuPricing(
  sku: Sku,
  tierMap: Record<Sku, Tier>
): TierPricing & { tier: Tier } {
  const tier = tierMap[sku] ?? "STANDARD";
  const entry = PRICE_MAP[sku]?.[tier];

  // Fallback to STANDARD if entry missing or url empty
  if (!entry || !entry.url) {
    const fallback = PRICE_MAP[sku]?.STANDARD;
    const result = { tier: "STANDARD" as Tier, price: fallback?.price ?? 0, url: fallback?.url ?? "" };
    if (debugPricing) {
      console.log(`[pricing] ${sku} | requested=${tier} | FALLBACK to STANDARD | price=${result.price} | url=${result.url}`);
    }
    return result;
  }

  if (debugPricing) {
    console.log(`[pricing] ${sku} | tier=${tier} | price=${entry.price} | url=${entry.url}`);
  }

  return { tier, price: entry.price, url: entry.url };
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}
