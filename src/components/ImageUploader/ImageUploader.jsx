import { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTrash, FaSpinner } from 'react-icons/fa';
import { imageUtils } from '../../utils/imageUtils';

const ImageUploader = ({ 
  onImageUploaded, 
  currentImageUrl = null, 
  maxFiles = 1,
  folder = 'products',
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState(currentImageUrl ? [currentImageUrl] : []);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    // Validar número de archivos
    if (files.length > maxFiles) {
      setError(`Máximo ${maxFiles} archivo(s) permitido(s)`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Validar archivo
        const { valid, error: validationError } = await imageUtils.validateAndOptimize(file);
        
        if (!valid) {
          throw new Error(validationError);
        }

        // Crear preview local
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrls(prev => [...prev, previewUrl]);

        // Subir archivo
        const { url, error: uploadError } = await imageUtils.uploadImage(file, folder);
        
        if (uploadError) {
          throw new Error(uploadError);
        }

        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Notificar al componente padre
      if (onImageUploaded) {
        if (maxFiles === 1) {
          onImageUploaded(uploadedUrls[0]);
        } else {
          onImageUploaded(uploadedUrls);
        }
      }

      // Actualizar previews con URLs reales
      setPreviewUrls(uploadedUrls);

    } catch (err) {
      setError(err.message);
      console.error('❌ Upload failed:', err);
    } finally {
      setUploading(false);
      // Limpiar input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);
    
    if (onImageUploaded) {
      if (maxFiles === 1) {
        onImageUploaded(null);
      } else {
        onImageUploaded(newPreviews);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Input oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={maxFiles > 1}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Área de upload */}
      <div className="space-y-4">
        {/* Botón de upload */}
        <button
          type="button"
          onClick={triggerFileInput}
          disabled={uploading || previewUrls.length >= maxFiles}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <FaSpinner className="text-3xl text-orange-500 animate-spin" />
            ) : (
              <FaUpload className="text-3xl text-gray-400" />
            )}
            <div>
              <p className="text-lg font-medium text-gray-700">
                {uploading ? 'Subiendo...' : 'Subir imagen'}
              </p>
              <p className="text-sm text-gray-500">
                {maxFiles === 1 ? 'Selecciona una imagen' : `Selecciona hasta ${maxFiles} imágenes`}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPEG, PNG, WebP - Máx. 5MB
              </p>
            </div>
          </div>
        </button>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Previews */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay con botón eliminar */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info de archivos subidos */}
        {previewUrls.length > 0 && (
          <div className="text-sm text-gray-600 text-center">
            {previewUrls.length} de {maxFiles} imagen{maxFiles > 1 ? 'es' : ''} subida{previewUrls.length > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;