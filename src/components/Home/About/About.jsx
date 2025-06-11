import { useState } from "react";
import aboutImage from "../../../assets/sanjuanmajo.png";
import sideImage from "../../../assets/about-side.png";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { aboutItems, buttonNames } from "../../../utils/dummyData";
import MaywaButton from "../../MaywaButton/MaywaButton";

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
    active: 'bg-red-600 text-white',
    inactive: 'bg-transparent text-green-900 border border-red-600 hover:bg-red-50'
  };

  return (
    <div id="nosotros" className="w-full bg-white flex flex-col md:py-24 py-8 md:relative overflow-hidden">
      <div className="w-full flex md:flex-row flex-col items-start justify-between gap-8 md:px-32 px-8">

        {/* Imagen principal */}
        <div className="w-full md:w-5/12">
          <img src={aboutImage} alt="about" className="w-full h-auto rounded-lg shadow-md" />
        </div>

        {/* Contenido textual */}
        <div className="w-full md:w-7/12 flex flex-col justify-center items-start gap-6">
          {/* Botones tipo tabs */}
          <div className="flex gap-3 border-b border-red-600 pb-2">
            {buttonNames.map((button) => (
              <button
                key={button.id}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition duration-300 ${activeButton === button.id ? activeButtonStyle.active : activeButtonStyle.inactive}`}
                onClick={() => handleButtonClick(button)}
              >
                {button.name}
              </button>
            ))}
          </div>

          {/* Título animado */}
          <h2
            key={`title-${animationKey}`}
            className={`text-[40px] md:text-[60px] font-bebas text-green-900 leading-tight ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}
          >
            {buttonNames[activeButton - 1].title}
          </h2>

          {/* Descripción */}
          <p
            key={`desc-${animationKey}`}
            className={`text-gray-700 font-roboto text-base text-justify ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}
          >
            {buttonNames[activeButton - 1].description}
          </p>

          {/* Botones inferiores */}
          <div className={`flex gap-6 mt-4 ${clickedButton[activeButton - 1] ? 'animate-fadeSlide' : ''}`}>
            <a
              href={buttonNames[activeButton - 1].target}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg uppercase font-bold transition duration-300"
            >
              {buttonNames[activeButton - 1].button}
            </a>

            <button className="hidden md:flex items-center gap-2 text-red-600 font-semibold text-lg">
              <MdOutlineWifiCalling3 className="text-[22px]" />
              {buttonNames[activeButton - 1].contact}
            </button>
          </div>
        </div>
      </div>

      {/* Iconos informativos */}
      <div className="flex md:flex-row flex-col items-center justify-center gap-12 mt-20 md:px-0 px-8">
        {aboutItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-[90px] h-[90px] bg-white rounded-full shadow-lg flex items-center justify-center">
              {item.image}
            </div>
            <div className="flex flex-col">
              <h4 className="text-[28px] font-bebas text-green-900">{item.title}</h4>
              <p className="text-gray-700 text-[18px] font-roboto">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Imagen decorativa */}
      <img
        src={sideImage}
        alt="side"
        className="absolute top-[340px] right-0 md:block hidden opacity-80 pointer-events-none w-[180px]"
      />
    </div>
  );
};

export default About;
