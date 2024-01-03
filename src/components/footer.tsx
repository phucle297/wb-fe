import { nanoid } from "@reduxjs/toolkit";
import { ChevronRight, Coffee } from "lucide-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

import { default as LogoFullRounded } from "@/assets/logo-full-rounded.png";
import { getRandomItemsInArray } from "@/libs/random-items";
import { CATEGORIES, categoriesSchema } from "@/types/categories";

import { Button } from "./ui/button";

const Footer: FC = () => {
  return (
    <div className="w-full border-t-2 bg-[hsl(var(--background))]">
      <div className="container mx-auto grid gap-5 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center">
          <img alt="logo" className="w-1/2 max-w-full" src={LogoFullRounded} />
        </div>
        <div className="">
          <h3 className="mb-2 text-xl font-bold">Recent Blogs</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ChevronRight className="text-[hsl(var(--primary))]" size={16} />

              <NavLink className="transition-all duration-300 hover:opacity-80" to={"/blogs/" + nanoid()}>
                <span>Frieren: khởi đầu từ kết thúc</span>
              </NavLink>
            </div>

            <div className="flex items-center gap-2">
              <ChevronRight className="text-[hsl(var(--primary))]" size={16} />
              <NavLink className="transition-all duration-300 hover:opacity-80" to={"/blogs/" + nanoid()}>
                <span>Sự thành công của Anime tình cảm hài hước</span>
              </NavLink>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="text-[hsl(var(--primary))]" size={16} />
              <NavLink className="transition-all duration-300 hover:opacity-80" to={"/blogs/" + nanoid()}>
                <span>Tổng hợp Anime mùa đông 2023</span>
              </NavLink>
            </div>
            <div className="flex items-center gap-2">
              <ChevronRight className="text-[hsl(var(--primary))]" size={16} />
              <NavLink className="transition-all duration-300 hover:opacity-80" to={"/blogs/" + nanoid()}>
                <span>Rent a girlfriend: Biểu tượng của loser</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="mb-2 text-xl font-bold">Categories</h3>
          <div className="flex flex-col gap-2">
            {getRandomItemsInArray(
              CATEGORIES.sort((a, b) => a.localeCompare(b)).filter(
                (category: string) =>
                  category !== categoriesSchema.enum[210] &&
                  category !== categoriesSchema.enum.yuri &&
                  category !== categoriesSchema.enum.incest &&
                  category !== categoriesSchema.enum.loli
              ),
              6
            ).map((category: string) => (
              <div key={category} className="flex items-center gap-2">
                <ChevronRight className="text-[hsl(var(--primary))]" size={16} />

                <NavLink
                  className="transition-all duration-300 hover:opacity-80"
                  to={"/short-review?categories=" + category}
                >
                  <span>
                    {category[0].toUpperCase()}
                    {category.slice(1).replaceAll("_", " ")}
                  </span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h3 className="mb-2 text-xl font-bold">Ủng hộ cho Weeboo Time</h3>
          <p className="opacity-50">
            Nếu bài review về anime/manga yêu thích của bạn lâu ra, bạn có thể gửi cho Weeboo Time chút dopamine {":)"}
          </p>
          <Button className="mt-4 flex gap-2">
            <Coffee size={24} />
            Bánh mì thơm và cà phê đắng
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center border-t-2">
        <span className="text-lg font-semibold">© Weeboo time 2023</span>
      </div>
    </div>
  );
};

export default Footer;
