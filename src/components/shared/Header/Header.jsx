import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w-[full] h-[108px] flex justify-between items-center px-32">
            <div className="flex items-center gap-[60px]">
                <Link to="/" className="flex items-center justify-center gap-[6px]">
                    <img src={logo} alt="logo" className="w-[36.99px] h-[37px]" />
                    <h3 className="text-white font-poppins text-[28.44px] font-semibold">Restau<span className="font-normal">rant</span></h3>
                </Link>
                <ul className="flex gap-10 text-white font-raleway text-[15px] font-[500]">
                    {navItems.map((item, index) => (
                        <li key={index} className='hover:text-yellow transition-all duration-300 ease-in-out hover:scale-105 active:scale-95'><Link to={item.path}>{item.name}</Link></li>
                    ))}
                </ul>
            </div>
            <button className="common-btn">Book A Table</button>
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