// POST /api/cost-report
//
// Subscribes the visitor to Beehiiv (best-effort) and streams back a
// personalized 1-page PDF reflecting the user's calculator selections.
// Called from src/components/cost-calculator.tsx on form submit.
//
// Layout: two-pass render — first pass measures content height, second
// pass writes to a custom-sized page that ends right after the footer
// (no trailing whitespace).

import PDFDocument from "pdfkit";
import { PassThrough } from "node:stream";

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
const ACCENT = "#0d9488"; // brand teal — matches calculator's all-in headline

const PAGE_WIDTH = 612; // Letter width
const SIDE_MARGIN = 54;
const CONTENT_WIDTH = PAGE_WIDTH - SIDE_MARGIN * 2;
const TOP_MARGIN = 54;
const BOTTOM_PADDING = 36;
const SITE_URL = "https://eslvolunteerfinder.com/cost-guide";

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

// Subscribes the visitor to Beehiiv and tags the subscriber with the
// country they requested an estimate for. Tag adds are additive (Beehiiv
// merges with any existing tags), so a visitor who runs estimates for
// Peru, then Vietnam, then Thailand ends up with all three tags.
// All steps are best-effort — failures here never block the PDF.
async function subscribeAndTagBeehiiv(email: string, country: string): Promise<void> {
  const rawId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!rawId || !apiKey) return;
  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` };

  let subscriptionId: string | null = null;
  try {
    const subResp = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          send_welcome_email: true,
          reactivate_existing: false,
          utm_source: "eslvolunteerfinder",
          utm_medium: "email_capture",
          utm_campaign: "cost-calculator-personalized",
        }),
      }
    );
    if (subResp.ok) {
      const data = (await subResp.json()) as { data?: { id?: string } };
      subscriptionId = data?.data?.id ?? null;
    }
  } catch {
    // best-effort
  }

  if (!subscriptionId) return;

  try {
    await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ tags: [country] }),
      }
    );
  } catch {
    // best-effort
  }
}

const usd = (n: number) => `$${n.toLocaleString()}`;

interface ComputedTotals {
  programFee: number;
  appFee: number;
  adjSpendingLow: number;
  adjSpendingHigh: number;
  spendingTotalLow: number;
  spendingTotalHigh: number;
  inCountryLow: number;
  inCountryHigh: number;
  allInLow: number;
  allInHigh: number;
}

function computeTotals(req: ReportRequest): ComputedTotals {
  const mealAdjustment = req.selections.mealsIncluded ? 0 : NO_MEALS_FOOD_BUDGET_PER_WEEK;
  const adjSpendingLow = req.selections.spendingLowPerWeek + mealAdjustment;
  const adjSpendingHigh = req.selections.spendingHighPerWeek + mealAdjustment;
  const programFee = req.program.weeklyFee * req.selections.weeks;
  const appFee = req.program.appFee ?? 0;
  const spendingTotalLow = adjSpendingLow * req.selections.weeks;
  const spendingTotalHigh = adjSpendingHigh * req.selections.weeks;
  const inCountryLow = programFee + appFee + spendingTotalLow;
  const inCountryHigh = programFee + appFee + spendingTotalHigh;
  return {
    programFee,
    appFee,
    adjSpendingLow,
    adjSpendingHigh,
    spendingTotalLow,
    spendingTotalHigh,
    inCountryLow,
    inCountryHigh,
    allInLow: inCountryLow + req.flights.low,
    allInHigh: inCountryHigh + req.flights.high,
  };
}

function drawLogo(doc: PDFKit.PDFDocument, x: number, y: number) {
  // Teal rounded square with "ESL" in white
  doc.roundedRect(x, y, 30, 30, 6).fillColor(ACCENT).fill();
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#ffffff")
    .text("ESL", x, y + 9, { width: 30, align: "center", lineBreak: false });
  // Wordmark
  doc.font("Helvetica-Bold").fontSize(13).fillColor(INK)
    .text("ESLVolunteerFinder", x + 38, y + 8, { lineBreak: false });
}

function sectionHeader(doc: PDFKit.PDFDocument, label: string, y: number): number {
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(ACCENT)
    .text(label, SIDE_MARGIN, y, { width: CONTENT_WIDTH, lineBreak: false });
  return y + 18;
}

function hr(doc: PDFKit.PDFDocument, y: number, color = RULE) {
  doc.moveTo(SIDE_MARGIN, y)
    .lineTo(SIDE_MARGIN + CONTENT_WIDTH, y)
    .strokeColor(color).lineWidth(0.5).stroke();
}

// Renders the entire content into `doc`, returns the y position after
// the last write (used to size the page on the second pass).
function buildContent(doc: PDFKit.PDFDocument, req: ReportRequest, totals: ComputedTotals): number {
  const monthYear = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" });
  const titleText = `Your ESL Cost Estimate — ${req.country.name}, ${req.selections.weeks} ${req.selections.weeks === 1 ? "week" : "weeks"}`;

  // ---- Header (logo + title + subtitle)
  drawLogo(doc, SIDE_MARGIN, TOP_MARGIN);

  doc.font("Helvetica-Bold").fontSize(18).fillColor(INK)
    .text(titleText, SIDE_MARGIN, TOP_MARGIN + 46, { width: CONTENT_WIDTH, lineGap: 1 });

  let y = doc.y + 4;
  doc.font("Helvetica").fontSize(9).fillColor(MUTED)
    .text(`Generated by ESLVolunteerFinder.com  ·  ${monthYear}`, SIDE_MARGIN, y, { lineBreak: false });
  y += 16;

  hr(doc, y);
  y += 16;

  // ---- YOUR TRIP
  y = sectionHeader(doc, "YOUR TRIP", y);

  const summaryRows: Array<[string, string]> = [
    ["Country", req.country.name],
    ["Program", req.program.name],
    ["Provider · Location", `${req.program.provider} · ${req.program.city}`],
    ["Duration", `${req.selections.weeks} ${req.selections.weeks === 1 ? "week" : "weeks"}`],
    ["Meals included", req.selections.mealsIncluded ? "Yes" : "No"],
  ];
  if (req.program.housingType) summaryRows.push(["Housing", `Yes — ${req.program.housingType}`]);

  summaryRows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      doc.rect(SIDE_MARGIN, y - 4, CONTENT_WIDTH, 18).fillColor(ROW).fill();
    }
    doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
      .text(label, SIDE_MARGIN + 6, y, { width: 160, lineBreak: false });
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK)
      .text(value, SIDE_MARGIN + 166, y, { width: CONTENT_WIDTH - 172, lineBreak: false, ellipsis: true });
    y += 18;
  });

  // ---- COST BREAKDOWN
  y += 16;
  y = sectionHeader(doc, "COST BREAKDOWN", y);

  const breakdownRows: Array<[string, string]> = [
    [`Program fee  (${req.selections.weeks} × ${usd(req.program.weeklyFee)})`, usd(totals.programFee)],
    ["Application fee", totals.appFee > 0 ? usd(totals.appFee) : "—"],
    [
      `Spending money  (~${usd(totals.adjSpendingLow)}–${usd(totals.adjSpendingHigh)}/wk${
        !req.selections.mealsIncluded ? `, incl. +${usd(NO_MEALS_FOOD_BUDGET_PER_WEEK)}/wk for food` : ""
      })`,
      `${usd(totals.spendingTotalLow)}–${usd(totals.spendingTotalHigh)}`,
    ],
  ];

  breakdownRows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      doc.rect(SIDE_MARGIN, y - 4, CONTENT_WIDTH, 18).fillColor(ROW).fill();
    }
    doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
      .text(label, SIDE_MARGIN + 6, y, { width: 366, lineBreak: false, ellipsis: true });
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK)
      .text(value, SIDE_MARGIN + 372, y, { width: 132, align: "right", lineBreak: false });
    y += 18;
  });

  hr(doc, y);
  y += 6;
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK)
    .text("In-country total", SIDE_MARGIN + 6, y, { width: 366, lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK)
    .text(`${usd(totals.inCountryLow)}–${usd(totals.inCountryHigh)}`, SIDE_MARGIN + 372, y, { width: 132, align: "right", lineBreak: false });
  y += 22;

  doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
    .text("Estimated flights (round-trip)", SIDE_MARGIN + 6, y, { width: 366, lineBreak: false });
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
    .text(`${usd(req.flights.low)}–${usd(req.flights.high)}`, SIDE_MARGIN + 372, y, { width: 132, align: "right", lineBreak: false });
  y += 22;

  hr(doc, y);
  y += 14;

  // ---- ALL-IN
  y = sectionHeader(doc, "ALL-IN ESTIMATED RANGE", y);
  doc.font("Helvetica-Bold").fontSize(28).fillColor(ACCENT)
    .text(`${usd(totals.allInLow)}–${usd(totals.allInHigh)}`, SIDE_MARGIN, y, { lineBreak: false });
  y += 36;
  doc.font("Helvetica").fontSize(8.5).fillColor(MUTED)
    .text("Excludes visa and travel insurance. Verify provider pricing before applying.", SIDE_MARGIN, y, { width: CONTENT_WIDTH });
  y += 26;

  // ---- WHAT TO BUDGET EXTRA FOR
  y = sectionHeader(doc, "WHAT TO BUDGET EXTRA FOR", y);
  const extras = [
    "Travel insurance (typically $40–$80/month)",
    "Visa fees (varies by country and passport)",
    "Weekend trips and excursions",
    "Souvenirs and personal items",
  ];
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB);
  extras.forEach((line) => {
    doc.text(`•  ${line}`, SIDE_MARGIN + 6, y, { width: CONTENT_WIDTH - 12, lineBreak: false });
    y += 15;
  });
  y += 12;

  // ---- WANT TO COMPARE
  y = sectionHeader(doc, "WANT TO COMPARE?", y);
  doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
    .text("Visit ", SIDE_MARGIN, y, { continued: true })
    .fillColor(ACCENT)
    .text("eslvolunteerfinder.com/cost-guide", { link: SITE_URL, underline: true, continued: true })
    .fillColor(SUB).text(" for the live calculator.", { underline: false })
    .text("Adjust country, program, and duration to see how your number changes.", SIDE_MARGIN, doc.y + 2, { width: CONTENT_WIDTH });
  y = doc.y + 18;

  // ---- Footer
  hr(doc, y);
  y += 8;
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text(
      "Prices change frequently — verify with the provider before applying.  ·  ESLVolunteerFinder is independent research with no paid placements.",
      SIDE_MARGIN, y, { width: CONTENT_WIDTH, lineGap: 1 }
    );
  y = doc.y + 4;
  doc.font("Helvetica").fontSize(8).fillColor(MUTED)
    .text("eslvolunteerfinder.com/cost-guide", SIDE_MARGIN, y, { width: CONTENT_WIDTH, align: "center", lineBreak: false, link: SITE_URL });
  y += 12;

  return y;
}

function generatePdfBuffer(req: ReportRequest, totals: ComputedTotals): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    // ---- Pass 1: measure on a tall scratch page
    const measureDoc = new PDFDocument({
      size: [PAGE_WIDTH, 1200],
      margins: { top: TOP_MARGIN, bottom: 0, left: SIDE_MARGIN, right: SIDE_MARGIN },
    });
    measureDoc.on("data", () => {});
    measureDoc.on("error", reject);
    const finalY = buildContent(measureDoc, req, totals);
    measureDoc.end();

    // ---- Pass 2: render at exact content height
    const pageHeight = Math.ceil(finalY + BOTTOM_PADDING);
    const doc = new PDFDocument({
      size: [PAGE_WIDTH, pageHeight],
      margins: { top: TOP_MARGIN, bottom: 0, left: SIDE_MARGIN, right: SIDE_MARGIN },
      info: {
        Title: `Your ESL Cost Estimate — ${req.country.name}, ${req.selections.weeks}wk`,
        Author: "ESLVolunteerFinder",
        Subject: `Personalized cost estimate for ${req.selections.weeks} weeks in ${req.country.name}`,
      },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    buildContent(doc, req, totals);
    doc.end();
  });
}

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

  const totals = computeTotals(body);

  try {
    await subscribeAndTagBeehiiv(body.email, body.country.name);
    const pdf = await generatePdfBuffer(body, totals);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="ESL-Cost-Report-${body.country.name}-${body.selections.weeks}wk.pdf"`
    );
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Length", String(pdf.length));

    // Use end() with the buffer so platforms that buffer the response body
    // (instead of streaming) still receive the full PDF.
    if (typeof res.send === "function") {
      res.send(pdf);
    } else {
      const stream = new PassThrough();
      stream.pipe(res);
      stream.end(pdf);
    }
  } catch (err) {
    res.status(500).json({ error: `PDF generation failed: ${String(err)}` });
  }
}
