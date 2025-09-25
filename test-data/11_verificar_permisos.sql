-- Script para verificar políticas de seguridad y permisos

-- 1. Verificar políticas de Row Level Security
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
  AND tablename IN ('recipes', 'recipe_reviews', 'profiles')
ORDER BY tablename, policyname;

-- 2. Verificar si RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_habilitado
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('recipes', 'recipe_reviews', 'profiles')
ORDER BY tablename;

-- 3. Verificar relaciones/foreign keys
SELECT 
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
  AND tc.table_name IN ('recipes', 'recipe_reviews')
ORDER BY tc.table_name;