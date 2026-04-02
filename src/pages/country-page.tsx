import React from "react";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { ComparisonTable } from "@/components/comparison-table";
import { CostInsightBox } from "@/components/cost-insight-box";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  Country,
  Program,
  providers,
  getProviderBySlug,
} from "@/data";

interface CountryPageProps {
  country: Country;
  programs: Program[];
}

export function CountryPage({ country, programs }: CountryPageProps) {
  const relatedProviders = Array.from(
    new Set(programs.map((p) => p.providerSlug))
  )
    .map((slug) => getProviderBySlug(slug))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Layout
      title={`Volunteer Teaching English in ${country.name}`}
      description={`Compare ESL volunteer programs in ${country.name} by weekly cost, minimum duration, and included housing. Independent comparison — ${programs.length} programs listed.`}
      canonical={`https://eslvolunteerfinder.com/volunteer-teach-english-${country.slug}`}
    >
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

        {/* Internal Links */}
        <section className="border-t border-border pt-10">
          <h2 className="text-base font-semibold text-foreground mb-4">Related Links</h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            {relatedProviders.map((provider) => (
              <Link
                key={provider!.slug}
                href={`/program/${provider!.slug}`}
                className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                {provider!.name} — Program Details
              </Link>
            ))}
            <Link
              href="/cost-guide"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              The True Cost of Volunteer Programs
            </Link>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              Compare other countries
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
