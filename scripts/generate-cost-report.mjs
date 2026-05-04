// Generates public/2026-esl-cost-report.pdf — the lead-magnet PDF
// promised by the homepage and /cost-guide email captures.
//
// Run: pnpm --filter @workspace/esl-volunteer-finder run build:report
//
// Data is duplicated from src/data/index.ts and src/pages/cost-guide.tsx
// so the script stays plain Node ESM (no tsx). When program prices,
// spending ranges, or flight estimates change, update both places and
// re-run this script.

import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "public");
const OUT_FILE = resolve(OUT_DIR, "2026-esl-cost-report.pdf");

// -- DATA -----------------------------------------------------------

const PROGRAMS = [
  { country: "Vietnam", provider: "IVHQ", program: "ESL Vietnam — Ho Chi Minh City", weekly: 190, appFee: 249, meals: false },
  { country: "Vietnam", provider: "GVI", program: "Community Teaching — Hoi An", weekly: 320, appFee: null, meals: true },
  { country: "Vietnam", provider: "Love Volunteers", program: "Teach English in Vietnam", weekly: 175, appFee: 279, meals: false },
  { country: "Thailand", provider: "IVHQ", program: "ESL Thailand — Chiang Mai", weekly: 180, appFee: 249, meals: true },
  { country: "Thailand", provider: "IVHQ", program: "ESL Thailand — Hua Hin", weekly: 263, appFee: 249, meals: true },
  { country: "Nepal", provider: "IVHQ", program: "ESL Nepal — Kathmandu", weekly: 160, appFee: 249, meals: true },
  { country: "Nepal", provider: "Love Volunteers", program: "Teach English in Nepal", weekly: 155, appFee: 279, meals: true },
  { country: "Ghana", provider: "IVHQ", program: "ESL Ghana — Accra", weekly: 195, appFee: 249, meals: false },
  { country: "Ghana", provider: "World Volunteers", program: "Teach English in Ghana", weekly: 145, appFee: 195, meals: false },
  { country: "Peru", provider: "IVHQ", program: "ESL Peru — Cusco", weekly: 205, appFee: 249, meals: false },
  { country: "Peru", provider: "Projects Abroad", program: "Teaching in Peru", weekly: 420, appFee: null, meals: false },
];

const SPENDING_BY_COUNTRY = [
  { country: "Vietnam", range: "$70–$100/wk", note: "Meals usually not included. Street food is cheap ($1–3/meal)." },
  { country: "Thailand", range: "$60–$90/wk", note: "Meals usually included. Main spend: weekend travel, SIM card, entry fees." },
  { country: "Nepal", range: "$50–$80/wk", note: "Meals usually included. Cheapest country in the dataset." },
  { country: "Ghana", range: "$60–$90/wk", note: "Meals not always included. Local food is affordable ($2–4/meal)." },
  { country: "Peru", range: "$80–$120/wk", note: "Cusco is a tourist hub — restaurant prices higher than Southeast Asia." },
];

const WORKED_EXAMPLES = [
  { country: "Nepal", program: "Love Volunteers Nepal", weekly: 155, appFee: 279, spendingPerWeek: 65, flightLow: 900, flightHigh: 1400 },
  { country: "Ghana", program: "World Volunteers Ghana", weekly: 145, appFee: 195, spendingPerWeek: 90, flightLow: 900, flightHigh: 1500 },
  { country: "Thailand", program: "IVHQ Thailand (Chiang Mai)", weekly: 180, appFee: 249, spendingPerWeek: 70, flightLow: 700, flightHigh: 1200 },
  { country: "Vietnam", program: "Love Volunteers Vietnam", weekly: 175, appFee: 279, spendingPerWeek: 90, flightLow: 700, flightHigh: 1200 },
  { country: "Peru", program: "IVHQ Peru (Cusco)", weekly: 205, appFee: 249, spendingPerWeek: 100, flightLow: 600, flightHigh: 1100 },
];

const BUDGET_BUCKETS = [
  { label: "Most affordable", countries: "Nepal, Ghana", range: "$1,200–$1,600", basis: "4 weeks in-country, cheapest program" },
  { label: "Mid-range", countries: "Vietnam, Thailand", range: "$1,500–$2,000", basis: "4 weeks in-country, cheapest program" },
  { label: "Higher cost", countries: "Peru (Cusco)", range: "$1,800–$2,400", basis: "4 weeks in-country, cheapest program" },
];

// -- COLORS / TYPE --------------------------------------------------

const INK = "#0f172a";
const SUB = "#475569";
const MUTED = "#64748b";
const RULE = "#cbd5e1";
const ROW = "#f1f5f9";
const ACCENT = "#0d9488";

// -- HELPERS --------------------------------------------------------

const usd = (n) => `$${n.toLocaleString()}`;
const yesNo = (b) => (b ? "Yes" : "—");

function hr(doc, y) {
  doc.moveTo(54, y).lineTo(558, y).strokeColor(RULE).lineWidth(0.5).stroke();
}

