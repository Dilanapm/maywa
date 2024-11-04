import { FaChevronRight, FaChevronLeft, FaCirclePlay } from "react-icons/fa6";
import thumbnail from "../../../assets/thumbnailCustomer.png";
import profile from "../../../assets/customter.png";
import vector from "../../../assets/vectorCustomer.svg";
import tomato from "../../../assets/leftSideCustomer.png";
import vegetable from "../../../assets/rightSideCustomer.png";

const CustomerSay = () => {
    return (
        <div className="w-full h-fit bg-[#FBF7F2] py-24 relative">
            <div className="flex items-center justify-between px-32">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red"></div>
                        <p className="font-roboto text-[20px] font-bold leading-[32px] text-red">Crispy, Every Bite Taste</p>
                    </div>
                    <h5 className="font-bebas text-[62px] font-bold leading-[62px] text-black">What Some of my Customers Say</h5>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronLeft className="text-black" />
                    </button>
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronRight className="text-red" />
                    </button>
                </div>
            </div>
            <div className="w-full flex mt-8 px-32">
                <div className="w-5/12 bg-yellow flex flex-col items-center justify-center gap-[64px] py-8 px-[40px] relative">
                    <img src={vector} alt="vector" className="absolute bottom-24 left-0" />
                    <div className="flex items-start justify-center gap-2">
                        <span className="font-bebas text-[59px] font-normal leading-[76.57px] text-black">“</span>
                        <p className="font-roboto text-xl font-normal leading-[34px] text-black pt-4">You can&apos;t go wrong with Chicken Mandi, I had it twice. The chicken was cooked perfectly, juicy & soft (usually mandi chicken is a bit dry). I would defiantly recommend it.</p>
                    </div>
                    <div className="w-full flex flex-col gap-[18px]">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex flex-col gap-[2px]">
                                <h5 className="font-bebas text-[18px] font-bold leading-[19.38px] text-black">Khalid Al Dawsry</h5>
                                <p className="font-roboto text-[14px] font-normal leading-[13.32px] text-black">Jeddah, Saudi</p>
                            </div>
                            <img src={profile} alt="profile" className="w-[39.62px] h-[39.95px] object-fit" />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <div className="w-full border-b border-black"></div>
                            <div className="w-[39.62px] border-b-2 border-red"></div>
                        </div>
                    </div>
                </div>
                <div className="w-7/12 relative">
                    <img src={thumbnail} alt="thumbnail" className="w-full h-full object-fit" />
                    <FaCirclePlay className="text-yellow text-[49.53px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <img src={tomato} alt="tomato" className="absolute top-24 left-0" />
            <img src={vegetable} alt="vegetable" className="absolute bottom-0 right-0" />
        </div>
    );
};

export default CustomerSay;