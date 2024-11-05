import { Link } from "react-router-dom";
import { footerInfo, socialIcons } from "../../../utils/dummyData";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full h-fit md:py-24 py-8 bg-[url('./assets/footer.jpeg')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="flex flex-col items-center justify-center md:gap-[120px] gap-[64px] md:px-32 px-8">
                <div className="flex flex-col items-center justify-center gap-[48px]">
                    <h4 className="font-bebas md:text-[62px] text-[40px] font-bold md:leading-[64px] leading-[48px] text-center text-white z-10">We ready to have you the best dining experiences</h4>
                    <div className="flex md:flex-row flex-col items-center justify-between gap-6">
                        {footerInfo.map((info, index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-6">
                                <info.icon className="text-yellow text-[22.5px] z-10" />
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <h5 className="font-bebas text-2xl font-bold leading-[28px] text-white z-10">{info.title}</h5>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="font-roboto text-base font-normal leading-[25px] text-white z-10">{info.info}</p>
                                        <p className="font-roboto text-base font-normal leading-[25px] text-white z-10">{info.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-[25px]">
                    <div className="flex items-center justify-center gap-6">
                        {socialIcons.map((icon, index) => (
                            <Link to={icon.link} key={index} className="md:w-[53.45px] md:h-[53.45px] w-[36px] h-[36px] flex items-center justify-center rounded-full border border-white z-10">
                                <icon.icon className="text-white md:text-[24px] text-[16px] cursor-pointer z-10" />
                            </Link>
                        ))}
                    </div>
                    <p className="font-roboto md:text-[21px] text-[16px] font-normal md:leading-[25.6px] leading-[20px] text-center text-white z-10">
                        © {currentYear} <span className="text-yellow">Niomax</span> All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;