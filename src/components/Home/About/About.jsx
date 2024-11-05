import { useState } from "react";
import aboutImage from "../../../assets/about.png";
import sideImage from "../../../assets/about-side.png";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { aboutItems, buttonNames } from "../../../utils/dummyData";

const About = () => {
    const [activeButton, setActiveButton] = useState(buttonNames[0].id);
    const [clickedButton, setClickedButton] = useState({});
    const [animationKey, setAnimationKey] = useState(0);

    const handleButtonClick = (button) => {
        setActiveButton(button.id);
        setClickedButton((prev) => ({ ...prev, [button.id - 1]: true }));
        setAnimationKey((prevKey) => prevKey + 1);
    };

    const activeButtonStyle = {
        active: 'bg-[#B52B1D] text-[#fff]',
        inactive: 'bg-transparent text-[#333333]'
    }
    return (
        <div className="w-full h-fit bg-white flex flex-col md:py-24 py-8 md:relative">
            <div className="w-full h-full flex md:flex-row flex-col items-start justify-between gap-8 md:px-32 px-8">
                <div className="w-full md:w-5/12 md:min-h-[460px] h-full">
                    <img src={aboutImage} alt="about" className="w-full h-full object-fit" />
                </div>
                <div className="w-full md:w-7/12 h-full flex flex-col justify-center items-start gap-[18px]">
                    <div className="w-full flex gap-4 border-b-[1px] border-b-[#B52B1D]">
                        {buttonNames.map((button) => (
                            <button
                                key={button.id}
                                className={`font-roboto text-[14px] font-normal leading-[14px] text-[#181818] px-4 py-2 transition-all duration-300 ease-in-out scale-100 hover:scale-110 active:scale-90 ${activeButton === button.id ? activeButtonStyle.active : activeButtonStyle.inactive}`}
                                onClick={() => handleButtonClick(button)}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                    <h5 key={`title-${animationKey}`} className={`md:text-[62px] text-[40px] font-bebas font-bold md:leading-[62px] leading-[48px] text-[#181818] ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}>{buttonNames[activeButton - 1].title}</h5>
                    <p key={`description-${animationKey}`} className={`font-roboto text-base font-normal text-justify text-[#333333] ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}>{buttonNames[activeButton - 1].description}</p>
                    <div key={`buttons-${animationKey}`} className={`flex gap-8 ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}>
                        <button className="common-btn uppercase">{buttonNames[activeButton - 1].button}</button>
                        <button className="md:flex hidden items-center justify-start gap-2 font-roboto text-[18px] font-bold text-black">
                            <MdOutlineWifiCalling3 className="text-red text-[20px]" />
                            {buttonNames[activeButton - 1].contact}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start md:items-center md:justify-center md:gap-24 gap-8 mt-[72px] md:px-0 px-8">
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
            <img src={sideImage} alt="side" className="absolute top-[340px] right-0 md:block hidden" />
        </div>
    );
};

export default About;
