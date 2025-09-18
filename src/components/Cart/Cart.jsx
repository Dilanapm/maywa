import React from 'react';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import CartItem from './CartItem';
import MaywaButton from '../MaywaButton/MaywaButton';

const Cart = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onCheckout 
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="text-orange-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Mi Carrito ({getTotalItems()})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <FiShoppingCart className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500 mb-4">
                Agrega algunos productos de MAYWA para comenzar
              </p>
              <MaywaButton onClick={onClose}>
                Seguir Comprando
              </MaywaButton>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={onClearCart}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  Bs. {calculateTotal().toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <MaywaButton
                  onClick={() => onCheckout(cartItems)}
                  className="w-full"
                  size="lg"
                >
                  Proceder al Checkout
                </MaywaButton>
                <button
                  onClick={onClose}
                  className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;