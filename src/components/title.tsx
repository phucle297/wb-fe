import clsx from "clsx";

type Props = {
  text: string;
  textPosition?: "left" | "center" | "right";
  linePosition?: "left" | "center" | "right";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";
  className?: string;
};

const Title = ({ text, textPosition = "center", linePosition = "center", size = "4xl", className }: Props) => {
  return (
    <div className={clsx(className, "relative my-5 block", textPosition && `text-${textPosition}`)}>
      <div className="relative inline-block w-fit">
        <h2 className={clsx("font-bold", size && `text-${size}`)}>{text}</h2>
        <div
          className={clsx(
            "absolute -bottom-2 h-0.5 w-14  bg-[hsl(var(--foreground))]",
            linePosition === "center" && "left-1/2 -translate-x-1/2",
            linePosition === "left" && "left-0",
            linePosition === "right" && "right-0"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Title;
