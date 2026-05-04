import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { ComparisonTable } from "@/components/comparison-table";
import { CostInsightBox } from "@/components/cost-insight-box";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  Country,
  Program,
  getProviderBySlug,
  formatCost,
  formatDuration,
} from "@/data";

interface CountryPageProps {
  country: Country;
  programs: Program[];
}

export function CountryPage({ country, programs }: CountryPageProps) {
  // All providers that operate in this country, with per-provider stats
  const providerSlugs = Array.from(new Set(programs.map((p) => p.providerSlug)));
  const providerCards = providerSlugs
    .map((slug) => {
      const provider = getProviderBySlug(slug);
      const providerPrograms = programs.filter((p) => p.providerSlug === slug);
      const costs = providerPrograms.map((p) => p.weeklyCostUsd ?? 0).filter((c) => c > 0);
      const minCost = costs.length ? Math.min(...costs) : null;
      const maxCost = costs.length ? Math.max(...costs) : null;
      const minDuration = Math.min(...providerPrograms.map((p) => p.minDurationWeeks));
      const mealsIncluded = providerPrograms.some((p) => p.mealsIncluded);
      return { provider, minCost, maxCost, minDuration, mealsIncluded };
    })
    .filter((r) => r.provider != null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: country.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `ESL volunteer programs in ${country.name}`,
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: programs.length,
    itemListElement: programs.map((program, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: program.name,
        provider: {
          "@type": "Organization",
          name: getProviderBySlug(program.providerSlug)?.name ?? program.providerSlug,
        },
        areaServed: country.name,
        url: `https://eslvolunteerfinder.com/program/${program.providerSlug}`,
      },
    })),
  };

  const metaDescription =
    country.metaDescription ??
    `Compare ESL volunteer programs in ${country.name} by weekly cost, minimum duration, and included housing. Independent comparison — ${programs.length} programs listed.`;

  return (
    <Layout
      title={`Volunteer Teaching English in ${country.name}`}
      description={metaDescription}
      canonical={`https://eslvolunteerfinder.com/volunteer-teach-english-${country.slug}`}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/countries" className="hover:text-foreground transition-colors">Countries</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{country.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-4xl mb-4">{country.flag}</div>
          <div className="text-sm text-muted-foreground font-medium mb-2">{country.region}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Volunteer Teaching English in {country.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Compare ESL volunteer programs in {country.name} by weekly cost, minimum duration, and included housing.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Intro */}
        <section>
          <p className="text-muted-foreground leading-relaxed max-w-3xl text-base">{country.intro}</p>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            ESL Volunteer Programs in {country.name}
          </h2>
          <ComparisonTable programs={programs} />
          <p className="text-xs text-muted-foreground mt-3">
            Data sourced from public provider information. Prices may change — verify directly with each provider before applying.
          </p>
        </section>

        {/* Cost Insight */}
        <section>
          <CostInsightBox costSummary={country.costSummary} />
        </section>

        {/* Program Types */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Types of ESL Programs in {country.name}</h2>
          <ul className="space-y-2">
            {country.programTypes.map((type, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                {type}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Frequently Asked Questions — {country.name}
          </h2>
          <FaqAccordion faqs={country.faqs} />
        </section>

        {/* Next Steps */}
        <section className="border-t border-border pt-10 space-y-8">
          {/* Provider cards */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              Providers operating in {country.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {providerCards.map(({ provider, minCost, maxCost, minDuration, mealsIncluded }) => (
                <Link
                  key={provider!.slug}
                  href={`/program/${provider!.slug}`}
                  className="group flex flex-col p-4 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {provider!.name}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3 line-clamp-2">{provider!.summary.split(".")[0]}.</div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                      {minCost === maxCost || maxCost === null
                        ? `$${minCost}/wk`
                        : `$${minCost}–$${maxCost}/wk`}
                    </span>
                    <span className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                      {minDuration === 1 ? "1-week min" : `${minDuration}-week min`}
                    </span>
                    {mealsIncluded && (
                      <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                        Meals included
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-primary font-medium mt-3">
                    View full provider details <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cost guide CTA */}
          <div className="bg-muted/30 border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Not sure what to budget?</p>
              <p className="text-sm text-muted-foreground">
                See worked 4-week cost examples for every destination — including spending money and flights.
              </p>
            </div>
            <Link
              href="/cost-guide"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary whitespace-nowrap hover:underline shrink-0"
            >
              Read the Cost Guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Other countries */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-3">Compare other destinations</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/countries" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
                <ArrowRight className="h-3.5 w-3.5" /> All countries
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
