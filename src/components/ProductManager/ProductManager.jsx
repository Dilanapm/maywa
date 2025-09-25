import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import ImageUploader from '../ImageUploader/ImageUploader';
import { FaSave, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: '',
    image_url: '',
    image_alt: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock_quantity: product.stock_quantity || '',
      category: product.category || '',
      image_url: product.image_url || '',
      image_alt: product.image_alt || ''
    });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      category: '',
      image_url: '',
      image_alt: ''
    });
  };

  const handleImageUploaded = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl,
      image_alt: prev.image_alt || `Imagen de ${prev.name}`
    }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category: formData.category,
        image_url: formData.image_url,
        image_alt: formData.image_alt,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', editingProduct);

      if (error) throw error;

      await loadProducts();
      handleCancel();
      alert('Producto actualizado exitosamente');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar producto: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestión de Productos MAYWA
        </h1>
        <p className="text-gray-600">
          Administra las imágenes y información de tus productos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Imagen del producto */}
            <div className="h-48 bg-gray-100 relative">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.image_alt || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🌶️</div>
                    <p className="text-sm">Sin imagen</p>
                  </div>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="p-4">
              {editingProduct === product.id ? (
                // Modo edición
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Nombre del producto"
                  />
                  
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                    placeholder="Descripción"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="px-3 py-2 border rounded-md"
                      placeholder="Precio"
                    />
                    <input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                      className="px-3 py-2 border rounded-md"
                      placeholder="Stock"
                    />
                  </div>

                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Categoría"
                  />

                  <input
                    type="text"
                    value={formData.image_alt}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_alt: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Texto alternativo para la imagen"
                  />

                  {/* Uploader de imagen */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagen del producto
                    </label>
                    <ImageUploader
                      onImageUploaded={handleImageUploaded}
                      currentImageUrl={formData.image_url}
                      maxFiles={1}
                      folder="products"
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2"
                    >
                      <FaSave />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                // Modo vista
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-orange-600">
                      Bs. {product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock_quantity}
                    </span>
                  </div>

                  {product.category && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-3">
                      {product.category}
                    </span>
                  )}

                  <button
                    onClick={() => handleEdit(product)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2"
                  >
                    <FaEdit />
                    <span>Editar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌶️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay productos registrados
          </h3>
          <p className="text-gray-500">
            Agrega productos desde el panel de administración
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManager;