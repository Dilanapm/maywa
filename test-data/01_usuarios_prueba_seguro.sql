-- =======================================
-- USUARIOS DE PRUEBA PARA MAYWA - VERSIÓN SEGURA
-- =======================================
-- Este script verifica si los usuarios ya existen antes de crearlos

-- PASO 1: Verificar qué usuarios ya existen
SELECT 
  'Usuarios existentes:' as status,
  id,
  full_name,
  email
FROM profiles 
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

-- =======================================
-- OPCIÓN A: LIMPIAR USUARIOS EXISTENTES (CUIDADO!)
-- =======================================
-- Solo ejecutar si quieres eliminar usuarios de prueba existentes

-- Eliminar reviews asociadas primero
-- DELETE FROM recipe_reviews WHERE user_id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222',
--   '33333333-3333-3333-3333-333333333333',
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );

-- Eliminar perfiles
-- DELETE FROM profiles WHERE id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222',
--   '33333333-3333-3333-3333-333333333333',
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );

-- Eliminar usuarios de auth (SOLO SI ES NECESARIO)
-- DELETE FROM auth.users WHERE id IN (
--   '11111111-1111-1111-1111-111111111111',
--   '22222222-2222-2222-2222-222222222222',
--   '33333333-3333-3333-3333-333333333333',
--   '44444444-4444-4444-4444-444444444444',
--   '55555555-5555-5555-5555-555555555555'
-- );

-- =======================================
-- OPCIÓN B: CREAR USUARIOS CON NUEVOS IDs
-- =======================================
-- Usar UUIDs completamente nuevos

-- Generar nuevos UUIDs aleatorios
SELECT 
  'Nuevos UUIDs generados:' as info,
  gen_random_uuid() as uuid1,
  gen_random_uuid() as uuid2,
  gen_random_uuid() as uuid3,
  gen_random_uuid() as uuid4,
  gen_random_uuid() as uuid5;

-- =======================================
-- OPCIÓN C: SOLO CREAR PERFILES FALTANTES
-- =======================================
-- Insertar solo los perfiles que no existen

-- Ana García - Solo si no existe
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  address,
  business_type,
  role,
  created_at,
  updated_at
)
SELECT
  '11111111-1111-1111-1111-111111111111',
  'Ana García',
  'ana.garcia@email.com',
  '591-70123456',
  'Zona Sur, La Paz',
  'particular',
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '11111111-1111-1111-1111-111111111111'
);

-- Carlos Mendoza - Solo si no existe
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  address,
  business_type,
  role,
  created_at,
  updated_at
)
SELECT
  '22222222-2222-2222-2222-222222222222',
  'Carlos Mendoza',
  'carlos.mendoza@email.com',
  '591-75987654',
  'Equipetrol, Santa Cruz',
  'particular',
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '22222222-2222-2222-2222-222222222222'
);

-- María Silva - Solo si no existe
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  address,
  business_type,
  role,
  created_at,
  updated_at
)
SELECT
  '33333333-3333-3333-3333-333333333333',
  'María Silva',
  'maria.silva@email.com',
  '591-68456789',
  'Cercado, Cochabamba',
  'particular',
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '33333333-3333-3333-3333-333333333333'
);

-- Luis Vargas - Solo si no existe
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  address,
  business_type,
  role,
  created_at,
  updated_at
)
SELECT
  '44444444-4444-4444-4444-444444444444',
  'Luis Vargas',
  'luis.vargas@email.com',
  '591-73654321',
  'Villa Dolores, El Alto',
  'particular',
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '44444444-4444-4444-4444-444444444444'
);

-- Sofia Rojas - Solo si no existe
INSERT INTO public.profiles (
  id,
  full_name,
  email,
  phone,
  address,
  business_type,
  role,
  created_at,
  updated_at
)
SELECT
  '55555555-5555-5555-5555-555555555555',
  'Sofia Rojas',
  'sofia.rojas@email.com',
  '591-77123987',
  'Centro Histórico, Sucre',
  'restaurant',
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '55555555-5555-5555-5555-555555555555'
);

-- =======================================
-- VERIFICAR RESULTADO FINAL
-- =======================================

SELECT 
  'RESULTADO FINAL:' as status,
  id,
  full_name,
  email,
  phone,
  created_at
FROM profiles 
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
)
ORDER BY created_at;

-- Verificar cuántos perfiles tenemos ahora
SELECT 
  'Total perfiles de prueba:' as info,
  COUNT(*) as cantidad
FROM profiles 
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);