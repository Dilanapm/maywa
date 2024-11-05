import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import PopularItemCard from "./PopularItemCard";
import sideImg from "../../../assets/popular-item.png";
import { popularItemData } from "../../../utils/dummyData";

const PopularItem = () => {
    return (
        <div className="w-full h-fit bg-[#FBF7F2] md:py-24 py-8 md:relative">
            <div className="flex items-center justify-between md:px-32 px-8">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red"></div>
                        <p className="font-roboto md:text-xl text-base font-bold leading-[32px] text-red">Crispy, Every Bite Taste</p>
                    </div>
                    <h5 className="font-bebas md:text-[62px] text-[40px] font-bold md:leading-[62px] leading-[48px] text-black">Popular Food Items</h5>
                </div>
                <div className="md:flex items-center justify-center gap-8 hidden">
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronLeft className="text-black" />
                    </button>
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronRight className="text-red" />
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex md:flex-row flex-col items-center justify-center gap-8 md:px-32 px-8 mt-10">
                {popularItemData.map((item) => (
                    <PopularItemCard key={item.id} item={item} />
                ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
                <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                    <FaChevronLeft className="text-black" />
                </button>
                <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                    <FaChevronRight className="text-red" />
                </button>
            </div>
            <img src={sideImg} alt="sideImg" className="absolute top-52 left-0 md:block hidden" />
        </div>
    );
};

export default PopularItem;