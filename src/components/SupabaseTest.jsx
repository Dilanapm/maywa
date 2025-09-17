import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Conectando...')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Probar conexión real consultando los productos
      const { data, error } = await supabase
        .from('products')
        .select('id')
        .limit(1)
      
      if (error) {
        setConnectionStatus(`❌ Error: ${error.message}`)
        setIsConnected(false)
      } else {
        setConnectionStatus('✅ Conexión exitosa con Supabase!')
        setIsConnected(true)
      }
    } catch (err) {
      setConnectionStatus(`❌ Error: ${err.message}`)
      setIsConnected(false)
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`p-4 rounded-lg shadow-lg ${
        isConnected 
          ? 'bg-green-100 border-green-500 text-green-700' 
          : 'bg-red-100 border-red-500 text-red-700'
      } border`}>
        <h3 className="font-bold mb-2">Estado de Supabase</h3>
        <p className="text-sm">{connectionStatus}</p>
        {isConnected && (
          <div className="mt-2 text-xs">
            <p>✓ URL configurada</p>
            <p>✓ API Key configurada</p>
            <p>✓ Cliente iniciado</p>
          </div>
        )}
        <button 
          onClick={testConnection}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Probar nuevamente
        </button>
      </div>
    </div>
  )
}

export default SupabaseTest