// Brand lockup: teal rounded square with "ESL" in white + "VolunteerFinder"
// wordmark. Matches the personalized PDF and the website header.
function drawLogo(doc, x, y) {
  doc.roundedRect(x, y, 30, 30, 6).fillColor(ACCENT).fill();
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#ffffff")
    .text("ESL", x, y + 9, { width: 30, align: "center", lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(13).fillColor(INK)
    .text("VolunteerFinder", x + 38, y + 8, { lineBreak: false });
}

function tableRow(doc, y, cols, widths, opts = {}) {
  const { bold = false, fill = null, color = INK, fontSize = 9 } = opts;
  const rowH = 18;
  if (fill) {
    doc.rect(54, y - 4, 504, rowH).fillColor(fill).fill();
  }
  doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(fontSize).fillColor(color);
  let x = 60;
  cols.forEach((text, i) => {
    const w = widths[i];
    const align = (text === "" || /^\$|^\d|^—/.test(String(text))) && i > 0 ? "right" : "left";
    doc.text(String(text), x, y, { width: w - 8, align, ellipsis: true, lineBreak: false });
    x += w;
  });
  return y + rowH;
}

// -- BUILD ----------------------------------------------------------

await mkdir(OUT_DIR, { recursive: true });

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: 54, bottom: 54, left: 54, right: 54 },
  info: {
    Title: "2026 ESL Volunteer Cost Report",
    Author: "ESLVolunteerFinder",
    Subject: "Weekly fees, application costs, and 4-week budgets for ESL volunteer programs",
    Keywords: "ESL volunteer, teach English abroad, volunteer cost, gap year",
  },
});

doc.pipe(createWriteStream(OUT_FILE));

// ---- PAGE 1: HEADER + ALL PROGRAMS --------------------------------

drawLogo(doc, 54, 54);

doc.font("Helvetica-Bold").fontSize(20).fillColor(INK)
  .text("2026 ESL Volunteer Cost Report", 54, 96);

doc.font("Helvetica").fontSize(9).fillColor(MUTED)
  .text("Independent research from ESLVolunteerFinder.com  ·  No paid placements  ·  Updated May 2026", 54, 122);

hr(doc, 144);

doc.font("Helvetica").fontSize(10).fillColor(SUB)
  .text(
    "A no-fluff snapshot of what it costs to volunteer-teach English abroad. " +
      "Weekly fees, application costs, housing, meals, and 4-week budget estimates " +
      "for 11 programs across 5 countries.",
    54, 156, { width: 504, lineGap: 2 }
  );

doc.font("Helvetica-Bold").fontSize(12).fillColor(ACCENT)
  .text("ALL 11 PROGRAMS AT A GLANCE", 54, 210);

doc.font("Helvetica").fontSize(8.5).fillColor(MUTED)
  .text("Weekly fees and application costs as listed on provider sites. Housing is included in every program below. Meals vary. All 11 listings verified against provider sites in April 2026.", 54, 230, { width: 504 });

const tableTop = 264;
const headerWidths = [70, 110, 184, 50, 50, 40];
let y = tableTop;
y = tableRow(doc, y,
  ["Country", "Provider", "Program", "Weekly", "App fee", "Meals"],
  headerWidths,
  { bold: true, fill: "#e2e8f0", fontSize: 9 }
);
hr(doc, y - 4);

PROGRAMS.forEach((p, i) => {
  y = tableRow(doc, y,
    [p.country, p.provider, p.program, usd(p.weekly), p.appFee == null ? "—" : usd(p.appFee), yesNo(p.meals)],
    headerWidths,
    { fill: i % 2 === 0 ? null : ROW }
  );
});
hr(doc, y - 4);

// Em-dash legend (clarifies the dashes used in App fee / Meals columns)
y += 6;
doc.font("Helvetica-Oblique").fontSize(8).fillColor(MUTED)
  .text('"—" = not included or not separately disclosed by the provider.', 54, y, { width: 504 });
y += 14;

// What's included box
y += 10;
doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("WHAT PROGRAM FEES USUALLY COVER", 54, y);
y += 16;
doc.font("Helvetica").fontSize(9).fillColor(SUB);
const includedLines = [
  "Included in most programs:  in-country coordinator, airport pickup, orientation, school placement, shared housing, 24/7 support.",
  "Not included anywhere:  flights, travel insurance, visa fees, personal spending money, weekend excursions.",
];
includedLines.forEach((line) => {
  doc.text(line, 54, y, { width: 504, lineGap: 2 });
  y = doc.y + 4;
});

// Footer page 1
doc.font("Helvetica").fontSize(8).fillColor(MUTED)
  .text("eslvolunteerfinder.com  ·  Page 1 of 2", 54, 722, { width: 504, align: "center", lineBreak: false });

// ---- PAGE 2: BUDGETS ----------------------------------------------

doc.addPage();

drawLogo(doc, 54, 54);

doc.font("Helvetica-Bold").fontSize(14).fillColor(INK)
  .text("Real-world 4-week budgets", 54, 96);

