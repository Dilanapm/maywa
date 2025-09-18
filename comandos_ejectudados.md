en formato json en orden de comandos

-- Ver todas las tablas en el esquema public
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

salida:

[
  {
    "table_name": "inquiries",
    "table_type": "BASE TABLE"
  },
  {
    "table_name": "order_items",
    "table_type": "BASE TABLE"
  },
  {
    "table_name": "orders",
    "table_type": "BASE TABLE"
  },
  {
    "table_name": "products",
    "table_type": "BASE TABLE"
  },
  {
    "table_name": "profiles",
    "table_type": "BASE TABLE"
  }
]



-- Ver columnas de profiles
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

salida:

[
  {
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'cliente'::text",
    "character_maximum_length": null
  },
  {
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "city",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'La Paz'::text",
    "character_maximum_length": null
  },
  {
    "column_name": "business_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  }
]


-- Ver columnas de orders
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'orders'
ORDER BY ordinal_position;




[
  {
    "column_name": "id",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": "nextval('orders_id_seq'::regclass)",
    "character_maximum_length": null
  },
  {
    "column_name": "client_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "order_number",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pendiente'::text",
    "character_maximum_length": null
  },
  {
    "column_name": "total_amount",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "delivery_address",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "delivery_city",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'La Paz'::text",
    "character_maximum_length": null
  },
  {
    "column_name": "delivery_phone",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "delivery_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "delivery_time_slot",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "special_instructions",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "payment_method",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'contra_entrega'::text",
    "character_maximum_length": null
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  }
]



-- Ver columnas de order_items
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'order_items'
ORDER BY ordinal_position;


salida:




[
  {
    "column_name": "id",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": "nextval('order_items_id_seq'::regclass)",
    "character_maximum_length": null
  },
  {
    "column_name": "order_id",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "product_id",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "quantity",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "unit_price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "subtotal",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  }
]




-- Ver columnas de products
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default,
  character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'products'
ORDER BY ordinal_position;

salida:

[
  {
    "column_name": "id",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": "nextval('products_id_seq'::regclass)",
    "character_maximum_length": null
  },
  {
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "price",
    "data_type": "numeric",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "category",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "size",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "image_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "character_maximum_length": null
  },
  {
    "column_name": "available",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "character_maximum_length": null
  },
  {
    "column_name": "stock_quantity",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "character_maximum_length": null
  },
  {
    "column_name": "min_order_quantity",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "1",
    "character_maximum_length": null
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  },
  {
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "character_maximum_length": null
  }
]



-- Ver todas las foreign keys
SELECT 
    tc.table_name AS tabla_origen,
    kcu.column_name AS columna_origen,
    ccu.table_name AS tabla_destino,
    ccu.column_name AS columna_destino,
    tc.constraint_name AS nombre_constraint
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;

salida:

[
  {
    "tabla_origen": "order_items",
    "columna_origen": "order_id",
    "tabla_destino": "orders",
    "columna_destino": "id",
    "nombre_constraint": "order_items_order_id_fkey"
  },
  {
    "tabla_origen": "order_items",
    "columna_origen": "product_id",
    "tabla_destino": "products",
    "columna_destino": "id",
    "nombre_constraint": "order_items_product_id_fkey"
  }
]



-- Ver políticas de Row Level Security
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
ORDER BY tablename, policyname;

salida:

[
  {
    "schemaname": "public",
    "tablename": "inquiries",
    "policyname": "Admins can update inquiries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "UPDATE",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "inquiries",
    "policyname": "Admins can view all inquiries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "inquiries",
    "policyname": "Everyone can create inquiries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null
  },
  {
    "schemaname": "public",
    "tablename": "order_items",
    "policyname": "Admins can view all order items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "order_items",
    "policyname": "Users can insert own order items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null
  },
  {
    "schemaname": "public",
    "tablename": "order_items",
    "policyname": "Users can view own order items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(EXISTS ( SELECT 1\n   FROM orders\n  WHERE ((orders.id = order_items.order_id) AND (orders.client_id = auth.uid()))))"
  },
  {
    "schemaname": "public",
    "tablename": "orders",
    "policyname": "Admins can update all orders",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "UPDATE",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "orders",
    "policyname": "Admins can view all orders",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "orders",
    "policyname": "Clients can create orders",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null
  },
  {
    "schemaname": "public",
    "tablename": "orders",
    "policyname": "Clients can view own orders",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(auth.uid() = client_id)"
  },
  {
    "schemaname": "public",
    "tablename": "products",
    "policyname": "Everyone can view products",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(available = true)"
  },
  {
    "schemaname": "public",
    "tablename": "products",
    "policyname": "Only admins can modify products",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM profiles\n  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'administrador'::text))))"
  },
  {
    "schemaname": "public",
    "tablename": "profiles",
    "policyname": "Users can insert own profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null
  },
  {
    "schemaname": "public",
    "tablename": "profiles",
    "policyname": "Users can update own profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "UPDATE",
    "qual": "(auth.uid() = id)"
  },
  {
    "schemaname": "public",
    "tablename": "profiles",
    "policyname": "Users can view own profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(auth.uid() = id)"
  }
]






