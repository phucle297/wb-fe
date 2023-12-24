import toast from "react-hot-toast";

import { ButtonWithTooltip } from "@/components/button-with-tooltip";
import ThemeColors from "@/components/theme-colors";
import { ThemeToggle } from "@/components/theme-toggle";

const Home = () => {
  return (
    <div className="relative z-10">
      <ThemeColors />
      <ThemeToggle />
      <div className="h-screen">
        <h1>Home</h1>
        <ButtonWithTooltip
          label="asd"
          onClick={() => {
            toast.success("asd");
          }}
        >
          Button
        </ButtonWithTooltip>
      </div>
    </div>
  );
};

export default Home;
