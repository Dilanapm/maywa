-- Script para agregar la columna rating a la tabla recipe_reviews
-- Solo ejecutar si la columna no existe

-- Agregar la columna rating (escala 1-3)
ALTER TABLE recipe_reviews 
ADD COLUMN IF NOT EXISTS rating INTEGER NOT NULL DEFAULT 3 
CHECK (rating >= 1 AND rating <= 3);

-- Verificar que se agregó correctamente
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'recipe_reviews' 
ORDER BY ordinal_position;