-- Ver si RLS está habilitado en las tablas
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_habilitado
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

salida:





[
  {
    "schemaname": "public",
    "tablename": "inquiries",
    "rls_habilitado": true
  },
  {
    "schemaname": "public",
    "tablename": "order_items",
    "rls_habilitado": true
  },
  {
    "schemaname": "public",
    "tablename": "orders",
    "rls_habilitado": true
  },
  {
    "schemaname": "public",
    "tablename": "products",
    "rls_habilitado": true
  },
  {
    "schemaname": "public",
    "tablename": "profiles",
    "rls_habilitado": true
  }
]






-- Ver triggers en las tablas
SELECT 
  event_object_table AS tabla,
  trigger_name,
  event_manipulation AS evento,
  action_timing AS momento,
  action_statement AS accion
FROM information_schema.triggers 
WHERE event_object_schema = 'public'
ORDER BY event_object_table, trigger_name;


salida:



[
  {
    "tabla": "order_items",
    "trigger_name": "update_order_total_on_delete",
    "evento": "DELETE",
    "momento": "AFTER",
    "accion": "EXECUTE FUNCTION update_order_total()"
  },
  {
    "tabla": "order_items",
    "trigger_name": "update_order_total_on_insert",
    "evento": "INSERT",
    "momento": "AFTER",
    "accion": "EXECUTE FUNCTION update_order_total()"
  },
  {
    "tabla": "order_items",
    "trigger_name": "update_order_total_on_update",
    "evento": "UPDATE",
    "momento": "AFTER",
    "accion": "EXECUTE FUNCTION update_order_total()"
  }
]



-- Ver funciones que hemos creado
SELECT 
  routine_name AS nombre_funcion,
  routine_type AS tipo,
  data_type AS tipo_retorno
FROM information_schema.routines 
WHERE routine_schema = 'public'
  AND routine_name LIKE '%user%' 
  OR routine_name LIKE '%order%'
  OR routine_name LIKE '%profile%'
ORDER BY routine_name;

salida:



[
  {
    "nombre_funcion": "generate_order_number",
    "tipo": "FUNCTION",
    "tipo_retorno": "text"
  },
  {
    "nombre_funcion": "handle_new_user",
    "tipo": "FUNCTION",
    "tipo_retorno": "trigger"
  },
  {
    "nombre_funcion": "ordered_set_transition",
    "tipo": "FUNCTION",
    "tipo_retorno": "internal"
  },
  {
    "nombre_funcion": "ordered_set_transition_multi",
    "tipo": "FUNCTION",
    "tipo_retorno": "internal"
  },
  {
    "nombre_funcion": "update_order_total",
    "tipo": "FUNCTION",
    "tipo_retorno": "trigger"
  }
]





-- Ver cuántos registros hay en cada tabla
SELECT 'profiles' as tabla, COUNT(*) as total FROM public.profiles
UNION ALL
SELECT 'products' as tabla, COUNT(*) as total FROM public.products
UNION ALL  
SELECT 'orders' as tabla, COUNT(*) as total FROM public.orders
UNION ALL
SELECT 'order_items' as tabla, COUNT(*) as total FROM public.order_items
UNION ALL
SELECT 'inquiries' as tabla, COUNT(*) as total FROM public.inquiries;

salida:


[
  {
    "tabla": "profiles",
    "total": 2
  },
  {
    "tabla": "products",
    "total": 9
  },
  {
    "tabla": "orders",
    "total": 0
  },
  {
    "tabla": "order_items",
    "total": 0
  },
  {
    "tabla": "inquiries",
    "total": 0
  }
]



-- Ver perfiles existentes
SELECT 
  id,
  email,
  full_name,
  role,
  business_type,
  phone,
  address,
  city,
  created_at
FROM public.profiles 
ORDER BY created_at DESC
LIMIT 10;
salida:



[
  {
    "id": "51a5ac91-d6d6-4201-a73f-69db765e0073",
    "email": "claaudt2012@gmail.com",
    "full_name": "palaracon cde parsiano dend",
    "role": "cliente",
    "business_type": "restaurante",
    "phone": "+59175871064",
    "address": "Calle Principal 123",
    "city": "La Paz",
    "created_at": "2025-09-18 02:36:33.819637+00"
  },
  {
    "id": "9c36c1e6-f42c-4eac-99bf-6f9ecc79fd44",
    "email": "admin@maywa.com",
    "full_name": null,
    "role": "administrador",
    "business_type": null,
    "phone": null,
    "address": null,
    "city": "La Paz",
    "created_at": "2025-09-18 01:15:10.078537+00"
  }
]


