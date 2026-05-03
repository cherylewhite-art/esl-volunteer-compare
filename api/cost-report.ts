// POST /api/cost-report
//
// Subscribes the visitor to Beehiiv (best-effort) and streams back a
// personalized 1-page PDF reflecting the user's calculator selections.
// Called from src/components/cost-calculator.tsx on form submit.

import PDFDocument from "pdfkit";

interface ReportRequest {
  email: string;
  country: { slug: string; name: string; flag: string };
  program: {
    slug: string;
    name: string;
    provider: string;
    city: string;
    weeklyFee: number;
    appFee: number | null;
    mealsIncludedDefault: boolean;
    housingType: string | null;
  };
  selections: {
    weeks: number;
    mealsIncluded: boolean;
    spendingLowPerWeek: number;
    spendingHighPerWeek: number;
  };
  flights: { low: number; high: number };
}

const NO_MEALS_FOOD_BUDGET_PER_WEEK = 30;

const INK = "#0f172a";
const SUB = "#475569";
const MUTED = "#64748b";
const RULE = "#cbd5e1";
const ROW = "#f1f5f9";
const ACCENT = "#0d9488";

function isValidPayload(body: unknown): body is ReportRequest {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.email !== "string" || !b.email.includes("@")) return false;
  if (!b.country || typeof b.country !== "object") return false;
  if (!b.program || typeof b.program !== "object") return false;
  if (!b.selections || typeof b.selections !== "object") return false;
  if (!b.flights || typeof b.flights !== "object") return false;
  const sel = b.selections as Record<string, unknown>;
  if (typeof sel.weeks !== "number" || sel.weeks < 1 || sel.weeks > 52) return false;
  return true;
}

async function subscribeToBeehiiv(email: string): Promise<void> {
  const rawId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!rawId || !apiKey) return; // best-effort; missing env shouldn't block PDF
  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;
  await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      email,
      send_welcome_email: true,
      reactivate_existing: false,
      utm_source: "eslvolunteerfinder",
      utm_medium: "email_capture",
      utm_campaign: "cost-calculator-personalized",
    }),
  }).catch(() => {
    /* swallow — never block the PDF on Beehiiv issues */
  });
}

