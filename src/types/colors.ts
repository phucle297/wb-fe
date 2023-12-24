import z from "zod";

export const colorsSchema = z.enum(["gray", "red", "rose", "orange", "green", "blue", "yellow", "violet"]);

export const COLORS = Object.keys(colorsSchema.enum);

export type TColor = z.infer<typeof colorsSchema>;
