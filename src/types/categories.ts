import { z } from "zod";

export const categoriesSchema = z.enum([
  "210",
  "action",
  "adventure",
  "comedy",
  "drama",
  "ecchi",
  "fantasy",
  "harem",
  "horror",
  "incest",
  "isekai",
  "josei",
  "loli",
  "manhua",
  "manhwa",
  "mecha",
  "music",
  "mystery",
  "psychological",
  "romance",
  "school",
  "sci_fi",
  "seinen",
  "shoujo",
  "shounen",
  "slice_of_life",
  "sports",
  "supernatural",
  "yuri",
]);

export const CATEGORIES = Object.keys(categoriesSchema.enum);

export type TCategories = z.infer<typeof categoriesSchema>;
