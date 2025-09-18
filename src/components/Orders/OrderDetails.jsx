import React, { useState } from 'react';
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiPhone, 
  FiUser, 
  FiClock, 
  FiPackage, 
  FiTruck, 
  FiCheck, 
  FiX,
  FiCreditCard,
  FiMessageCircle
} from 'react-icons/fi';

const OrderDetails = ({ order, onBack, onOrderUpdate }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusIcon = (status) => {
    const iconClass = "text-2xl";
    switch (status) {
      case 'pendiente':
        return <FiClock className={`${iconClass} text-yellow-500`} />;
      case 'procesando':
        return <FiPackage className={`${iconClass} text-blue-500`} />;
      case 'enviado':
        return <FiTruck className={`${iconClass} text-purple-500`} />;
      case 'entregado':
        return <FiCheck className={`${iconClass} text-green-500`} />;
      case 'cancelado':
        return <FiX className={`${iconClass} text-red-500`} />;
      default:
        return <FiClock className={`${iconClass} text-gray-500`} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'procesando':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'enviado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'entregado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendiente':
        return 'Pendiente de confirmación';
      case 'procesando':
        return 'Procesando tu pedido';
      case 'enviado':
        return 'En camino hacia ti';
      case 'entregado':
        return 'Pedido entregado';
      case 'cancelado':
        return 'Pedido cancelado';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDeliveryTime = () => {
    if (order.status === 'entregado') return 'Ya entregado';
    if (order.status === 'cancelado') return 'Cancelado';
    
    const orderDate = new Date(order.created_at);
    const estimatedDelivery = new Date(orderDate.getTime() + 45 * 60000); // +45 minutos
    
    return estimatedDelivery.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canCancelOrder = () => {
    return order.status === 'pendiente' || order.status === 'procesando';
  };

  const handleCancelOrder = () => {
    // Aquí implementarías la lógica para cancelar el pedido
    console.log('Cancelar pedido:', order.id);
    setShowCancelModal(false);
    // onOrderUpdate(); // Refresh orders list
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mr-4 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Volver a mis pedidos
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Pedido #{order.id.slice(0, 8)}
          </h1>
          <p className="text-gray-600">{formatDate(order.created_at)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Estado del Pedido</h2>
              {canCancelOrder() && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Cancelar pedido
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              {getStatusIcon(order.status)}
              <div>
                <h3 className="font-semibold text-gray-900">{getStatusText(order.status)}</h3>
                <p className="text-sm text-gray-500">
                  Tiempo estimado de entrega: {getEstimatedDeliveryTime()}
                </p>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="space-y-4">
              {[
                { key: 'pendiente', label: 'Pedido recibido', icon: FiCheck },
                { key: 'procesando', label: 'Preparando tu pedido', icon: FiPackage },
                { key: 'enviado', label: 'En camino', icon: FiTruck },
                { key: 'entregado', label: 'Entregado', icon: FiCheck }
              ].map((step, index) => {
                const isCompleted = 
                  (order.status === 'procesando' && index <= 1) ||
                  (order.status === 'enviado' && index <= 2) ||
                  (order.status === 'entregado' && index <= 3) ||
                  (order.status === step.key);
                
                const isCurrent = order.status === step.key;
                
                return (
                  <div key={step.key} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-orange-600 text-white' 
                        : isCurrent 
                        ? 'bg-orange-100 text-orange-600 border-2 border-orange-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <step.icon className="text-sm" />
                    </div>
                    <div>
                      <p className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-orange-600">En progreso...</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos del Pedido</h2>
            
            <div className="space-y-4">
              {order.order_items && order.order_items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🌶️</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.product_name || `Producto ${item.product_id?.slice(0, 8)}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Bs. {item.price?.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">x{item.quantity}</p>
                    <p className="text-sm text-gray-500">
                      Bs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Bs. {order.total_amount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío</span>
                  <span className="text-green-600 font-medium">GRATIS</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>Bs. {order.total_amount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          {order.notes && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiMessageCircle className="mr-2" />
                Notas del Pedido
              </h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Customer Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiUser className="mr-2" />
              Información del Cliente
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{order.customer_name || 'No especificado'}</p>
              </div>
              {order.customer_phone && (
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium flex items-center">
                    <FiPhone className="mr-2 text-sm" />
                    {order.customer_phone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Info */}
          {order.delivery_address && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiMapPin className="mr-2" />
                Dirección de Entrega
              </h3>
              <p className="text-gray-700">{order.delivery_address}</p>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiCreditCard className="mr-2" />
              Información de Pago
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Método de pago</span>
                <span className="font-medium capitalize">
                  {order.payment_method || 'Efectivo'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estado</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold text-orange-900 mb-2">¿Necesitas ayuda?</h3>
            <p className="text-sm text-orange-800 mb-4">
              Contáctanos si tienes alguna pregunta sobre tu pedido
            </p>
            <div className="space-y-2">
              <a 
                href="https://wa.me/59170123456" 
                className="flex items-center text-sm text-orange-700 hover:text-orange-900"
              >
                <FiPhone className="mr-2" />
                WhatsApp: +591 70123456
              </a>
              <a 
                href="tel:+59122345678" 
                className="flex items-center text-sm text-orange-700 hover:text-orange-900"
              >
                <FiPhone className="mr-2" />
                Teléfono: +591 2 234 5678
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Cancelar este pedido?
            </h3>
            <p className="text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de que quieres cancelar el pedido #{order.id.slice(0, 8)}?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelOrder}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sí, cancelar
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                No, mantener
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;