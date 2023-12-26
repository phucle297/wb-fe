import { z } from "zod";

export const shortReviewSchema = z.object({
  name: z.string(),
  type: z.string(),
  categories: z.string(),
  writer: z.string(),
  score: z.number(),
  synopsis: z.string(),
  review: z.string(),
  status: z.string(),
  last_edited_time: z.string(),
});

export type TShortReview = z.infer<typeof shortReviewSchema>;
