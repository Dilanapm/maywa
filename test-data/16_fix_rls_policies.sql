-- Script para corregir las políticas RLS y permitir que todos vean los comentarios

-- 1. Eliminar política restrictiva de profiles para SELECT
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- 2. Crear nueva política permisiva para que todos puedan ver información básica de perfiles
CREATE POLICY "Anyone can view basic profile info" ON public.profiles
FOR SELECT USING (true);

-- 3. Verificar que recipe_reviews ya tiene política permisiva (debería estar bien)
-- Ya existe: "Everyone can view reviews" con USING (true)

-- 4. Para mantener privacidad, crear política más específica que solo exponga campos necesarios
-- Nota: Supabase usa RLS a nivel de fila, no de columna, así que esto es lo mejor que podemos hacer

-- 5. Verificar las nuevas políticas
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

-- 6. Probar la consulta completa que hace React
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
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC
LIMIT 5;