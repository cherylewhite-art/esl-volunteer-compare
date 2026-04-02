import React from "react";
import { Link } from "wouter";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Layout } from "@/components/layout";
import { ComparisonTable } from "@/components/comparison-table";
import { programs } from "@/data";

const SAMPLE = programs.filter((p) =>
  ["ivhq-esl-vietnam", "gvi-vietnam-teaching"].includes(p.slug)
);

export default function CostGuide() {
  return (
    <Layout
      title="The True Cost of ESL Volunteer Programs"
      description="How much does ESL volunteering really cost? A clear breakdown of weekly program fees, application fees, what's included, and hidden extras to watch for."
      canonical="https://eslvolunteerfinder.com/cost-guide"
    >
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Cost Guide</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight max-w-2xl">
            The True Cost of ESL Volunteer Programs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            What's really included in that $200/week program fee? A plain-English breakdown of costs, inclusions, and what to watch out for.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Why volunteer programs cost money</h2>
          <p className="text-muted-foreground leading-relaxed">
            Most ESL volunteer programs charge a fee that covers operational costs: in-country coordination, placement organization, housing, insurance, orientation, and sometimes meals. These fees are often misunderstood as "paying to work for free," but they fund the infrastructure that makes a structured, supported placement possible.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            That said, not all fees are equal — and the variation between providers is significant. A program charging $400/week including housing and meals may represent better value than one charging $180/week with nothing included.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Typical cost breakdown</h2>
          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden">
            {[
              { item: "Weekly program fee", typical: "$150 – $450/week", notes: "Covers coordination, support, placement" },
              { item: "Application fee", typical: "$195 – $279 (one-time)", notes: "Paid on application. Often non-refundable." },
              { item: "Housing", typical: "Often included", notes: "Check whether shared or private" },
              { item: "Meals", typical: "Sometimes included", notes: "More common in rural placements" },
              { item: "Flights", typical: "Not included", notes: "Always your own cost" },
              { item: "Travel insurance", typical: "Usually not included", notes: "Budget ~$2–5/day from your own insurer" },
              { item: "Visa", typical: "Not included", notes: "Research your destination's visa requirements" },
            ].map((row, i) => (
              <div key={i} className={`px-4 py-3 grid grid-cols-3 gap-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-muted/20"}`}>
                <div className="font-medium text-foreground">{row.item}</div>
                <div className="text-muted-foreground">{row.typical}</div>
                <div className="text-muted-foreground text-sm">{row.notes}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">What is usually included</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "In-country coordinator or support contact",
              "Airport pickup (many providers)",
              "Orientation on arrival",
              "Placement in a school or community setting",
              "Shared housing (most programs)",
              "24/7 emergency support",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">What is usually NOT included</h2>
          <ul className="space-y-2 text-muted-foreground">
            {[
              "Flights to your destination",
              "Travel insurance",
              "Visa fees",
              "Personal spending money",
              "Meals (in many urban programs)",
              "Weekend excursions or activities",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Example comparison across providers</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The same destination (Vietnam) at very different price points. Note what's included at each level.
          </p>
          <ComparisonTable programs={SAMPLE} />
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 flex gap-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 text-sm mb-1">Prices change frequently</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              All prices on ESLVolunteerFinder are gathered from public provider websites and may be out of date. Always check the current price directly on the provider's official site before applying.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-3">
          <p className="font-semibold text-foreground text-sm">Compare programs by country</p>
          <div className="flex flex-col gap-2">
            {[
              { slug: "vietnam", label: "Volunteer Teaching English in Vietnam" },
              { slug: "thailand", label: "Volunteer Teaching English in Thailand" },
              { slug: "nepal", label: "Volunteer Teaching English in Nepal" },
              { slug: "ghana", label: "Volunteer Teaching English in Ghana" },
              { slug: "peru", label: "Volunteer Teaching English in Peru" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/volunteer-teach-english-${c.slug}`}
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
              >
                <ArrowRight className="h-3.5 w-3.5" /> {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
