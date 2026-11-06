import { describe, expect, it } from "vitest";
import { draftSchema, prospectSchema, researchSchema } from "@/lib/validation";

describe("request validation", () => {
  it("accepts a minimally complete prospect", () => {
    expect(prospectSchema.safeParse({ company: "Northstar Logistics" }).success).toBe(true);
  });
  it("rejects an invalid email", () => {
    expect(prospectSchema.safeParse({ company: "Northstar", email: "bad" }).success).toBe(false);
  });
  it("rejects research without a company", () => {
    expect(researchSchema.safeParse({ company: "" }).success).toBe(false);
  });
  it("requires a meaningful draft objective", () => {
    expect(draftSchema.safeParse({ prospectId: "p1", objective: "Hi" }).success).toBe(false);
  });
});
