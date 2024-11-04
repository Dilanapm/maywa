import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { IoMenuSharp } from "react-icons/io5";

const Header = () => {
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
            <IoMenuSharp className="text-white text-4xl md:hidden block" />
        </div>
    );
};

export default Header;

const navItems = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'About',
        path: '/'
    },
    {
        name: 'Portfolio',
        path: '/'
    },
    {
        name: 'Clients',
        path: '/'
    },
    {
        name: 'Blog',
        path: '/'
    },
    {
        name: 'Contact',
        path: '/'
    }
]