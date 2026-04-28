export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const rawId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!rawId || !apiKey) {
    return res.status(500).json({ error: "Server configuration error: missing env vars" });
  }

  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          send_welcome_email: true,
          reactivate_existing: false,
          utm_source: "eslvolunteerfinder",
          utm_medium: "email_capture",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: `Beehiiv ${response.status}: ${text.slice(0, 120)}` });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: `Fetch failed: ${String(err)}` });
  }
}
