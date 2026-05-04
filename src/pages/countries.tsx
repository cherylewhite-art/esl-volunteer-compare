import React, { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { countries, programs } from "@/data";

type Filter = "budget" | "meals" | "shortStay";

const FILTER_LABELS: Record<Filter, string> = {
  budget: "Under $200/week",
  meals: "Meals included",
  shortStay: "1-week minimum",
};

export default function Countries() {
  const [activeFilters, setActiveFilters] = useState<Set<Filter>>(new Set());

  const toggle = (f: Filter) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  };

  const countryData = countries.map((country) => {
    const cp = programs.filter((p) => p.countrySlug === country.slug);
    const costs = cp.map((p) => p.weeklyCostUsd ?? 0).filter((c) => c > 0);
    return {
      ...country,
      count: cp.length,
      minWeeklyCost: costs.length ? Math.min(...costs) : 0,
      hasMeals: cp.some((p) => p.mealsIncluded),
      hasShortStay: cp.some((p) => p.minDurationWeeks <= 1),
    };
  });

  const filtered = countryData.filter((c) => {
    if (activeFilters.has("budget") && c.minWeeklyCost >= 200) return false;
    if (activeFilters.has("meals") && !c.hasMeals) return false;
    if (activeFilters.has("shortStay") && !c.hasShortStay) return false;
    return true;
  });

  const hasFilters = activeFilters.size > 0;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Countries with ESL volunteer teaching programs",
    numberOfItems: countries.length,
    itemListElement: countries.map((country, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Place",
        name: country.name,
        url: `https://eslvolunteerfinder.com/volunteer-teach-english-${country.slug}`,
      },
    })),
  };

  return (
    <Layout
      title="Compare ESL Volunteer Programs by Country | ESLVolunteerFinder"
      description="Browse all countries with ESL volunteer teaching programs. Compare programs in Vietnam, Thailand, Nepal, Ghana, and Peru."
      canonical="https://eslvolunteerfinder.com/countries"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">ESL Volunteer Programs by Country</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Select a country to compare programs by provider, cost, duration, and what's included.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium mr-1">
            <SlidersHorizontal className="h-4 w-4" /> Filter:
          </span>
          {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => toggle(f)}
              className={`text-sm px-3 py-1.5 rounded-full border font-medium transition-colors ${
                activeFilters.has(f)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground border-border hover:border-primary/40"
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={() => setActiveFilters(new Set())}
              className="text-sm px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>

        {/* Results count */}
        {hasFilters && (
          <p className="text-sm text-muted-foreground mb-5">
            {filtered.length === 0
              ? "No countries match all selected filters."
              : `${filtered.length} of ${countries.length} countries match`}
          </p>
        )}

        {/* Country cards */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((country) => (
              <Link
                key={country.slug}
                href={`/volunteer-teach-english-${country.slug}`}
                className="group flex flex-col p-6 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{country.flag}</div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{country.name}</div>
                    <div className="text-sm text-muted-foreground">{country.region}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                  {country.intro}
                </p>
                {/* Quick stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                    From ${country.minWeeklyCost}/wk
                  </span>
                  {country.hasMeals && (
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                      Meals available
                    </span>
                  )}
                  {country.hasShortStay && (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                      1-week min
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-primary/8 text-primary font-medium px-2.5 py-1 rounded-full border border-primary/15">
                    {country.count} programs
                  </span>
                  <span className="text-primary flex items-center gap-1 text-sm font-medium group-hover:underline">
                    Compare <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-base mb-3">No countries match all selected filters.</p>
            <button
              onClick={() => setActiveFilters(new Set())}
              className="text-sm text-primary font-medium hover:underline"
            >
              Clear filters to see all countries
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
