import { FaChevronRight, FaChevronLeft, FaCirclePlay } from "react-icons/fa6";
import vector from "../../../assets/vectorCustomer.svg";
import tomato from "../../../assets/leftSideCustomer.png";
import vegetable from "../../../assets/rightSideCustomer.png";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRef } from "react";
import { optionsCustomerSay } from "../../../utils/splideOptions";
import { customerSayData } from "../../../utils/dummyData";

const CustomerSay = () => {
    const splideRef = useRef(null);

    return (
        <div className="w-full h-fit bg-orange-50 md:py-24 py-8 md:relative">
            <div className="flex items-center justify-between md:px-32 px-8">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600"></div>
                        <p className="font-roboto text-base md:text-lg font-semibold text-red-600 uppercase">
                            Opiniones de Nuestros Clientes
                        </p>
                    </div>
                    <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 leading-tight">
                        Lo que dicen sobre MAYWA
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

            <div className="w-full mt-8 md:px-32 px-8">
                <Splide ref={splideRef} options={optionsCustomerSay}>
                    {customerSayData.map((item) => (
                        <SplideSlide key={item.id}>
                            <div className="w-full flex md:flex-row flex-col-reverse">
                                <div className="md:w-5/12 w-full bg-yellow-300 flex flex-col items-center justify-center gap-12 md:gap-24 py-8 md:px-10 px-6 relative">
                                    <img src={vector} alt="decoracion" className="absolute bottom-24 left-0" />
                                    <div className="flex items-start gap-2">
                                        <span className="font-bebas text-6xl text-black">“</span>
                                        <p className="font-roboto text-base md:text-xl text-black pt-4">
                                            {item.quote}
                                        </p>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h5 className="font-bebas text-lg font-bold text-black">{item.name}</h5>
                                                <p className="text-sm text-black">{item.location}</p>
                                            </div>
                                            <img src={item.profile} alt="perfil" className="w-10 h-10 rounded-full object-cover" />
                                        </div>
                                        <div className="w-full flex items-center">
                                            <div className="flex-1 border-b border-black"></div>
                                            <div className="w-10 border-b-2 border-red-600"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-7/12 w-full md:h-[560px] h-[300px] relative">
                                    <img src={item.thumbnail} alt={`Opinión de ${item.name}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                                </div>

                            </div>
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

            <img src={tomato} alt="decoracion tomate" className="absolute top-24 left-0 hidden md:block" />
            <img src={vegetable} alt="decoracion vegetal" className="absolute bottom-0 right-0 hidden md:block" />
        </div>
    );
};

export default CustomerSay;
