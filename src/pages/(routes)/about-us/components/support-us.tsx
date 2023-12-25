import Title from "@/components/title";
import { Button } from "@/components/ui/button";

const SupportUs = () => {
  return (
    <div className="container my-10">
      <Title text="SUPPORT US" />

      <div className=" mt-10 flex flex-col items-center gap-5">
        <p className="text-center opacity-70 lg:w-1/3">Góc ăn xin</p>

        <Button className="">Donate Now</Button>
      </div>
    </div>
  );
};

export default SupportUs;
