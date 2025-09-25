-- Script para agregar la foreign key faltante entre recipe_reviews y profiles

-- 1. Verificar la estructura actual de recipe_reviews
SELECT 
  'ANTES - Constraints de recipe_reviews' as info,
  constraint_name,
  constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'recipe_reviews' AND table_schema = 'public';

-- 2. Verificar foreign keys actuales
SELECT 
  'ANTES - Foreign Keys Actuales' as info,
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
  AND tc.table_name = 'recipe_reviews';

-- 3. Agregar la foreign key faltante
ALTER TABLE public.recipe_reviews 
ADD CONSTRAINT recipe_reviews_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- 4. Verificar que se agregó correctamente
SELECT 
  'DESPUÉS - Foreign Keys' as info,
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
  AND tc.table_name = 'recipe_reviews';

-- 5. Probar la consulta que falla en React
SELECT 
  'PRUEBA FINAL' as test,
  COUNT(*) as total_found
FROM public.recipe_reviews rr
INNER JOIN public.profiles p ON rr.user_id = p.id
WHERE rr.recipe_id = 1;