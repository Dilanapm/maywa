import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import Burger from "../../../assets/burger.png";
import Pizza from "../../../assets/pizza.png";
import FrenchFries from "../../../assets/french-fry.png";
import Chicken from "../../../assets/fried-shrimp.png";
import PopularItemCard from "./PopularItemCard";
import sideImg from "../../../assets/popular-item.png";

const PopularItem = () => {
    return (
        <div className="w-full h-fit bg-[#FBF7F2] py-24 relative">
            <div className="flex items-center justify-between px-32">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red"></div>
                        <p className="font-roboto text-[20px] font-bold leading-[32px] text-red">Crispy, Every Bite Taste</p>
                    </div>
                    <h5 className="font-bebas text-[62px] font-bold leading-[62px] text-black">Popular Food Items</h5>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronLeft className="text-black" />
                    </button>
                    <button className="w-[60px] h-[60px] bg-white rounded-full shadow-lg flex items-center justify-center">
                        <FaChevronRight className="text-red" />
                    </button>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-center gap-8 px-32 mt-10">
                {PopularItemData.map((item) => (
                    <PopularItemCard key={item.id} item={item} />
                ))}
            </div>
            <img src={sideImg} alt="sideImg" className="absolute top-52 left-0" />
        </div>
    );
};

export default PopularItem;

const PopularItemData = [
    {
        id: 1,
        title: "Vegetables Burger",
        description: 'Barbecue Italian cuisine pizza',
        image: Burger,
    },
    {
        id: 2,
        title: "Spacial Pizza",
        description: 'Barbecue Italian cuisine pizza',
        image: Pizza,
    },
    {
        id: 3,
        title: "Spacial French fries ",
        description: 'Barbecue Italian cuisine',
        image: FrenchFries,
    },
    {
        id: 4,
        title: "Cuisine Chicken",
        description: 'Japanese Cuisine Chicken',
        image: Chicken,
    },
];