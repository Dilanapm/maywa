import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

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
        </div>
    );
};

export default CustomerSay;