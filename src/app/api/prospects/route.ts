import { NextResponse } from "next/server";
import { prospectSchema } from "@/lib/validation";
import { demoProspects } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    data: demoProspects,
    mode: "demo",
    notice: "Configure authentication and persistence for real workspace data."
  });
}

export async function POST(request: Request) {
  try {
    const data = prospectSchema.parse(await request.json());
    return NextResponse.json({
      data: { ...data, id: crypto.randomUUID(), status: "NEW", fitScore: 0 },
      mode: "preview",
      persisted: false
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
