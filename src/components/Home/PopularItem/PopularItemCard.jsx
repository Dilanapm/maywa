import { PropTypes } from "prop-types";

const PopularItemCard = ({ item }) => {
    return (
        <div className="md:max-w-[306px] w-full min-h-[300px] bg-white p-8 flex flex-col items-center justify-center gap-6 hover:shadow-lg transition-all duration-300">
            <img src={item.image} alt={item.title} />
            <div className="w-[57px] h-[4px] bg-red"></div>
            <div className="flex flex-col items-center justify-center">
                <h5 className="text-[24px] font-bebas font-bold leading-[24px] text-black">{item.title}</h5>
                <p className="text-[12px] font-roboto font-normal leading-[32px] text-black">{item.description}</p>
            </div>
        </div>
    );
};

export default PopularItemCard;

PopularItemCard.propTypes = {
    item: PropTypes.object.isRequired,
};