import { useEffect, useState } from "react";
import { PRICE_MAP, type Sku, type Tier } from "@/data/pricingMap";

const ALL_SKUS: Sku[] = [
  "bay_40_2p", "bay_40_3p",
  "elite_60_2p", "elite_60_3p",
  "sunset_40_2p", "sunset_40_3p",
  "night_40_2p", "night_40_3p",
  "napa_90_2p",
];

const VALID_TIERS: Tier[] = ["OFFPEAK", "STANDARD", "PEAK"];

interface FetchResult {
  url: string;
  fetchedAt: string;
  rawJson: string;
  parsed: Record<string, unknown> | null;
  error: string | null;
}

function resolveTier(raw: unknown): Tier {
  if (typeof raw === "string" && VALID_TIERS.includes(raw as Tier)) {
    return raw as Tier;
  }
  return "STANDARD";
}

const PricingDebug = () => {
  const [result, setResult] = useState<FetchResult | null>(null);

  useEffect(() => {
    const fetchUrl = `/pricing-live.json?ts=${Date.now()}`;
    fetch(fetchUrl, { cache: "no-store" })
      .then(async (res) => {
        const text = await res.text();
        let parsed: Record<string, unknown> | null = null;
        try {
          parsed = JSON.parse(text);
        } catch {}
        setResult({
          url: fetchUrl,
          fetchedAt: new Date().toISOString(),
          rawJson: text,
          parsed,
          error: res.ok ? null : `HTTP ${res.status}`,
        });
      })
      .catch((e) => {
        setResult({
          url: fetchUrl,
          fetchedAt: new Date().toISOString(),
          rawJson: "",
          parsed: null,
          error: String(e),
        });
      });
  }, []);

  if (!result) return <div style={{ padding: 40, color: "#fff", background: "#111" }}>Loading pricing debug…</div>;

  return (
    <div style={{ padding: 40, color: "#e0e0e0", background: "#111", minHeight: "100vh", fontFamily: "monospace", fontSize: 13 }}>
      <h1 style={{ fontSize: 24, marginBottom: 16, color: "#ffd700" }}>🔍 Pricing Debug</h1>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "#aaa", marginBottom: 8 }}>Fetch Info</h2>
        <p><strong>URL:</strong> {result.url}</p>
        <p><strong>Fetched at:</strong> {result.fetchedAt}</p>
        {result.error && <p style={{ color: "#f66" }}><strong>Error:</strong> {result.error}</p>}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ color: "#aaa", marginBottom: 8 }}>Raw JSON Response</h2>
        <pre style={{ background: "#222", padding: 16, borderRadius: 8, overflow: "auto", maxHeight: 300 }}>
          {result.rawJson ? JSON.stringify(JSON.parse(result.rawJson), null, 2) : "(empty)"}
        </pre>
      </section>

      <section>
        <h2 style={{ color: "#aaa", marginBottom: 8 }}>Per-SKU Resolution</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #444" }}>
              {["SKU", "tierFromFile", "resolvedTier", "resolvedPrice", "resolvedUrl", "MATCH?"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#ffd700" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_SKUS.map((sku) => {
              const rawTier = result.parsed?.[sku];
              const resolved = resolveTier(rawTier);
              const entry = PRICE_MAP[sku]?.[resolved];
              const fallback = (!entry || !entry.url);
              const finalTier = fallback ? "STANDARD" : resolved;
              const finalEntry = fallback ? PRICE_MAP[sku]?.STANDARD : entry;
              const price = finalEntry?.price ?? 0;
              const url = finalEntry?.url ?? "";

              // Verify: does the price/url match exactly what PRICE_MAP says for this tier?
              const expectedEntry = PRICE_MAP[sku]?.[finalTier];
              const match = expectedEntry?.price === price && expectedEntry?.url === url;

              return (
                <tr key={sku} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "6px 12px", fontWeight: "bold" }}>{sku}</td>
                  <td style={{ padding: "6px 12px", color: rawTier === undefined ? "#f66" : "#ccc" }}>
                    {rawTier === undefined ? "(missing)" : String(rawTier)}
                  </td>
                  <td style={{ padding: "6px 12px" }}>
                    {finalTier}{fallback ? " (fallback)" : ""}
                  </td>
                  <td style={{ padding: "6px 12px", color: "#4f4" }}>${price}</td>
                  <td style={{ padding: "6px 12px", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#6af" }}>{url}</a>
                  </td>
                  <td style={{ padding: "6px 12px", color: match ? "#4f4" : "#f44", fontWeight: "bold" }}>
                    {match ? "✅ YES" : "❌ NO"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ color: "#aaa", marginBottom: 8 }}>PRICE_MAP Reference (all tiers)</h2>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #444" }}>
              {["SKU", "OFFPEAK price", "STANDARD price", "PEAK price"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#ffd700" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_SKUS.map((sku) => (
              <tr key={sku} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "6px 12px", fontWeight: "bold" }}>{sku}</td>
                {VALID_TIERS.map((t) => (
                  <td key={t} style={{ padding: "6px 12px" }}>${PRICE_MAP[sku]?.[t]?.price ?? "?"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PricingDebug;
