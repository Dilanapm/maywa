import { FaStar, FaUsers, FaChartBar } from "react-icons/fa";

const RecipeStats = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const {
    totalReviews = 0,
    averageRating = 0,
    distribution = { 1: 0, 2: 0, 3: 0 },
    usefulnessPercentage = 0
  } = stats;

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

  const getPercentage = (count, total) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <FaChartBar className="text-blue-600 text-xl" />
        <h3 className="text-lg font-bold text-gray-900">Estadísticas de la Receta</h3>
      </div>

      {totalReviews === 0 ? (
        <div className="text-center py-4">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-600">¡Sé el primero en valorar esta receta!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Resumen Principal */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{usefulnessPercentage}%</div>
              <div className="text-sm text-gray-600">Lo encuentra útil</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                {averageRating.toFixed(1)} {getRatingEmoji(Math.round(averageRating))}
              </div>
              <div className="text-sm text-gray-600">Puntuación media</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                <FaUsers className="text-lg" />
                {totalReviews}
              </div>
              <div className="text-sm text-gray-600">
                {totalReviews === 1 ? 'Valoración' : 'Valoraciones'}
              </div>
            </div>
          </div>

          {/* Distribución de Ratings */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 text-sm">Distribución de valoraciones:</h4>
            {[3, 2, 1].map((rating) => {
              const count = distribution[rating] || 0;
              const percentage = getPercentage(count, totalReviews);
              
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-lg">{getRatingEmoji(rating)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {getRatingLabel(rating)}
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        rating === 3 ? 'bg-green-500' :
                        rating === 2 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-gray-600 w-12 text-right">
                    {count} ({percentage}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeStats;