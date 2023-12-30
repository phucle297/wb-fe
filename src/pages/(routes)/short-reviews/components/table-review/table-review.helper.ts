import { ColumnSort } from "@tanstack/react-table";
import dayjs from "dayjs";

import { TCategories } from "@/types/categories";
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

export const getNewDataFilterCategories = (data: TShortReview[], categories: TCategories[]) => {
  const validatedCategories = categories.filter((item) => item);
  if (validatedCategories.length === 0) return data;
  const newData = data.filter((shortReview) => {
    let categoriesInReview = shortReview.categories.split(",");
    categoriesInReview = categoriesInReview.map((item) =>
      item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_")
    );
    return validatedCategories.some((item) => categoriesInReview.includes(item));
  });
  return newData;
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
  if (types.length === 0) return newData;
  const dataFilterType = newData.filter((shortReview) => {
    let typeInReview = shortReview.type.split(",");
    typeInReview = typeInReview.map((item) => item.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"));
    return types.some((item) => typeInReview.includes(item));
  });

  return dataFilterType;
};

export const generateDataAfterSort = (data: TShortReview[], sort: ColumnSort) => {
  let tempData = [...data];
  if (sort) {
    switch (sort.id) {
      case "name":
        if (sort.desc) {
          tempData = tempData.sort((a, b) => b.name.localeCompare(a.name));
        } else tempData = tempData.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "score":
        if (sort.desc) {
          tempData = tempData.sort((a, b) => Number(b.score) - Number(a.score));
        } else tempData = tempData.sort((a, b) => Number(a.score) - Number(b.score));
        break;

      case "last_edited_time":
        if (sort.desc) {
          tempData = tempData.sort((a, b) => (dayjs(b.last_edited_time).isAfter(dayjs(a.last_edited_time)) ? 1 : -1));
        } else
          tempData = tempData.sort((a, b) => (dayjs(a.last_edited_time).isAfter(dayjs(b.last_edited_time)) ? 1 : -1));
        break;

      default:
        break;
    }
  }

  return tempData;
};
