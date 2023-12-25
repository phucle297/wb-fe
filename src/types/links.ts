import { z } from "zod";

export const linkSimpleSchema = z.object({
  title: z.string(),
  link: z.string(),
});

export const nestedLinkSchema = z.object({
  title: z.string(),
  link: z.string(),
  children: z.array(linkSimpleSchema),
});

export const linkSchema = z.union([linkSimpleSchema, nestedLinkSchema]);

export type TLink = z.infer<typeof linkSchema>;
