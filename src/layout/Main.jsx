import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer/Footer';
import Hero from '../components/Hero/Hero';

const Main = () => {
    return (
        <div>
            <Hero />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;