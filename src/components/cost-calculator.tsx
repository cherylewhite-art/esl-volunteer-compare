import React, { useEffect, useMemo, useState } from "react";
import { Calculator, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programs, getFlagEmoji } from "@/data";

const COUNTRY_OPTIONS = [
  { slug: "vietnam", name: "Vietnam" },
  { slug: "thailand", name: "Thailand" },
  { slug: "nepal", name: "Nepal" },
  { slug: "ghana", name: "Ghana" },
  { slug: "peru", name: "Peru" },
];

// Keep in sync with SPENDING_MONEY and WORKED_EXAMPLES in src/pages/cost-guide.tsx.
const COUNTRY_COST_DATA: Record<
  string,
  { spendingLow: number; spendingHigh: number; flightLow: number; flightHigh: number }
> = {
  vietnam: { spendingLow: 70, spendingHigh: 100, flightLow: 700, flightHigh: 1200 },
  thailand: { spendingLow: 60, spendingHigh: 90, flightLow: 700, flightHigh: 1200 },
  nepal: { spendingLow: 50, spendingHigh: 80, flightLow: 900, flightHigh: 1400 },
  ghana: { spendingLow: 60, spendingHigh: 90, flightLow: 900, flightHigh: 1500 },
  peru: { spendingLow: 80, spendingHigh: 120, flightLow: 600, flightHigh: 1100 },
};

const NO_MEALS_FOOD_BUDGET_PER_WEEK = 30;
const COST_REPORT_PDF = "/2026-esl-cost-report.pdf";

