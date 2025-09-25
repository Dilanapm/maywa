-- Script para verificar datos existentes y relaciones

-- 1. Contar registros en cada tabla
SELECT 
  'recipes' as tabla,
  COUNT(*) as total_registros
FROM public.recipes
UNION ALL
SELECT 
  'recipe_reviews' as tabla,
  COUNT(*) as total_registros
FROM public.recipe_reviews
UNION ALL
SELECT 
  'profiles' as tabla,
  COUNT(*) as total_registros
FROM public.profiles;

-- 2. Ver todas las recetas existentes
SELECT 
  id,
  title,
  description,
  difficulty,
  time_minutes,
  servings,
  created_at
FROM public.recipes
ORDER BY id;

-- 3. Ver todos los usuarios/profiles existentes
SELECT 
  id,
  full_name,
  email,
  role,
  business_type,
  created_at
FROM public.profiles
ORDER BY created_at;

-- 4. Ver todos los comentarios existentes con información del usuario
SELECT 
  rr.id,
  rr.recipe_id,
  rr.rating,
  rr.comment,
  rr.created_at,
  p.full_name,
  p.email,
  r.title as recipe_title
FROM public.recipe_reviews rr
LEFT JOIN public.profiles p ON rr.user_id = p.id
LEFT JOIN public.recipes r ON rr.recipe_id = r.id
ORDER BY rr.created_at DESC;