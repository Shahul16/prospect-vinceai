export type OutboundMessage = { to: string; subject: string; text: string; fromName: string; fromEmail: string; idempotencyKey: string };

export async function sendOutbound(message: OutboundMessage) {
  if (process.env.EMAIL_LIVE_SEND !== "true") return { accepted: false, mode: "dry-run" as const };
  const url = process.env.EMAIL_PROVIDER_URL;
  const key = process.env.EMAIL_PROVIDER_API_KEY;
  if (!url || !key) throw new Error("Live email enabled without provider credentials");
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}`, "idempotency-key": message.idempotencyKey },
    body: JSON.stringify({
      to: message.to, subject: message.subject, text: message.text,
      from: { name: message.fromName, email: message.fromEmail }, idempotencyKey: message.idempotencyKey
    })
  });
  if (!response.ok) throw new Error(`Email provider error: ${response.status}`);
  const data = await response.json() as { id?: string; messageId?: string };
  return { accepted: true, providerMessageId: data.id ?? data.messageId, mode: "live" as const };
}
