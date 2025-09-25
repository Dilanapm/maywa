-- Verificar si existe un trigger para crear perfiles automáticamente
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar si existe la función
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname LIKE '%profile%' OR proname LIKE '%user%';

-- 2. Verificar triggers en auth.users
SELECT 
    t.tgname as trigger_name,
    p.proname as function_name,
    t.tgenabled
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE t.tgrelid = 'auth.users'::regclass;

-- 3. Verificar si existen perfiles
SELECT count(*) as total_profiles FROM profiles;

-- 4. Verificar usuarios sin perfil
SELECT 
    au.id,
    au.email,
    au.created_at,
    p.id as profile_exists
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;