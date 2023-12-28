import { TShortReview } from "@/types/short-review";
import { TTypes, typesSchema } from "@/types/types";

export const formatParamsTypes: (type: string) => TTypes[] = (type: string) => {
  let tempType = type.split(",").filter((item) => item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
  if (tempType.includes(typesSchema.enum.anime)) {
    tempType.push(typesSchema.enum.anime_movie);
    tempType.push(typesSchema.enum.anime_tv_series);
  }
  if (
    tempType.includes("web_novel light_novel") ||
    tempType.includes(typesSchema.enum.light_novel) ||
    tempType.includes(typesSchema.enum.web_novel) ||
    tempType.includes(typesSchema.enum["web_novel/light_novel"]) ||
    tempType.includes(typesSchema.enum["light_novel/web_novel"])
  ) {
    tempType.push(typesSchema.enum.light_novel);
    tempType.push(typesSchema.enum.web_novel);
    tempType.push(typesSchema.enum["web_novel/light_novel"]);
    tempType.push(typesSchema.enum["light_novel/web_novel"]);
    tempType = tempType.filter((item) => item !== "web_novel light_novel");
  }
  return tempType as TTypes[];
};

export const getNewDataFilterSearchAndType = (data: TShortReview[], search: string, types: TTypes[]) => {
  const newData = data.filter(
    (shortReview) =>
      shortReview.name.toLowerCase().includes(search) ||
      shortReview.categories.toLowerCase().includes(search) ||
      shortReview.review.toLowerCase().includes(search) ||
      shortReview.status.toLowerCase().includes(search) ||
      shortReview.synopsis.toLowerCase().includes(search) ||
      shortReview.type.toLowerCase().includes(search) ||
      shortReview.writer.toLowerCase().includes(search)
  );
  const dataFilterType = newData.filter((shortReview) => {
    let typeInReview = shortReview.type.split(",");
    typeInReview = typeInReview.map((item) => item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
    return types.some((item) => typeInReview.includes(item));
  });

  return dataFilterType;
};
