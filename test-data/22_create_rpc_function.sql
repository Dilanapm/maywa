-- Crear función RPC como respaldo para obtener reviews con perfiles

-- 1. Crear función que hace el JOIN manualmente
CREATE OR REPLACE FUNCTION get_recipe_reviews_with_profiles(recipe_id_param INTEGER)
RETURNS TABLE (
  id UUID,
  recipe_id INTEGER,
  user_id UUID,
  usefulness_rating INTEGER,
  comment TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  profiles JSONB
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rr.id,
    rr.recipe_id,
    rr.user_id,
    rr.usefulness_rating,
    rr.comment,
    rr.reason,
    rr.created_at,
    rr.updated_at,
    jsonb_build_object(
      'full_name', p.full_name,
      'role', p.role
    ) as profiles
  FROM public.recipe_reviews rr
  INNER JOIN public.profiles p ON rr.user_id = p.id
  WHERE rr.recipe_id = recipe_id_param
  ORDER BY rr.created_at DESC;
END;
$$;

-- 2. Dar permisos públicos a la función
GRANT EXECUTE ON FUNCTION get_recipe_reviews_with_profiles(INTEGER) TO PUBLIC;

-- 3. Probar la función
SELECT * FROM get_recipe_reviews_with_profiles(1) LIMIT 2;