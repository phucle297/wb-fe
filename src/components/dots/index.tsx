const Dots = () => {
  return (
    <div className="pointer-events-none fixed left-0 top-0 -z-50 select-none">
      <div className="sticky left-0 top-0 h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 z-[-1] bg-muted-foreground/20" />
        <div
          className="bg-gradient-radial absolute z-[-1] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full from-primary from-0% to-transparent to-90% blur-md will-change-auto"
          style={{ top: 67, left: 1224 }}
        />
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height={16} id="dotted-pattern" patternUnits="userSpaceOnUse" width={16}>
              <circle cx={2} cy={2} fill="black" r={1} />
            </pattern>
            <mask id="dots-mask">
              <rect fill="white" height="100%" width="100%" />
              <rect fill="url(#dotted-pattern)" height="100%" width="100%" />
            </mask>
          </defs>
          <rect fill="hsl(var(--background))" height="100%" mask="url(#dots-mask)" width="100%" />
        </svg>
      </div>
    </div>
  );
};

export default Dots;
