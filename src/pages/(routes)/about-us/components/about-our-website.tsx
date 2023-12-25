import Title from "@/components/title";

const AboutOurWebsite = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="grayscale">
        <img alt="cau-rong" className="h-80 w-full object-cover" src={"https://picsum.photos/700/500"} />
      </div>
      <div className="flex flex-col justify-center bg-[hsl(var(--secondary))]/80 p-5 px-20">
        <div className="w-4/5">
          <Title linePosition="left" text="ABOUT OUR WEBSITE" textPosition="left" />

          <p className="opacity-70">Một dự án nho nhỏ để thỏa mãn sự wibu của bản thân và ăn xin online {":')"}</p>
          <p className="opacity-70">
            Đây là nơi để chúng tôi đăng những ý kiến của bản thân về một số bộ Anime - Manga - WebNovel/LightNovel
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutOurWebsite;
