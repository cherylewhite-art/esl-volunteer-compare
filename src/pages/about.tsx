import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, Shield, Globe, DollarSign } from "lucide-react";

export default function About() {
  return (
    <Layout
      title="About ESLVolunteerFinder"
      description="ESLVolunteerFinder is an independent comparison site for ESL volunteer programs abroad. Learn how we collect data and how to use the site."
      canonical="https://eslvolunteerfinder.com/about"
    >
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">About ESLVolunteerFinder</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Independent comparison of ESL volunteer programs worldwide.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">What is ESLVolunteerFinder?</h2>
          <p className="text-muted-foreground leading-relaxed">
            ESLVolunteerFinder is a comparison platform for people who want to volunteer as English teachers abroad. We collect data on ESL volunteer programs — including weekly costs, minimum durations, housing inclusions, and application fees — and present them in a standardized format so you can compare your options before committing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Think of us as the Kayak of volunteer program research. We do not sell placements, take referral fees, or accept paid listings. Our goal is to give you clear, independent information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Who it's for</h2>
          <p className="text-muted-foreground leading-relaxed">
            ESLVolunteerFinder is built for anyone considering teaching English abroad as a volunteer — whether you're a gap year student, a career-changer, a retiree, or someone who simply wants to spend a few weeks doing something meaningful while travelling.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">How to use the site</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3"><span className="font-bold text-primary shrink-0">1.</span> Choose a country you're interested in from the <Link href="/countries" className="text-primary hover:underline">Countries</Link> page.</li>
            <li className="flex gap-3"><span className="font-bold text-primary shrink-0">2.</span> Compare programs side-by-side using the comparison table on each country page.</li>
            <li className="flex gap-3"><span className="font-bold text-primary shrink-0">3.</span> Click "View Program" to go directly to the official provider site to apply.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Methodology & disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            All data is gathered from publicly available provider websites. We do not have relationships with any of the listed providers and receive no compensation for listings or outbound clicks. Program costs, inclusions, and availability change frequently. Always verify details directly with the official provider before applying.
          </p>
        </section>

        <div className="border-t border-border pt-8">
          <Link href="/countries" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Browse programs by country <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
