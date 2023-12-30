import clsx from "clsx";

import { Badge } from "@/components/ui/badge";
import { categoriesSchema } from "@/types/categories";
import { TBadgeColor } from "@/types/colors";

type Props = {
  categories: string[];
  noWrap?: boolean;
};

const Categories = ({ categories, noWrap = false }: Props) => {
  const getVariant = (category: string) => {
    let variant: TBadgeColor;
    switch (category) {
      case categoriesSchema.enum[210]:
        variant = "destructive";
        break;

      case categoriesSchema.enum.action:
        variant = "blue";
        break;
      case categoriesSchema.enum.adventure:
        variant = "blue_pastel_1";
        break;
      case categoriesSchema.enum.comedy:
        variant = "yellow";
        break;
      case categoriesSchema.enum.drama:
        variant = "red_pastel_8";
        break;
      case categoriesSchema.enum.ecchi:
        variant = "red_pastel_2";
        break;
      case categoriesSchema.enum.fantasy:
        variant = "green_pastel_2";
        break;
      case categoriesSchema.enum.harem:
        variant = "violet_pastel_10";
        break;
      case categoriesSchema.enum.horror:
        variant = "red_pastel_10";
        break;
      case categoriesSchema.enum.incest:
        variant = "red";
        break;
      case categoriesSchema.enum.isekai:
        variant = "gray";
        break;
      case categoriesSchema.enum.josei:
        variant = "red_pastel_4";
        break;
      case categoriesSchema.enum.loli:
        variant = "red";
        break;
      case categoriesSchema.enum.manhua:
        variant = "blue_pastel_6";
        break;
      case categoriesSchema.enum.manhwa:
        variant = "blue_pastel_4";
        break;
      case categoriesSchema.enum.mecha:
        variant = "gray";
        break;
      case categoriesSchema.enum.music:
        variant = "red_pastel_5";
        break;
      case categoriesSchema.enum.mystery:
        variant = "blue_pastel_8";
        break;
      case categoriesSchema.enum.psychological:
        variant = "violet_pastel_8";
        break;
      case categoriesSchema.enum.romance:
        variant = "red_pastel_2";
        break;
      case categoriesSchema.enum.school:
        variant = "green_pastel_1";
        break;
      case categoriesSchema.enum.sci_fi:
        variant = "gray";
        break;
      case categoriesSchema.enum.seinen:
        variant = "blue_pastel_9";
        break;
      case categoriesSchema.enum.shoujo:
        variant = "red_pastel_9";
        break;
      case categoriesSchema.enum.shounen:
        variant = "blue_pastel_3";
        break;
      case categoriesSchema.enum.slice_of_life:
        variant = "green";
        break;
      case categoriesSchema.enum.sports:
        variant = "blue_pastel_10";
        break;
      case categoriesSchema.enum.supernatural:
        variant = "violet_pastel_9";
        break;
      case categoriesSchema.enum.yuri:
        variant = "red_pastel_3";
        break;
      default:
        variant = "default";
        break;
    }
    return variant;
  };
  return (
    <div className={clsx("flex w-[200px] flex-row gap-2", !noWrap && "flex-wrap")}>
      {categories.map((item) => {
        const category = item.toLocaleLowerCase().trim().replaceAll(" ", "_").replaceAll("-", "_");
        const variant = getVariant(category);

        return (
          <Badge key={category} className={clsx("whitespace-nowrap")} variant={variant}>
            {item[0].toUpperCase() + item.slice(1).replaceAll("_", " ")}
          </Badge>
        );
      })}
    </div>
  );
};

export default Categories;
