import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones de autenticación
export const auth = {
  async signUpClient(email, password, fullName, phone, businessType = 'particular') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          business_type: businessType,
          role: 'cliente'
        }
      }
    })
    return { data, error }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Funciones de productos
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .order('category', { ascending: true })
  return data
}

// Funciones de pedidos
export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          description
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data
}

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles!orders_user_id_fkey (
        full_name,
        business_type
      ),
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name
        )
      )
    `)
    .order('created_at', { ascending: false })
  return data
}

export const createOrder = async (orderData) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.user_id,
      total_amount: orderData.total_amount,
      status: orderData.status
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Insertar items del pedido
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw itemsError

  return order
}

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Funciones de usuarios
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  return data
}

// Funciones de gestión de productos (admin)
export const addProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      stock_quantity: parseInt(productData.stock_quantity),
      category: productData.category,
      available: true
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateProduct = async (productId, productData) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: productData.name,
      description: productData.description,
      price: parseFloat(productData.price),
      stock_quantity: parseInt(productData.stock_quantity),
      category: productData.category
    })
    .eq('id', productId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
  
  if (error) throw error
}

// Función para obtener perfil de usuario
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

// Objeto profiles para compatibilidad
export const profiles = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  }
}