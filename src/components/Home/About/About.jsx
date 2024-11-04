import { useState } from "react";
import aboutImage from "../../../assets/about.png";
import sideImage from "../../../assets/about-side.png";
import { FiShoppingBag } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { LuBox } from "react-icons/lu";
import { MdOutlineWifiCalling3 } from "react-icons/md";

const About = () => {
    const [activeButton, setActiveButton] = useState(1);

    const activeButtonStyle = {
        active: 'bg-[#B52B1D] text-[#fff]',
        inactive: 'bg-transparent text-[#333333]'
    }
    return (
        <div className="w-full h-fit bg-white flex flex-col py-24 relative">
            <div className="w-full h-full flex items-start justify-between gap-8 px-32">
                <div className="w-5/12 min-h-[460px]">
                    <img src={aboutImage} alt="about" className="w-full h-full object-fit" />
                </div>
                <div className="w-7/12 h-full flex flex-col justify-center items-start gap-[18px]">
                    <div className="w-full flex gap-4 border-b-[1px] border-b-[#B52B1D]">
                        {buttonNames.map((button) => (
                            <button
                                key={button.id}
                                className={`font-roboto text-[14px] font-normal leading-[14px] text-[#181818] px-4 py-2 transition-all duration-300 ease-in-out scale-100 hover:scale-110 active:scale-90 ${activeButton === button.id ? activeButtonStyle.active : activeButtonStyle.inactive}`}
                                onClick={() => setActiveButton(button.id)}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                    <h5 className="text-[62px] font-bebas font-bold leading-[62px] text-[#181818]">Exceptional culinary experience and delicious food</h5>
                    <p className="font-roboto text-base font-normal text-justify text-[#333333]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus. Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna minim veniam nostrud exercitation.</p>
                    <div className="flex gap-8">
                        <button className="common-btn uppercase">About More</button>
                        <button className="flex items-center justify-start gap-2 font-roboto text-[18px] font-bold text-black">
                            <MdOutlineWifiCalling3 className="text-red text-[20px]" />
                             +88 3426 739 485
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-24 mt-[72px]">
                {aboutItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-center gap-4">
                        <div className="w-[90px] h-[90px] bg-white rounded-full shadow-lg flex items-center justify-center">
                            {item?.image}
                        </div>
                        <div className="flex flex-col items-start justify-center gap-2">
                            <h5 className="text-[30px] font-bebas font-bold leading-[30px] text-black">{item.title}</h5>
                            <p className="font-roboto text-[20px] font-normal leading-[24px] text-black">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <img src={sideImage} alt="side" className="absolute top-[300px] right-0" />
        </div>
    );
};

export default About;

const buttonNames = [
    {
        id: 1,
        name: "About",
    },
    {
        id: 2,
        name: "Experience",
    },
    {
        id: 3,
        name: "Contact",
    },
]

const aboutItems = [
    {
        id: 1,
        image: <LuBox className="text-red text-[35px]" />,
        title: "Fast Delivery",
        description: "Within 30 minutes"
    },
    {
        id: 2,
        image: <SlBadge className="text-red text-[35px]" />,
        title: "Absolute Dining",
        description: "Best buffet restaurant"
    },
    {
        id: 3,
        image: <FiShoppingBag className="text-red text-[35px]" />,
        title: "Pickup Delivery",
        description: "Grab your food order"
    }
]