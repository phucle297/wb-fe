import { memo, useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";

import { Progress } from "./ui/progress";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const NavigationProgressRoot: React.FC<IProps> = ({ ...props }) => {
  const navigation = useNavigation();
  const preValue = useRef<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleReset = () => {
    window.setTimeout(() => {
      setProgress(0);
    }, 250);
  };
  useEffect(() => {
    const isLoading = navigation.state === "loading";
    const wasLoading = preValue.current === "loading";

    if (isLoading) {
      preValue.current = navigation.state;
      setProgress(70);
    } else if (wasLoading) {
      setProgress(100);
      preValue.current = navigation.state;
    }
  }, [navigation.state]);

  useEffect(() => {
    progress === 100 && handleReset();
  }, [progress]);

  if (progress === 0) return null;
  return (
    <div {...props}>
      <Progress className="h-1 rounded-none" value={progress} />
    </div>
  );
};

const NavigationProgress = memo(NavigationProgressRoot);
NavigationProgress.displayName = "NavigationProgress";
export default NavigationProgress;
