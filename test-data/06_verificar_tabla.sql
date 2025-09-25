-- Verificar la estructura actual de la tabla recipe_reviews
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'recipe_reviews' 
ORDER BY ordinal_position;

-- También verificar si la tabla existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'recipe_reviews';