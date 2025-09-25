import { useState } from "react";
import { FaUser, FaClock, FaCommentDots } from "react-icons/fa";

const RecipeCommentsList = ({ reviews, loading = false }) => {
  const [showAll, setShowAll] = useState(false);

  // 🐛 Debug: Log para verificar qué recibe el componente
  console.log('🗨️ RecipeCommentsList - Reviews received:', reviews);
  console.log('🗨️ RecipeCommentsList - Reviews length:', reviews?.length);
  console.log('🗨️ RecipeCommentsList - Loading:', loading);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
        <FaCommentDots className="text-gray-400 text-4xl mx-auto mb-3" />
        <h3 className="text-gray-600 font-semibold mb-2">No hay comentarios aún</h3>
        <p className="text-gray-500 text-sm">¡Sé el primero en compartir tu experiencia!</p>
      </div>
    );
  }

  const getRatingEmoji = (rating) => {
    switch(rating) {
      case 1: return "😞";
      case 2: return "😐";
      case 3: return "😃";
      default: return "⭐";
    }
  };

  const getRatingLabel = (rating) => {
    switch(rating) {
      case 1: return "No útil";
      case 2: return "Útil";
      case 3: return "Muy útil";
      default: return "";
    }
  };

  const getRatingColor = (rating) => {
    switch(rating) {
      case 1: return "text-red-600 bg-red-50";
      case 2: return "text-yellow-600 bg-yellow-50";
      case 3: return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "hace unos minutos";
    if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `hace ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FaCommentDots className="text-blue-500" />
          Comentarios de la comunidad ({reviews.length})
        </h3>
      </div>

      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header del comentario */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {review.profiles?.full_name 
                    ? review.profiles.full_name.charAt(0).toUpperCase()
                    : <FaUser />
                  }
                </div>
                
                {/* Nombre y fecha */}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.profiles?.full_name || 'Usuario anónimo'}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaClock className="text-xs" />
                    {formatDate(review.created_at)}
                  </div>
                </div>
              </div>

              {/* Rating badge */}
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(review.usefulness_rating)}`}>
                {getRatingEmoji(review.usefulness_rating)} {getRatingLabel(review.usefulness_rating)}
              </div>
            </div>

            {/* Contenido del comentario */}
            <div className="space-y-3">
              {/* Comentario principal */}
              {review.comment && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              )}

              {/* Razón */}
              {review.reason && (
                <div>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-gray-800">Porque:</span> {review.reason}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón para mostrar más */}
      {reviews.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            {showAll 
              ? `Mostrar menos comentarios`
              : `Ver todos los comentarios (${reviews.length - 5} más)`
            }
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCommentsList;