import { nanoid } from "@reduxjs/toolkit";

import Carousel from "@/components/carousel";

const renderDataInCarousel = () => {
  const data = [
    <div key={nanoid()}>
      <div className="flex h-[300px] items-center justify-center bg-[hsl(var(--secondary))]">Post 1: Tối nay ăn gì</div>
    </div>,
    <div key={nanoid()}>
      <div className="flex h-[300px] items-center justify-center bg-[hsl(var(--secondary))]">Post 2: Tối nay ăn gì</div>
    </div>,
    <div key={nanoid()}>
      <div className="flex h-[300px] items-center justify-center bg-[hsl(var(--secondary))]">Post 3: Tối nay ăn gì</div>
    </div>,
    <div key={nanoid()}>
      <div className="flex h-[300px] items-center justify-center bg-[hsl(var(--secondary))]">Post 4: Tối nay ăn gì</div>
    </div>,
    <div key={nanoid()}>
      <div className="flex h-[300px] items-center justify-center bg-[hsl(var(--secondary))]">Post 5: Tối nay ăn gì</div>
    </div>,
  ];
  return data;
};

const Home = () => {
  return (
    <div className="relative z-10">
      <div className="h-screen">
        <Carousel data={renderDataInCarousel()} />
      </div>
    </div>
  );
};

export default Home;
