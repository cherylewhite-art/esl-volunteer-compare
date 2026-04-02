import React from "react";
import { Info } from "lucide-react";

interface CostInsightBoxProps {
  costSummary: string;
}

export function CostInsightBox({ costSummary }: CostInsightBoxProps) {
  return (
    <div className="bg-primary/6 border border-primary/20 rounded-lg p-5 flex gap-4">
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
          <Info className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1 text-sm">Cost Overview</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{costSummary}</p>
      </div>
    </div>
  );
}
