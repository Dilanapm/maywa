-- Script para corregir la estructura de tablas según la API de React

-- 1. Agregar columnas faltantes a recipe_reviews
ALTER TABLE public.recipe_reviews 
ADD COLUMN IF NOT EXISTS usefulness_rating INTEGER;

ALTER TABLE public.recipe_reviews 
ADD COLUMN IF NOT EXISTS reason TEXT;

-- 2. Copiar datos de rating a usefulness_rating
UPDATE public.recipe_reviews 
SET usefulness_rating = rating 
WHERE usefulness_rating IS NULL;

-- 3. Agregar avatar_url a profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 4. Hacer que usefulness_rating sea NOT NULL y agregar constraint
ALTER TABLE public.recipe_reviews 
ALTER COLUMN usefulness_rating SET NOT NULL;

ALTER TABLE public.recipe_reviews 
ADD CONSTRAINT recipe_reviews_usefulness_rating_check 
CHECK (usefulness_rating >= 1 AND usefulness_rating <= 3);

-- 5. Verificar la estructura actualizada
SELECT 
  'recipe_reviews - AFTER CHANGES' as tabla,
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'recipe_reviews'
ORDER BY ordinal_position;

-- 6. Verificar perfiles actualizados
SELECT 
  'profiles - AFTER CHANGES' as tabla,
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;