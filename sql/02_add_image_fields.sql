-- Agregar campos de imagen a la tabla products
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar columnas de imagen a la tabla products (si no existen)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS image_alt TEXT,
ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;

-- 2. Comentar las columnas
COMMENT ON COLUMN public.products.image_url IS 'URL de la imagen principal del producto desde Supabase Storage';
COMMENT ON COLUMN public.products.image_alt IS 'Texto alternativo para la imagen (SEO y accesibilidad)';
COMMENT ON COLUMN public.products.gallery_images IS 'Array de URLs de imágenes adicionales para galería';

-- 3. Crear índice para búsquedas por imagen
CREATE INDEX IF NOT EXISTS idx_products_image_url ON public.products(image_url);

-- 4. Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND table_schema = 'public'
ORDER BY ordinal_position;