import { describe, it, expect } from "vitest";
import { providers, programs, countries } from "./index";

type LinkEntry = { label: string; url: string };

// Parse "$180–$250/week" or "$180-$250/week" → [180, 250]
function parseRange(range: string): [number, number] | null {
  const match = range.match(/\$(\d+)[–\-]\$?(\d+)/);
  if (!match) return null;
  return [parseInt(match[1], 10), parseInt(match[2], 10)];
}

describe("Price data consistency", () => {
  describe("Provider typicalWeeklyCostRange vs actual program costs", () => {
    for (const provider of providers) {
      const providerPrograms = programs.filter(
        (p) => p.providerSlug === provider.slug
      );
      const paidPrograms = providerPrograms.filter(
        (p) => p.weeklyCostUsd !== null
      );
      const range = parseRange(provider.typicalWeeklyCostRange);

      it(`${provider.name}: typicalWeeklyCostRange "${provider.typicalWeeklyCostRange}" is parseable`, () => {
        expect(range).not.toBeNull();
      });

      if (range && paidPrograms.length > 0) {
        const [statedMin, statedMax] = range;

        for (const program of paidPrograms) {
          const cost = program.weeklyCostUsd as number;

          it(`${provider.name} > ${program.name}: $${cost}/wk is within stated range $${statedMin}–$${statedMax}`, () => {
            expect(
              cost,
              `$${cost}/wk is below stated minimum of $${statedMin}/wk`
            ).toBeGreaterThanOrEqual(statedMin);
            expect(
              cost,
              `$${cost}/wk exceeds stated maximum of $${statedMax}/wk`
            ).toBeLessThanOrEqual(statedMax);
          });
        }
      }
    }
  });

  describe("Application fees are valid", () => {
    for (const program of programs) {
      if (program.applicationFeeUsd !== null) {
        it(`${program.name}: application fee $${program.applicationFeeUsd} is between $1 and $500`, () => {
          expect(program.applicationFeeUsd).toBeGreaterThan(0);
          expect(program.applicationFeeUsd).toBeLessThanOrEqual(500);
        });
      }
    }
  });

  describe("Weekly costs are positive numbers", () => {
    for (const program of programs) {
      if (program.weeklyCostUsd !== null) {
        it(`${program.name}: weekly cost $${program.weeklyCostUsd} is a positive number`, () => {
          expect(program.weeklyCostUsd).toBeGreaterThan(0);
        });
      }
    }
  });
});

describe("Website links are reachable", () => {
  const links: LinkEntry[] = [];

  for (const provider of providers) {
    links.push({ label: `Provider "${provider.name}" website`, url: provider.website });
  }

  for (const program of programs) {
    links.push({ label: `Program "${program.name}" websiteUrl`, url: program.websiteUrl });
    if (program.applicationUrl) {
      links.push({ label: `Program "${program.name}" applicationUrl`, url: program.applicationUrl });
    }
  }

  // Deduplicate by URL so identical websiteUrl/applicationUrl pairs only hit the server once
  const seen = new Set<string>();
  const uniqueLinks = links.filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });

  for (const { label, url } of uniqueLinks) {
    it(`${label}: ${url}`, { timeout: 15000 }, async () => {
      let status: number;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" },
          redirect: "follow",
          signal: AbortSignal.timeout(10000),
        });
        status = res.status;
      } catch (err) {
        throw new Error(`Could not reach ${url}: ${err}`);
      }
      // 403 means the server exists but blocks bots — acceptable
      expect(status, `HTTP ${status} for ${url}`).not.toBe(404);
      expect(status, `HTTP ${status} for ${url}`).not.toBe(410);
      expect(status, `HTTP ${status} for ${url}`).toBeLessThan(500);
    });
  }
});

describe("cost-guide.tsx hardcoded figures match data", () => {
  it("application fee range max ($279) matches actual data max", () => {
    const fees = programs
      .map((p) => p.applicationFeeUsd)
      .filter((f): f is number => f !== null);
    const actualMax = Math.max(...fees);
    // cost-guide.tsx hardcodes "$195 – $279" — update that file if this fails
    expect(actualMax).toBeLessThanOrEqual(279);
  });

  it("application fee range min ($195) matches actual data min", () => {
    const fees = programs
      .map((p) => p.applicationFeeUsd)
      .filter((f): f is number => f !== null);
    const actualMin = Math.min(...fees);
    expect(actualMin).toBeGreaterThanOrEqual(195);
  });
});

// Routes defined in App.tsx
const COUNTRY_ROUTES = ["vietnam", "thailand", "nepal", "ghana", "peru"];
const PROVIDER_ROUTES = [
  "international-volunteer-hq",
  "projects-abroad",
  "gvi",
  "world-volunteers",
  "love-volunteers",
];

describe("SEO page data consistency", () => {
  describe("Every country slug has a route in App.tsx", () => {
    for (const country of countries) {
      it(`${country.name}: slug "${country.slug}" has a route`, () => {
        expect(COUNTRY_ROUTES).toContain(country.slug);
      });
    }
  });

  describe("Every provider slug has a route in App.tsx", () => {
    for (const provider of providers) {
      it(`${provider.name}: slug "${provider.slug}" has a route`, () => {
        expect(PROVIDER_ROUTES).toContain(provider.slug);
      });
    }
  });

  describe("Provider countriesOffered only lists countries with actual programs", () => {
    for (const provider of providers) {
      const actualCountrySlugs = new Set(
        programs
          .filter((p) => p.providerSlug === provider.slug)
          .map((p) => p.countrySlug)
      );

      for (const offeredCountry of provider.countriesOffered) {
        const slug = offeredCountry.toLowerCase();
        it(`${provider.name} lists "${offeredCountry}" in countriesOffered — must have at least one program there`, () => {
          expect(
            actualCountrySlugs.has(slug),
            `No programs found for ${provider.name} in ${offeredCountry}`
          ).toBe(true);
        });
      }
    }
  });

  describe("Provider minDurationRange matches actual program minimums", () => {
    for (const provider of providers) {
      const providerPrograms = programs.filter(
        (p) => p.providerSlug === provider.slug
      );
      if (providerPrograms.length === 0) continue;

      const actualMin = Math.min(
        ...providerPrograms.map((p) => p.minDurationWeeks)
      );
      const statedMin = parseInt(
        provider.minDurationRange.match(/(\d+)/)?.[1] ?? "0",
        10
      );

      it(`${provider.name}: minDurationRange "${provider.minDurationRange}" — stated minimum (${statedMin} wk) matches actual (${actualMin} wk)`, () => {
        expect(statedMin).toBe(actualMin);
      });
    }
  });

  describe("Provider housingStatus matches actual program data", () => {
    for (const provider of providers) {
      const providerPrograms = programs.filter(
        (p) => p.providerSlug === provider.slug
      );
      if (providerPrograms.length === 0) continue;

      const allIncluded = providerPrograms.every((p) => p.housingIncluded);
      const noneIncluded = providerPrograms.every((p) => !p.housingIncluded);
      const expected = allIncluded ? "Yes" : noneIncluded ? "No" : "Mixed";

      it(`${provider.name}: housingStatus is "${provider.housingStatus}" — programs say "${expected}"`, () => {
        expect(provider.housingStatus).toBe(expected);
      });
    }
  });
});
