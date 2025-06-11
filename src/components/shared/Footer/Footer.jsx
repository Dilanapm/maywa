import { Link } from "react-router-dom";
import { footerInfo, socialIcons } from "../../../utils/dummyData";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full h-fit md:py-24 py-8 bg-[url('./assets/footer.jpeg')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="flex flex-col items-center justify-center md:gap-[120px] gap-[64px] md:px-32 px-8">
                <div className="flex flex-col items-center justify-center gap-[48px]">
                    <h4 className="text-4xl md:text-[62px] font-bold leading-tight text-center text-white z-10">Estamos listos para brindarte la mejor experiencia con Maywa</h4>
                    <div className="flex md:flex-row flex-col items-center justify-between gap-6">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <FaPhoneAlt className="text-yellow-400 text-[22.5px] z-10" />
                            <div className="flex flex-col items-center justify-center gap-3">
                                <h5 className="text-xl font-semibold text-white z-10">Teléfono</h5>
                                <p className="text-base text-white z-10">+591 712 576 16</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-6">
                            <FaEnvelope className="text-yellow-400 text-[22.5px] z-10" />
                            <div className="flex flex-col items-center justify-center gap-3">
                                <h5 className="text-xl font-semibold text-white z-10">Email</h5>
                                <p className="text-base text-white z-10">maywa@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-6">
                            <FaMapMarkerAlt className="text-yellow-400 text-[22.5px] z-10" />
                            <div className="flex flex-col items-center justify-center gap-3">
                                <h5 className="text-xl font-semibold text-white z-10">Dirección</h5>
                                <p className="text-base text-white text-center z-10">Av. Landaeta, Zona Irpavi, La Paz - Escuela Militar de Ingeniería EMI</p>
                            </div>
                        </div>
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
                    <p className="text-lg md:text-xl text-white text-center z-10">
                        © {currentYear} <span className="text-yellow-400">Maywa</span> Todos los derechos reservados
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
