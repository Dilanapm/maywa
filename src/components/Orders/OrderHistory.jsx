import React, { useState, useEffect } from 'react';
import { FiClock, FiPackage, FiTruck, FiCheck, FiX, FiEye } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { getUserOrders } from '../../config/supabase';
import OrderDetails from './OrderDetails';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pendiente, procesando, enviado, entregado, cancelado

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await getUserOrders(user.id);
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const iconClass = "text-lg";
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
        return 'Pendiente';
      case 'procesando':
        return 'Procesando';
      case 'enviado':
        return 'En camino';
      case 'entregado':
        return 'Entregado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedOrder) {
    return (
      <OrderDetails 
        order={selectedOrder} 
        onBack={() => setSelectedOrder(null)}
        onOrderUpdate={loadOrders}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600">Historial completo de tus pedidos en MAYWA</p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Todos', count: orders.length },
            { key: 'pendiente', label: 'Pendientes', count: orders.filter(o => o.status === 'pendiente').length },
            { key: 'procesando', label: 'Procesando', count: orders.filter(o => o.status === 'procesando').length },
            { key: 'enviado', label: 'En camino', count: orders.filter(o => o.status === 'enviado').length },
            { key: 'entregado', label: 'Entregados', count: orders.filter(o => o.status === 'entregado').length },
            { key: 'cancelado', label: 'Cancelados', count: orders.filter(o => o.status === 'cancelado').length }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'all' ? 'No tienes pedidos aún' : `No tienes pedidos ${getStatusText(filter).toLowerCase()}`}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Cuando realices tu primer pedido aparecerá aquí'
              : `Los pedidos ${getStatusText(filter).toLowerCase()} aparecerán aquí`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Pedido #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <FiEye className="text-sm" />
                    <span>Ver detalles</span>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total del pedido</p>
                  <p className="font-bold text-lg text-gray-900">
                    Bs. {order.total_amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Método de pago</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {order.payment_method || 'Efectivo'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entrega</p>
                  <p className="font-medium text-gray-900">
                    {order.delivery_address ? 'A domicilio' : 'Recoger en tienda'}
                  </p>
                </div>
              </div>

              {/* Order Items Preview */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-2">Productos ({order.order_items.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {order.order_items.slice(0, 3).map((item, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        {item.quantity}x {item.product_name || `Producto ${item.product_id.slice(0, 8)}`}
                      </span>
                    ))}
                    {order.order_items.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                        +{order.order_items.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {order.delivery_address && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-500">Dirección de entrega</p>
                  <p className="text-sm text-gray-900">{order.delivery_address}</p>
                </div>
              )}

              {/* Notes */}
              {order.notes && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-gray-500">Notas</p>
                  <p className="text-sm text-gray-900">{order.notes}</p>
                </div>
              )}

              {/* Status Progress (for active orders) */}
              {!['entregado', 'cancelado'].includes(order.status) && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className={`flex items-center space-x-1 ${order.status === 'pendiente' ? 'text-orange-600' : 'text-green-600'}`}>
                      <FiCheck className="text-xs" />
                      <span>Pedido recibido</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${['procesando', 'enviado', 'entregado'].includes(order.status) ? 'text-orange-600' : 'text-gray-400'}`}>
                      <FiPackage className="text-xs" />
                      <span>Procesando</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${['enviado', 'entregado'].includes(order.status) ? 'text-orange-600' : 'text-gray-400'}`}>
                      <FiTruck className="text-xs" />
                      <span>En camino</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${order.status === 'entregado' ? 'text-green-600' : 'text-gray-400'}`}>
                      <FiCheck className="text-xs" />
                      <span>Entregado</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (if needed for pagination) */}
      {filteredOrders.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Mostrando {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;