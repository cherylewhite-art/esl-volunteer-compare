// Serves a 503 maintenance page for every route while the site is paused.
// Routed via vercel.json; revert that file (and optionally delete this one)
// to restore the live site.

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESLVolunteerFinder — Temporarily Offline</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #fafafa;
      color: #1a1a1a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    main {
      max-width: 520px;
      width: 100%;
      text-align: left;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.02em;
      color: #4a4a4a;
      margin-bottom: 40px;
    }
    .brand-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #1a1a1a;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 16px;
      letter-spacing: -0.01em;
    }
    p {
      font-size: 16px;
      color: #4a4a4a;
      margin: 0 0 16px;
    }
    p:last-child {
      margin-bottom: 0;
    }
    .footer {
      margin-top: 48px;
      font-size: 13px;
      color: #888;
    }
  </style>
</head>
<body>
  <main>
    <div class="brand">
      <span class="brand-icon">ESL</span>
      <span>VolunteerFinder</span>
    </div>
    <h1>We're offline for an update.</h1>
    <p>Program pricing across the volunteer industry has shifted significantly in 2026. We're rebuilding our comparison data and approach before bringing the site back online.</p>
    <p>Check back soon.</p>
    <div class="footer">eslvolunteerfinder.com</div>
  </main>
</body>
</html>`;

export default function handler(_req: any, res: any) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Retry-After", "604800");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(503).send(MAINTENANCE_HTML);
}
