// TEMPORARY diagnostic endpoint. Subscribes a test email to Beehiiv and
// returns the full API response body + the publication ID being used
// (masked). Lets us see what Beehiiv actually does with the request,
// since the production endpoints discard that information.
//
// Usage:
//   curl -X POST https://www.eslvolunteerfinder.com/api/debug-beehiiv \
//        -H "Content-Type: application/json" \
//        -d '{"email":"diag-test@example.com"}'
//
// REMOVE this file after diagnosis is complete.

export default async function handler(req: any, res: any) {
  const rawId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  // ---- GET: list publications + recent subscribers from the publication
  // our env vars point at. Lets us prove which publication our API key is
  // actually attached to.
  if (req.method === "GET") {
    return handleList(rawId, apiKey, res);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. GET to list, POST {\"email\":\"...\"} to subscribe." });
  }

  const { email } = req.body ?? {};
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required in body" });
  }

  const idMasked = rawId
    ? `${rawId.slice(0, 6)}…${rawId.slice(-4)} (len=${rawId.length}, hasPrefix=${rawId.startsWith("pub_")})`
    : "MISSING";
  const keyMasked = apiKey ? `present (len=${apiKey.length})` : "MISSING";

  if (!rawId || !apiKey) {
    return res.status(500).json({
      error: "env vars missing",
      publicationId: idMasked,
      apiKey: keyMasked,
    });
  }

  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;
  const url = `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`;

  const payload = {
    email,
    send_welcome_email: true,
    reactivate_existing: false,
    utm_source: "eslvolunteerfinder",
    utm_medium: "email_capture",
    utm_campaign: "diagnostic",
  };

  try {
    const beehiivResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const rawBody = await beehiivResponse.text();
    let parsedBody: unknown = null;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      parsedBody = rawBody;
    }

    return res.status(200).json({
      diagnostic: {
        publicationIdMasked: idMasked,
        publicationIdResolvedSuffix: publicationId.slice(-8),
        apiKey: keyMasked,
        urlHit: url.replace(publicationId, `${publicationId.slice(0, 6)}…${publicationId.slice(-4)}`),
        emailTested: email,
        payloadSent: payload,
      },
      beehiiv: {
        status: beehiivResponse.status,
        statusText: beehiivResponse.statusText,
        body: parsedBody,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: `Fetch to Beehiiv threw: ${String(err)}`,
      publicationId: idMasked,
      apiKey: keyMasked,
    });
  }
}

async function handleList(rawId: string | undefined, apiKey: string | undefined, res: any) {
  if (!rawId || !apiKey) {
    return res.status(500).json({ error: "env vars missing", rawIdPresent: !!rawId, apiKeyPresent: !!apiKey });
  }
  const publicationId = rawId.startsWith("pub_") ? rawId : `pub_${rawId}`;

  try {
    // List all publications this API key can see
    const pubsResp = await fetch("https://api.beehiiv.com/v2/publications?limit=20", {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const pubsBody = await pubsResp.text();
    let pubsParsed: any = null;
    try { pubsParsed = JSON.parse(pubsBody); } catch { pubsParsed = pubsBody; }

    // Recent subscriptions in the publication our env is targeting
    const subsResp = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?limit=20&order_by=created&direction=desc`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    const subsBody = await subsResp.text();
    let subsParsed: any = null;
    try { subsParsed = JSON.parse(subsBody); } catch { subsParsed = subsBody; }

    return res.status(200).json({
      configuredPublicationId: publicationId,
      publicationsVisibleToApiKey: {
        status: pubsResp.status,
        body: pubsParsed,
      },
      recentSubscribersInConfiguredPublication: {
        status: subsResp.status,
        body: subsParsed,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: `List failed: ${String(err)}` });
  }
}
