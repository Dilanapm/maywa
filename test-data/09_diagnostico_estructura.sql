-- Script de diagnóstico para verificar la estructura de comentarios y usuarios

-- 1. Verificar si las tablas existen
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('recipes', 'recipe_reviews', 'profiles')
ORDER BY table_name;

-- 2. Verificar estructura de la tabla recipes
SELECT 
  'recipes' as tabla,
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'recipes'
ORDER BY ordinal_position;

-- 3. Verificar estructura de la tabla recipe_reviews
SELECT 
  'recipe_reviews' as tabla,
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'recipe_reviews'
ORDER BY ordinal_position;

-- 4. Verificar estructura de la tabla profiles
SELECT 
  'profiles' as tabla,
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;