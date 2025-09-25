-- Script alternativo: Actualizar productos con nombres exactos de imágenes
-- Usar este si el script anterior no funciona perfectamente

-- URL base
-- https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/

-- Imágenes disponibles:
-- jino-andino.png, jino2.jpg
-- majoyaba.png, majoyababapng, majoyaba2.jpg  
-- maywa-hero.png, maywacombo.png
-- picantay.png, picantay2.jpg
-- quinuaconmiel.png
-- sachets.jpg

-- 1. Actualizar por ID específico (ajustar los IDs según tu base de datos)
-- Primero ejecuta este query para ver los productos actuales:
SELECT id, name, category, size FROM public.products ORDER BY name;

-- Luego usa los IDs reales para actualizar:

-- Ejemplo: Si Jino Andino tiene ID 1
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino-andino.png',
  image_alt = 'Salsa Jino Andino - Picante artesanal boliviano',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/jino2.jpg"]'::jsonb,
  updated_at = NOW()
WHERE id = 1; -- Cambiar por el ID real

-- Ejemplo: Si Majoyaba tiene ID 2
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba.png',
  image_alt = 'Salsa Majoyaba - Dulce y picante estilo MAYWA',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/majoyaba2.jpg"]'::jsonb,
  updated_at = NOW()
WHERE id = 2; -- Cambiar por el ID real

-- Ejemplo: Si Picantay tiene ID 3
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay.png',
  image_alt = 'Salsa Picantay - Picante intenso boliviano',
  gallery_images = '["https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/picantay2.jpg"]'::jsonb,
  updated_at = NOW()
WHERE id = 3; -- Cambiar por el ID real

-- Ejemplo: Si Quinua con Miel tiene ID 4
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/quinuaconmiel.png',
  image_alt = 'Salsa Quinua con Miel - Dulce y nutritiva con quinua boliviana',
  updated_at = NOW()
WHERE id = 4; -- Cambiar por el ID real

-- Ejemplo: Para combo/pack
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/maywacombo.png',
  image_alt = 'MAYWA Combo - Pack de salsas variadas',
  updated_at = NOW()
WHERE id = 5; -- Cambiar por el ID real del combo

-- Ejemplo: Para presentación en sachets
UPDATE public.products 
SET 
  image_url = 'https://jezopelmbbreecbyqkwy.supabase.co/storage/v1/object/public/product-images/sachets.jpg',
  image_alt = 'MAYWA Sachets - Presentación individual en sobres',
  updated_at = NOW()
WHERE id = 6; -- Cambiar por el ID real de sachets

-- Verificar resultados
SELECT 
  id,
  name,
  category,
  CASE 
    WHEN image_url IS NOT NULL THEN '✅ CON IMAGEN'
    ELSE '❌ SIN IMAGEN'
  END as status,
  image_url
FROM public.products 
ORDER BY id;