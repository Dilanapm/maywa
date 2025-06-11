import { PropTypes } from "prop-types";

const PopularItemCard = ({ item }) => {
  return (
    <div className="md:max-w-[306px] w-full min-h-[300px] bg-white p-8 flex flex-col items-center justify-center gap-6 hover:shadow-xl transition-all duration-300 rounded-lg">
      <img src={item.image} alt={item.title} className="w-full h-auto object-contain" />
      <div className="w-[57px] h-[4px] bg-red-600"></div>
      <div className="flex flex-col items-center justify-center text-center">
        <h5 className="text-2xl font-semibold text-gray-900">{item.title}</h5>
        <p className="text-base leading-relaxed text-gray-700">{item.description}</p>
        <p className="text-[20px] font-bold text-red-600 mt-2">{item.price}</p>
      </div>
    </div>
  );
};

export default PopularItemCard;

PopularItemCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
