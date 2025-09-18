import Header from "../shared/Header/Header";
import HeroComponent from "./HeroComponent";

const Hero = () => {
  return (
    <div className="w-full h-full bg-[#fdf6e3]">
      <div className="w-full h-fit">
        <Header />
        <HeroComponent />
      </div>
    </div>
  );
};

export default Hero;