doc.font("Helvetica").fontSize(9).fillColor(MUTED)
  .text("Worked examples using the cheapest program in each country. Includes program fee, application fee, and food/spending. Flights are shown separately.", 54, 118, { width: 504, lineGap: 2 });

// Spending by country table
y = 158;
doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("PERSONAL SPENDING MONEY BY COUNTRY", 54, y);
y += 22;

const spendWidths = [80, 100, 324];
y = tableRow(doc, y,
  ["Country", "Per week", "Notes"],
  spendWidths,
  { bold: true, fill: "#e2e8f0", fontSize: 9 }
);
hr(doc, y - 4);

SPENDING_BY_COUNTRY.forEach((s, i) => {
  y = tableRow(doc, y,
    [s.country, s.range, s.note],
    spendWidths,
    { fill: i % 2 === 0 ? null : ROW }
  );
});
hr(doc, y - 4);

// Worked examples table
y += 18;
doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("4-WEEK COST — CHEAPEST PROGRAM IN EACH COUNTRY", 54, y);
y += 22;

const workedWidths = [180, 60, 50, 60, 70, 84];
y = tableRow(doc, y,
  ["Program", "Program fee", "App", "Spending", "In-country", "+ Flights"],
  workedWidths,
  { bold: true, fill: "#e2e8f0", fontSize: 8.5 }
);
hr(doc, y - 4);

WORKED_EXAMPLES.forEach((ex, i) => {
  const programFee = ex.weekly * 4;
  const spending = ex.spendingPerWeek * 4;
  const inCountry = programFee + ex.appFee + spending;
  y = tableRow(doc, y,
    [
      `${ex.country} — ${ex.program}`,
      usd(programFee),
      usd(ex.appFee),
      usd(spending),
      usd(inCountry),
      `$${ex.flightLow.toLocaleString()}–${ex.flightHigh.toLocaleString()}`,
    ],
    workedWidths,
    { fill: i % 2 === 0 ? null : ROW, fontSize: 8.5 }
  );
});
hr(doc, y - 4);

// Budget buckets
y += 18;
doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text("BUDGET SUMMARY BY DESTINATION", 54, y);
y += 22;

const bucketY = y;
const bucketW = 165;
BUDGET_BUCKETS.forEach((b, i) => {
  const x = 54 + i * (bucketW + 5);
  doc.rect(x, bucketY, bucketW, 84).fillColor("#f8fafc").fill();
  doc.rect(x, bucketY, bucketW, 84).strokeColor(RULE).lineWidth(0.5).stroke();
  doc.font("Helvetica-Bold").fontSize(8).fillColor(ACCENT).text(b.label.toUpperCase(), x + 10, bucketY + 10, { width: bucketW - 20 });
  doc.font("Helvetica-Bold").fontSize(13).fillColor(INK).text(b.range, x + 10, bucketY + 26, { width: bucketW - 20 });
  doc.font("Helvetica").fontSize(8).fillColor(MUTED).text(b.basis, x + 10, bucketY + 46, { width: bucketW - 20, lineGap: 1 });
  doc.font("Helvetica-Bold").fontSize(9).fillColor(SUB).text(b.countries, x + 10, bucketY + 66, { width: bucketW - 20 });
});
y = bucketY + 100;

doc.font("Helvetica").fontSize(8).fillColor(MUTED)
  .text("All figures exclude flights, visa, and travel insurance. Add $600–$1,500 for round-trip flights depending on departure city.", 54, y, { width: 504 });

// Disclaimer
const disclaimerY = 678;
hr(doc, disclaimerY - 10);
doc.font("Helvetica-Bold").fontSize(9).fillColor(INK)
  .text("Prices change frequently.", 54, disclaimerY, { continued: true })
  .font("Helvetica").fillColor(SUB)
  .text(" Verify directly with providers before applying.");

// Next steps — final block, both URLs clickable
const ctaY = disclaimerY + 22;
doc.font("Helvetica-Bold").fontSize(10).fillColor(ACCENT)
  .text("NEXT STEPS", 54, ctaY, { width: 504, lineBreak: false });
doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
  .text("Pick your country at ", 54, ctaY + 16, { continued: true })
  .fillColor(ACCENT)
  .text("eslvolunteerfinder.com/countries", { link: "https://eslvolunteerfinder.com/countries", underline: true });
doc.font("Helvetica").fontSize(9.5).fillColor(SUB)
  .text("Or run your own numbers at ", 54, ctaY + 32, { continued: true })
  .fillColor(ACCENT)
  .text("eslvolunteerfinder.com/cost-guide", { link: "https://eslvolunteerfinder.com/cost-guide", underline: true });

doc.font("Helvetica").fontSize(8).fillColor(MUTED)
  .text("eslvolunteerfinder.com  ·  Page 2 of 2", 54, 740, { width: 504, align: "center", lineBreak: false });

doc.end();

await new Promise((res, rej) => {
  doc.on("end", res);
  doc.on("error", rej);
});

console.log(`Wrote ${OUT_FILE}`);
