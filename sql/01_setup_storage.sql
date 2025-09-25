-- Configurar Storage para imágenes de productos en Supabase
-- Ejecutar en Supabase SQL Editor

-- 1. Crear bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Crear política para permitir lectura pública de imágenes
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

-- 3. Crear política para permitir subir imágenes (solo usuarios autenticados)
CREATE POLICY "Authenticated users can upload images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- 4. Crear política para actualizar imágenes (solo usuarios autenticados)
CREATE POLICY "Authenticated users can update images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- 5. Crear política para eliminar imágenes (solo usuarios autenticados)
CREATE POLICY "Authenticated users can delete images" ON storage.objects 
FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');