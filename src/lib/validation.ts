import { z } from "zod";

export const prospectSchema = z.object({
  company: z.string().trim().min(2).max(160),
  website: z.string().trim().url().optional().or(z.literal("")),
  firstName: z.string().trim().max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  title: z.string().trim().max(120).optional(),
  email: z.string().trim().email().optional().or(z.literal("")),
  country: z.string().trim().max(80).optional(),
  industry: z.string().trim().max(100).optional(),
  summary: z.string().trim().max(2000).optional()
});

export const researchSchema = z.object({
  company: z.string().trim().min(2).max(160),
  website: z.string().trim().url().optional(),
  role: z.string().trim().max(120).optional(),
  offer: z.string().trim().max(500).optional()
});

export const draftSchema = z.object({
  prospectId: z.string().trim().min(1),
  objective: z.string().trim().min(10).max(500),
  tone: z.enum(["professional", "direct", "consultative"]).default("consultative")
});
