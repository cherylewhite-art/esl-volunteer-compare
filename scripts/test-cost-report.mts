// Smoke-test for api/cost-report.ts. Mocks req/res and writes the
// generated PDF to /tmp/test-cost-report.pdf for inspection.
//
// Run: pnpm exec tsx scripts/test-cost-report.mts
import { Writable } from "node:stream";
import { writeFileSync } from "node:fs";
import handler from "../api/cost-report";

const chunks: Buffer[] = [];

const res: any = Object.assign(
  new Writable({
    write(chunk, _enc, cb) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      cb();
    },
  }),
  {
    statusCode: 200,
    _headers: {} as Record<string, string>,
    setHeader(k: string, v: string) { this._headers[k.toLowerCase()] = v; },
    getHeader(k: string) { return this._headers[k.toLowerCase()]; },
    status(code: number) { this.statusCode = code; return this; },
    json(body: unknown) { console.log("JSON response", code => this.statusCode, body); return this; },
  }
);

const body = {
  email: "test@example.com",
  country: { slug: "ghana", name: "Ghana", flag: "🇬🇭" },
  program: {
    slug: "ivhq-esl-ghana",
    name: "ESL Teaching Volunteer Program in Ghana",
    provider: "International Volunteer HQ",
    city: "Accra",
    weeklyFee: 195,
    appFee: 249,
    mealsIncludedDefault: false,
    housingType: "Shared dorm",
  },
  selections: { weeks: 2, mealsIncluded: true, spendingLowPerWeek: 60, spendingHighPerWeek: 90 },
  flights: { low: 900, high: 1500 },
};

await handler(
  { method: "POST", body } as any,
  res as any
);

await new Promise<void>((resolve) => setTimeout(resolve, 200));

const pdf = Buffer.concat(chunks);
const outPath = "scripts/.test-output-cost-report.pdf";
writeFileSync(outPath, pdf);
console.log(`Wrote ${outPath} (${pdf.length} bytes)`);
console.log("Headers:", res._headers);
console.log("Status:", res.statusCode);
