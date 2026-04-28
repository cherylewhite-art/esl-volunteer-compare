import React, { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ArrowRight, CheckCircle } from "lucide-react";

// Formspree endpoint — sign up at formspree.io, create a form pointed at
// update@eslvolunteerfinder.com, then replace this placeholder with your
// endpoint ID (e.g. https://formspree.io/f/abcdefgh).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgjbppj";

export default function About() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setSubmitting(false);
    }
  };

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
            ESLVolunteerFinder is a comparison platform for people who want to volunteer as English teachers abroad. We collect data on ESL volunteer programs — including weekly costs, minimum durations, housing type, and application fees — and present them in a standardized format so you can compare your options before committing.
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
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">1.</span>
              Choose a country you're interested in from the <Link href="/countries" className="text-primary hover:underline">Countries</Link> page.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">2.</span>
              Compare programs side-by-side using the comparison table on each country page.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">3.</span>
              Click "View Program" to go directly to the official provider site to apply.
            </li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Methodology & disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            All data is gathered from publicly available provider websites. Program costs, inclusions, and availability change frequently. Always verify details directly with the official provider before applying.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Referral fee disclosure:</strong> If you click a "View Program" or "Visit Official Website" link on this site and subsequently apply or enroll, we may earn a referral commission from the provider. This commission is paid by the provider and costs you nothing. It does not influence which programs are listed, how programs are ranked, or the data we publish — all eligible programs are listed regardless of whether an affiliate relationship exists. We disclose this because we think transparency is more valuable than appearing to have no commercial model at all.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Programs are never paid to appear on this site. There are no sponsored listings, no paid placements, and no providers who have purchased a featured position. The independence of this data is the product.
          </p>
        </section>

        {/* Data currency */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">How current is the data?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every program listing includes a <strong className="text-foreground">Last Verified</strong> date showing when we last checked that program's details against the provider's official website. We review listings periodically and update prices, fees, and inclusions when changes are found.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We don't have insider access to provider systems — if a provider changes their pricing between our review cycles, we may not catch it immediately. That's why every comparison table includes a reminder to verify directly before applying.
          </p>
          <div className="bg-muted/40 border border-border rounded-lg px-5 py-4 text-sm text-muted-foreground">
            All current listings last verified: <span className="font-semibold text-foreground">April 2026</span>
          </div>
        </section>

        {/* Report form */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Report outdated or incorrect information</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you've spotted a price change, a broken link, or incorrect details on any listing, let us know using the form below. We review all submissions and update listings accordingly.
          </p>

          {submitted ? (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-900 text-sm">Report received — thank you.</p>
                <p className="text-emerald-800 text-sm mt-1">We'll review and update the listing as needed.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="program" className="block text-sm font-medium text-foreground mb-1.5">
                  Which program or provider? <span className="text-red-500">*</span>
                </label>
                <input
                  id="program"
                  name="program"
                  type="text"
                  required
                  placeholder="e.g. IVHQ Nepal, Love Volunteers Vietnam"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-foreground mb-1.5">
                  What's incorrect or outdated? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  required
                  rows={4}
                  placeholder="e.g. The weekly fee is now $195, not $160. Source: volunteerhq.org/nepal"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Your email <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-1">Only used if we need clarification on your report.</p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {submitting ? "Sending…" : "Submit report"}
              </button>
            </form>
          )}
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
