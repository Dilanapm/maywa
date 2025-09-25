-- Script para forzar la actualización del cache de Supabase

-- 1. Consulta directa que simula exactamente lo que hace Supabase
SELECT 
  rr.*,
  p.full_name,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC;

-- 2. También probar con LEFT JOIN (como usa Supabase internamente)
SELECT 
  rr.*,
  p.full_name,
  p.role
FROM public.recipe_reviews rr
LEFT JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC;

-- 3. Verificar que todos los user_id existen en profiles
SELECT 
  'VERIFICACIÓN USER_ID' as test,
  rr.user_id,
  CASE 
    WHEN p.id IS NOT NULL THEN 'Usuario existe'
    ELSE 'Usuario NO existe'
  END as estado
FROM public.recipe_reviews rr
LEFT JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1;