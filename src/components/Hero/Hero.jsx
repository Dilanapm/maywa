import Header from "../shared/Header/header";
import heroImage from '../../assets/hero.png';
import heroFlower from '../../assets/heroFlower.png';

const Hero = () => {
    return (
        <div className="w-full h-full bg-background-primary">
            <div className="w-full h-fit bgSVG">
                <Header />
                <div className="w-full h-full flex justify-center items-center py-20 px-32">
                    <div className="w-full h-[649px] flex">
                        <div className="w-5/12 h-full flex justify-start items-center">
                            <div className="w-[946px] h-[446px] flex flex-col justify-center items-start gap-[38px] absolute z-10">
                                <div className="w-full h-full flex flex-col justify-center items-start gap-4">
                                    <div className="w-[830px] h-fit heroTransparent flex items-center justify-start">
                                        <h6 className="font-bebas text-[120px] font-bold text-white leading-[120px] pt-4">Taste the authentic Saudi cuisine</h6>
                                    </div>
                                    <p className="max-w-[500px] font-roboto text-2xl font-normal text-white">Among the best Saudi chefs in the world, serving you something beyond flavor. </p>
                                </div>
                                <button className="common-btn uppercase">Explore Menu</button>
                            </div>
                        </div>
                        <div className="w-7/12 h-full relative">
                            <img src={heroImage} alt="hero" className="w-full h-full object-cover" />
                            <img src={heroFlower} alt="hero" className="absolute -top-8 -right-6 w-[45px] h-[45px] object-cover" />
                            <div className="absolute bottom-0 -right-16 w-[120px] h-[120px] bg-yellow rounded-full flex justify-center items-center">
                                <div className="w-[105.66px] h-[105.66px] border border-dashed border-red rounded-full flex justify-center items-center">
                                    <h6 className="text-center text-black text-[36px] font-bebas font-semibold leading-[36px]">Today Offer</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;