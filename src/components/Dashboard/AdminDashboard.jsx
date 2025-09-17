import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  getProducts, 
  getAllOrders, 
  getAllUsers, 
  updateOrderStatus,
  addProduct,
  updateProduct,
  deleteProduct
} from '../../config/supabase'

const AdminDashboard = () => {
  const { user, userProfile, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  })

  // Form states
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: ''
  })

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      const [productsData, ordersData, usersData] = await Promise.all([
        getProducts(),
        getAllOrders(),
        getAllUsers()
      ])
      
      setProducts(productsData || [])
      setOrders(ordersData || [])
      setUsers(usersData || [])
      
      // Calculate stats
      const totalRevenue = ordersData?.reduce((sum, order) => sum + order.total_amount, 0) || 0
      setStats({
        totalProducts: productsData?.length || 0,
        totalOrders: ordersData?.length || 0,
        totalUsers: usersData?.length || 0,
        totalRevenue
      })
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      loadAdminData()
      alert('Estado del pedido actualizado')
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error al actualizar el estado del pedido')
    }
  }

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productForm)
      } else {
        await addProduct(productForm)
      }
      
      setShowProductForm(false)
      setEditingProduct(null)
      setProductForm({ name: '', description: '', price: '', stock_quantity: '', category: '' })
      loadAdminData()
      alert(editingProduct ? 'Producto actualizado' : 'Producto agregado')
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error al guardar el producto')
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock_quantity: product.stock_quantity.toString(),
      category: product.category || ''
    })
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId)
        loadAdminData()
        alert('Producto eliminado')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error al eliminar el producto')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administrador 🔐
              </h1>
              <p className="text-gray-600">Gestiona MAYWA desde aquí</p>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Resumen' },
              { id: 'products', name: 'Productos' },
              { id: 'orders', name: 'Pedidos' },
              { id: 'users', name: 'Usuarios' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Productos</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Pedidos</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Usuarios</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Ingresos Totales</h3>
              <p className="text-3xl font-bold text-orange-600">Bs. {stats.totalRevenue}</p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Gestión de Productos</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                + Agregar Producto
              </button>
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Precio: Bs. {product.price}</span>
                          <span className="text-sm text-gray-500">Stock: {product.stock_quantity}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestión de Pedidos</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <li key={order.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          Pedido #{order.id.slice(0, 8)}
                        </h3>
                        <p className="text-gray-600">
                          Cliente: {order.profiles?.full_name || 'Usuario desconocido'}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Total: Bs. {order.total_amount}</span>
                          <span className="text-sm text-gray-500">
                            Fecha: {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="procesando">Procesando</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestión de Usuarios</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {user.full_name || 'Sin nombre'}
                        </h3>
                        <p className="text-gray-600">{user.id}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Tipo: {user.business_type}</span>
                          <span className="text-sm text-gray-500">Teléfono: {user.phone || 'No especificado'}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.business_type === 'administrador' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.business_type}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
              </h3>
              <button
                onClick={() => {
                  setShowProductForm(false)
                  setEditingProduct(null)
                  setProductForm({ name: '', description: '', price: '', stock_quantity: '', category: '' })
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  rows="3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio (Bs.)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  required
                  value={productForm.stock_quantity}
                  onChange={(e) => setProductForm({...productForm, stock_quantity: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
                >
                  {editingProduct ? 'Actualizar' : 'Agregar'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProductForm(false)
                    setEditingProduct(null)
                    setProductForm({ name: '', description: '', price: '', stock_quantity: '', category: '' })
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard