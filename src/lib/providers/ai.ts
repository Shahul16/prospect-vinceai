type ChatMessage = { role: "system" | "user"; content: string };

export async function generateText(messages: ChatMessage[]) {
  const base = process.env.AI_BASE_URL;
  const key = process.env.AI_API_KEY;
  if (!base || !key) {
    return {
      provider: "demo" as const,
      text: "Demo AI output. Configure AI_BASE_URL and AI_API_KEY for live generation. Validate company facts, identify a credible business trigger, and tailor one concise value proposition."
    };
  }
  const response = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: process.env.AI_MODEL ?? "gpt-4o-mini", messages, temperature: 0.4 })
  });
  if (!response.ok) throw new Error(`AI provider error: ${response.status}`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("AI provider returned an empty response");
  return { text, provider: "configured" as const };
}

export async function draftOutreach(input: { company: string; person?: string; role?: string; summary?: string; objective: string; tone: string }) {
  return generateText([
    { role: "system", content: "You are a B2B sales research assistant. Draft accurate, concise outreach. Never invent facts, relationships, metrics, or claims. Mark assumptions and include a plain-text opt-out line. Return subject and email body." },
    { role: "user", content: JSON.stringify(input) }
  ]);
}
