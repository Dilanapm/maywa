import { useState } from 'react'
import { storage } from '../config/storage'

const ImageUploader = ({ productId, currentImageUrl, onImageUploaded }) => {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = async (file) => {
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen')
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB')
      return
    }

    setUploading(true)

    try {
      const { data, error } = await storage.uploadProductImage(file, productId)
      
      if (error) {
        console.error('Error subiendo imagen:', error)
        alert('Error al subir la imagen')
        return
      }

      // Llamar callback con la nueva URL
      onImageUploaded(data.publicUrl, data.path)
      
    } catch (err) {
      console.error('Error:', err)
      alert('Error inesperado al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Imagen del Producto
      </label>
      
      {/* Preview de imagen actual */}
      {currentImageUrl && (
        <div className="mb-4">
          <img 
            src={currentImageUrl} 
            alt="Imagen actual"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <p className="text-xs text-gray-500 mt-1">Imagen actual</p>
        </div>
      )}

      {/* Zona de drag & drop */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${dragActive 
            ? 'border-orange-500 bg-orange-50' 
            : 'border-gray-300 hover:border-orange-400'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onClick={() => !uploading && document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-600">Subiendo imagen...</span>
          </div>
        ) : (
          <>
            <div className="text-gray-400 mb-2">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-gray-600">
              <span className="font-medium text-orange-600">Haz click para subir</span> o arrastra una imagen aquí
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF hasta 5MB
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageUploader