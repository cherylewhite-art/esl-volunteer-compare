import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!publicationId || !apiKey) {
    console.error("Missing BEEHIIV_PUBLICATION_ID or BEEHIIV_API_KEY env vars");
    return res.status(500).json({ error: "Server configuration error" });
  }

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
      console.error("Beehiiv error:", response.status, text);
      return res.status(502).json({ error: "Subscription failed" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Beehiiv fetch error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
