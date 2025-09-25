-- Script directo para corregir la política de profiles

-- 1. Eliminar la política restrictiva actual
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- 2. Crear nueva política permisiva para SELECT en profiles
CREATE POLICY "Anyone can view basic profile info" ON public.profiles
FOR SELECT USING (true);

-- 3. Verificar el cambio inmediatamente
SELECT 
  'DESPUÉS DEL CAMBIO' as estado,
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'profiles'
  AND cmd = 'SELECT';

-- 4. Probar la consulta problemática
SELECT 
  'PRUEBA DESPUÉS DEL FIX' as test,
  COUNT(*) as total_reviews_found
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1;

-- 5. Probar datos completos para confirmar
SELECT 
  rr.usefulness_rating,
  rr.comment,
  p.full_name,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC
LIMIT 2;