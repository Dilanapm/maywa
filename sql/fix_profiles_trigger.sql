-- Crear función y trigger para crear perfiles automáticamente
-- Ejecutar en Supabase SQL Editor

-- 1. Crear o reemplazar la función
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, address, business_type, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'address', ''),
    COALESCE(new.raw_user_meta_data->>'business_type', 'particular'),
    COALESCE(new.raw_user_meta_data->>'role', 'cliente')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Crear el trigger si no existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Crear perfiles para usuarios existentes que no tienen perfil
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)),
    COALESCE(au.raw_user_meta_data->>'role', 'cliente')
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 4. Verificar que todo está correcto
SELECT 
    au.id,
    au.email,
    p.full_name,
    p.role
FROM auth.users au
JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;