-- Asignar imágenes a productos específicos usando los IDs exactos
-- Ejecutar en Supabase SQL Editor

-- Base URL de Supabase Storage
-- https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/

-- Primero, verificar productos actuales
SELECT id, name, category, size FROM public.products ORDER BY id;

-- 1. Majoyaba (ID: 1) - 100g
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba.png',
  image_alt = 'Salsa Majoyaba - Salsa crocante de haba con ají suave',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba2.jpg"]'::jsonb
WHERE id = 1;

-- 2. Picantay (ID: 2) - 100g
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay.png',
  image_alt = 'Salsa Picantay - Salsa picante de locoto con haba molida',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay2.jpg"]'::jsonb
WHERE id = 2;

-- 3. Jino Andino (ID: 3) - 100g
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino-andino.png',
  image_alt = 'Salsa Jino Andino - Salsa de quinua picante con un toque de miel',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino2.jpg"]'::jsonb
WHERE id = 3;

-- 4. Combo MAYWA (ID: 4) - Las 3 salsas
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywacombo.png',
  image_alt = 'Combo MAYWA - Pack promocional con las 3 salsas estrella',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywa-hero.png"]'::jsonb
WHERE id = 4;

-- 5. Majoyaba 50g (ID: 5)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg',
  image_alt = 'Majoyaba 50g - Presentación práctica individual',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba.png"]'::jsonb
WHERE id = 5;

-- 6. Picantay 50g (ID: 6)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg',
  image_alt = 'Picantay 50g - Presentación práctica individual',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay.png"]'::jsonb
WHERE id = 6;

-- 7. Jino Andino 50g (ID: 7)
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg',
  image_alt = 'Jino Andino 50g - Presentación práctica individual',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino-andino.png"]'::jsonb
WHERE id = 7;

-- 8. Pack Restaurante (ID: 8) - 12 unidades
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywa_presentacion.jpg',
  image_alt = 'Pack Restaurante - Pack especial para restaurantes con 12 salsas surtidas',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywacombo.png", "https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywa-hero.png"]'::jsonb
WHERE id = 8;

-- 9. Pack Eventos (ID: 9) - 24 unidades
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywa_presentacion.jpg',
  image_alt = 'Pack Eventos - Pack para eventos con 24 salsas individuales',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg", "https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywacombo.png"]'::jsonb
WHERE id = 9;

-- Verificar las actualizaciones
SELECT 
  id,
  name,
  category,
  size,
  image_url,
  image_alt,
  gallery_images
FROM public.products 
ORDER BY id;

-- Contar productos con y sin imágenes
SELECT 
  CASE 
    WHEN image_url IS NOT NULL THEN 'CON IMAGEN'
    ELSE 'SIN IMAGEN'
  END as status,
  COUNT(*) as cantidad
FROM public.products 
GROUP BY (image_url IS NOT NULL)
ORDER BY status;