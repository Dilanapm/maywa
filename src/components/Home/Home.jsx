import About from "./About/About";
import PopularItem from "./PopularItem/PopularItem";
import BookTable from "./BookTable/BookTable";
import CustomerSay from "./CustomerSay/CustomerSay";

const Home = () => {
    return (
        <>
            <About />
            <PopularItem />
            <BookTable />
            <CustomerSay />
        </>
    );
};

export default Home;