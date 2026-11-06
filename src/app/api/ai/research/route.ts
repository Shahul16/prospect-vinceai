import { NextResponse } from "next/server";
import { researchSchema } from "@/lib/validation";
import { generateText } from "@/lib/providers/ai";

export async function POST(request: Request) {
  try {
    const body = researchSchema.parse(await request.json());
    const result = await generateText([
      { role: "system", content: "Create a structured B2B account research brief. Separate verified input from hypotheses. Do not claim to have browsed the web. Return company overview, likely priorities, questions to validate, relevance and sources to check." },
      { role: "user", content: JSON.stringify(body) }
    ]);
    return NextResponse.json({ ...result, generatedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
