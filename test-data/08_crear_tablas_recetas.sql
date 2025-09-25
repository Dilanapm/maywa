-- Script para crear las tablas de recetas y reseñas

-- 1. Crear tabla de recetas
CREATE TABLE IF NOT EXISTS public.recipes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  difficulty TEXT CHECK (difficulty IN ('Fácil', 'Intermedio', 'Difícil')),
  time_minutes INTEGER,
  servings INTEGER,
  salsa_product_id INTEGER REFERENCES public.products(id),
  ingredients JSONB,
  instructions JSONB,
  tips JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de reseñas de recetas
CREATE TABLE IF NOT EXISTS public.recipe_reviews (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES public.recipes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 3),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Habilitar Row Level Security
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_reviews ENABLE ROW LEVEL SECURITY;

-- 4. Políticas para recipes (todos pueden ver)
CREATE POLICY "Everyone can view recipes" ON public.recipes
FOR SELECT USING (true);

CREATE POLICY "Only admins can modify recipes" ON public.recipes
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'administrador'
  )
);

-- 5. Políticas para recipe_reviews
CREATE POLICY "Everyone can view reviews" ON public.recipe_reviews
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.recipe_reviews
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON public.recipe_reviews
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON public.recipe_reviews
FOR DELETE USING (auth.uid() = user_id);

-- 6. Insertar las 3 recetas base
INSERT INTO public.recipes (id, title, description, difficulty, time_minutes, servings, salsa_product_id, ingredients, instructions, tips) VALUES 
(1, 'Empanadas con Majoyaba', 'Empanadas salteñas tradicionales con el toque crocante de Majoyaba', 'Fácil', 30, 4, 1, 
 '["8 empanadas salteñas", "2 cucharadas de salsa Majoyaba", "1 limón grande cortado en gajos", "Hojas de lechuga fresca", "1 tomate cortado en rodajas (opcional)"]',
 '["Precalienta el horno a 180°C. Coloca las empanadas en una bandeja para horno.", "Calienta las empanadas durante 10-15 minutos hasta que estén doradas y crujientes.", "Mientras tanto, lava y seca las hojas de lechuga. Corta el limón en gajos.", "Retira las empanadas del horno y déjalas enfriar por 2-3 minutos.", "Sirve las empanadas calientes acompañadas de la salsa Majoyaba, lechuga fresca y gajos de limón.", "¡Disfruta de esta combinación perfecta de sabores bolivianos!"]',
 '["Para mejor sabor, usa empanadas recién hechas", "La salsa Majoyaba se complementa perfecto con el relleno de carne", "Sirve inmediatamente para mantener la temperatura", "Puedes agregar un toque de llajwa para más picante"]'),

(2, 'Pollo Picantay', 'Pollo jugoso marinado con nuestra salsa Picantay de locoto', 'Intermedio', 45, 6, 2,
 '["1 pollo entero cortado en presas", "4 cucharadas de salsa Picantay", "2 cucharadas de aceite vegetal", "1 cebolla mediana cortada en juliana", "3 dientes de ajo picados", "Sal y pimienta al gusto", "1 taza de caldo de pollo", "Papas cocidas para acompañar"]',
 '["Marina las presas de pollo con 2 cucharadas de Picantay, sal y pimienta por 30 minutos.", "Calienta el aceite en una sartén grande a fuego medio-alto.", "Dora las presas de pollo por todos los lados hasta que estén bien doradas.", "Retira el pollo y en la misma sartén sofríe la cebolla y el ajo.", "Regresa el pollo a la sartén, agrega el resto de Picantay y el caldo.", "Cocina a fuego medio por 25-30 minutos hasta que el pollo esté tierno.", "Sirve caliente con papas cocidas y un toque extra de Picantay."]',
 '["El marinado es clave para el sabor intenso", "No tapes completamente para que se concentren los sabores", "Ajusta el nivel de picante según tu preferencia", "Acompaña con arroz blanco para suavizar el picante"]'),

(3, 'Postre Majoyaba Dulce', 'Innovador postre que combina texturas crocantes con dulzor natural', 'Fácil', 20, 8, 1,
 '["1 taza de haba crocante (de la salsa Majoyaba)", "1/2 taza de miel de abeja", "200g de queso crema", "1 taza de crema de leche", "2 cucharadas de azúcar glass", "Frutas rojas para decorar", "Hojas de menta fresca"]',
 '["Bate el queso crema hasta que esté suave y cremoso.", "Incorpora gradualmente la miel y el azúcar glass.", "En otro bowl, bate la crema de leche hasta formar picos suaves.", "Mezcla delicadamente la crema batida con la mezcla de queso.", "Separa las habas crocantes de la salsa Majoyaba.", "En copas individuales, alterna capas de crema y habas crocantes.", "Refrigera por al menos 2 horas antes de servir.", "Decora con frutas rojas y menta al momento de servir."]',
 '["Las habas deben estar bien secas para mantener el crocante", "Prepara con anticipación para mejor consistencia", "Experimenta con diferentes frutas de temporada", "Sirve bien frío para mejor experiencia"]);

-- Verificar que todo se creó correctamente
SELECT 
  'recipes' as tabla,
  COUNT(*) as registros
FROM public.recipes
UNION ALL
SELECT 
  'recipe_reviews' as tabla,
  COUNT(*) as registros  
FROM public.recipe_reviews;