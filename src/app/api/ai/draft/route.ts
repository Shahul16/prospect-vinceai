import { NextResponse } from "next/server";
import { draftSchema } from "@/lib/validation";
import { draftOutreach } from "@/lib/providers/ai";
import { demoProspects } from "@/lib/demo-data";

export async function POST(request: Request) {
  try {
    const body = draftSchema.parse(await request.json());
    const prospect = demoProspects.find((item) => item.id === body.prospectId);
    if (!prospect) return NextResponse.json({ error: "Prospect not found in demo workspace" }, { status: 404 });
    const result = await draftOutreach({
      company: prospect.company,
      person: prospect.person,
      role: prospect.title,
      summary: prospect.summary,
      objective: body.objective,
      tone: body.tone
    });
    return NextResponse.json({ ...result, prospectId: prospect.id, generatedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
