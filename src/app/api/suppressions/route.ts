import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email(),
  reason: z.string().trim().min(3).max(250)
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    return NextResponse.json({
      accepted: true,
      persisted: false,
      mode: "preview",
      suppression: { email: input.email.toLowerCase(), reason: input.reason }
    }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
