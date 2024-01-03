import clsx from "clsx";
import { Coffee } from "lucide-react";

import { Button } from "./ui/button";

type Props = {
  className?: string;
};
const ButtonDonate = ({ className }: Props) => {
  return (
    <Button
      className={clsx(className, "mt-4 flex gap-2")}
      onClick={() => {
        window.open("https://ko-fi.com/weeboo");
      }}
    >
      <Coffee size={24} />
      Bánh mì thơm và cà phê đắng
    </Button>
  );
};

export default ButtonDonate;
