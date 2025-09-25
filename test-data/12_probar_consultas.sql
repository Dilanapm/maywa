-- Script para probar consultas como las que usa la aplicación React

-- 1. Simular la consulta principal que usa recipeReviews.js para obtener reseñas
SELECT 
  rr.id,
  rr.recipe_id,
  rr.rating,
  rr.comment,
  rr.created_at,
  p.full_name,
  p.email,
  p.business_type
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1  -- Probamos con la receta ID 1
ORDER BY rr.created_at DESC;

-- 2. Probar estadísticas de reseñas para una receta
SELECT 
  r.id as recipe_id,
  r.title as recipe_name,
  COUNT(rr.id) as total_reviews,
  ROUND(AVG(rr.rating::numeric), 2) as average_rating,
  COUNT(CASE WHEN rr.rating = 3 THEN 1 END) as excellent_count,
  COUNT(CASE WHEN rr.rating = 2 THEN 1 END) as good_count,
  COUNT(CASE WHEN rr.rating = 1 THEN 1 END) as regular_count
FROM public.recipes r
LEFT JOIN public.recipe_reviews rr ON r.id = rr.recipe_id
WHERE r.id = 1  -- Probamos con la receta ID 1
GROUP BY r.id, r.title;

-- 3. Verificar si algún user_id en recipe_reviews no existe en profiles
SELECT 
  rr.user_id,
  rr.recipe_id,
  rr.comment,
  CASE 
    WHEN p.id IS NULL THEN 'Usuario no encontrado en profiles'
    ELSE 'Usuario encontrado'
  END as estado_usuario
FROM public.recipe_reviews rr
LEFT JOIN public.profiles p ON rr.user_id = p.id
ORDER BY rr.created_at;

-- 4. Verificar si algún recipe_id en recipe_reviews no existe en recipes
SELECT 
  rr.recipe_id,
  COUNT(*) as comentarios_huerfanos,
  CASE 
    WHEN r.id IS NULL THEN 'Receta no encontrada'
    ELSE 'Receta encontrada'
  END as estado_receta
FROM public.recipe_reviews rr
LEFT JOIN public.recipes r ON rr.recipe_id = r.id
GROUP BY rr.recipe_id, r.id
ORDER BY rr.recipe_id;