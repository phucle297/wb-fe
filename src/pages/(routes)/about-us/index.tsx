import Banner from "@/components/banner";

import AboutOurWebsite from "./components/about-our-website";
import Members from "./components/members";
import SupportUs from "./components/support-us";

const AboutUs = () => {
  return (
    <div>
      <Banner subtitle="The Faces Behind The Screen" title="ABOUT US" />
      <Members />
      <AboutOurWebsite />
      <SupportUs />
    </div>
  );
};

export default AboutUs;
