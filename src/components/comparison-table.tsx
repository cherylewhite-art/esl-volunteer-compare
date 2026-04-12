import React from "react";
import { ExternalLink, Check, X } from "lucide-react";
import { Program, formatCost, formatDuration, getProviderName } from "@/data";

interface ComparisonTableProps {
  programs: Program[];
}

export function ComparisonTable({ programs }: ComparisonTableProps) {
  if (programs.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-foreground min-w-[180px]">Provider</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Min Duration</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Weekly Cost</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">Housing</th>
            <th className="text-center px-4 py-3 font-semibold text-foreground whitespace-nowrap">Meals</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">App. Fee</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program, i) => (
            <tr
              key={program.slug}
              className={`border-b border-border last:border-0 ${
                i % 2 === 0 ? "bg-white" : "bg-muted/20"
              } hover:bg-primary/4 transition-colors`}
            >
              <td className="px-4 py-4">
                <div className="font-medium text-foreground leading-snug">{getProviderName(program.providerSlug)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{program.city}</div>
              </td>
              <td className="px-4 py-4 text-foreground whitespace-nowrap">
                {formatDuration(program.minDurationWeeks, program.maxDurationWeeks)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {program.weeklyCostUsd === null ? (
                  <span className="text-emerald-600 font-semibold">Free</span>
                ) : (
                  <span className="font-semibold text-foreground">${program.weeklyCostUsd}</span>
                )}
                <span className="text-muted-foreground">/wk</span>
              </td>
              <td className="px-4 py-4">
                {program.housingIncluded ? (
                  <span className="text-foreground text-sm">{program.housingType ?? "Included"}</span>
                ) : (
                  <X className="h-4 w-4 text-muted-foreground/40" />
                )}
              </td>
              <td className="px-4 py-4 text-center">
                {program.mealsIncluded ? (
                  <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {program.applicationFeeUsd ? (
                  <span className="text-muted-foreground">${program.applicationFeeUsd}</span>
                ) : program.applicationFeeNote ? (
                  <span className="text-xs text-muted-foreground">Included</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-4">
                <a
                  href={program.applicationUrl ?? program.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline whitespace-nowrap text-sm"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag("event", "outbound_click", {
                        provider: getProviderName(program.providerSlug),
                        program: program.slug,
                      });
                    }
                  }}
                >
                  View Program <ExternalLink className="h-3 w-3" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
