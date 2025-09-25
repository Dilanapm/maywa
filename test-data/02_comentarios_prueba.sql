-- =======================================
-- COMENTARIOS Y VALORACIONES DE PRUEBA
-- =======================================
-- Ejecutar DESPUÉS de crear los usuarios de prueba
-- Usar estos UUIDs para los comentarios:

-- Ana García:     11111111-1111-1111-1111-111111111111
-- Carlos Mendoza: 22222222-2222-2222-2222-222222222222  
-- María Silva:    33333333-3333-3333-3333-333333333333
-- Luis Vargas:    44444444-4444-4444-4444-444444444444
-- Sofia Rojas:    55555555-5555-5555-5555-555555555555

-- =======================================
-- RECETA 1: EMPANADAS CON MAJOYABA
-- =======================================

-- Ana García - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  1,
  '11111111-1111-1111-1111-111111111111',
  3,
  'Esta receta es absolutamente perfecta! Las empanadas quedaron súper crujientes y la salsa Majoyaba les da un sabor único que nunca había probado.',
  'Porque fue muy fácil de seguir y el resultado superó mis expectativas. Mis hijos quedaron encantados y ya me pidieron que las haga de nuevo.',
  NOW() - INTERVAL '3 days'
);

-- Carlos Mendoza - Rating: 3 (Muy útil)  
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  1,
  '22222222-2222-2222-2222-222222222222',
  3,
  'Como chef aficionado, puedo decir que esta combinación es genial. La textura crocante de la Majoyaba contrasta perfecto con las empanadas.',
  'Las instrucciones son claras y el truco de cortarlas por la mitad antes de servir realmente las hace más crujientes. Definitivamente la voy a recomendar.',
  NOW() - INTERVAL '5 days'
);

-- María Silva - Rating: 2 (Útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  1,
  '33333333-3333-3333-3333-333333333333',
  2,
  'Buena receta para el día a día. A mis hijos les gustó, aunque yo esperaba un poco más de sabor.',
  'Es práctica y rápida de hacer, perfecto para cuando tienes poco tiempo. Solo que me hubiera gustado que tuviera más condimentos.',
  NOW() - INTERVAL '1 day'
);

-- Luis Vargas - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  1,
  '44444444-4444-4444-4444-444444444444',
  3,
  'Perfect para estudiantes! Económico, fácil y delicioso. La salsa Majoyaba es adictiva.',
  'Como estudiante universitario necesito comidas rápidas y baratas. Esta receta cumple todo: fácil, rica y no gasto mucho en ingredientes.',
  NOW() - INTERVAL '6 hours'
);

-- =======================================
-- RECETA 2: POLLO A LA PLANCHA CON PICANTAY
-- =======================================

-- Sofia Rojas - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  2,
  '55555555-5555-5555-5555-555555555555',
  3,
  'Excelente técnica! Como chef profesional, aprecio las instrucciones detalladas sobre temperatura y tiempos. La salsa Picantay tiene el nivel de picante perfecto.',
  'Las técnicas están bien explicadas y el resultado es consistente. Lo he preparado varias veces en mi restaurante y los clientes lo aman.',
  NOW() - INTERVAL '2 days'
);

-- Ana García - Rating: 2 (Útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  2,
  '11111111-1111-1111-1111-111111111111',
  2,
  'Rico pero un poco picante para mi familia. Tuve que reducir la cantidad de salsa Picantay.',
  'La receta está bien explicada y el pollo queda jugoso, pero para niños pequeños es muy picante. La próxima vez usaré menos salsa.',
  NOW() - INTERVAL '4 days'
);

-- Carlos Mendoza - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  2,
  '22222222-2222-2222-2222-222222222222',
  3,
  'Increíble! El consejo de no mover el pollo es clave para el dorado perfecto. La salsa Picantay es espectacular.',
  'Me encanta cocinar y esta receta tiene todos los detalles técnicos correctos. El resultado es de restaurante.',
  NOW() - INTERVAL '1 day'
);

-- =======================================
-- RECETA 3: QUINUA REAL CON JINO ANDINO
-- =======================================

-- María Silva - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  3,
  '33333333-3333-3333-3333-333333333333',
  3,
  'Perfecto para alimentar bien a la familia! Nutritivo, sabroso y los niños también lo comen. La salsa Jino Andino le da un toque especial.',
  'Como madre, busco comidas nutritivas que les gusten a mis hijos. Esta receta es perfecta: sana, rica y fácil de hacer.',
  NOW() - INTERVAL '2 days'
);

-- Luis Vargas - Rating: 3 (Muy útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  3,
  '44444444-4444-4444-4444-444444444444',
  3,
  'Comida súper nutritiva y económica. La quinua real boliviana es de calidad y con la salsa Jino Andino queda deliciosa.',
  'Es económico, me llena bien y es saludable. Perfecto para estudiantes que queremos comer bien sin gastar mucho.',
  NOW() - INTERVAL '5 days'
);

-- Sofia Rojas - Rating: 2 (Útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  3,
  '55555555-5555-5555-5555-555555555555',
  2,
  'Buena base, pero le agregaría más vegetales y especias para darle más complejidad de sabores.',
  'Como chef, veo potencial en la receta pero siento que se puede mejorar con más ingredientes. Aún así, es una buena opción saludable.',
  NOW() - INTERVAL '3 days'
);

-- Ana García - Rating: 2 (Útil)
INSERT INTO recipe_reviews (
  recipe_id,
  user_id,
  usefulness_rating,
  comment,
  reason,
  created_at
) VALUES (
  3,
  '11111111-1111-1111-1111-111111111111',
  2,
  'Rica y nutritiva, aunque me tomó un poco más de tiempo del indicado. El queso fresco queda muy bien.',
  'Es saludable y a mi familia le gustó, pero tuve que cocinar la quinua un poco más tiempo. Tal vez depende del tipo de quinua.',
  NOW() - INTERVAL '1 day'
);

-- =======================================
-- VERIFICAR COMENTARIOS CREADOS
-- =======================================

-- Ver todos los comentarios con información del usuario
SELECT 
  rr.recipe_id,
  p.full_name,
  rr.usefulness_rating,
  rr.comment,
  rr.reason,
  rr.created_at
FROM recipe_reviews rr
JOIN profiles p ON rr.user_id = p.id
ORDER BY rr.recipe_id, rr.created_at DESC;

-- Estadísticas por receta
SELECT 
  recipe_id,
  COUNT(*) as total_reviews,
  ROUND(AVG(usefulness_rating::numeric), 2) as average_rating,
  COUNT(CASE WHEN usefulness_rating >= 2 THEN 1 END) as useful_count,
  ROUND((COUNT(CASE WHEN usefulness_rating >= 2 THEN 1 END)::numeric / COUNT(*)::numeric) * 100, 0) as usefulness_percentage
FROM recipe_reviews 
GROUP BY recipe_id
ORDER BY recipe_id;