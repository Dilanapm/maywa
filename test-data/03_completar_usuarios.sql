-- =======================================
-- CREAR SOLO LOS USUARIOS FALTANTES
-- =======================================
-- Ya tienes: Ana García (11111111-1111-1111-1111-111111111111)
-- Faltan crear: Carlos, María, Luis, Sofia

-- 2. USUARIO: Carlos Mendoza (Chef aficionado)
-- Solo perfil ya que Ana ya tiene auth.user creado
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

-- 3. USUARIO: María Silva (Mamá ocupada)
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

-- 4. USUARIO: Luis Vargas (Estudiante universitario)
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

-- 5. USUARIO: Sofia Rojas (Cocinera profesional)
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
-- VERIFICAR TODOS LOS USUARIOS
-- =======================================

SELECT 
  'USUARIOS FINALES:' as status,
  id,
  full_name,
  email,
  phone,
  address,
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

-- Contar cuántos usuarios de prueba tenemos
SELECT 
  'Total usuarios de prueba creados:' as info,
  COUNT(*) as cantidad
FROM profiles 
WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

-- =======================================
-- CONFIRMACIÓN PARA COMENTARIOS
-- =======================================
-- Una vez que este script se ejecute exitosamente,
-- deberías tener 5 usuarios listos para usar en comentarios:

-- ✅ Ana García:     11111111-1111-1111-1111-111111111111 (ya existía)
-- ✅ Carlos Mendoza: 22222222-2222-2222-2222-222222222222 (nuevo)
-- ✅ María Silva:    33333333-3333-3333-3333-333333333333 (nuevo)
-- ✅ Luis Vargas:    44444444-4444-4444-4444-444444444444 (nuevo)
-- ✅ Sofia Rojas:    55555555-5555-5555-5555-555555555555 (nuevo)