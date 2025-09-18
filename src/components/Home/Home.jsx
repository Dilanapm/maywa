import About from "./About/About";
import PopularItem from "./PopularItem/PopularItem";
import RecipeSection from "./RecipeSection/RecipeSection";
import BookTable from "./BookTable/BookTable";
import CustomerSay from "./CustomerSay/CustomerSay";

const Home = () => {
    return (
        <>
            <About />
            <PopularItem />
            <RecipeSection />
            <BookTable />
            <CustomerSay />
        </>
    );
};

export default Home;