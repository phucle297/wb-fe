import { z } from "zod";

export const commentSchema = z.object({
  comment: z.string(),
  name: z.string(),
  email: z.string().email(),
});
export const blogSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  author: z.string(),
  thumbnail: z.string(),
  comments: z.array(commentSchema).nullish(),
  tags: z.array(z.string()).nullish(),
});
export type TComment = z.infer<typeof commentSchema>;
export type TBlog = z.infer<typeof blogSchema>;
