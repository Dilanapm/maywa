import { supabase } from '../config/supabase';

/**
 * Utilidades para manejar imágenes en Supabase Storage
 */

export const imageUtils = {
  /**
   * Subir una imagen al storage de Supabase
   * @param {File} file - Archivo de imagen
   * @param {string} folder - Carpeta donde guardar (ej: 'products', 'recipes')
   * @param {string} fileName - Nombre personalizado del archivo (opcional)
   * @returns {Promise<{url: string, error: null} | {url: null, error: string}>}
   */
  async uploadImage(file, folder = 'products', fileName = null) {
    try {
      // Validar archivo
      if (!file) {
        return { url: null, error: 'No se proporcionó archivo' };
      }

      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return { url: null, error: 'Tipo de archivo no válido. Use JPEG, PNG o WebP' };
      }

      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { url: null, error: 'El archivo es muy grande. Máximo 5MB' };
      }

      // Generar nombre único si no se proporciona
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const finalFileName = fileName || `${folder}_${timestamp}.${extension}`;
      const filePath = `${folder}/${finalFileName}`;

      console.log('📤 Uploading image:', { filePath, size: file.size, type: file.type });

      // Subir archivo
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('❌ Upload error:', error);
        return { url: null, error: error.message };
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('✅ Image uploaded successfully:', publicUrl);

      return { url: publicUrl, error: null };

    } catch (err) {
      console.error('❌ Exception uploading image:', err);
      return { url: null, error: err.message };
    }
  },

  /**
   * Eliminar una imagen del storage
   * @param {string} filePath - Ruta del archivo en storage
   * @returns {Promise<{success: boolean, error: string|null}>}
   */
  async deleteImage(filePath) {
    try {
      const { error } = await supabase.storage
        .from('product-images')
        .remove([filePath]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Actualizar imagen de un producto
   * @param {number} productId - ID del producto
   * @param {File} file - Nueva imagen
   * @param {string} altText - Texto alternativo
   * @returns {Promise<{success: boolean, url: string|null, error: string|null}>}
   */
  async updateProductImage(productId, file, altText = '') {
    try {
      // Subir nueva imagen
      const { url, error: uploadError } = await this.uploadImage(
        file, 
        'products', 
        `product_${productId}_${Date.now()}`
      );

      if (uploadError) {
        return { success: false, url: null, error: uploadError };
      }

      // Actualizar base de datos
      const { error: dbError } = await supabase
        .from('products')
        .update({
          image_url: url,
          image_alt: altText || `Imagen de ${file.name}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);

      if (dbError) {
        return { success: false, url: null, error: dbError.message };
      }

      return { success: true, url, error: null };

    } catch (err) {
      return { success: false, url: null, error: err.message };
    }
  },

  /**
   * Agregar imágenes a la galería de un producto
   * @param {number} productId - ID del producto
   * @param {File[]} files - Array de archivos de imagen
   * @returns {Promise<{success: boolean, urls: string[], error: string|null}>}
   */
  async addGalleryImages(productId, files) {
    try {
      const uploadPromises = files.map((file, index) => 
        this.uploadImage(file, 'products', `product_${productId}_gallery_${index}_${Date.now()}`)
      );

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(r => !r.error);
      const urls = successfulUploads.map(r => r.url);

      if (urls.length === 0) {
        return { success: false, urls: [], error: 'No se pudo subir ninguna imagen' };
      }

      // Obtener imágenes actuales de la galería
      const { data: product } = await supabase
        .from('products')
        .select('gallery_images')
        .eq('id', productId)
        .single();

      const currentGallery = product?.gallery_images || [];
      const newGallery = [...currentGallery, ...urls];

      // Actualizar base de datos
      const { error: dbError } = await supabase
        .from('products')
        .update({
          gallery_images: newGallery,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);

      if (dbError) {
        return { success: false, urls: [], error: dbError.message };
      }

      return { success: true, urls, error: null };

    } catch (err) {
      return { success: false, urls: [], error: err.message };
    }
  },

  /**
   * Obtener URL completa de una imagen desde su path
   * @param {string} imagePath - Path de la imagen en storage
   * @returns {string} URL pública de la imagen
   */
  getPublicUrl(imagePath) {
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(imagePath);
    return publicUrl;
  },

  /**
   * Validar y optimizar archivo antes de subir
   * @param {File} file - Archivo a validar
   * @returns {Promise<{valid: boolean, error: string|null, file: File}>}
   */
  async validateAndOptimize(file) {
    try {
      // Validaciones básicas
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Tipo de archivo no válido', file: null };
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return { valid: false, error: 'Archivo muy grande (máx. 5MB)', file: null };
      }

      return { valid: true, error: null, file };

    } catch (err) {
      return { valid: false, error: err.message, file: null };
    }
  }
};

export default imageUtils;