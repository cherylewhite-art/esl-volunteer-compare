import React from "react";
import { Provider } from "@/data";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderSnapshotProps {
  provider: Provider;
}

export function ProviderSnapshot({ provider }: ProviderSnapshotProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Provider Snapshot</h3>
      </div>
      <div className="divide-y divide-border">
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Countries</span>
          <span className="text-sm font-medium text-foreground">{provider.countriesOffered.join(", ")}</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Typical weekly cost</span>
          <span className="text-sm font-medium text-foreground">{provider.typicalWeeklyCostRange}</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Minimum stay</span>
          <span className="text-sm font-medium text-foreground">{provider.minDurationRange}</span>
        </div>
        <div className="px-5 py-3 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Housing included</span>
          <span className={`text-sm font-medium ${
            provider.housingStatus === "Yes" ? "text-emerald-600" :
            provider.housingStatus === "No" ? "text-red-500" : "text-amber-600"
          }`}>{provider.housingStatus}</span>
        </div>
      </div>
      <div className="px-5 py-4 bg-muted/20">
        <Button asChild className="w-full" size="sm">
          <a
            href={provider.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Visit Official Program <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
