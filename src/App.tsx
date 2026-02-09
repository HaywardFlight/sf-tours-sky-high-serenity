import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";

const PricingDebug = lazy(() => import("./components/PricingDebug"));

const queryClient = new QueryClient();

function shouldShowDebug(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("key") === "pricingdebug" || ((import.meta.env?.DEV ?? false) && params.has("debugPricing"));
}

const App = () => {
  if (shouldShowDebug()) {
    return (
      <Suspense fallback={<div style={{ padding: 40, color: "#fff", background: "#111" }}>Loading debug…</div>}>
        <PricingDebug />
      </Suspense>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
