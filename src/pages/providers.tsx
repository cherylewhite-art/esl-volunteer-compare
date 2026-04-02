import React from "react";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Check, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { providers, programs } from "@/data";

export default function Providers() {
  return (
    <Layout
      title="ESL Volunteer Program Providers — Comparison"
      description="Compare the top ESL volunteer program providers: IVHQ, Projects Abroad, GVI, World Volunteers, and Love Volunteers."
      canonical="https://eslvolunteerfinder.com/providers"
    >
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">ESL Volunteer Program Providers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Compare the five major ESL volunteer providers by cost, countries, and what's included.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        <div className="space-y-4">
          {providers.map((provider) => {
            const count = programs.filter((p) => p.providerSlug === provider.slug).length;
            return (
              <Link
                key={provider.slug}
                href={`/program/${provider.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex-1">
                  <div className="font-bold text-foreground text-lg mb-1">{provider.name}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {provider.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="bg-muted/60 border border-border px-2.5 py-1 rounded-full">
                      {provider.typicalWeeklyCostRange}
                    </span>
                    <span className="bg-muted/60 border border-border px-2.5 py-1 rounded-full">
                      Min {provider.minDurationRange}
                    </span>
                    <span className="bg-muted/60 border border-border px-2.5 py-1 rounded-full">
                      Housing: {provider.housingStatus}
                    </span>
                    <span className="bg-muted/60 border border-border px-2.5 py-1 rounded-full">
                      {count} programs listed
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium group-hover:underline text-sm whitespace-nowrap shrink-0">
                  View provider <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* IVHQ vs Projects Abroad */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-2">IVHQ vs Projects Abroad</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
            The two most-searched ESL volunteer providers compared side by side. Both are established organisations with strong in-country support — the main differences are cost, structure, and who each suits best.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-5 py-3 font-semibold text-foreground w-1/3"></th>
                  <th className="px-5 py-3 font-semibold text-foreground">IVHQ</th>
                  <th className="px-5 py-3 font-semibold text-foreground">Projects Abroad</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Typical weekly cost", ivhq: "$160–$250/week", pa: "$300–$450/week" },
                  { label: "Minimum stay", ivhq: "1–2 weeks", pa: "2–4 weeks" },
                  { label: "Countries (ESL)", ivhq: "Vietnam, Thailand, Nepal, Ghana, Peru", pa: "Vietnam, Peru" },
                  { label: "Housing included", ivhq: "Yes", pa: "Yes" },
                  { label: "Meals included", ivhq: "Varies by country", pa: "Yes (most programs)" },
                  { label: "In-country support", ivhq: "Coordinator support", pa: "Professional in-country staff" },
                  { label: "Pre-departure prep", ivhq: "Online training course", pa: "Structured pre-departure training" },
                  { label: "Operating since", ivhq: "2007", pa: "1992" },
                  { label: "Best for", ivhq: "Budget-conscious, flexible schedules", pa: "Volunteers wanting premium support" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-5 py-3 font-medium text-foreground">{row.label}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.ivhq}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.pa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/program/international-volunteer-hq" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              <ArrowRight className="h-3.5 w-3.5" /> Full IVHQ review
            </Link>
            <Link href="/program/projects-abroad" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              <ArrowRight className="h-3.5 w-3.5" /> Full Projects Abroad review
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
