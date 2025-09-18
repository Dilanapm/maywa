import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import logo from '../../../assets/maywa-logo.png';
import { navItems } from '../../../utils/dummyData';
import { FaWhatsapp, FaUser } from "react-icons/fa";
import { useAuth } from '../../../contexts/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, profile, signOut, isAdmin, isClient } = useAuth();

    const handleSignOut = () => {
        signOut();
        setIsMenuOpen(false);
    };

    return (
        <header className="w-full md:h-[108px] h-[77px] flex justify-between items-center md:px-32 px-8 bg-[#DED8C9]">
            {/* Logo + Nombre de marca */}
            <div className="flex items-center gap-[20px]">
                <Link to="/" className="flex items-center justify-center gap-2">
                    <img src={logo} alt="MAYWA" className="w-12 h-12 rounded-full" />
                    <h1 className="text-green-800 font-serif text-3xl font-bold tracking-wide">MAYWA</h1>
                </Link>
                {/* Nav para escritorio */}
                <ul className="hidden md:flex gap-10 text-green-900 font-semibold lg:text-[20px] text-[15px]">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="hover:text-red-600 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                        >
                            <a href={item.path} className="hover:text-red-600 transition no-underline">{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Botones de escritorio */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-green-800 text-sm font-medium">
                            Hola, {profile?.full_name || user.email}
                            {isAdmin() && <span className="ml-1 text-red-600 font-bold">(Admin)</span>}
                            {isClient() && <span className="ml-1 text-blue-600 font-bold">(Cliente)</span>}
                        </span>
                        <Link
                            to={isAdmin() ? '/admin' : '/dashboard'}
                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition duration-300 no-underline"
                        >
                            <FaUser className="text-sm" />
                            {isAdmin() ? 'Panel Admin' : 'Mi Dashboard'}
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition duration-300"
                        >
                            Salir
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition duration-300 no-underline"
                    >
                        Iniciar Sesión
                    </Link>
                )}
                
                <a
                    href="https://wa.me/59171257616"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 no-underline text-white hover:text-gray-200 px-6 py-4 rounded-full lg:text-lg sm:text-sm font-semibold transition duration-300"
                >
                    <FaWhatsapp className="text-xl" />
                    Hacer Pedido
                </a>
            </div>

            {/* Menú mobile */}
            <IoMenuSharp
                className="text-green-900 text-4xl cursor-pointer md:hidden block"
                onClick={() => setIsMenuOpen(true)}
            />
            {isMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full h-fit bg-[#fdf6e3] z-50">
                    <div className="w-full py-20 px-8 relative">
                        <IoCloseSharp
                            className="text-green-900 text-4xl absolute top-6 right-6 cursor-pointer"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <ul className="flex flex-col items-center gap-8 text-green-900 font-semibold text-lg mt-8">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.path} className="hover:text-red-600 transition no-underline">{item.name}</a>
                                </li>
                            ))}
                            
                            {/* Opciones de usuario mobile */}
                            {user ? (
                                <>
                                    <li>
                                        <Link
                                            to={userProfile?.business_type === 'administrador' ? '/admin' : '/dashboard'}
                                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-base font-semibold transition duration-300 no-underline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <FaUser className="text-sm" />
                                            {isAdmin() ? 'Panel Admin' : 'Mi Dashboard'}
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-base font-semibold transition duration-300"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-base font-semibold transition duration-300 no-underline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/register"
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-base font-semibold transition duration-300 no-underline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            )}
                            
                            <a
                                href="https://wa.me/59171257616"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-base font-semibold transition duration-300 flex items-center justify-center gap-2"
                            >
                                <FaWhatsapp className="text-xl" />
                                Hacer Pedido
                            </a>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
