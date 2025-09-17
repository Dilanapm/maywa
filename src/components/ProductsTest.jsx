import { useState, useEffect } from 'react'
import { products } from '../config/supabase'

const ProductsTest = () => {
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await products.getProducts()
      
      if (error) {
        setError(error.message)
      } else {
        setProductsData(data || [])
        setError(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-blue-100 border border-blue-500 p-4 rounded-lg">
        <p className="text-blue-700">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 p-4 rounded-lg shadow-lg max-w-sm">
      <h3 className="font-bold text-gray-800 mb-2">Prueba de Base de Datos</h3>
      
      {error ? (
        <div className="text-red-600">
          <p className="font-medium">❌ Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <div className="text-green-600">
          <p className="font-medium">✅ Base de datos funcionando</p>
          <p className="text-sm">Productos encontrados: {productsData.length}</p>
          
          {productsData.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              <p>Productos:</p>
              <ul className="list-disc list-inside">
                {productsData.slice(0, 3).map(product => (
                  <li key={product.id}>{product.name}</li>
                ))}
                {productsData.length > 3 && <li>...y {productsData.length - 3} más</li>}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <button 
        onClick={loadProducts}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
      >
        Probar nuevamente
      </button>
    </div>
  )
}

export default ProductsTest