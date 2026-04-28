import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist/public");
const serverBundle = resolve(projectRoot, "dist/server/entry-server.js");

const { render, routeMetadata, countries, providers } = await import(pathToFileURL(serverBundle).href);

const BASE = "https://eslvolunteerfinder.com";

function buildOgImageUrl(route, countries, providers) {
  const enc = (s) => encodeURIComponent(s);

  if (route === "/") {
    return `${BASE}/api/og?title=${enc("ESLVolunteerFinder")}&sub=${enc("Compare ESL volunteer programs abroad — independent, no paid placements")}`;
  }

  const countrySlug = route.match(/^\/volunteer-teach-english-(.+)$/)?.[1];
  if (countrySlug) {
    const country = countries.find((c) => c.slug === countrySlug);
    return `${BASE}/api/og?title=${enc(`Volunteer Teaching English in ${country?.name ?? countrySlug}`)}&sub=${enc("Compare programs by cost, housing, and duration — independent data")}`;
  }

  const providerSlug = route.match(/^\/program\/(.+)$/)?.[1];
  if (providerSlug) {
    const provider = providers.find((p) => p.slug === providerSlug);
    const name = provider?.shortName ?? provider?.name ?? providerSlug;
    return `${BASE}/api/og?title=${enc(`${name} Review`)}&sub=${enc(`ESL volunteer programs — costs, countries, and what to expect`)}`;
  }

  const compareSlug = route.match(/^\/compare\/(.+)$/)?.[1];
  if (compareSlug) {
    const label = compareSlug.replace(/-vs-/, " vs ").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${BASE}/api/og?title=${enc(label)}&sub=${enc("Side-by-side comparison — costs, countries, and who each suits")}`;
  }

  const staticTitles = {
    "/countries": ["Compare Programs by Country", "5 destinations · 11 programs · independent data"],
    "/providers": ["ESL Volunteer Providers", "IVHQ, GVI, Projects Abroad, Love Volunteers, World Volunteers"],
    "/cost-guide": ["The True Cost of ESL Volunteering", "Program fees, application costs, and spending money by country"],
    "/about": ["About ESLVolunteerFinder", "Independent comparison — no paid placements, ever"],
    "/no-tefl-required": ["No TEFL Required", "11 ESL volunteer programs you can join with English fluency alone"],
  };
  const [t, s] = staticTitles[route] ?? ["ESLVolunteerFinder", "Independent ESL volunteer program comparison"];
  return `${BASE}/api/og?title=${enc(t)}&sub=${enc(s)}`;
}

function buildBreadcrumbJson(route) {
  const items = [];
  const add = (name, url) =>
    items.push({ "@type": "ListItem", position: items.length + 1, name, item: url });

  // All pages except home start with Home
  if (route === "/") return null;
  add("Home", `${BASE}/`);

  const countryMatch = route.match(/^\/volunteer-teach-english-(.+)$/);
  const providerMatch = route.match(/^\/program\/(.+)$/);

  if (countryMatch) {
    const country = countries.find((c) => c.slug === countryMatch[1]);
    add("Countries", `${BASE}/countries`);
    if (country) add(country.name, `${BASE}${route}`);
  } else if (providerMatch) {
    const provider = providers.find((p) => p.slug === providerMatch[1]);
    add("Providers", `${BASE}/providers`);
    if (provider) add(provider.shortName ?? provider.name, `${BASE}${route}`);
  } else if (route === "/countries") {
    add("Countries", `${BASE}/countries`);
  } else if (route === "/providers") {
    add("Providers", `${BASE}/providers`);
  } else if (route === "/cost-guide") {
    add("Cost Guide", `${BASE}/cost-guide`);
  } else if (route === "/about") {
    add("About", `${BASE}/about`);
  } else if (route === "/no-tefl-required") {
    add("No TEFL Required", `${BASE}/no-tefl-required`);
  } else if (route.startsWith("/compare/")) {
    const label = route.replace("/compare/", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    add("Providers", `${BASE}/providers`);
    add(label, `${BASE}${route}`);
  }

  if (items.length < 2) return null;
  return JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items });
}

const routes = [
  "/",
  "/volunteer-teach-english-vietnam",
  "/volunteer-teach-english-thailand",
  "/volunteer-teach-english-nepal",
  "/volunteer-teach-english-ghana",
  "/volunteer-teach-english-peru",
  "/program/international-volunteer-hq",
  "/program/projects-abroad",
  "/program/gvi",
  "/program/world-volunteers",
  "/program/love-volunteers",
  "/countries",
  "/providers",
  "/cost-guide",
  "/about",
  "/compare/ivhq-vs-love-volunteers",
  "/compare/ivhq-vs-projects-abroad",
  "/compare/ivhq-vs-gvi",
  "/no-tefl-required",
];

// Read the original Vite-built template once
const originalTemplate = readFileSync(resolve(distDir, "index.html"), "utf-8");

// Strip the default <title> placeholder — each page injects its own
const baseTemplate = originalTemplate.replace(/<title>[^<]*<\/title>/, "");

const LD_JSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ESLVolunteerFinder",
  "url": "https://eslvolunteerfinder.com",
  "description": "Compare ESL volunteer programs by country, provider, cost, and duration. Independent research — no paid placements.",
});

let successCount = 0;

for (const route of routes) {
  try {
    const { html } = render(route);
    const meta = routeMetadata[route];

    if (!meta) throw new Error(`No metadata found for route: ${route}`);

    const OG_IMAGE = buildOgImageUrl(route, countries, providers);

    // Build FAQ schema for country pages
    const countrySlug = route.match(/^\/volunteer-teach-english-(.+)$/)?.[1];
    const countryData = countrySlug ? countries.find((c) => c.slug === countrySlug) : null;
    const FAQ_JSON = countryData
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": countryData.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        })
      : null;

    // Build the head tags for this page
    const headTags = [
      `<title>${meta.title}</title>`,
      `<meta name="description" content="${meta.description}"/>`,
      `<link rel="canonical" href="${meta.canonical}"/>`,
      `<meta property="og:title" content="${meta.title}"/>`,
      `<meta property="og:description" content="${meta.description}"/>`,
      `<meta property="og:type" content="website"/>`,
      `<meta property="og:url" content="${meta.canonical}"/>`,
      `<meta property="og:image" content="${OG_IMAGE}"/>`,
      `<meta name="twitter:card" content="summary_large_image"/>`,
      `<meta name="twitter:title" content="${meta.title}"/>`,
      `<meta name="twitter:description" content="${meta.description}"/>`,
      `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
      `<script type="application/ld+json">${LD_JSON}</script>`,
      ...(FAQ_JSON ? [`<script type="application/ld+json">${FAQ_JSON}</script>`] : []),
      ...(buildBreadcrumbJson(route) ? [`<script type="application/ld+json">${buildBreadcrumbJson(route)}</script>`] : []),
    ].join("\n    ");

    // Strip any head tags that react-helmet-async renders inline in the body
    const bodyContent = html
      .replace(/<title>[^<]*<\/title>/g, "")
      .replace(/<meta\s[^>]*\/?>/g, "")
      .replace(/<link rel="canonical"[^>]*\/?>/g, "")
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

    // Inject head tags and body content into the template
    const page = baseTemplate
      .replace("</head>", `    ${headTags}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);

    const outputDir = route === "/" ? distDir : resolve(distDir, route.slice(1));
    mkdirSync(outputDir, { recursive: true });
    writeFileSync(resolve(outputDir, "index.html"), page);
    console.log(`✓ ${route}`);
    successCount++;
  } catch (err) {
    console.error(`✗ ${route} — ${err.message}`);
    console.error(err.stack);
  }
}

console.log(`\nPre-rendering complete: ${successCount}/${routes.length} pages`);
if (successCount < routes.length) process.exit(1);
