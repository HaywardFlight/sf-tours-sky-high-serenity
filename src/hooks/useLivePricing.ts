import { useState, useEffect } from "react";
import type { Sku, Tier } from "@/data/pricingMap";

const VALID_TIERS: Tier[] = ["OFFPEAK", "STANDARD", "PEAK"];
const ALL_SKUS: Sku[] = [
  "bay_40_2p", "bay_40_3p",
  "elite_60_2p", "elite_60_3p",
  "sunset_40_2p", "sunset_40_3p",
  "night_40_2p", "night_40_3p",
  "napa_90_2p",
];

function defaultTierMap(): Record<Sku, Tier> {
  return Object.fromEntries(ALL_SKUS.map((s) => [s, "STANDARD" as Tier])) as Record<Sku, Tier>;
}

export function useLivePricing() {
  const [tierMap, setTierMap] = useState<Record<Sku, Tier>>(defaultTierMap);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/pricing-live.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          const map = defaultTierMap();
          for (const sku of ALL_SKUS) {
            const val = data[sku];
            if (val && VALID_TIERS.includes(val)) {
              map[sku] = val as Tier;
            }
          }
          setTierMap(map);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          console.warn("Failed to load pricing config, using STANDARD defaults", e);
          setTierMap(defaultTierMap());
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { tierMap, loading, error };
}
