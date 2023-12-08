import { z } from "zod";

const translationKeysSchema = z.object({
  id: z.string(),
  text: z.string(),
  language: z.string(),
});

export type TTranslationKeys = z.infer<typeof translationKeysSchema>;
