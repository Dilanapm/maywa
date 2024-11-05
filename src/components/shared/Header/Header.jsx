import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import logo from '../../../assets/logo.png';
import { navItems } from '../../../utils/dummyData';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="w-[full] md:h-[108px] h-[77px] flex justify-between items-center md:px-32 px-8">
            <div className="flex items-center gap-[60px]">
                <Link to="/" className="flex items-center justify-center gap-[6px]">
                    <img src={logo} alt="logo" className="w-[36.99px] h-[37px]" />
                    <h3 className="text-white font-poppins text-[28.44px] font-semibold">Restau<span className="font-normal">rant</span></h3>
                </Link>
                <ul className="hidden md:flex gap-10 text-white font-raleway text-[15px] font-[500]">
                    {navItems.map((item, index) => (
                        <li key={index} className='hover:text-yellow transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'><Link to={item.path}>{item.name}</Link></li>
                    ))}
                </ul>
            </div>
            <button className="common-btn hidden md:block">Book A Table</button>
            <IoMenuSharp className="text-white text-4xl cursor-pointer transition-transform duration-500 ease-in-out md:hidden block" onClick={() => setIsMenuOpen(true)} />
            {isMenuOpen &&
                <div className="md:hidden block absolute top-0 left-0 w-full h-fit bg-background-primary z-50 transition-all duration-500 ease-in-out">
                    <div className='w-full h-fit bgSVG py-24'>
                        <IoCloseSharp className="text-white text-4xl cursor-pointer absolute top-6 right-8 transition-transform duration-500 ease-in-out" onClick={() => setIsMenuOpen(false)} />
                        <ul className="flex flex-col items-center justify-center h-full gap-10 text-white font-raleway text-[15px] font-[500]">
                            {navItems.map((item, index) => (
                                <li key={index} className='hover:text-yellow transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'><Link to={item.path}>{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>}
        </div>
    );
};

export default Header;

