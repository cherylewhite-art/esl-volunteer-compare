import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { programs, getProviderBySlug, getCountryBySlug, getFlagEmoji } from "@/data";

const noTeflPrograms = programs.filter((p) => !p.teflRequired);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need a TEFL certificate to volunteer teach English abroad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — every ESL volunteer program on this site accepts volunteers without a TEFL certificate. The primary requirement across all 11 programs is native or near-native English fluency. Most providers run an in-country orientation to prepare you for the classroom before your first day.",
      },
    },
    {
      "@type": "Question",
      name: "What qualifications do I need to volunteer teach English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For all programs listed on this site, the main qualification is fluent English. You must be 18 or older. Some programs ask for a clean background check. No teaching degree, no TEFL certificate, and no prior classroom experience is required for the majority of placements.",
      },
    },
    {
      "@type": "Question",
      name: "Is a TEFL certificate useful even if it's not required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A TEFL certificate can help you feel more prepared in the classroom and may strengthen your application for longer, more structured placements. GVI includes a TEFL qualification as part of their Vietnam program, so you can earn one during your placement rather than before it. For most short-term volunteer placements, fluent English and enthusiasm are genuinely sufficient.",
      },
    },
    {
      "@type": "Question",
      name: "Which ESL volunteer program is cheapest without requiring TEFL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "World Volunteers Ghana starts at $145/week — the lowest weekly fee of any program on this site — and requires no TEFL certificate. Love Volunteers Nepal ($155/week) and IVHQ Nepal ($160/week) are the next most affordable options. Both include housing and meals, making them especially cost-effective for the total trip budget.",
      },
    },
    {
      "@type": "Question",
      name: "Does GVI require TEFL even though they provide it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — GVI does not require you to arrive with a TEFL certificate. They provide the qualification as part of the program package in Vietnam. You complete TEFL training during your placement. This is an advantage if you want a TEFL certificate but don't want to pay for one separately before your trip.",
      },
    },
  ],
};

export default function NoTeflRequired() {
  return (
    <Layout
      title="ESL Volunteer Programs With No TEFL Requirement | ESLVolunteerFinder"
      description="All 11 ESL volunteer programs on this site accept volunteers without a TEFL certificate. Compare programs by cost, country, and housing. English fluency is enough."
      canonical="https://eslvolunteerfinder.com/no-tefl-required"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">No TEFL Required</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-5">
            <Check className="h-3.5 w-3.5" /> All {noTeflPrograms.length} programs — no certificate needed
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            ESL Volunteer Programs With No TEFL Requirement
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Every ESL volunteer program on this site accepts volunteers without a TEFL certificate.
            If you speak fluent English, you qualify. Here's the full list.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* What this means */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">What "no TEFL required" actually means</h2>
          <p className="text-muted-foreground leading-relaxed">
            TEFL — Teaching English as a Foreign Language — is a certification that teaches methodology for instructing non-native speakers. Many paid ESL teaching positions require it. Volunteer programs generally do not, because the role is supportive rather than lead-teaching: you assist local teachers, run conversation practice, and help students build confidence with spoken English.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For every program on this site, the primary qualification is native or near-native English fluency. Most providers run a 1–3 day in-country orientation before your first classroom day to cover lesson structure, classroom management, and cultural context. You are not expected to arrive as a qualified teacher.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            One exception worth noting: GVI's Vietnam program includes a TEFL qualification as part of the program. You don't need to arrive with one — you earn it during your placement. This makes GVI a strong option if you want the certification for future use without paying for a separate course.
          </p>
        </section>

        {/* Program table */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            All {noTeflPrograms.length} programs — no TEFL certificate needed
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-foreground">Provider</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Country</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Weekly Cost</th>
                  <th className="px-4 py-3 font-semibold text-foreground">TEFL Bonus</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {noTeflPrograms.map((program, i) => {
                  const provider = getProviderBySlug(program.providerSlug);
                  const country = getCountryBySlug(program.countrySlug);
                  return (
                    <tr
                      key={program.slug}
                      className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        <Link
                          href={`/program/${program.providerSlug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {provider?.shortName ?? provider?.name ?? program.providerSlug}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/volunteer-teach-english-${program.countrySlug}`}
                          className="flex items-center gap-1.5 hover:text-primary transition-colors text-muted-foreground"
                        >
                          {getFlagEmoji(program.countrySlug)} {country?.name ?? program.countrySlug}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        {program.weeklyCostUsd === null ? (
                          <span className="text-emerald-600">Free</span>
                        ) : (
                          <>${program.weeklyCostUsd}/wk</>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {program.teflProvided ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                            <Check className="h-3 w-3" /> Included
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={program.applicationUrl ?? program.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm whitespace-nowrap"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Prices sourced from public provider websites. Always verify before applying.
          </p>
        </section>

        {/* By country */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Browse by destination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { slug: "vietnam", count: noTeflPrograms.filter((p) => p.countrySlug === "vietnam").length },
              { slug: "thailand", count: noTeflPrograms.filter((p) => p.countrySlug === "thailand").length },
              { slug: "nepal", count: noTeflPrograms.filter((p) => p.countrySlug === "nepal").length },
              { slug: "ghana", count: noTeflPrograms.filter((p) => p.countrySlug === "ghana").length },
              { slug: "peru", count: noTeflPrograms.filter((p) => p.countrySlug === "peru").length },
            ].map(({ slug, count }) => {
              const country = getCountryBySlug(slug);
              return (
                <Link
                  key={slug}
                  href={`/volunteer-teach-english-${slug}`}
                  className="group flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getFlagEmoji(slug)}</span>
                    <div>
                      <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {country?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{count} program{count !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <h3 className="font-semibold text-foreground mb-2 text-base">{faq.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-muted/30 border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Ready to compare programs?</p>
            <p className="text-sm text-muted-foreground">
              See all {noTeflPrograms.length} programs side by side — costs, housing, and what's included.
            </p>
          </div>
          <Link
            href="/countries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary whitespace-nowrap hover:underline shrink-0"
          >
            Compare by country <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </Layout>
  );
}
