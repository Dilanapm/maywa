import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import Header from '../components/shared/Header/Header';
import HeroComponent from '../components/Hero/HeroComponent';

const Main = () => {
    const location = useLocation();
    
    // No mostrar HeroComponent en las páginas de receta
    const isRecipePage = location.pathname.startsWith('/receta/');
    
    return (
        <div className="w-full h-full bg-[#fdf6e3]">
            <Header />
            {!isRecipePage && <HeroComponent />}
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;