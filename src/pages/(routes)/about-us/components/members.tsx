import { default as PerMees } from "@/assets/permees.jpg";
import Title from "@/components/title";

const Members = () => {
  return (
    <div className="container my-10">
      <Title text="Our Members" />

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        <div></div>
        <div className="flex items-center justify-center gap-5">
          <img alt="avatar" className="w-1/6 rounded-full" src={PerMees} />
          <div className=" flex flex-col justify-center">
            <h4 className="text-xl font-bold">PerMees</h4>
            <p className="opacity-70">Con nghiện RomCom</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
