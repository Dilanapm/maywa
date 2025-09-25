import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getProducts, getUserOrders, createOrder } from '../../config/supabase'
import Cart from '../Cart/Cart'
import Checkout from '../Cart/Checkout'
import OrderHistory from '../Orders/OrderHistory'
import MaywaButton from '../MaywaButton/MaywaButton'
import { FiShoppingCart, FiPackage, FiUser, FiClock } from 'react-icons/fi'

const ClientDashboard = () => {
  const { user, userProfile, signOut } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [activeView, setActiveView] = useState('products') // products, orders, profile

  useEffect(() => {
    loadDashboardData()
    loadCartFromStorage()
  }, [])

  useEffect(() => {
    saveCartToStorage()
  }, [cart])

  const loadDashboardData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        getProducts(),
        getUserOrders(user.id)
      ])
      
      setProducts(productsData || [])
      setOrders(ordersData || [])
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('maywa_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const saveCartToStorage = () => {
    localStorage.setItem('maywa_cart', JSON.stringify(cart))
  }

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    
    // Show success feedback
    const button = document.querySelector(`[data-product-id="${product.id}"]`)
    if (button) {
      const originalText = button.textContent
      button.textContent = '¡Agregado!'
      button.style.backgroundColor = '#22c55e'
      setTimeout(() => {
        button.textContent = originalText
        button.style.backgroundColor = ''
      }, 1000)
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const handleCheckout = (cartItems) => {
    setShowCart(false)
    setShowCheckout(true)
  }

  const handleOrderSuccess = async (newOrder) => {
    clearCart()
    setShowCheckout(false)
    await loadDashboardData() // Reload to show new order
    alert('¡Pedido realizado exitosamente! 🎉')
  }

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getRecentOrders = () => {
    return orders.slice(0, 3) // Show only 3 most recent
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu dashboard...</p>
        </div>
      </div>
    )
  }

  // Show Order History view
  if (showOrderHistory) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-6">
                {/* Logo MAYWA clickeable */}
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
                  title="Ir al inicio"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      MAYWA
                    </div>
                  </div>
                </button>
                
                <div className="border-l border-gray-300 pl-6">
                  <button
                    onClick={() => setShowOrderHistory(false)}
                    className="text-orange-600 hover:text-orange-800 font-medium"
                  >
                    ← Volver al Dashboard
                  </button>
                </div>
              </div>
              <button
                onClick={signOut}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        <OrderHistory />
      </div>
    )
  }

  // Show Checkout view
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Checkout
          cartItems={cart}
          onBack={() => {
            setShowCheckout(false)
            setShowCart(true)
          }}
          onOrderSuccess={handleOrderSuccess}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo y saludo */}
            <div className="flex items-center space-x-6">
              {/* Logo MAYWA clickeable */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
                title="Ir al inicio"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                    MAYWA
                  </div>
                  <div className="text-xs text-gray-500 -mt-1">
                    Salsas Artesanales
                  </div>
                </div>
              </button>
              
              {/* Saludo del usuario */}
              <div className="border-l border-gray-300 pl-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  ¡Hola, {userProfile?.full_name || 'Cliente'}! 🌶️
                </h1>
                <p className="text-gray-600">Bienvenido a tu dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <FiShoppingCart />
                <span>Carrito</span>
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>
              <button
                onClick={signOut}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-[88px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'products', name: 'Productos', icon: FiShoppingCart },
              { id: 'orders', name: 'Mis Pedidos', icon: FiPackage },
              { id: 'profile', name: 'Mi Perfil', icon: FiUser }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeView === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.name}</span>
                {tab.id === 'orders' && orders.length > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                    {orders.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Products View */}
        {activeView === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Productos Disponibles ({products.length})
                </h2>
                <div className="text-sm text-gray-500">
                  {getTotalCartItems() > 0 && (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                      {getTotalCartItems()} en carrito
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    {/* Product Image */}
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.image_alt || product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center ${product.image_url ? 'hidden' : 'flex'}`}>
                        <span className="text-6xl">🌶️</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="text-xl font-bold text-orange-600 ml-2">
                          Bs. {product.price}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            product.stock_quantity > 10 
                              ? 'bg-green-100 text-green-800' 
                              : product.stock_quantity > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            Stock: {product.stock_quantity}
                          </span>
                          {product.category && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {product.category}
                            </span>
                          )}
                          {product.size && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              {product.size}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Gallery Images Preview */}
                      {product.gallery_images && product.gallery_images.length > 0 && (
                        <div className="flex space-x-2 mb-4 overflow-x-auto">
                          {product.gallery_images.slice(0, 3).map((imageUrl, index) => (
                            <div key={index} className="w-12 h-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                              <img 
                                src={imageUrl} 
                                alt={`${product.name} - imagen ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                                onClick={() => {
                                  // Crear modal simple para ver imagen grande
                                  const modal = document.createElement('div')
                                  modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
                                  modal.innerHTML = `
                                    <div class="max-w-3xl max-h-3xl p-4 relative">
                                      <img src="${imageUrl}" alt="${product.name}" class="max-w-full max-h-full object-contain rounded-lg">
                                      <button class="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75" onclick="this.parentElement.parentElement.remove()">×</button>
                                    </div>
                                  `
                                  document.body.appendChild(modal)
                                  modal.onclick = (e) => e.target === modal && modal.remove()
                                }}
                              />
                            </div>
                          ))}
                          {product.gallery_images.length > 3 && (
                            <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-600">
                              +{product.gallery_images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <MaywaButton
                        onClick={() => addToCart(product)}
                        disabled={product.stock_quantity === 0}
                        className="w-full"
                        data-product-id={product.id}
                      >
                        {product.stock_quantity === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                      </MaywaButton>
                    </div>
                  </div>
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌶️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay productos disponibles
                  </h3>
                  <p className="text-gray-500">
                    Pronto tendremos deliciosas salsas MAYWA para ti
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FiShoppingCart className="mr-2" />
                    Carrito ({getTotalCartItems()})
                  </h3>
                  <div className="space-y-3 mb-4">
                    {cart.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 text-sm">
                        <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt={item.image_alt || item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <span className="text-lg">🌶️</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium">{item.name}</p>
                          <p className="text-orange-600 font-medium">
                            {item.quantity}x Bs.{item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {cart.length > 3 && (
                      <p className="text-sm text-gray-500">+{cart.length - 3} más...</p>
                    )}
                  </div>
                  <div className="border-t pt-3 mb-4">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total:</span>
                      <span className="text-orange-600">
                        Bs. {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <MaywaButton onClick={() => setShowCart(true)} className="w-full">
                    Ver Carrito
                  </MaywaButton>
                </div>
              )}

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FiClock className="mr-2" />
                    Pedidos Recientes
                  </h3>
                  {orders.length > 0 && (
                    <button
                      onClick={() => setShowOrderHistory(true)}
                      className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                    >
                      Ver todos
                    </button>
                  )}
                </div>
                
                {getRecentOrders().length === 0 ? (
                  <p className="text-gray-500 text-sm">No tienes pedidos aún</p>
                ) : (
                  <div className="space-y-3">
                    {getRecentOrders().map((order) => (
                      <div key={order.id} className="border-l-4 border-orange-600 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-sm font-medium">
                              #{order.id.slice(0, 8)}
                            </span>
                            <p className="text-xs text-gray-500">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Bs. {order.total_amount}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'entregado' ? 'bg-green-100 text-green-800' :
                              order.status === 'enviado' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'procesando' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiUser className="mr-2" />
                  Mi Perfil
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nombre:</span> {userProfile?.full_name || 'No especificado'}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                  <p><span className="font-medium">Teléfono:</span> {userProfile?.phone || 'No especificado'}</p>
                  <p><span className="font-medium">Tipo:</span> {userProfile?.business_type}</p>
                </div>
                <button
                  onClick={() => setActiveView('profile')}
                  className="mt-4 text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Editar perfil →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeView === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Mis Pedidos</h2>
              <button
                onClick={() => setShowOrderHistory(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                Ver historial completo
              </button>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tienes pedidos aún
                </h3>
                <p className="text-gray-500 mb-6">
                  ¡Explora nuestros productos y haz tu primer pedido!
                </p>
                <MaywaButton onClick={() => setActiveView('products')}>
                  Ver Productos
                </MaywaButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.slice(0, 6).map((order) => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Pedido #{order.id.slice(0, 8)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'entregado' ? 'bg-green-100 text-green-800' :
                        order.status === 'enviado' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'procesando' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="font-medium">Bs. {order.total_amount}</span>
                      </div>
                      {order.delivery_address && (
                        <div className="text-sm text-gray-500 truncate">
                          📍 {order.delivery_address}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setShowOrderHistory(true)}
                      className="w-full text-orange-600 hover:text-orange-800 text-sm font-medium"
                    >
                      Ver detalles →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile View */}
        {activeView === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Mi Perfil</h2>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={userProfile?.full_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={userProfile?.phone || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de cuenta
                    </label>
                    <input
                      type="text"
                      value={userProfile?.business_type || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    value={userProfile?.address || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    rows="3"
                    disabled
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">📝 Edición de Perfil</h3>
                  <p className="text-sm text-blue-800">
                    Para actualizar tu información de perfil, contáctanos por WhatsApp o durante tu próximo pedido.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{orders.length}</div>
                    <div className="text-sm text-gray-500">Total Pedidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {orders.filter(o => o.status === 'entregado').length}
                    </div>
                    <div className="text-sm text-gray-500">Entregados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      Bs. {orders.reduce((total, order) => total + order.total_amount, 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Total Gastado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default ClientDashboard