import React from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Globe, DollarSign, Shield } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { countries, programs, providers, formatCost, formatDuration, getProviderName, getFlagEmoji } from "@/data";

const FEATURED_COUNTRIES = ["vietnam", "thailand", "nepal", "ghana", "peru"];
const FEATURED_PROGRAMS = programs.slice(0, 3);

export default function Home() {
  const featuredCountries = countries.filter((c) =>
    FEATURED_COUNTRIES.includes(c.slug)
  );

  return (
    <Layout
      title="ESLVolunteerFinder — Compare ESL Volunteer Programs Abroad"
      description="Compare ESL volunteer programs by cost, housing, and duration. No TEFL or degree required for most programs. Independent research — no paid placements."
      canonical="https://eslvolunteerfinder.com/"
    >
      {/* ---- HERO ---- */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Independent comparison — no paid placements
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight mb-5">
              Find the Right ESL Volunteer Program — Without the Guesswork
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              For volunteers who want to compare real costs, housing, and requirements across programs — without wading through provider marketing. Independent, no paid placements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild size="lg" className="rounded-md px-6 font-semibold">
                <Link href="/countries" className="flex items-center gap-2">
                  Compare by Country <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md px-6 font-semibold">
                <Link href="/cost-guide">See True Program Costs</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />{programs.length} programs compared</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />{countries.length} countries</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />{providers.length} providers</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" />No paid placements</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- NO EXPERIENCE CALLOUT ---- */}
      <section className="bg-emerald-50 border-b border-emerald-100 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <span className="font-semibold text-emerald-900 text-sm">No TEFL certificate or teaching degree required for most programs.</span>
            <span className="text-emerald-800 text-sm"> If you speak fluent English, you qualify for the majority of ESL volunteer placements listed here.</span>
          </div>
          <Link href="/countries" className="text-sm font-medium text-emerald-700 hover:underline whitespace-nowrap flex items-center gap-1 shrink-0">
            Browse programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ---- WHY THIS SITE ---- */}
      <section className="bg-muted/30 border-b border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-3">Why volunteer program comparison is hard</h2>
            <p className="text-muted-foreground leading-relaxed">
              ESL volunteer programs vary wildly in cost, structure, and what's actually included. A $200/week program might include housing and meals. A $350/week program might include nothing. Application fees, minimum stays, and teaching hours are rarely standardized across providers. ESLVolunteerFinder collects this information in one place so you can compare programs side-by-side before committing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Transparent pricing",
                desc: "Weekly cost, application fee, and inclusions shown for every program — in the same format.",
              },
              {
                icon: Globe,
                title: "5 countries, 5 providers",
                desc: "Vietnam, Thailand, Nepal, Ghana, and Peru. Five major providers compared side-by-side.",
              },
              {
                icon: Shield,
                title: "Independent research",
                desc: "No paid placements. Data gathered from public provider websites. Always verify directly.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- COUNTRY CARDS ---- */}
      <section className="bg-white border-b border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Compare by Country</h2>
              <p className="text-muted-foreground text-sm">Select a destination to see all available programs.</p>
            </div>
            <Link
              href="/countries"
              className="text-sm text-primary font-medium hover:underline flex items-center gap-1 hidden sm:flex"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {featuredCountries.map((country) => {
              const count = programs.filter((p) => p.countrySlug === country.slug).length;
              return (
                <Link
                  key={country.slug}
                  href={`/volunteer-teach-english-${country.slug}`}
                  className="group flex flex-col items-center text-center p-5 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <div className="font-semibold text-foreground text-sm mb-1">{country.name}</div>
                  <div className="text-xs text-muted-foreground">{count} programs</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- SAMPLE COMPARISON TABLE ---- */}
      <section className="bg-muted/20 border-b border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Example: What programs actually cost</h2>
            <p className="text-sm text-muted-foreground">
              A quick look at how programs compare. Select a country above for the full breakdown.
            </p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-foreground">Provider</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Country</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Min Duration</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Weekly Cost</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Housing</th>
                </tr>
              </thead>
              <tbody>
                {FEATURED_PROGRAMS.map((program, i) => (
                  <tr key={program.slug} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-4 py-3 font-medium text-foreground">{getProviderName(program.providerSlug)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {getFlagEmoji(program.countrySlug)} {program.countrySlug.charAt(0).toUpperCase() + program.countrySlug.slice(1)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {formatDuration(program.minDurationWeeks, program.maxDurationWeeks)}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {program.weeklyCostUsd === null ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        <>${program.weeklyCostUsd}</>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {program.housingIncluded ? (
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <Check className="h-3.5 w-3.5" /> Included
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not included</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            * Prices may change. Always verify on the official provider site before applying.
          </p>
        </div>
      </section>

      {/* ---- METHODOLOGY / TRUST ---- */}
      <section className="bg-white border-b border-border py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">How we gather data</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ESLVolunteerFinder is an independent comparison site. All data is gathered from publicly available provider websites. We are not affiliated with any volunteer organization and do not receive referral fees.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Program costs and details change over time. We update our listings regularly, but always verify pricing and requirements directly with the official provider before applying.
            </p>
            <Link
              href="/cost-guide"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Read: The True Cost of Volunteer Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- FEATURED ARTICLE ---- */}
      <section className="bg-primary py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="text-white">
              <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Featured Article</p>
              <h2 className="text-2xl font-bold mb-2">The True Cost of ESL Volunteer Programs</h2>
              <p className="text-white/80 leading-relaxed max-w-xl">
                What's really included in that $200/week program fee? A breakdown of weekly costs, application fees, hidden extras, and what to watch out for.
              </p>
            </div>
            <div className="shrink-0">
              <Button asChild size="lg" variant="secondary" className="rounded-md font-semibold whitespace-nowrap">
                <Link href="/cost-guide">Read the guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
