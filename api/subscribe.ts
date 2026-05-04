// Used by the homepage email block (source: "homepage-cost-report").
// Subscribes to Beehiiv and tags the subscriber with the source value
// so homepage-driven signups can be segmented separately from calculator
// users (who get country tags via /api/cost-report instead).

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, source } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const rawId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!rawId || !apiKey) {
    return res.status(500).json({ error: "Server configuration error: missing env vars" });
  }

  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const sourceValid = typeof source === "string" && source.length > 0 && source.length <= 64;
  const tagValue = sourceValid ? (source as string) : "newsletter";

  const payload: Record<string, unknown> = {
    email,
    send_welcome_email: true,
    reactivate_existing: false,
    utm_source: "eslvolunteerfinder",
    utm_medium: "email_capture",
  };
  if (sourceValid) {
    payload.utm_campaign = source;
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: `Beehiiv ${response.status}: ${text.slice(0, 120)}` });
    }

    // Best-effort tag — never blocks the success response.
    try {
      const data = (await response.json()) as { data?: { id?: string } };
      const subscriptionId = data?.data?.id;
      if (subscriptionId) {
        await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ tags: [tagValue] }),
          }
        );
      }
    } catch {
      // best-effort
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: `Fetch failed: ${String(err)}` });
  }
}
