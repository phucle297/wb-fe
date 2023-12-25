type Props = {
  title: string;
  subtitle?: string;
  img?: string;
};

const Banner = ({ title, subtitle }: Props) => {
  return (
    <div className="flex h-80 flex-col items-center justify-center bg-[hsl(var(--secondary))]">
      <h1 className="text-4xl font-bold tracking-wider">{title}</h1>
      {subtitle && <p className="tracking-wide">{subtitle}</p>}
    </div>
  );
};

export default Banner;
