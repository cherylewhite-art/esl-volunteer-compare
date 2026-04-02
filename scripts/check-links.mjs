// Link checker for ESL Volunteer Finder
// Checks that every program URL in the data file returns a valid response.

const programs = [
  { slug: "ivhq-esl-vietnam",        url: "https://www.volunteerhq.org/destinations/vietnam/teaching-english-in-ho-chi-minh/" },
  { slug: "gvi-vietnam-teaching",    url: "https://people.gvi.co.uk/programs/volunteer-with-children-and-teach-english-in-vietnam/" },
  { slug: "love-volunteers-vietnam", url: "https://www.lovevolunteers.org/destinations/volunteer-vietnam/teaching-english-ho-chi-minh-city" },
  { slug: "ivhq-esl-thailand",       url: "https://www.volunteerhq.org/destinations/thailand/teaching-in-chiang-mai/" },
  { slug: "ivhq-esl-thailand-hua-hin", url: "https://www.volunteerhq.org/destinations/thailand/teaching-english-in-hua-hin/" },
  { slug: "ivhq-esl-nepal",          url: "https://www.volunteerhq.org/destinations/nepal/teaching-english/" },
  { slug: "love-volunteers-nepal",   url: "https://www.lovevolunteers.org/destinations/volunteer-nepal/teaching-monasteries-pokhara" },
  { slug: "ivhq-esl-ghana",          url: "https://www.volunteerhq.org/destinations/ghana/teaching-english/" },
  { slug: "world-volunteers-ghana",  url: "https://www.worldvolunteers.org" },
  { slug: "ivhq-esl-peru",           url: "https://www.volunteerhq.org/destinations/peru/teaching-english-in-cusco/" },
  { slug: "projects-abroad-peru",    url: "https://www.projects-abroad.org/projects/volunteer-teaching-peru/" },
];

const TIMEOUT_MS = 15000;

async function checkUrl(slug, url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ESLVolunteerFinder-LinkChecker/1.0)" },
      redirect: "follow",
    });
    clearTimeout(timer);
    return { slug, url, status: res.status, ok: res.status < 400 };
  } catch (err) {
    clearTimeout(timer);
    return { slug, url, status: null, ok: false, error: err.message };
  }
}

const results = await Promise.all(programs.map(({ slug, url }) => checkUrl(slug, url)));

const failed = results.filter((r) => !r.ok);
const passed = results.filter((r) => r.ok);

console.log(`\nESL Volunteer Finder — Link Check Report`);
console.log(`==========================================`);
console.log(`Checked: ${results.length}  |  OK: ${passed.length}  |  Failed: ${failed.length}\n`);

if (failed.length === 0) {
  console.log("All program links are live.");
} else {
  console.log("BROKEN LINKS — review and update src/data/index.ts:\n");
  for (const r of failed) {
    const status = r.status ? `HTTP ${r.status}` : `Error: ${r.error}`;
    console.log(`  [FAIL] ${r.slug}`);
    console.log(`         ${r.url}`);
    console.log(`         ${status}\n`);
  }
  process.exit(1); // non-zero exit causes GitHub Actions to flag the run
}
