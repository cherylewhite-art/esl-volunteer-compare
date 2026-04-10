import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = resolve(projectRoot, "dist/public");
const serverBundle = resolve(projectRoot, "dist/server/entry-server.js");

const { render, routeMetadata } = await import(pathToFileURL(serverBundle).href);

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
];

// Read the original Vite-built template once
const originalTemplate = readFileSync(resolve(distDir, "index.html"), "utf-8");

// Strip the default <title> placeholder — each page injects its own
const baseTemplate = originalTemplate.replace(/<title>[^<]*<\/title>/, "");

const OG_IMAGE = "https://eslvolunteerfinder.com/opengraph.jpg";
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
