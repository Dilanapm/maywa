import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full h-fit py-24 bg-[url('./assets/footer.jpeg')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="flex flex-col items-center justify-center gap-[120px] px-32">
                <div className="flex flex-col items-center justify-center gap-[48px]">
                    <h4 className="font-bebas text-[62px] font-bold leading-[64px] text-white z-10">We ready to have you the best dining experiences</h4>
                    <div className="flex items-center justify-between gap-6">
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
                            <Link to={icon.link} key={index} className="w-[53.45px] h-[53.45px] flex items-center justify-center rounded-full border border-white z-10">
                                <icon.icon className="text-white text-[24px] cursor-pointer z-10" />
                            </Link>
                        ))}
                    </div>
                    <p className="font-roboto text-[21px] font-normal leading-[25.6px] text-white z-10">
                        © {currentYear} <span className="text-yellow">Niomax</span> All Rights Reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;

const socialIcons = [
    {
        icon: IoLogoFacebook,
    },
    {
        icon: FaXTwitter,
    },
    {
        icon: FaInstagram,
    },
    {
        icon: FaLinkedin,
    }
];

const footerInfo = [
    {
        icon: FaRegClock,
        title: "Opening Hours",
        info: "Monday - Sunday",
        description: "11:00 AM - 10:00 PM"
    },
    {
        icon: MdOutlineWifiCalling3,
        title: "Let's Talk",
        info: "Phone: 1-800-222-4545",
        description: "Fax: 1-800-222-4545"
    },
    {
        icon: IoMailOutline,
        title: "Book a Table",
        info: "Email: info@niomax.com",
        description: "Support: sales@niomax.com"
    },
    {
        icon: IoLocationOutline,
        title: "Our Address",
        info: "123 Anywhere, Any City, NY 12345",
        description: "New York, USA"
    }
]