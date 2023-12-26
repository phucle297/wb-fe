import { z } from "zod";

export const typesSchema = z.enum([
  "anime_movie",
  "anime_tv_series",
  "manga",
  "light_novel",
  "web_novel",
  "web_novel/light_novel",
  "light_novel/web_novel",
  "anime",
]);

export type TTypes = z.infer<typeof typesSchema>;