const usd = (n: number) => `$${n.toLocaleString()}`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body;
  if (!isValidPayload(body)) {
    res.status(400).json({ error: "Invalid request payload" });
    return;
  }

  const { email, country, program, selections, flights } = body;

  // Compute totals (server-side source of truth)
  const mealAdjustment = selections.mealsIncluded ? 0 : NO_MEALS_FOOD_BUDGET_PER_WEEK;
  const adjSpendingLow = selections.spendingLowPerWeek + mealAdjustment;
  const adjSpendingHigh = selections.spendingHighPerWeek + mealAdjustment;
  const programFee = program.weeklyFee * selections.weeks;
  const appFee = program.appFee ?? 0;
  const spendingTotalLow = adjSpendingLow * selections.weeks;
  const spendingTotalHigh = adjSpendingHigh * selections.weeks;
  const inCountryLow = programFee + appFee + spendingTotalLow;
  const inCountryHigh = programFee + appFee + spendingTotalHigh;
  const allInLow = inCountryLow + flights.low;
  const allInHigh = inCountryHigh + flights.high;

  // Fire-and-await Beehiiv (already swallows errors); doesn't slow PDF much
  await subscribeToBeehiiv(email);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="ESL-Cost-Report-${country.name}-${selections.weeks}wk.pdf"`
  );
  res.setHeader("Cache-Control", "no-store");

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    info: {
      Title: `Your ESL Volunteer Cost Report — ${country.name}`,
      Author: "ESLVolunteerFinder",
      Subject: `Personalized cost estimate for ${selections.weeks} weeks in ${country.name}`,
    },
  });
  doc.pipe(res);

  // ---- Header
  doc.font("Helvetica-Bold").fontSize(20).fillColor(INK)
    .text("Your ESL Volunteer Cost Report", 54, 54);

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.font("Helvetica").fontSize(9).fillColor(MUTED)
    .text(`Personalized estimate generated ${today}  ·  ESLVolunteerFinder.com`, 54, 80);

  doc.moveTo(54, 102).lineTo(558, 102).strokeColor(RULE).lineWidth(0.5).stroke();

  // ---- Trip summary
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK)
    .text("YOUR TRIP", 54, 118);

  let y = 138;
  const summaryRows: Array<[string, string]> = [
    ["Country", `${country.name}`],
    ["Program", `${program.name}`],
    ["Provider · Location", `${program.provider} · ${program.city}`],
    ["Duration", `${selections.weeks} ${selections.weeks === 1 ? "week" : "weeks"}`],
    ["Meals included", selections.mealsIncluded ? "Yes" : "No"],
  ];
  if (program.housingType) summaryRows.push(["Housing", `Yes — ${program.housingType}`]);

  summaryRows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      doc.rect(54, y - 4, 504, 18).fillColor(ROW).fill();
    }
    doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text(label, 60, y, { width: 160 });
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(value, 220, y, { width: 332, lineBreak: false, ellipsis: true });
    y += 18;
  });

  // ---- Cost breakdown
  y += 18;
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text("COST BREAKDOWN", 54, y);
  y += 20;

  const breakdownRows: Array<[string, string]> = [
    [`Program fee  (${selections.weeks} × ${usd(program.weeklyFee)})`, usd(programFee)],
    ["Application fee", appFee > 0 ? usd(appFee) : "—"],
    [
      `Spending money  (~${usd(adjSpendingLow)}–${usd(adjSpendingHigh)}/wk${
        !selections.mealsIncluded ? `, incl. +${usd(NO_MEALS_FOOD_BUDGET_PER_WEEK)}/wk for food` : ""
      })`,
      `${usd(spendingTotalLow)}–${usd(spendingTotalHigh)}`,
    ],
  ];

  breakdownRows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      doc.rect(54, y - 4, 504, 18).fillColor(ROW).fill();
    }
    doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text(label, 60, y, { width: 360, lineBreak: false, ellipsis: true });
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(value, 420, y, { width: 132, align: "right", lineBreak: false });
    y += 18;
  });

  // In-country total (emphasized)
  doc.moveTo(54, y).lineTo(558, y).strokeColor(RULE).lineWidth(0.5).stroke();
  y += 6;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text("In-country total", 60, y, { width: 360, lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(`${usd(inCountryLow)}–${usd(inCountryHigh)}`, 420, y, { width: 132, align: "right", lineBreak: false });
  y += 22;

  doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text("Estimated flights (round-trip)", 60, y, { width: 360, lineBreak: false });
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB).text(`${usd(flights.low)}–${usd(flights.high)}`, 420, y, { width: 132, align: "right", lineBreak: false });
  y += 22;

  // ---- All-in headline
  doc.moveTo(54, y).lineTo(558, y).strokeColor(RULE).lineWidth(0.5).stroke();
  y += 14;
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text("ALL-IN ESTIMATED RANGE", 54, y);
  y += 14;
  doc.font("Helvetica-Bold").fontSize(28).fillColor(ACCENT).text(`${usd(allInLow)}–${usd(allInHigh)}`, 54, y);
  y += 38;
  doc.font("Helvetica").fontSize(8.5).fillColor(MUTED)
    .text("Excludes visa and travel insurance. Verify provider pricing before applying.", 54, y, { width: 504 });
  y += 28;

  // ---- What to budget extra for
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text("WHAT TO BUDGET EXTRA FOR", 54, y);
  y += 18;
  const extras = [
    "Travel insurance (typically $40–$80/month)",
    "Visa fees (varies by country and passport)",
    "Weekend trips and excursions",
    "Souvenirs and personal items",
  ];
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB);
  extras.forEach((line) => {
    doc.text(`•  ${line}`, 60, y, { width: 494, lineBreak: false });
    y += 15;
  });

  // ---- Compare CTA
  y += 14;
  doc.font("Helvetica-Bold").fontSize(11).fillColor(INK).text("WANT TO COMPARE?", 54, y);
  y += 16;
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
    .text(
      "Visit eslvolunteerfinder.com/cost-guide for the live calculator. Adjust country, program, and duration to see how your number changes.",
      54, y, { width: 504, lineGap: 2 }
    );

  // ---- Footer
  const footerY = 700;
  doc.moveTo(54, footerY - 6).lineTo(558, footerY - 6).strokeColor(RULE).lineWidth(0.5).stroke();
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text(
      "Prices change frequently — verify with the provider before applying.  ·  ESLVolunteerFinder is independent research with no paid placements.",
      54, footerY + 4, { width: 504, lineBreak: true, lineGap: 1 }
    );
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text("eslvolunteerfinder.com/cost-guide", 54, 722, { width: 504, align: "center", lineBreak: false });

  doc.end();
}
