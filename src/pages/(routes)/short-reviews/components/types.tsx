import clsx from "clsx";

import { Badge } from "@/components/ui/badge";
import { TBadgeColor } from "@/types/colors";
import { typesSchema } from "@/types/types";

type Props = {
  types: string[];
};

const Types = ({ types }: Props) => {
  const getVariant = (type: string) => {
    let variant: TBadgeColor;
    switch (type) {
      case typesSchema.enum.anime_movie:
        variant = "blue";
        break;
      case typesSchema.enum.anime_tv_series:
        variant = "yellow";
        break;
      case typesSchema.enum.manga:
        variant = "gray";
        break;
      case typesSchema.enum.web_novel:
      case typesSchema.enum["web_novel/light_novel"]:
      case typesSchema.enum["light_novel/web_novel"]:
      case typesSchema.enum.light_novel:
        variant = "green";
        break;
      default:
        variant = "default";
        break;
    }
    return variant;
  };
  return (
    <div className="flex flex-row space-x-2">
      {types.map((item) => {
        const type = item.toLocaleLowerCase().trim().replaceAll(" ", "_");
        const variant = getVariant(type);
        return (
          <Badge key={type} className={clsx("whitespace-nowrap")} variant={variant}>
            {item[0].toUpperCase() + item.slice(1).replaceAll("_", " ")}
          </Badge>
        );
      })}
    </div>
  );
};

export default Types;
