-- Script para insertar comentarios y reseñas de prueba
-- Usando los usuarios reales creados en la base de datos

INSERT INTO recipe_reviews (
    recipe_id, 
    user_id, 
    rating,
    usefulness_rating, 
    comment,
    reason, 
    created_at
) VALUES 

-- Comentarios para Empanadas con Majoyaba (recipe_id: 1)
(1, '11111111-1111-1111-1111-111111111111', 3, 3, 'Excelente receta! Las empanadas quedan perfectas con la Majoyaba. El toque crocante es espectacular y a mi familia le encanta.', 'La salsa Majoyaba le da un sabor único que no encuentras en otras recetas', '2025-09-20 08:30:00+00'),

(1, '22222222-2222-2222-2222-222222222222', 2, 2, 'Muy buena combinación, aunque creo que necesita un poco más de salsa. El sabor es auténtico y fácil de hacer.', 'Buena receta pero la cantidad de salsa podría ser mayor', '2025-09-20 14:15:00+00'),

(1, '33333333-3333-3333-3333-333333333333', 3, 3, 'Perfecta para almorzar en familia! La Majoyaba le da un sabor único a las empanadas. Definitivamente la haré de nuevo.', 'Ideal para reuniones familiares, sabor tradicional mejorado', '2025-09-21 07:45:00+00'),

(1, '44444444-4444-4444-4444-444444444444', 3, 3, 'Una de mis recetas favoritas ahora. La combinación es perfecta y muy fácil de preparar. Súper recomendada.', 'Simplicidad y sabor excelente, perfecto para principiantes', '2025-09-21 19:20:00+00'),

-- Comentarios para Pollo Picantay (recipe_id: 2)
(2, '55555555-5555-5555-5555-555555555555', 3, 3, 'Como dueña de restaurante, puedo decir que esta receta es auténtica y deliciosa. El nivel de picante es perfecto y los sabores están muy bien balanceados.', 'Receta profesional con sabores auténticos bolivianos', '2025-09-19 16:30:00+00'),

(2, '11111111-1111-1111-1111-111111111111', 2, 2, 'Muy sabroso pero demasiado picante para mi gusto. Quizás la próxima vez use menos Picantay. El sabor base está excelente.', 'Buen sabor pero muy picante para paladares sensibles', '2025-09-20 12:45:00+00'),

(2, '22222222-2222-2222-2222-222222222222', 3, 3, 'Increíble! Me recordó a los sabores de mi infancia. La receta está muy bien explicada y el resultado es espectacular.', 'Sabores nostálgicos con instrucciones claras y precisas', '2025-09-20 20:30:00+00'),

(2, '33333333-3333-3333-3333-333333333333', 2, 2, 'Buena receta, aunque me costó encontrar algunos ingredientes en Cochabamba. El sabor compensa el esfuerzo de conseguir todo.', 'Ingredientes difíciles de conseguir pero resultado vale la pena', '2025-09-21 11:15:00+00'),

-- Comentarios para Postre Majoyaba Dulce (recipe_id: 3)
(3, '44444444-4444-4444-4444-444444444444', 3, 3, 'Excelente postre innovador! La textura quedó perfecta y el contraste dulce-crocante es genial. Muy recomendado.', 'Innovación culinaria con texturas sorprendentes', '2025-09-19 15:20:00+00'),

(3, '55555555-5555-5555-5555-555555555555', 3, 3, 'Lo preparé para mi restaurante como postre especial del día y fue un éxito total. Los clientes quedaron encantados con la originalidad.', 'Éxito comercial garantizado, postre único en el mercado', '2025-09-20 09:45:00+00'),

(3, '11111111-1111-1111-1111-111111111111', 2, 2, 'Está rico pero me quedó un poco dulce. La próxima vez reduciré un poco la miel. La técnica está muy bien explicada.', 'Técnica bien explicada pero muy dulce para mi gusto', '2025-09-21 16:30:00+00'),

(3, '22222222-2222-2222-2222-222222222222', 3, 3, 'Perfecto! Seguí la receta al pie de la letra y quedó como en las fotos. Muy fácil de hacer y con un resultado profesional.', 'Instrucciones precisas con resultado profesional garantizado', '2025-09-21 21:45:00+00'),

(3, '33333333-3333-3333-3333-333333333333', 3, 3, 'Una delicia total! Lo hice para una reunión familiar y todos me pidieron la receta. Definitivamente se convirtió en mi postre favorito para ocasiones especiales.', 'Perfecto para ocasiones especiales, siempre causa impresión', '2025-09-22 10:30:00+00');

-- Verificar las estadísticas después de insertar
SELECT 
    r.id as recipe_id,
    r.title as recipe_name,
    COUNT(rv.id) as total_reviews,
    ROUND(AVG(rv.rating), 2) as average_rating,
    COUNT(CASE WHEN rv.rating = 3 THEN 1 END) as excellent_count,
    COUNT(CASE WHEN rv.rating = 2 THEN 1 END) as good_count,
    COUNT(CASE WHEN rv.rating = 1 THEN 1 END) as regular_count
FROM recipes r
LEFT JOIN recipe_reviews rv ON r.id = rv.recipe_id
WHERE r.id IN (1, 2, 3)
GROUP BY r.id, r.title
ORDER BY r.id;