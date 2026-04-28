import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout";
import { FaqAccordion } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import { Provider, Program, getCountryBySlug, getFlagEmoji } from "@/data";

export interface ComparePageProps {
  providerA: Provider;
  programsA: Program[];
  providerB: Provider;
  programsB: Program[];
  intro: string;
  verdictA: string;
  verdictB: string;
  faqs: { question: string; answer: string }[];
  canonical: string;
  title: string;
  description: string;
}

export function ComparePage({
  providerA, programsA, providerB, programsB,
  intro, verdictA, verdictB, faqs, canonical, title, description,
}: ComparePageProps) {
  const nameA = providerA.shortName ?? providerA.name;
  const nameB = providerB.shortName ?? providerB.name;

  const costsA = programsA.map((p) => p.weeklyCostUsd).filter((c): c is number => c !== null);
  const costsB = programsB.map((p) => p.weeklyCostUsd).filter((c): c is number => c !== null);
  const minCostA = costsA.length ? Math.min(...costsA) : null;
  const maxCostA = costsA.length ? Math.max(...costsA) : null;
  const minCostB = costsB.length ? Math.min(...costsB) : null;
  const maxCostB = costsB.length ? Math.max(...costsB) : null;

  const countriesA = [...new Set(programsA.map((p) => p.countrySlug))];
  const countriesB = [...new Set(programsB.map((p) => p.countrySlug))];
  const allCountries = [...new Set([...countriesA, ...countriesB])];

  const mealsAny = (programs: Program[]) => programs.some((p) => p.mealsIncluded);
  const teflAny = (programs: Program[]) => programs.some((p) => p.teflProvided);
  const minAppFee = (programs: Program[]) => {
    const fees = programs.map((p) => p.applicationFeeUsd).filter((f): f is number => f !== null);
    return fees.length ? Math.min(...fees) : null;
  };

  const costStr = (min: number | null, max: number | null, fallback: string) =>
    min !== null && max !== null
      ? min === max
        ? `$${min}/wk`
        : `$${min}–$${max}/wk`
      : fallback;

  const rows = [
    {
      label: "Weekly cost",
      a: costStr(minCostA, maxCostA, providerA.typicalWeeklyCostRange),
      b: costStr(minCostB, maxCostB, providerB.typicalWeeklyCostRange),
    },
    {
      label: "Application fee",
      a: minAppFee(programsA) !== null ? `From $${minAppFee(programsA)}` : "Included in weekly fee",
      b: minAppFee(programsB) !== null ? `From $${minAppFee(programsB)}` : "Included in weekly fee",
    },
    { label: "Min stay", a: providerA.minDurationRange, b: providerB.minDurationRange },
    { label: "Housing", a: "Included", b: "Included" },
    {
      label: "Meals",
      a: mealsAny(programsA) ? "Some programs" : "Not included",
      b: mealsAny(programsB) ? "Some programs" : "Not included",
    },
    {
      label: "TEFL provided",
      a: teflAny(programsA) ? "In some programs" : "No",
      b: teflAny(programsB) ? "In some programs" : "No",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Layout title={title} description={description} canonical={canonical}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/providers" className="hover:text-foreground transition-colors">Providers</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{nameA} vs {nameB}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {nameA} vs {nameB}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{intro}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* Comparison table */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-foreground w-1/3"></th>
                  <th className="px-4 py-3 font-semibold text-primary">{nameA}</th>
                  <th className="px-4 py-3 font-semibold text-primary">{nameB}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.a}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Prices sourced from public provider websites. Always verify before applying.
          </p>
        </section>

        {/* Country coverage */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Country Coverage</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-foreground">Country</th>
                  <th className="px-4 py-3 font-semibold text-primary">{nameA}</th>
                  <th className="px-4 py-3 font-semibold text-primary">{nameB}</th>
                </tr>
              </thead>
              <tbody>
                {allCountries.map((slug, i) => {
                  const country = getCountryBySlug(slug);
                  return (
                    <tr key={slug} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                      <td className="px-4 py-3 font-medium text-foreground">
                        <Link
                          href={`/volunteer-teach-english-${slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {getFlagEmoji(slug)} {country?.name ?? slug}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        {countriesA.includes(slug)
                          ? <Check className="h-4 w-4 text-emerald-500" />
                          : <X className="h-4 w-4 text-muted-foreground/30" />}
                      </td>
                      <td className="px-4 py-3">
                        {countriesB.includes(slug)
                          ? <Check className="h-4 w-4 text-emerald-500" />
                          : <X className="h-4 w-4 text-muted-foreground/30" />}
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
          <h2 className="text-xl font-bold text-foreground mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[providerA, providerB].map((provider) => (
              <div key={provider.slug} className="border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-4">{provider.shortName ?? provider.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">Pros</p>
                    <ul className="space-y-1.5">
                      {provider.pros.slice(0, 3).map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" /> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                    <ul className="space-y-1.5">
                      {provider.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <X className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" /> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Which Should You Choose?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { provider: providerA, verdict: verdictA },
              { provider: providerB, verdict: verdictB },
            ].map(({ provider, verdict }) => (
              <div key={provider.slug} className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                <p className="text-sm font-semibold text-primary mb-2">
                  Choose {provider.shortName ?? provider.name} if…
                </p>
                <p className="text-sm text-foreground leading-relaxed">{verdict}</p>
                <Link
                  href={`/program/${provider.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mt-3"
                >
                  Full review <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </section>

        {/* Official links */}
        <section className="border-t border-border pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="rounded-md font-medium">
              <a href={providerA.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit {nameA} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-md font-medium">
              <a href={providerB.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit {nameB} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            If you apply through a link on this site, we may earn a referral fee at no cost to you. This doesn't affect which providers are listed or how they're compared.
          </p>
        </section>

        {/* Compare all CTA */}
        <div className="bg-muted/30 border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Compare all ESL volunteer providers</p>
            <p className="text-sm text-muted-foreground">See IVHQ, GVI, Projects Abroad, Love Volunteers, and World Volunteers side by side.</p>
          </div>
          <Link href="/providers" className="inline-flex items-center gap-2 text-sm font-semibold text-primary whitespace-nowrap hover:underline shrink-0">
            All providers <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </Layout>
  );
}
