// 📸 CONFIGURACIÓN DE SUPABASE STORAGE PARA IMÁGENES
import { supabase } from './supabase.js'

export const storage = {
  // Subir imagen de producto
  async uploadProductImage(file, productId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `product_${productId}_${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { data, error } = await supabase.storage
      .from('maywa-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) return { data: null, error }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('maywa-images')
      .getPublicUrl(filePath)

    return { data: { ...data, publicUrl }, error: null }
  },

  // Obtener URL pública de imagen
  getPublicUrl(filePath) {
    const { data } = supabase.storage
      .from('maywa-images')
      .getPublicUrl(filePath)
    return data.publicUrl
  },

  // Eliminar imagen
  async deleteImage(filePath) {
    const { data, error } = await supabase.storage
      .from('maywa-images')
      .remove([filePath])
    return { data, error }
  },

  // Listar todas las imágenes
  async listImages(folder = 'products') {
    const { data, error } = await supabase.storage
      .from('maywa-images')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })
    return { data, error }
  },

  // Actualizar imagen de producto
  async updateProductImage(file, oldFilePath, productId) {
    // Eliminar imagen anterior
    if (oldFilePath) {
      await this.deleteImage(oldFilePath)
    }
    
    // Subir nueva imagen
    return await this.uploadProductImage(file, productId)
  }
}

// URLs de imágenes temporales (mientras migras a Storage)
export const temporaryImageUrls = {
  majoyaba: '/src/assets/majoyaba2.jpg',
  picantay: '/src/assets/picantay2.jpg',
  jinoAndino: '/src/assets/jino2.jpg',
  combo: '/src/assets/maywacombo.png',
  sachets: '/src/assets/sachets.jpg'
}

// Función para migrar imágenes locales a Supabase Storage
export const migrateImagesToStorage = async () => {
  console.log('🚀 Iniciando migración de imágenes a Supabase Storage...')
  
  // Esta función la ejecutarías una vez para migrar
  // las imágenes de assets/ a Supabase Storage
}