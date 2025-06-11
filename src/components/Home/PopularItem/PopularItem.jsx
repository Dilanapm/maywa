import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import PopularItemCard from "./PopularItemCard";
import sideImg from "../../../assets/popular-item.png";
import { popularItemData } from "../../../utils/dummyData";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRef } from "react";
import { optionsPopular } from "../../../utils/splideOptions";

const PopularItem = () => {
  const splideRef = useRef(null);

  return (
    
    <div id="productos" className="w-full h-fit bg-orange-50 md:py-24 py-8 md:relative">
      <div className="flex items-center justify-between md:px-32 px-8">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600"></div>
            <p className="font-roboto text-base md:text-lg font-semibold text-red-600 uppercase">
              Salsas que Enamoran
            </p>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 leading-tight">
            Lo Más Popular de MAYWA
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button onClick={() => splideRef.current.splide.go('<')} className="w-12 h-12 bg-white shadow rounded-full flex items-center justify-center hover:bg-red-100">
            <FaChevronLeft className="text-red-600" />
          </button>
          <button onClick={() => splideRef.current.splide.go('>')} className="w-12 h-12 bg-white shadow rounded-full flex items-center justify-center hover:bg-red-100">
            <FaChevronRight className="text-red-600" />
          </button>
        </div>
      </div>

      <div className="w-full mt-10 md:px-32 px-8">
        <Splide ref={splideRef} options={optionsPopular}>
          {popularItemData.map((item) => (
            <SplideSlide className="flex justify-center" key={item.id}>
              <PopularItemCard item={item} />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className="flex justify-center gap-4 mt-6 md:hidden">
        <button onClick={() => splideRef.current.splide.go('<')} className="w-12 h-12 bg-white shadow rounded-full flex items-center justify-center">
          <FaChevronLeft className="text-red-600" />
        </button>
        <button onClick={() => splideRef.current.splide.go('>')} className="w-12 h-12 bg-white shadow rounded-full flex items-center justify-center">
          <FaChevronRight className="text-red-600" />
        </button>
      </div>

      <img src={sideImg} alt="Decoración" className="absolute top-52 left-0 hidden md:block" />
    </div>
  );
};

export default PopularItem;
