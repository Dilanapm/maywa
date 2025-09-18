import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaClock, FaUsers, FaUtensils } from "react-icons/fa";
import majoyaba2 from "../../../assets/majoyaba2.jpg";
import picantay2 from "../../../assets/picantay2.jpg";
import jino2 from "../../../assets/jino2.jpg";

const RecipeSection = () => {
  const [activeRecipe, setActiveRecipe] = useState(0);
  const navigate = useNavigate();

  const recipes = [
    {
      id: 1,
      title: "Empanadas con Majoyaba",
      description: "Empanadas salteñas tradicionales con el toque crocante de Majoyaba",
      image: majoyaba2,
      difficulty: "Fácil",
      time: "30 min",
      servings: "4 personas",
      salsa: "Majoyaba",
      ingredients: [
        "8 empanadas salteñas",
        "2 cucharadas de salsa Majoyaba",
        "1 limón",
        "Hojas de lechuga"
      ],
      instructions: [
        "Calienta las empanadas en el horno",
        "Sirve en platos individuales",
        "Agrega una cucharada de Majoyaba por empanada",
        "Acompaña con hojas de lechuga y limón",
        "¡Disfruta el sabor crocante!"
      ]
    },
    {
      id: 2,
      title: "Pollo a la Plancha con Picantay",
      description: "Pollo jugoso con el toque picante perfecto de nuestra salsa Picantay",
      image: picantay2,
      difficulty: "Intermedio",
      time: "45 min",
      servings: "2 personas",
      salsa: "Picantay",
      ingredients: [
        "2 pechugas de pollo",
        "3 cucharadas de salsa Picantay",
        "Sal y pimienta",
        "1 cucharada de aceite",
        "Arroz blanco para acompañar"
      ],
      instructions: [
        "Sazona el pollo con sal y pimienta",
        "Calienta la plancha con aceite",
        "Cocina el pollo 8 minutos por lado",
        "Sirve caliente con una generosa porción de Picantay",
        "Acompaña con arroz blanco"
      ]
    },
    {
      id: 3,
      title: "Quinua Real con Jino Andino",
      description: "Plato nutritivo que combina la quinua boliviana con los sabores únicos de Jino Andino",
      image: jino2,
      difficulty: "Fácil",
      time: "25 min",
      servings: "3 personas",
      salsa: "Jino Andino",
      ingredients: [
        "1 taza de quinua real",
        "2 cucharadas de salsa Jino Andino",
        "Vegetales mixtos",
        "Queso fresco",
        "2 tazas de caldo de verduras"
      ],
      instructions: [
        "Lava y cocina la quinua en caldo de verduras",
        "Saltea los vegetales mixtos",
        "Mezcla la quinua cocida con los vegetales",
        "Agrega cubitos de queso fresco",
        "Termina con Jino Andino al gusto"
      ]
    }
  ];

  const nextRecipe = () => {
    setActiveRecipe((prev) => (prev + 1) % recipes.length);
  };

  const prevRecipe = () => {
    setActiveRecipe((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[activeRecipe];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "text-green-600 bg-green-100";
      case "Intermedio": return "text-orange-600 bg-orange-100";
      case "Difícil": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div id="recetas" className="w-full bg-gradient-to-br from-orange-50 to-red-50 md:py-24 py-8">
      <div className="max-w-7xl mx-auto md:px-32 px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-red-600"></div>
            <p className="font-roboto text-base md:text-lg font-semibold text-red-600 uppercase">
              Cocina con MAYWA
            </p>
          </div>
          <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 leading-tight mb-4">
            Recetas que Despiertan Sabores
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubre cómo nuestras salsas artesanales transforman platos tradicionales en experiencias gastronómicas únicas
          </p>
        </div>

        {/* Recipe Navigation */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button 
            onClick={prevRecipe}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <FaChevronLeft className="text-red-600" />
          </button>
          
          <div className="flex gap-2">
            {recipes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveRecipe(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeRecipe ? "bg-red-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextRecipe}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <FaChevronRight className="text-red-600" />
          </button>
        </div>

        {/* Main Recipe Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            
            {/* Recipe Image */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <img 
                  src={currentRecipe.image} 
                  alt={currentRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentRecipe.difficulty)}`}>
                    {currentRecipe.difficulty}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Con {currentRecipe.salsa}
                </div>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="md:w-1/2 p-8">
              <h3 className="font-bebas text-3xl md:text-4xl text-gray-900 mb-2">
                {currentRecipe.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentRecipe.description}
              </p>

              {/* Recipe Stats */}
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FaClock className="text-red-600" />
                  <span className="text-sm text-gray-700">{currentRecipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-red-600" />
                  <span className="text-sm text-gray-700">{currentRecipe.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-red-600" />
                  <span className="text-sm text-gray-700">{currentRecipe.difficulty}</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h4 className="font-bold text-lg text-gray-900 mb-3">Ingredientes:</h4>
                <ul className="space-y-2">
                  {currentRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Instructions Preview */}
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Preparación:</h4>
                <ol className="space-y-2">
                  {currentRecipe.instructions.slice(0, 3).map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </li>
                  ))}
                  {currentRecipe.instructions.length > 3 && (
                    <li className="text-gray-500 text-sm ml-9">
                      ... y {currentRecipe.instructions.length - 3} pasos más
                    </li>
                  )}
                </ol>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button 
                  onClick={() => {
                    navigate(`/receta/${currentRecipe.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold uppercase transition-colors"
                >
                  Ver Receta Completa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="font-bebas text-2xl md:text-3xl text-gray-900 mb-6 text-center">
            💡 Consejos de los Chefs MAYWA
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌶️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Intensidad Perfecta</h4>
              <p className="text-gray-600 text-sm">Comienza con poca cantidad y ajusta según tu tolerancia al picante</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Conservación</h4>
              <p className="text-gray-600 text-sm">Mantén refrigeradas después de abrir para preservar el sabor</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Maridaje</h4>
              <p className="text-gray-600 text-sm">Cada salsa resalta diferentes sabores, experimenta y encuentra tu favorita</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSection;