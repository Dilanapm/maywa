import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiUser, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { createOrder } from '../../config/supabase';
import MaywaButton from '../MaywaButton/MaywaButton';

const Checkout = ({ cartItems, onBack, onOrderSuccess }) => {
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
    notes: '',
    paymentMethod: 'efectivo'
  });
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Ingresa un teléfono válido';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección de entrega es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        user_id: user.id,
        total_amount: calculateTotal(),
        status: 'pendiente',
        delivery_address: formData.address,
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        notes: formData.notes,
        payment_method: formData.paymentMethod,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          product_name: item.name
        }))
      };

      const newOrder = await createOrder(orderData);
      onOrderSuccess(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
        >
          <FiArrowLeft className="mr-2" />
          Volver al carrito
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Finalizar Pedido</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiUser className="mr-2" />
                Información Personal
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="70123456"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiMapPin className="mr-2" />
                Información de Entrega
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de entrega *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Calle, número, zona, referencias..."
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiCreditCard className="mr-2" />
                Método de Pago
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="efectivo"
                    checked={formData.paymentMethod === 'efectivo'}
                    onChange={handleInputChange}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div className="ml-3">
                    <span className="font-medium">Efectivo</span>
                    <p className="text-sm text-gray-500">Pago contra entrega</p>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transferencia"
                    checked={formData.paymentMethod === 'transferencia'}
                    onChange={handleInputChange}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <div className="ml-3">
                    <span className="font-medium">Transferencia Bancaria</span>
                    <p className="text-sm text-gray-500">Te enviaremos los datos</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <MaywaButton
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Procesando...' : `Confirmar Pedido - Bs. ${calculateTotal().toFixed(2)}`}
            </MaywaButton>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen del Pedido
            </h2>
            
            {/* Items */}
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Bs. {item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    Bs. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>Bs. {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Costo de envío</span>
                <span className="text-green-600 font-medium">GRATIS</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>Bs. {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Order Info */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">🚚 Información de Entrega</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Tiempo estimado: 30-45 minutos</li>
                <li>• Envío gratuito en La Paz</li>
                <li>• Te contactaremos para confirmar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;