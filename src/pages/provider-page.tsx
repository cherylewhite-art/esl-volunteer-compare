import React from "react";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Check, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { ProviderSnapshot } from "@/components/provider-snapshot";
import { Button } from "@/components/ui/button";
import {
  Provider,
  Program,
  providers as allProviders,
  formatCost,
  formatDuration,
  getCountryBySlug,
  getFlagEmoji,
} from "@/data";

interface ProviderPageProps {
  provider: Provider;
  programs: Program[];
}

export function ProviderPage({ provider, programs }: ProviderPageProps) {
  const countrySlugsInPrograms = Array.from(new Set(programs.map((p) => p.countrySlug)));

  return (
    <Layout
      title={`${provider.shortName ?? provider.name} Review — ESL Volunteer Programs & Costs`}
      description={`Independent review of ${provider.name}${provider.shortName ? ` (${provider.shortName})` : ""} ESL volunteer programs — costs, countries, inclusions, and what volunteers can expect. No paid placements.`}
      canonical={`https://eslvolunteerfinder.com/program/${provider.slug}`}
    >
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/providers" className="hover:text-foreground transition-colors">Providers</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{provider.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {provider.name} Review
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
            {provider.summary}
          </p>
          <Button asChild variant="outline" className="rounded-md font-medium">
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Visit Official Website <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Country availability table */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Programs by Country</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border text-left">
                      <th className="px-4 py-3 font-semibold text-foreground">Country</th>
                      <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Min Duration</th>
                      <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Weekly Cost</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Housing</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program, i) => {
                      const country = getCountryBySlug(program.countrySlug);
                      return (
                        <tr
                          key={program.slug}
                          className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"} hover:bg-primary/4 transition-colors`}
                        >
                          <td className="px-4 py-3 font-medium text-foreground">
                            {getFlagEmoji(program.countrySlug)}{" "}
                            {country?.name ?? program.countrySlug}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                            {formatDuration(program.minDurationWeeks, program.maxDurationWeeks)}
                          </td>
                          <td className="px-4 py-3 font-semibold whitespace-nowrap">
                            {program.weeklyCostUsd === null ? (
                              <span className="text-emerald-600">Free</span>
                            ) : (
                              <>${program.weeklyCostUsd}<span className="text-muted-foreground font-normal">/wk</span></>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {program.housingIncluded ? (
                              <span className="text-sm text-foreground">{program.housingType ?? "Included"}</span>
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground/40" />
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={program.applicationUrl ?? program.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm whitespace-nowrap"
                            >
                              View Program <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-5">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-3">Pros</h3>
                  <ul className="space-y-2.5">
                    {provider.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-3">Cons</h3>
                  <ul className="space-y-2.5">
                    {provider.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                        <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Outbound CTA */}
            <section className="bg-muted/30 border border-border rounded-lg p-6">
              <h2 className="font-bold text-foreground mb-2">Ready to learn more?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Visit the official {provider.name} website to see current pricing, availability, and to apply.
              </p>
              <Button asChild className="rounded-md font-semibold">
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit Official Program <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                If you apply through a link on this site, we may earn a referral fee at no cost to you.{" "}
                <Link href="/about" className="underline hover:text-foreground">Learn more</Link>.
              </p>
            </section>

            {/* Next Steps */}
            <section className="border-t border-border pt-8 space-y-8">
              {/* Country links */}
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3">
                  {provider.name} programs by country
                </h2>
                <div className="flex flex-col gap-2">
                  {countrySlugsInPrograms.map((slug) => {
                    const country = getCountryBySlug(slug);
                    return country ? (
                      <Link
                        key={slug}
                        href={`/volunteer-teach-english-${slug}`}
                        className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                        {getFlagEmoji(slug)} Volunteer Teaching English in {country.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Compare other providers */}
              <div>
                <h2 className="text-base font-semibold text-foreground mb-3">Compare other providers</h2>
                <div className="flex flex-col gap-2">
                  {allProviders
                    .filter((p) => p.slug !== provider.slug)
                    .map((p) => (
                      <Link
                        key={p.slug}
                        href={`/program/${p.slug}`}
                        className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/20 transition-all group"
                      >
                        <div>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {p.name}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">{p.typicalWeeklyCostRange}</span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                      </Link>
                    ))}
                </div>
              </div>

              {/* Cost guide CTA */}
              <div className="bg-muted/30 border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">Comparing program costs?</p>
                  <p className="text-sm text-muted-foreground">
                    See worked 4-week cost examples for every destination, including spending money and flights.
                  </p>
                </div>
                <Link
                  href="/cost-guide"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary whitespace-nowrap hover:underline shrink-0"
                >
                  Read the Cost Guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProviderSnapshot provider={provider} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
