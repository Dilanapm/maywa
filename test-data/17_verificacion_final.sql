-- Verificación final después de corregir las políticas RLS

-- 1. Verificar políticas actuales
SELECT 
  'POLÍTICAS ACTUALES' as verificacion,
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('recipe_reviews', 'profiles')
  AND cmd = 'SELECT'
ORDER BY tablename, policyname;

-- 2. Probar la consulta de React para receta 1 (como usuario anónimo)
SELECT 
  'RESULTADOS RECETA 1' as test,
  COUNT(*) as total_reviews
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1;

-- 3. Probar datos completos de receta 1
SELECT 
  rr.id,
  rr.usefulness_rating,
  rr.comment,
  rr.created_at,
  p.full_name,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC
LIMIT 3;

-- 4. Probar estadísticas
SELECT 
  'ESTADÍSTICAS RECETA 1' as test,
  COUNT(*) as total_reviews,
  AVG(usefulness_rating) as avg_rating,
  COUNT(CASE WHEN usefulness_rating = 3 THEN 1 END) as excellent,
  COUNT(CASE WHEN usefulness_rating = 2 THEN 1 END) as good,
  COUNT(CASE WHEN usefulness_rating = 1 THEN 1 END) as regular
FROM public.recipe_reviews 
WHERE recipe_id = 1;