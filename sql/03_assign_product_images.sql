-- Actualizar productos existentes con las URLs de imágenes de Supabase Storage
-- Ejecutar en Supabase SQL Editor

-- Primero, verificar qué productos tenemos
SELECT id, name, category FROM public.products ORDER BY id;

-- Base URL de Supabase Storage
-- https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/

-- Actualizar productos con sus imágenes correspondientes
-- Nota: Ajustar los IDs según los productos reales en tu base de datos

-- 1. Jino Andino (picante clásico)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino-andino.png',
  image_alt = 'Salsa Jino Andino - Picante artesanal boliviano',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino2.jpg"]'::jsonb
WHERE name ILIKE '%jino%' OR name ILIKE '%andino%';

-- 2. Majoyaba (salsa dulce/agridulce)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba.png',
  image_alt = 'Salsa Majoyaba - Dulce y picante estilo MAYWA',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba2.jpg"]'::jsonb
WHERE name ILIKE '%majoyaba%';

-- 3. Picantay (salsa picante)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay.png',
  image_alt = 'Salsa Picantay - Picante intenso boliviano',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay2.jpg"]'::jsonb
WHERE name ILIKE '%picantay%';

-- 4. Quinua con Miel
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/quinuaconmiel.png',
  image_alt = 'Salsa Quinua con Miel - Dulce y nutritiva con quinua boliviana'
WHERE name ILIKE '%quinua%' AND name ILIKE '%miel%';

-- 5. MAYWA Hero/Principal
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywa-hero.png',
  image_alt = 'Salsa MAYWA Principal - Nuestra salsa insignia'
WHERE name ILIKE '%maywa%' AND (name ILIKE '%principal%' OR name ILIKE '%hero%' OR name ILIKE '%clasica%');

-- 6. MAYWA Combo/Pack
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywacombo.png',
  image_alt = 'MAYWA Combo - Pack de salsas variadas'
WHERE name ILIKE '%combo%' OR name ILIKE '%pack%' OR name ILIKE '%variado%';

-- 7. Sachets (presentación en sobre)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg',
  image_alt = 'MAYWA Sachets - Presentación individual en sobres'
WHERE name ILIKE '%sachet%' OR size ILIKE '%sobre%' OR size ILIKE '%individual%';

-- Verificar las actualizaciones
SELECT 
  id,
  name,
  category,
  image_url,
  image_alt,
  gallery_images
FROM public.products 
WHERE image_url IS NOT NULL
ORDER BY id;

-- Mostrar productos sin imagen asignada
SELECT 
  id,
  name,
  category,
  'SIN IMAGEN' as status
FROM public.products 
WHERE image_url IS NULL
ORDER BY id;