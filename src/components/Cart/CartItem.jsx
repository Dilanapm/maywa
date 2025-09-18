import React from 'react';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image Placeholder */}
      <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-2xl">🌶️</span>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
        <p className="text-sm font-medium text-orange-600">
          Bs. {item.price.toFixed(2)} c/u
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
            disabled={item.quantity <= 1}
          >
            <FiMinus className="text-sm" />
          </button>
          
          <span className="px-3 py-2 min-w-[3rem] text-center font-medium">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
          >
            <FiPlus className="text-sm" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Eliminar del carrito"
        >
          <FiTrash2 className="text-sm" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">
          Bs. {subtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;