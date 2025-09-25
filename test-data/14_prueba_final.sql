-- Script final para probar el sistema de comentarios con la estructura correcta

-- 1. Probar la consulta exacta que usa getRecipeReviews() en React
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
LEFT JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1  -- Probar con receta ID 1
ORDER BY rr.created_at DESC;

-- 2. Probar la consulta de estadísticas exacta que usa getRecipeStats()
SELECT 
  COUNT(*) as total_reviews,
  AVG(usefulness_rating) as average_rating,
  COUNT(CASE WHEN usefulness_rating = 1 THEN 1 END) as rating_1_count,
  COUNT(CASE WHEN usefulness_rating = 2 THEN 1 END) as rating_2_count,
  COUNT(CASE WHEN usefulness_rating = 3 THEN 1 END) as rating_3_count,
  ROUND((COUNT(CASE WHEN usefulness_rating >= 2 THEN 1 END) * 100.0) / COUNT(*)) as usefulness_percentage
FROM public.recipe_reviews 
WHERE recipe_id = 1;

-- 3. Verificar que todos los usuarios tienen perfiles
SELECT 
  'USUARIOS CON REVIEWS PERO SIN PERFIL' as verificacion,
  rr.user_id,
  COUNT(*) as reviews_huerfanas
FROM public.recipe_reviews rr
LEFT JOIN public.profiles p ON rr.user_id = p.id
WHERE p.id IS NULL
GROUP BY rr.user_id;

-- 4. Verificar estructura final de ambas tablas
SELECT 
  'ESTRUCTURA FINAL recipe_reviews' as info,
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'recipe_reviews'
ORDER BY ordinal_position;

-- 5. Contar total de datos
SELECT 
  'RESUMEN FINAL' as tipo,
  (SELECT COUNT(*) FROM public.recipes) as total_recetas,
  (SELECT COUNT(*) FROM public.recipe_reviews) as total_reviews,
  (SELECT COUNT(*) FROM public.profiles) as total_usuarios;