function triggerCostReportDownload() {
  if (typeof window === "undefined") return;
  const a = document.createElement("a");
  a.href = COST_REPORT_PDF;
  a.download = "2026-ESL-Volunteer-Cost-Report.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function CostCalculator() {
  const [country, setCountry] = useState("vietnam");

  const programsForCountry = useMemo(
    () => programs.filter((p) => p.countrySlug === country && p.weeklyCostUsd != null),
    [country]
  );

  const [programSlug, setProgramSlug] = useState<string>(programsForCountry[0]?.slug ?? "");

  useEffect(() => {
    if (!programsForCountry.find((p) => p.slug === programSlug)) {
      setProgramSlug(programsForCountry[0]?.slug ?? "");
    }
  }, [programsForCountry, programSlug]);

  const program = programsForCountry.find((p) => p.slug === programSlug) ?? programsForCountry[0];

  const [weeks, setWeeks] = useState(4);
  const [mealsOverride, setMealsOverride] = useState<boolean | null>(null);
  const effectiveMealsIncluded = mealsOverride ?? program?.mealsIncluded ?? false;

  const countryData = COUNTRY_COST_DATA[country];
  const [spendingLow, setSpendingLow] = useState(countryData.spendingLow);
  const [spendingHigh, setSpendingHigh] = useState(countryData.spendingHigh);

  useEffect(() => {
    setSpendingLow(COUNTRY_COST_DATA[country].spendingLow);
    setSpendingHigh(COUNTRY_COST_DATA[country].spendingHigh);
    setMealsOverride(null);
  }, [country]);

  const mealAdjustment = effectiveMealsIncluded ? 0 : NO_MEALS_FOOD_BUDGET_PER_WEEK;
  const adjSpendingLow = spendingLow + mealAdjustment;
  const adjSpendingHigh = spendingHigh + mealAdjustment;

  const weeklyFee = program?.weeklyCostUsd ?? 0;
  const programFee = weeklyFee * weeks;
  const appFee = program?.applicationFeeUsd ?? 0;
  const spendingTotalLow = adjSpendingLow * weeks;
  const spendingTotalHigh = adjSpendingHigh * weeks;
  const inCountryLow = programFee + appFee + spendingTotalLow;
  const inCountryHigh = programFee + appFee + spendingTotalHigh;
  const allInLow = inCountryLow + countryData.flightLow;
  const allInHigh = inCountryHigh + countryData.flightHigh;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "cost-calculator" }),
      });
      if (res.ok) {
        setSubmitted(true);
        triggerCostReportDownload();
      } else {
        const body = await res.json().catch(() => ({}));
        setSubmitError(`Error ${res.status}${body?.error ? `: ${body.error}` : ""}`);
      }
    } catch (err) {
      setSubmitError(`Network error — ${String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-primary/25 bg-gradient-to-b from-primary/5 to-white shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-primary/15 flex items-center gap-3 bg-white">
        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">Calculate your trip cost to generate a cost report</h2>
          <p className="text-xs text-muted-foreground">Pick a country, program, and length — your number updates as you go.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-5 sm:p-6 space-y-5">
          <div>
            <label htmlFor="cc-country" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
              Country
            </label>
            <select
              id="cc-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {getFlagEmoji(c.slug)} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cc-program" className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
              Program
            </label>
            <select
              id="cc-program"
              value={program?.slug ?? ""}
              onChange={(e) => setProgramSlug(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {programsForCountry.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — ${p.weeklyCostUsd}/wk
                </option>
              ))}
            </select>
            {program && (
              <p className="text-[11px] text-muted-foreground mt-1.5">
                {program.city} · Min {program.minDurationWeeks}wk
                {program.maxDurationWeeks ? `, max ${program.maxDurationWeeks}wk` : ""}
                {appFee > 0 ? ` · App fee $${appFee}` : " · No application fee listed"}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <label htmlFor="cc-weeks" className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Duration
              </label>
              <span className="text-sm font-semibold text-primary">
                {weeks} {weeks === 1 ? "week" : "weeks"}
              </span>
            </div>
            <input
              id="cc-weeks"
              type="range"
              min={1}
              max={24}
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>1 wk</span>
              <span>12 wks</span>
              <span>24 wks</span>
            </div>
          </div>

          <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-3 py-2.5 cursor-pointer">
            <span>
              <span className="block text-xs font-semibold text-foreground">Meals included in program</span>
              <span className="block text-[11px] text-muted-foreground">
                {program?.mealsIncluded
                  ? "This program normally includes meals."
                  : `This program doesn't include meals — we add ~$${NO_MEALS_FOOD_BUDGET_PER_WEEK}/wk for food.`}
              </span>
            </span>
            <input
              type="checkbox"
              checked={effectiveMealsIncluded}
              onChange={(e) => setMealsOverride(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
          </label>

          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Personal spending money
              </span>
              <span className="text-[11px] text-muted-foreground">per week</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="cc-spend-low" className="block text-[10px] text-muted-foreground mb-0.5">Low</label>
                <input
                  id="cc-spend-low"
                  type="number"
                  min={0}
                  value={spendingLow}
                  onChange={(e) => setSpendingLow(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="cc-spend-high" className="block text-[10px] text-muted-foreground mb-0.5">High</label>
                <input
                  id="cc-spend-high"
                  type="number"
                  min={0}
                  value={spendingHigh}
                  onChange={(e) => setSpendingHigh(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Defaults to typical {COUNTRY_OPTIONS.find((c) => c.slug === country)?.name} range. Adjust to match your style.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 bg-white">
          <div className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-3">Your estimate</div>
          <dl className="space-y-2.5 text-sm">
            <Row
              label={`Program fee (${weeks} × $${weeklyFee.toLocaleString()})`}
              value={`$${programFee.toLocaleString()}`}
            />
            <Row label="Application fee" value={appFee > 0 ? `$${appFee.toLocaleString()}` : "—"} />
            <Row
              label={`Spending money (~$${adjSpendingLow}–$${adjSpendingHigh}/wk)`}
              value={`$${spendingTotalLow.toLocaleString()}–$${spendingTotalHigh.toLocaleString()}`}
            />
            <div className="pt-2 mt-2 border-t border-border">
              <Row
                label="In-country total"
                value={`$${inCountryLow.toLocaleString()}–$${inCountryHigh.toLocaleString()}`}
                bold
              />
            </div>
            <Row
              label="Estimated flights (round-trip)"
              value={`$${countryData.flightLow.toLocaleString()}–$${countryData.flightHigh.toLocaleString()}`}
              muted
            />
          </dl>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1">All-in estimated range</div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              ${allInLow.toLocaleString()}–${allInHigh.toLocaleString()}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1.5">
              Excludes visa and travel insurance. Verify provider pricing before applying.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/15 bg-primary/5 px-5 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-bold text-foreground">Get the 2026 ESL Volunteer Cost Report</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              All 11 programs, 5 countries, one page. Free PDF — emailed when ready.
            </div>
          </div>
          {submitted ? (
            <div className="text-sm shrink-0">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Check className="h-4 w-4" /> Thanks — your download has started.
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                Didn't see it?{" "}
                <a
                  href={COST_REPORT_PDF}
                  download="2026-ESL-Volunteer-Cost-Report.pdf"
                  className="text-primary underline underline-offset-2 font-medium"
                >
                  Download the report
                </a>
                .
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:max-w-md shrink-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={submitting}
                aria-label="Email address"
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              />
              <Button type="submit" disabled={submitting} className="rounded-md whitespace-nowrap">
                {submitting ? "Sending…" : "Send me the report"}
              </Button>
            </form>
          )}
        </div>
        {submitError && <p className="text-sm text-red-600 mt-2">{submitError}</p>}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={bold ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</dt>
      <dd
        className={
          bold
            ? "font-bold text-foreground text-right"
            : muted
              ? "text-muted-foreground text-right"
              : "font-medium text-foreground text-right"
        }
      >
        {value}
      </dd>
    </div>
  );
}
