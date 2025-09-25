-- =======================================
-- USUARIOS DE PRUEBA PARA MAYWA
-- =======================================
-- Ejecutar estos comandos en el SQL Editor de Supabase

-- 1. USUARIO: Ana García (Cocinera experimentada)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'ana.garcia@email.com',
  '$2a$10$dummy.encrypted.password.hash',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Ana García","phone":"591-70123456","address":"La Paz, Bolivia","business_type":"particular","role":"cliente"}'
);

-- Perfil para Ana García
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
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Ana García',
  'ana.garcia@email.com',
  '591-70123456',
  'Zona Sur, La Paz',
  'particular',
  'cliente',
  NOW(),
  NOW()
);

-- 2. USUARIO: Carlos Mendoza (Chef aficionado)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'carlos.mendoza@email.com',
  '$2a$10$dummy.encrypted.password.hash',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Carlos Mendoza","phone":"591-75987654","address":"Santa Cruz, Bolivia","business_type":"particular","role":"cliente"}'
);

-- Perfil para Carlos Mendoza
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
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Carlos Mendoza',
  'carlos.mendoza@email.com',
  '591-75987654',
  'Equipetrol, Santa Cruz',
  'particular',
  'cliente',
  NOW(),
  NOW()
);

-- 3. USUARIO: María Silva (Mamá ocupada)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'maria.silva@email.com',
  '$2a$10$dummy.encrypted.password.hash',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"María Silva","phone":"591-68456789","address":"Cochabamba, Bolivia","business_type":"particular","role":"cliente"}'
);

-- Perfil para María Silva
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
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'María Silva',
  'maria.silva@email.com',
  '591-68456789',
  'Cercado, Cochabamba',
  'particular',
  'cliente',
  NOW(),
  NOW()
);

-- 4. USUARIO: Luis Vargas (Estudiante universitario)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  '00000000-0000-0000-0000-000000000000',
  'luis.vargas@email.com',
  '$2a$10$dummy.encrypted.password.hash',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Luis Vargas","phone":"591-73654321","address":"El Alto, Bolivia","business_type":"particular","role":"cliente"}'
);

-- Perfil para Luis Vargas
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
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  'Luis Vargas',
  'luis.vargas@email.com',
  '591-73654321',
  'Villa Dolores, El Alto',
  'particular',
  'cliente',
  NOW(),
  NOW()
);

-- 5. USUARIO: Sofia Rojas (Cocinera profesional)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data
) VALUES (
  '55555555-5555-5555-5555-555555555555',
  '00000000-0000-0000-0000-000000000000',
  'sofia.rojas@email.com',
  '$2a$10$dummy.encrypted.password.hash',
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Sofia Rojas","phone":"591-77123987","address":"Sucre, Bolivia","business_type":"restaurant","role":"cliente"}'
);

-- Perfil para Sofia Rojas
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
) VALUES (
  '55555555-5555-5555-5555-555555555555',
  'Sofia Rojas',
  'sofia.rojas@email.com',
  '591-77123987',
  'Centro Histórico, Sucre',
  'restaurant',
  'cliente',
  NOW(),
  NOW()
);

-- =======================================
-- VERIFICAR QUE SE CREARON CORRECTAMENTE
-- =======================================

-- Verificar usuarios creados
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.phone,
  p.address,
  p.business_type,
  p.created_at
FROM profiles p
WHERE p.id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
)
ORDER BY p.created_at;

-- =======================================
-- USUARIOS LISTOS PARA COMENTARIOS:
-- =======================================
-- Ana García:    11111111-1111-1111-1111-111111111111
-- Carlos Mendoza: 22222222-2222-2222-2222-222222222222  
-- María Silva:   33333333-3333-3333-3333-333333333333
-- Luis Vargas:   44444444-4444-4444-4444-444444444444
-- Sofia Rojas:   55555555-5555-5555-5555-555555555555