-- Script para simular la consulta exacta de getRecipeReviews de React

-- 1. Consulta simulando el JOIN de Supabase para recipe_id = 1
SELECT 
  rr.id,
  rr.recipe_id,
  rr.user_id,
  rr.usefulness_rating,
  rr.comment,
  rr.reason,
  rr.created_at,
  rr.updated_at,
  p.full_name,
  p.avatar_url,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC;

-- 2. Consulta para recipe_id = 2
SELECT 
  rr.id,
  rr.recipe_id,
  rr.user_id,
  rr.usefulness_rating,
  rr.comment,
  rr.reason,
  rr.created_at,
  rr.updated_at,
  p.full_name,
  p.avatar_url,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 2
ORDER BY rr.created_at DESC;

-- 3. Consulta para recipe_id = 3
SELECT 
  rr.id,
  rr.recipe_id,
  rr.user_id,
  rr.usefulness_rating,
  rr.comment,
  rr.reason,
  rr.created_at,
  rr.updated_at,
  p.full_name,
  p.avatar_url,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 3
ORDER BY rr.created_at DESC;

-- 4. Verificar políticas RLS para usuarios anónimos
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('recipe_reviews', 'profiles')
  AND cmd = 'SELECT'
ORDER BY tablename, policyname;