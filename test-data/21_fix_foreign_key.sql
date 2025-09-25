-- Script para corregir la foreign key que apunta a la tabla incorrecta

-- 1. Eliminar la foreign key incorrecta que apunta a auth.users
ALTER TABLE public.recipe_reviews 
DROP CONSTRAINT IF EXISTS recipe_reviews_user_id_fkey;

-- 2. Agregar la foreign key correcta que apunta a profiles
ALTER TABLE public.recipe_reviews 
ADD CONSTRAINT recipe_reviews_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 3. Verificar la corrección
SELECT 
  'FOREIGN KEY CORREGIDA' as info,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
  AND tc.table_name = 'recipe_reviews'
  AND kcu.column_name = 'user_id';

-- 4. Probar que el JOIN funciona
SELECT 
  'PRUEBA JOIN CORREGIDO' as test,
  COUNT(*) as total_found
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1;

-- 5. Probar la consulta completa
SELECT 
  rr.id,
  rr.usefulness_rating,
  rr.comment,
  p.full_name,
  p.role
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1
ORDER BY rr.created_at DESC
LIMIT 2;