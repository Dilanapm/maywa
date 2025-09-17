-- =================================
-- CONFIGURACIÓN DE STORAGE BUCKETS
-- =================================

-- Crear bucket para imágenes de MAYWA
INSERT INTO storage.buckets (id, name, public) VALUES ('maywa-images', 'maywa-images', true);

-- Política para permitir que todos vean las imágenes
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'maywa-images');

-- Política para que solo admins puedan subir imágenes
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'maywa-images' AND 
  auth.role() = 'authenticated' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- Política para que solo admins puedan actualizar imágenes
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'maywa-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- Política para que solo admins puedan eliminar imágenes
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE USING (
  bucket_id = 'maywa-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- =================================
-- SCRIPT SQL PARA MAYWA SALSAS
-- Sistema de pedidos de salsas bolivianas
-- =================================

-- 1. Tabla de perfiles (complementa auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'cliente' CHECK (role IN ('cliente', 'administrador')),
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'La Paz',
  business_type TEXT CHECK (business_type IN ('particular', 'restaurante', 'tienda', 'eventos')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 2. Tabla de productos (salsas MAYWA)
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL CHECK (category IN ('individual', 'combo', 'promocional', 'eventos')),
  size TEXT CHECK (size IN ('50g', '100g', '200g', 'combo_3', 'personalizado')),
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  min_order_quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de pedidos
CREATE TABLE public.orders (
  id SERIAL PRIMARY KEY,
  client_id UUID REFERENCES auth.users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado')),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  delivery_address TEXT NOT NULL,
  delivery_city TEXT DEFAULT 'La Paz',
  delivery_phone TEXT NOT NULL,
  delivery_date DATE,
  delivery_time_slot TEXT CHECK (delivery_time_slot IN ('mañana_8_12', 'tarde_14_18', 'noche_19_21')),
  special_instructions TEXT,
  payment_method TEXT DEFAULT 'contra_entrega' CHECK (payment_method IN ('contra_entrega', 'transferencia', 'qr')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de detalles de pedido
CREATE TABLE public.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES public.products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de contactos/consultas
CREATE TABLE public.inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_type TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'en_proceso', 'respondido', 'cerrado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================
-- HABILITAR ROW LEVEL SECURITY
-- =================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- =================================
-- POLÍTICAS DE SEGURIDAD
-- =================================

-- Políticas para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para products
CREATE POLICY "Everyone can view products" ON public.products
FOR SELECT USING (available = true);

CREATE POLICY "Only admins can modify products" ON public.products
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- Políticas para orders
CREATE POLICY "Clients can view own orders" ON public.orders
FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can create orders" ON public.orders
FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Admins can view all orders" ON public.orders
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

CREATE POLICY "Admins can update all orders" ON public.orders
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- Políticas para order_items
CREATE POLICY "Users can view own order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND client_id = auth.uid()
  )
);

CREATE POLICY "Users can insert own order items" ON public.order_items
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE id = order_id AND client_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all order items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- Políticas para inquiries
CREATE POLICY "Everyone can create inquiries" ON public.inquiries
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries" ON public.inquiries
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

CREATE POLICY "Admins can update inquiries" ON public.inquiries
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- =================================
-- FUNCIÓN PARA CREAR PERFIL AUTOMÁTICAMENTE
-- =================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, phone, business_type)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'cliente'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'business_type'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =================================
-- FUNCIÓN PARA GENERAR NÚMERO DE PEDIDO
-- =================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  prefix TEXT := 'MAYWA';
  year_suffix TEXT := TO_CHAR(NOW(), 'YY');
  sequence_num TEXT;
  order_count INTEGER;
BEGIN
  -- Contar pedidos del año actual
  SELECT COUNT(*) INTO order_count 
  FROM public.orders 
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  -- Generar número secuencial con padding
  sequence_num := LPAD((order_count + 1)::TEXT, 4, '0');
  
  RETURN prefix || year_suffix || sequence_num;
END;
$$ LANGUAGE plpgsql;

-- =================================
-- DATOS DE PRODUCTOS MAYWA
-- =================================

INSERT INTO public.products (name, description, price, category, size, stock_quantity, min_order_quantity, available) VALUES
-- Salsas Individuales
('Majoyaba', 'Salsa crocante de haba con ají suave, perfecta para acompañar empanadas y snacks', 16.77, 'individual', '100g', 100, 1, true),
('Picantay', 'Salsa picante de locoto con haba molida, ideal para los amantes del picante intenso', 16.77, 'individual', '100g', 100, 1, true),
('Jino Andino', 'Salsa de quinua picante con un toque de miel, combinación única de sabores andinos', 16.77, 'individual', '100g', 100, 1, true),

-- Combos
('Combo MAYWA', 'Las 3 salsas estrella en un solo pack promocional - Majoyaba, Picantay y Jino Andino', 45.00, 'combo', 'combo_3', 50, 1, true),

-- Presentación individual pequeña
('Majoyaba 50g', 'Presentación práctica de 50g para acompañar tus snacks o comidas', 3.35, 'individual', '50g', 200, 5, true),
('Picantay 50g', 'Presentación práctica de 50g para acompañar tus snacks o comidas', 3.35, 'individual', '50g', 200, 5, true),
('Jino Andino 50g', 'Presentación práctica de 50g para acompañar tus snacks o comidas', 3.35, 'individual', '50g', 200, 5, true),

-- Para eventos y restaurantes
('Pack Restaurante (12 unidades)', 'Pack especial para restaurantes con 12 salsas surtidas', 180.00, 'eventos', 'personalizado', 20, 1, true),
('Pack Eventos (24 unidades)', 'Pack para eventos con 24 salsas individuales de 50g surtidas', 75.00, 'eventos', 'personalizado', 15, 1, true);

-- =================================
-- FUNCIÓN PARA ACTUALIZAR TOTALES DE PEDIDO
-- =================================

CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
DECLARE
  new_total DECIMAL(10,2);
BEGIN
  -- Calcular nuevo total
  SELECT COALESCE(SUM(subtotal), 0)
  INTO new_total
  FROM public.order_items
  WHERE order_id = COALESCE(NEW.order_id, OLD.order_id);
  
  -- Actualizar el total del pedido
  UPDATE public.orders
  SET total_amount = new_total,
      updated_at = NOW()
  WHERE id = COALESCE(NEW.order_id, OLD.order_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar totales automáticamente
CREATE TRIGGER update_order_total_on_insert
  AFTER INSERT ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();

CREATE TRIGGER update_order_total_on_update
  AFTER UPDATE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();

CREATE TRIGGER update_order_total_on_delete
  AFTER DELETE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();