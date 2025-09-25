-- =======================================
-- VERIFICAR CONSTRAINT DE BUSINESS_TYPE
-- =======================================

-- Ver qué valores están permitidos en business_type
SELECT 
  constraint_name,
  check_clause
FROM information_schema.check_constraints 
WHERE constraint_name LIKE '%business_type%';

-- Ver la estructura de la tabla profiles
\d profiles;

-- =======================================
-- ALTERNATIVA: USAR VALORES PERMITIDOS
-- =======================================

-- Cambiar Sofia Rojas para usar un business_type válido
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
  'particular',  -- 👈 Cambiar de 'restaurant' a 'particular'
  'cliente',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '55555555-5555-5555-5555-555555555555'
);

-- =======================================
-- VERIFICAR QUE FUNCIONA
-- =======================================

SELECT 
  'Sofia Rojas creada:' as status,
  id,
  full_name,
  email,
  business_type,
  created_at
FROM profiles 
WHERE id = '55555555-5555-5555-5555-555555555555';

-- =======================================
-- VERIFICAR TODOS LOS USUARIOS FINALES
-- =======================================

SELECT 
  'TODOS LOS USUARIOS:' as status,
  id,
  full_name,
  email,
  business_type,
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