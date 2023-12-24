/* eslint-disable @typescript-eslint/no-explicit-any */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import Slider from "react-slick";

type Props = {
  data: ReactElement[] | ReactNode[];
  settings?: object;
};

const SamplePrevArrow = ({ onClick, type }: any) => {
  if (type === "prev")
    return (
      <ChevronLeft
        className="absolute left-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:text-[hsl(var(--primary))]"
        size={32}
        onClick={onClick}
      />
    );
  return (
    <ChevronRight
      className="absolute right-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:text-[hsl(var(--primary))]"
      size={32}
      onClick={onClick}
    />
  );
};

const Carousel = ({ data, settings: settingsDefault }: Props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SamplePrevArrow type={"next"} />,
    prevArrow: <SamplePrevArrow type={"prev"} />,
    ...settingsDefault,
  };
  return (
    <div className="relative w-full">
      <Slider {...settings}>{data}</Slider>
    </div>
  );
};

export default Carousel;
