import toast from "react-hot-toast";

import { ButtonWithTooltip } from "@/components/button-with-tooltip";
import ThemeColors from "@/components/theme-colors";
import { ThemeToggle } from "@/components/theme-toggle";

import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <ThemeColors />
      <ThemeToggle />
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
  );
};

export default Home;
