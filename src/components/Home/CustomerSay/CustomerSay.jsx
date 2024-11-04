import { FaChevronRight, FaChevronLeft, FaCirclePlay } from "react-icons/fa6";
import thumbnail from "../../../assets/thumbnailCustomer.png";
import profile from "../../../assets/customter.png";
import vector from "../../../assets/vectorCustomer.svg";
import tomato from "../../../assets/leftSideCustomer.png";
import vegetable from "../../../assets/rightSideCustomer.png";

const CustomerSay = () => {
    return (
        <div className="w-full h-fit bg-[#FBF7F2] md:py-24 py-8 md:relative">
            <div className="flex items-center justify-between md:px-24 px-8">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red"></div>
                        <p className="font-roboto md:text-xl text-base font-bold leading-[32px] text-red">Crispy, Every Bite Taste</p>
                    </div>
                    <h5 className="font-bebas md:text-[62px] text-[40px] font-bold md:leading-[62px] leading-[48px] text-black">What Some of my Customers Say</h5>
                </div>
                <div className="md:flex hidden items-center justify-center gap-8 ">
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronLeft className="text-black" />
                    </button>
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronRight className="text-red" />
                    </button>
                </div>
            </div>
            <div className="w-full flex md:flex-row flex-col-reverse mt-8 md:px-32 px-8">
                <div className="md:w-5/12 w-full bg-yellow flex flex-col items-center justify-center gap-[64px] py-8 md:px-[40px] px-6 relative">
                    <img src={vector} alt="vector" className="absolute bottom-24 left-0" />
                    <div className="flex items-start justify-center gap-2">
                        <span className="font-bebas text-[59px] font-normal leading-[76.57px] text-black">“</span>
                        <p className="font-roboto md:text-xl text-[18px] font-normal leading-[34px] text-black pt-4">You can&apos;t go wrong with Chicken Mandi, I had it twice. The chicken was cooked perfectly, juicy & soft (usually mandi chicken is a bit dry). I would defiantly recommend it.</p>
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
                <div className="md:w-7/12 w-full relative">
                    <img src={thumbnail} alt="thumbnail" className="w-full h-full object-fit" />
                    <FaCirclePlay className="text-yellow text-[49.53px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <img src={tomato} alt="tomato" className="absolute top-24 left-0 md:block hidden" />
            <img src={vegetable} alt="vegetable" className="absolute bottom-0 right-0 md:block hidden" />
        </div>
    );
};

export default CustomerSay;