import { useState } from "react";
import { FaStar, FaHeart, FaCommentDots, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { createRecipeReview, trackReviewEvent } from "../../utils/recipeReviews";

const RecipeReviewForm = ({ recipeId, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    usefulness_rating: 0,
    comment: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Opciones de valoración con emojis y colores
  const ratingOptions = [
    { 
      value: 1, 
      emoji: "😞", 
      label: "No útil",
      color: "text-red-500",
      bgColor: "bg-red-50 border-red-200",
      hoverColor: "hover:bg-red-100"
    },
    { 
      value: 2, 
      emoji: "😐", 
      label: "Útil",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 border-yellow-200",
      hoverColor: "hover:bg-yellow-100"
    },
    { 
      value: 3, 
      emoji: "😃", 
      label: "Muy útil",
      color: "text-green-500",
      bgColor: "bg-green-50 border-green-200",
      hoverColor: "hover:bg-green-100"
    }
  ];

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, usefulness_rating: rating }));
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug: Verificar usuario autenticado
    console.log('🔍 RecipeReviewForm - User from context:', user);
    
    // Validaciones
    if (formData.usefulness_rating === 0) {
      setError("Por favor selecciona una valoración");
      return;
    }

    if (!formData.reason.trim()) {
      setError("Por favor cuéntanos por qué te pareció así");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Usar la función de la API para crear review
      const { data, error } = await createRecipeReview({
        recipe_id: recipeId,
        usefulness_rating: formData.usefulness_rating,
        comment: formData.comment.trim() || null,
        reason: formData.reason.trim()
      });

      if (error) throw new Error(error);

      // Trackear en analytics
      trackReviewEvent('Recipe Review Submitted', {
        recipe_id: recipeId,
        rating: formData.usefulness_rating,
        has_comment: !!formData.comment.trim(),
        comment_length: formData.comment.trim().length,
        reason_length: formData.reason.trim().length
      });

      // Mostrar éxito
      setShowSuccess(true);
      setFormData({
        usefulness_rating: 0,
        comment: "",
        reason: ""
      });

      // Notificar al componente padre
      if (onReviewSubmitted) {
        onReviewSubmitted(data);
      }

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (err) {
      setError(err.message || "Error al enviar la valoración");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="text-green-600 text-4xl mb-3">✅</div>
        <h3 className="text-green-800 font-bold text-lg mb-2">¡Gracias por tu valoración!</h3>
        <p className="text-green-600">Tu opinión nos ayuda a mejorar nuestras recetas</p>
      </div>
    );
  }

  // Debug: Verificar que tenemos usuario
  console.log('🔍 RecipeReviewForm render - User:', user);
  
  if (!user) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-500 text-2xl mb-2">❌</div>
        <p className="text-red-600">Error: Usuario no autenticado</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <FaHeart className="text-red-500" />
          ¿Te pareció útil esta receta?
        </h3>
        <p className="text-gray-600">Tu opinión nos ayuda a mejorar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Escala de Valoración */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Califica la utilidad:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleRatingChange(option.value)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 text-center
                  ${formData.usefulness_rating === option.value 
                    ? `${option.bgColor} border-current ${option.color}` 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }
                  ${option.hoverColor}
                `}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className={`font-semibold text-sm ${
                  formData.usefulness_rating === option.value 
                    ? option.color 
                    : 'text-gray-600'
                }`}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Campo de Comentario Opcional */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FaCommentDots className="text-blue-500" />
            Comentario (opcional)
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Comparte tu experiencia preparando esta receta..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
            rows="3"
            maxLength="500"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.comment.length}/500 caracteres
          </div>
        </div>

        {/* Campo de Razón (Obligatorio) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🤔 Cuéntanos por qué: <span className="text-red-500">*</span>
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="¿Qué te gustó o no te gustó? ¿Fue fácil de seguir? ¿El resultado fue el esperado?"
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
            rows="3"
            maxLength="300"
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.reason.length}/300 caracteres
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting || formData.usefulness_rating === 0}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
            flex items-center justify-center gap-2
            ${formData.usefulness_rating === 0 || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Enviar Valoración
            </>
          )}
        </button>
      </form>

      {/* Nota sobre autenticación */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        💡 Necesitas estar registrado para dejar una valoración
      </div>
    </div>
  );
};

export default RecipeReviewForm;