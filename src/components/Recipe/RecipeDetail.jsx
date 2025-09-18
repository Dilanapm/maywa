import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaChevronLeft, FaClock, FaUsers, FaUtensils, FaCheckCircle } from "react-icons/fa";
import majoyaba2 from "../../assets/majoyaba2.jpg";
import picantay2 from "../../assets/picantay2.jpg";
import jino2 from "../../assets/jino2.jpg";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Hacer scroll hacia arriba cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // Se ejecuta cada vez que cambia el ID de la receta

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
      salsaDescription: "Nuestra salsa Majoyaba combina choclos crocantes con especias bolivianas tradicionales, creando una textura única que complementa perfectamente cualquier empanada.",
      ingredients: [
        "8 empanadas salteñas",
        "2 cucharadas de salsa Majoyaba",
        "1 limón grande cortado en gajos",
        "Hojas de lechuga fresca",
        "1 tomate cortado en rodajas (opcional)"
      ],
      instructions: [
        "Precalienta el horno a 180°C. Coloca las empanadas en una bandeja para horno.",
        "Calienta las empanadas durante 10-15 minutos hasta que estén doradas y crujientes.",
        "Mientras tanto, lava y seca las hojas de lechuga. Corta el limón en gajos.",
        "Retira las empanadas del horno y déjalas reposar 2-3 minutos.",
        "Sirve en platos individuales sobre una cama de lechuga fresca.",
        "Agrega una cucharada generosa de salsa Majoyaba sobre cada empanada.",
        "Acompaña con gajos de limón y rodajas de tomate si lo deseas.",
        "¡Disfruta inmediatamente mientras están calientes y crujientes!"
      ],
      tips: [
        "Para empanadas extra crujientes, córtalas por la mitad antes de servir",
        "La salsa Majoyaba es perfecta a temperatura ambiente",
        "Puedes agregar cebolla morada en juliana para más sabor"
      ],
      nutritionalInfo: {
        calories: "320 por porción",
        protein: "12g",
        carbs: "28g",
        fat: "18g"
      }
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
      salsaDescription: "Picantay es nuestra salsa estrella, elaborada con rocoto boliviano y especias secretas que le dan ese picor balanceado y sabor profundo que caracteriza nuestra marca.",
      ingredients: [
        "2 pechugas de pollo grandes (aproximadamente 300g cada una)",
        "3 cucharadas de salsa Picantay",
        "Sal marina al gusto",
        "Pimienta negra molida",
        "1 cucharada de aceite de oliva",
        "2 tazas de arroz blanco para acompañar",
        "Vegetales salteados (opcional)"
      ],
      instructions: [
        "Retira el pollo del refrigerador 15 minutos antes de cocinar para que alcance temperatura ambiente.",
        "Sazona generosamente las pechugas con sal marina y pimienta negra por ambos lados.",
        "Calienta una plancha o sartén de hierro fundido a fuego medio-alto.",
        "Agrega el aceite de oliva y espera a que esté bien caliente.",
        "Coloca las pechugas en la plancha y cocina 8-10 minutos sin mover.",
        "Voltea cuidadosamente y cocina otros 8-10 minutos hasta que estén doradas.",
        "Verifica que la temperatura interna sea de 75°C con un termómetro.",
        "Retira del fuego y deja reposar 5 minutos antes de cortar.",
        "Sirve inmediatamente con una generosa porción de salsa Picantay encima.",
        "Acompaña con arroz blanco caliente y vegetales al gusto."
      ],
      tips: [
        "No muevas el pollo mientras se cocina para lograr el dorado perfecto",
        "La salsa Picantay se puede calentar ligeramente para intensificar el sabor",
        "Deja reposar el pollo para que conserve todos sus jugos"
      ],
      nutritionalInfo: {
        calories: "420 por porción",
        protein: "35g",
        carbs: "15g",
        fat: "25g"
      }
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
      salsaDescription: "Jino Andino representa la esencia de nuestros Andes bolivianos, con una mezcla de hierbas aromáticas y especias que transportan directamente a los valles de nuestro país.",
      ingredients: [
        "1 taza de quinua real boliviana",
        "2 cucharadas de salsa Jino Andino",
        "1 taza de vegetales mixtos (zanahoria, brócoli, pimientos)",
        "150g de queso fresco cortado en cubitos",
        "2 tazas de caldo de verduras casero",
        "1 cebolla mediana picada finamente",
        "2 dientes de ajo picados",
        "Aceite de oliva extra virgen"
      ],
      instructions: [
        "Enjuaga la quinua bajo agua fría en un colador fino hasta que el agua salga clara.",
        "En una olla mediana, calienta una cucharada de aceite de oliva.",
        "Sofríe la cebolla picada hasta que esté transparente (3-4 minutos).",
        "Agrega el ajo picado y cocina 1 minuto más hasta que esté aromático.",
        "Incorpora la quinua lavada y revuelve durante 2 minutos.",
        "Vierte el caldo de verduras caliente y lleva a ebullición.",
        "Reduce el fuego, tapa y cocina a fuego lento durante 15 minutos.",
        "Mientras tanto, saltea los vegetales mixtos en otra sartén hasta que estén tiernos pero crujientes.",
        "Una vez que la quinua haya absorbido todo el líquido, mezcla con los vegetales salteados.",
        "Incorpora los cubitos de queso fresco con cuidado.",
        "Termina agregando la salsa Jino Andino al gusto y mezcla suavemente.",
        "Sirve caliente y disfruta de este nutritivo plato andino."
      ],
      tips: [
        "La quinua debe quedar suelta, no pastosa - no la revuelvas demasiado",
        "El queso fresco se debe agregar al final para que no se derrita completamente",
        "Jino Andino se puede agregar tanto durante la cocción como al servir"
      ],
      nutritionalInfo: {
        calories: "380 por porción",
        protein: "18g",
        carbs: "45g",
        fat: "12g"
      }
    }
  ];

  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Receta no encontrada</h2>
          <button 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Fácil": return "text-green-600 bg-green-100";
      case "Intermedio": return "text-orange-600 bg-orange-100";
      case "Difícil": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{backgroundImage: `url(${recipe.image})`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <button 
              onClick={() => {
                navigate('/', { replace: true });
                // Hacer scroll a la sección de recetas después de una pequeña pausa
                setTimeout(() => {
                  const recetasSection = document.getElementById('recetas');
                  if (recetasSection) {
                    recetasSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="flex items-center gap-2 text-white mb-6 hover:text-orange-300 transition-colors"
            >
              <FaChevronLeft />
              <span>Volver a recetas</span>
            </button>
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Con {recipe.salsa}
                </span>
              </div>
              <h1 className="font-bebas text-5xl md:text-7xl text-white mb-4">
                {recipe.title}
              </h1>
              <p className="text-white text-xl max-w-xl">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Recipe Info */}
          <div className="md:col-span-2">
            
            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <FaClock className="text-red-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Tiempo</p>
                    <p className="font-bold text-gray-900">{recipe.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-red-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Porciones</p>
                    <p className="font-bold text-gray-900">{recipe.servings}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUtensils className="text-red-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-600">Dificultad</p>
                    <p className="font-bold text-gray-900">{recipe.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About the Salsa */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8">
              <h3 className="font-bebas text-2xl text-gray-900 mb-4">
                Sobre la salsa {recipe.salsa}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {recipe.salsaDescription}
              </p>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="font-bebas text-2xl text-gray-900 mb-6">Ingredientes</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="font-bebas text-2xl text-gray-900 mb-6">Preparación paso a paso</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-xl p-6 shadow-lg">
              <h3 className="font-bebas text-2xl text-gray-900 mb-6">💡 Consejos del Chef</h3>
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Nutritional Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bebas text-xl text-gray-900 mb-4">Información Nutricional</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calorías:</span>
                  <span className="font-bold">{recipe.nutritionalInfo.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Proteínas:</span>
                  <span className="font-bold">{recipe.nutritionalInfo.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbohidratos:</span>
                  <span className="font-bold">{recipe.nutritionalInfo.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grasas:</span>
                  <span className="font-bold">{recipe.nutritionalInfo.fat}</span>
                </div>
              </div>
            </div>

            {/* Salsa Product */}
            <div className="bg-red-600 text-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bebas text-xl mb-4">¿No tienes {recipe.salsa}?</h4>
              <p className="text-red-100 mb-4 text-sm">
                Consigue nuestra auténtica salsa {recipe.salsa} y lleva tus platos al siguiente nivel.
              </p>
              <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold w-full hover:bg-red-50 transition-colors">
                Comprar {recipe.salsa}
              </button>
            </div>

            {/* Share Recipe */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="font-bebas text-xl text-gray-900 mb-4">Compartir Receta</h4>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm">
                  Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 px-3 rounded text-sm">
                  Twitter
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Recipes */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="font-bebas text-3xl text-gray-900 mb-8 text-center">
            Otras recetas que te pueden gustar
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {recipes.filter(r => r.id !== recipe.id).slice(0, 2).map((relatedRecipe) => (
              <div 
                key={relatedRecipe.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {
                  navigate(`/receta/${relatedRecipe.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <img src={relatedRecipe.image} alt={relatedRecipe.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="font-bebas text-xl text-gray-900 mb-2">{relatedRecipe.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{relatedRecipe.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(relatedRecipe.difficulty)}`}>
                      {relatedRecipe.difficulty}
                    </span>
                    <span className="text-red-600 font-bold text-sm">Ver receta →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;