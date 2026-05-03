import React from "react";
import { Link } from "wouter";
import { ArrowRight, AlertTriangle, Check, X } from "lucide-react";
import { Layout } from "@/components/layout";
import { CostCalculator } from "@/components/cost-calculator";
import { programs, getFlagEmoji } from "@/data";

// Cheapest program per country for worked examples
const CHEAPEST_PER_COUNTRY = [
  programs.find((p) => p.slug === "love-volunteers-nepal")!,
  programs.find((p) => p.slug === "world-volunteers-ghana")!,
  programs.find((p) => p.slug === "love-volunteers-vietnam")!,
  programs.find((p) => p.slug === "ivhq-esl-thailand")!,
  programs.find((p) => p.slug === "ivhq-esl-peru")!,
];

// Country cost summary — computed from program data
const COUNTRY_SUMMARIES = [
  {
    slug: "vietnam",
    name: "Vietnam",
    weeklyRange: "$175–$320",
    appFeeRange: "$0–$279",
    mealsNote: "Included in 1 of 3 programs",
    lowestAllIn4wk: 175 * 4 + 279, // Love Volunteers
  },
  {
    slug: "thailand",
    name: "Thailand",
    weeklyRange: "$180–$263",
    appFeeRange: "$249",
    mealsNote: "Included in both programs",
    lowestAllIn4wk: 180 * 4 + 249, // IVHQ Chiang Mai
  },
  {
    slug: "nepal",
    name: "Nepal",
    weeklyRange: "$155–$160",
    appFeeRange: "$249–$279",
    mealsNote: "Included in both programs",
    lowestAllIn4wk: 155 * 4 + 279, // Love Volunteers
  },
  {
    slug: "ghana",
    name: "Ghana",
    weeklyRange: "$145–$195",
    appFeeRange: "$195–$249",
    mealsNote: "Included in 1 of 2 programs",
    lowestAllIn4wk: 145 * 4 + 195, // World Volunteers
  },
  {
    slug: "peru",
    name: "Peru",
    weeklyRange: "$205–$420",
    appFeeRange: "$0–$249",
    mealsNote: "Included in 1 of 2 programs",
    lowestAllIn4wk: 205 * 4 + 249, // IVHQ
  },
];

// Spending money estimates per country (beyond program fees)
const SPENDING_MONEY = [
  {
    slug: "vietnam",
    name: "Vietnam",
    range: "$70–$100/week",
    notes: "Meals usually not included. Street food is cheap ($1–3/meal). Budget $10–15/day for food and local transport.",
  },
  {
    slug: "thailand",
    name: "Thailand",
    range: "$60–$90/week",
    notes: "Meals are usually included. Main spending: weekend travel, personal items, SIM card (~$10), entry fees.",
  },
  {
    slug: "nepal",
    name: "Nepal",
    range: "$50–$80/week",
    notes: "Meals usually included. One of the cheapest countries to live in. Budget for occasional restaurant meals and trekking excursions.",
  },
  {
    slug: "ghana",
    name: "Ghana",
    range: "$60–$90/week",
    notes: "Meals not always included. Local food is affordable ($2–4/meal). Budget extra for transport between sites in Accra or Cape Coast.",
  },
  {
    slug: "peru",
    name: "Peru",
    range: "$80–$120/week",
    notes: "Cusco is a tourist hub — higher restaurant prices than Southeast Asia. Budget more if visiting Machu Picchu (~$50–60 entry). Lima is cheaper.",
  },
];

// Worked 4-week true cost examples
const WORKED_EXAMPLES = [
  {
    slug: "nepal",
    name: "Nepal",
    program: "Love Volunteers Nepal",
    weeklyFee: 155,
    appFee: 279,
    mealsIncluded: true,
    spendingPerWeek: 65,
    flightEstimate: "~$900–$1,400",
    note: "Cheapest all-inclusive option in the dataset. Meals and housing covered by the weekly fee.",
  },
  {
    slug: "ghana",
    name: "Ghana",
    program: "World Volunteers Ghana",
    weeklyFee: 145,
    appFee: 195,
    mealsIncluded: false,
    spendingPerWeek: 90,
    flightEstimate: "~$900–$1,500",
    note: "Lowest weekly fee of any program. Meals not included — add ~$30/week for food.",
  },
  {
    slug: "thailand",
    name: "Thailand",
    program: "IVHQ Thailand (Chiang Mai)",
    weeklyFee: 180,
    appFee: 249,
    mealsIncluded: true,
    spendingPerWeek: 70,
    flightEstimate: "~$700–$1,200",
    note: "Meals and housing included. One of the most popular routes — strong flight competition keeps prices reasonable.",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    program: "Love Volunteers Vietnam",
    weeklyFee: 175,
    appFee: 279,
    mealsIncluded: false,
    spendingPerWeek: 90,
    flightEstimate: "~$700–$1,200",
    note: "Housing included, meals not. Budget $10–15/day for food — street food is plentiful and cheap.",
  },
  {
    slug: "peru",
    name: "Peru",
    program: "IVHQ Peru (Cusco)",
    weeklyFee: 205,
    appFee: 249,
    mealsIncluded: false,
    spendingPerWeek: 100,
    flightEstimate: "~$600–$1,100",
    note: "Housing included, meals not. Cusco is a tourist city — restaurant meals run $5–12. Budget more if you plan to visit Machu Picchu.",
  },
];

export default function CostGuide() {
  return (
    <Layout
      title="The True Cost of ESL Volunteer Programs | ESLVolunteerFinder"
      description="How much does ESL volunteering really cost? A clear breakdown of weekly program fees, application fees, spending money by country, and worked 4-week cost examples."
      canonical="https://eslvolunteerfinder.com/cost-guide"
    >
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Cost Guide</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight max-w-2xl">
            The True Cost of ESL Volunteer Programs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Weekly fees, application fees, spending money by country, and worked examples for every destination. No guesswork.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        <CostCalculator />

        {/* Why programs cost money */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Why volunteer programs cost money</h2>
          <p className="text-muted-foreground leading-relaxed">
            Most ESL volunteer programs charge a fee that covers operational costs: in-country coordination, placement organization, housing, insurance, orientation, and sometimes meals. These fees are often misunderstood as "paying to work for free," but they fund the infrastructure that makes a structured, supported placement possible.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            That said, not all fees are equal — and the variation between providers is significant. A program charging $400/week including housing and meals may represent better value than one charging $180/week with nothing included. The weekly sticker price is only part of the picture.
          </p>
        </section>

        {/* What's included / not included */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">What program fees typically cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-3">Usually included</h3>
              <ul className="space-y-2">
                {[
                  "In-country coordinator or support contact",
                  "Airport pickup (many providers)",
                  "Orientation on arrival",
                  "Placement in a school or community setting",
                  "Shared housing (most programs)",
                  "24/7 emergency support",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-3">Never included</h3>
              <ul className="space-y-2">
                {[
                  "Flights to your destination",
                  "Travel insurance",
                  "Visa fees",
                  "Personal spending money",
                  "Meals (in many programs)",
                  "Weekend excursions or activities",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Cost comparison by country */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Program fees by country</h2>
          <p className="text-sm text-muted-foreground">
            Based on all {programs.length} programs listed on this site. "Lowest 4-week program cost" is weekly fee × 4 plus the lowest available application fee — housing included in all cases.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-foreground">Country</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Weekly fee range</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Application fee</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Meals</th>
                  <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Lowest 4-week cost</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRY_SUMMARIES.map((c, i) => (
                  <tr key={c.slug} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/10"}`}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      <Link href={`/volunteer-teach-english-${c.slug}`} className="hover:underline text-primary">
                        {getFlagEmoji(c.slug)} {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{c.weeklyRange}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{c.appFeeRange}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{c.mealsNote}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">${c.lowestAllIn4wk.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            All prices sourced from public provider websites. Flights, spending money, visa, and insurance are not included above.
          </p>
        </section>

        {/* Spending money by country */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">How much spending money do you need?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your program fee covers the placement and usually housing — but not your day-to-day life. Estimates below assume you're eating locally and not doing expensive side trips. Budget more if meals are not included in your program.
          </p>
          <div className="space-y-3">
            {SPENDING_MONEY.map((c, i) => (
              <div key={c.slug} className={`rounded-lg border border-border p-4 ${i % 2 === 0 ? "bg-white" : "bg-muted/10"}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFlagEmoji(c.slug)}</span>
                    <span className="font-semibold text-foreground">{c.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-0.5">
                    {c.range}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{c.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Worked 4-week examples */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">What does 4 weeks actually cost?</h2>
            <p className="text-muted-foreground text-sm">
              Worked examples using the most affordable program in each country. Includes program fee, application fee, and estimated spending money. Flights are shown separately — they vary widely by departure city and booking time.
            </p>
          </div>

          {WORKED_EXAMPLES.map((ex) => {
            const programCost = ex.weeklyFee * 4;
            const spendingTotal = ex.spendingPerWeek * 4;
            const inCountryTotal = programCost + ex.appFee + spendingTotal;
            return (
              <div key={ex.slug} className="rounded-lg border border-border overflow-hidden">
                <div className="bg-muted/40 border-b border-border px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFlagEmoji(ex.slug)}</span>
                    <span className="font-semibold text-foreground">{ex.name}</span>
                    <span className="text-sm text-muted-foreground">— {ex.program}</span>
                  </div>
                  <Link
                    href={`/volunteer-teach-english-${ex.slug}`}
                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                  >
                    See all {ex.name} programs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  <div className="px-5 py-3 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-muted-foreground">Weekly program fee</div>
                    <div className="text-muted-foreground">${ex.weeklyFee} × 4 weeks</div>
                    <div className="font-medium text-foreground text-right">${programCost.toLocaleString()}</div>
                  </div>
                  <div className="px-5 py-3 grid grid-cols-3 gap-4 text-sm bg-muted/10">
                    <div className="text-muted-foreground">Application fee</div>
                    <div className="text-muted-foreground">One-time</div>
                    <div className="font-medium text-foreground text-right">${ex.appFee}</div>
                  </div>
                  <div className="px-5 py-3 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-muted-foreground">Spending money</div>
                    <div className="text-muted-foreground">
                      ~${ex.spendingPerWeek}/wk × 4
                      {!ex.mealsIncluded && <span className="text-xs ml-1">(incl. meals)</span>}
                    </div>
                    <div className="font-medium text-foreground text-right">~${spendingTotal}</div>
                  </div>
                  <div className="px-5 py-3 grid grid-cols-3 gap-4 text-sm font-semibold bg-muted/20">
                    <div className="text-foreground">In-country total</div>
                    <div />
                    <div className="text-foreground text-right">~${inCountryTotal.toLocaleString()}</div>
                  </div>
                  <div className="px-5 py-3 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-muted-foreground">Flights</div>
                    <div className="text-muted-foreground">Round-trip, not included</div>
                    <div className="font-medium text-foreground text-right">{ex.flightEstimate}</div>
                  </div>
                </div>
                {ex.note && (
                  <div className="px-5 py-3 border-t border-border bg-muted/10 text-xs text-muted-foreground">
                    {ex.note}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Application fee note */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">A note on application fees</h2>
          <p className="text-muted-foreground leading-relaxed">
            Most providers charge a one-time application fee on top of the weekly program fee. This is separate from the weekly cost and is typically non-refundable. Application fees across the programs on this site range from $0 to $279.
          </p>
          <div className="border border-border rounded-lg divide-y divide-border overflow-hidden text-sm">
            {[
              { provider: "IVHQ", fee: "$249", note: "Charged at application, non-refundable" },
              { provider: "Love Volunteers", fee: "$279", note: "Charged at application, non-refundable" },
              { provider: "World Volunteers", fee: "$195", note: "Lowest application fee in this dataset" },
              { provider: "Projects Abroad", fee: "Not listed", note: "No separate application fee shown; pricing may be bundled" },
              { provider: "GVI", fee: "Not listed", note: "No separate application fee shown; pricing may be bundled" },
            ].map((row, i) => (
              <div key={i} className={`px-4 py-3 grid grid-cols-3 gap-4 ${i % 2 === 0 ? "bg-white" : "bg-muted/20"}`}>
                <div className="font-medium text-foreground">{row.provider}</div>
                <div className="text-muted-foreground">{row.fee}</div>
                <div className="text-muted-foreground text-xs">{row.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget summary advice */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Budget summary by destination type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              {
                label: "Most affordable",
                destinations: "Nepal, Ghana",
                range: "$1,200–$1,600",
                basis: "4 weeks in-country, cheapest program",
                color: "bg-emerald-50 border-emerald-200",
                textColor: "text-emerald-900",
              },
              {
                label: "Mid-range",
                destinations: "Vietnam, Thailand",
                range: "$1,500–$2,000",
                basis: "4 weeks in-country, cheapest program",
                color: "bg-blue-50 border-blue-200",
                textColor: "text-blue-900",
              },
              {
                label: "Higher cost",
                destinations: "Peru (Cusco)",
                range: "$1,800–$2,400",
                basis: "4 weeks in-country, cheapest program",
                color: "bg-amber-50 border-amber-200",
                textColor: "text-amber-900",
              },
            ].map((bucket, i) => (
              <div key={i} className={`rounded-lg border p-4 ${bucket.color}`}>
                <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${bucket.textColor}`}>{bucket.label}</div>
                <div className={`font-bold text-lg mb-1 ${bucket.textColor}`}>{bucket.range}</div>
                <div className={`text-xs mb-2 ${bucket.textColor} opacity-80`}>{bucket.basis}</div>
                <div className={`text-sm font-medium ${bucket.textColor}`}>{bucket.destinations}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Excludes flights, visa, and travel insurance. Add $600–$1,500 for round-trip flights depending on your departure city.</p>
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
