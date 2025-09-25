import { useState, useEffect } from "react";
import { FaHeart, FaComments } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import RecipeReviewForm from "./RecipeReviewForm";
import RecipeStats from "./RecipeStats";
import RecipeCommentsList from "./RecipeCommentsList";
import { 
  getRecipeReviews, 
  getRecipeStats, 
  getUserReviewForRecipe,
  trackReviewEvent 
} from "../../utils/recipeReviews";

const RecipeReviewSection = ({ recipeId, recipeName }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReviewLoading, setUserReviewLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Solo cargar reviews cuando cambie el recipeId
    loadReviews();
  }, [recipeId]);

  useEffect(() => {
    // Solo verificar user review cuando cambie el usuario o recipeId
    if (user?.id) {
      checkUserReview();
    } else {
      setUserReview(null);
      setUserReviewLoading(false);
    }
  }, [recipeId, user?.id]); // Usar user.id en lugar de user completo

  const checkUserReview = async () => {
    if (user?.id) {
      try {
        setUserReviewLoading(true);
        console.log('🔍 Checking user review for:', { userId: user.id, recipeId });
        
        const { data: existingReview, error } = await getUserReviewForRecipe(recipeId);
        
        console.log('🔍 getUserReviewForRecipe result:', { existingReview, error });
        
        setUserReview(existingReview);
        console.log('✅ User review check complete:', { 
          userId: user.id, 
          recipeId,
          hasReview: !!existingReview,
          reviewData: existingReview 
        });
      } catch (error) {
        console.log('❌ Error checking user review:', error);
        setUserReview(null);
      } finally {
        setUserReviewLoading(false);
      }
    } else {
      console.log('🔍 No user authenticated, clearing review state');
      setUserReview(null);
      setUserReviewLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      setLoading(true);
      
      // 🐛 Debug: Log para verificar qué está pasando
      console.log('🔍 Loading reviews for recipe ID:', recipeId);
      
      // Cargar reviews y estadísticas en paralelo
      const [reviewsResult, statsResult] = await Promise.all([
        getRecipeReviews(recipeId),
        getRecipeStats(recipeId)
      ]);

      // 🐛 Debug: Log de resultados
      console.log('📊 Reviews result:', reviewsResult);
      console.log('📈 Stats result:', statsResult);

      if (reviewsResult.error) {
        console.error('❌ Error loading reviews:', reviewsResult.error);
      } else {
        console.log('✅ Reviews loaded successfully:', reviewsResult.data?.length, 'reviews');
        setReviews(reviewsResult.data || []);
      }

      if (statsResult.error) {
        console.error('❌ Error loading stats:', statsResult.error);
      } else {
        console.log('✅ Stats loaded successfully:', statsResult.data);
        setStats(statsResult.data);
      }

    } catch (error) {
      console.error('Error loading reviews and stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = async (newReview) => {
    console.log('✅ Review submitted:', newReview);
    
    // Actualizar el estado local inmediatamente
    setUserReview(newReview);
    
    // Recargar la lista de reviews para mostrar el nuevo comentario
    await loadReviews();
    
    // Track adicional en analytics si está disponible
    trackReviewEvent('Recipe Review Submitted Success', {
      recipe_id: recipeId,
      recipe_name: recipeName,
      rating: newReview.usefulness_rating,
      has_comment: !!newReview.comment
    });
  };

  // Mostrar loading si aún se está verificando la autenticación
  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header de la sección */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <FaHeart className="text-red-500" />
          Valoraciones y Comentarios
          <FaComments className="text-blue-500" />
        </h2>
        <p className="text-gray-600">
          Comparte tu experiencia con <span className="font-semibold">{recipeName}</span>
        </p>
      </div>

      {/* Estadísticas */}
      <RecipeStats stats={stats} loading={loading} />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulario de valoración */}
        <div>
          {console.log('🔍 Render check:', { 
            user: !!user, 
            userReview: !!userReview, 
            authLoading, 
            userReviewLoading 
          })}
          {!user ? (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <div className="text-blue-500 text-4xl mb-3">🔐</div>
              <h3 className="text-blue-800 font-bold text-lg mb-2">¡Únete a la comunidad!</h3>
              <p className="text-blue-600 mb-4">
                Regístrate para valorar recetas y compartir tu experiencia
              </p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Registrarse / Iniciar Sesión
              </button>
            </div>
          ) : userReviewLoading ? (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
              <p className="text-gray-600">Verificando tu valoración...</p>
            </div>
          ) : userReview ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
              <div className="text-green-600 text-4xl mb-3">✅</div>
              <h3 className="text-green-800 font-bold text-lg mb-2">¡Ya valoraste esta receta!</h3>
              <p className="text-green-600 mb-3">
                Tu valoración: {userReview.usefulness_rating === 1 ? '😞 No útil' : 
                              userReview.usefulness_rating === 2 ? '😐 Útil' : '😃 Muy útil'}
              </p>
              <p className="text-green-600 text-sm">
                Gracias por compartir tu experiencia con la comunidad
              </p>
            </div>
          ) : (
            <RecipeReviewForm 
              recipeId={recipeId} 
              onReviewSubmitted={handleReviewSubmitted}
            />
          )}
        </div>

        {/* Lista de comentarios */}
        <div>
          {/* 🐛 Debug: Log antes de pasar al componente */}
          {console.log('🔄 RecipeReviewSection - Passing reviews to RecipeCommentsList:', reviews)}
          <RecipeCommentsList reviews={reviews} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default RecipeReviewSection;