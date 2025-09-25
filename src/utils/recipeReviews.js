// Funciones específicas para manejar reviews de recetas
import { supabase } from '../config/supabase';

// =======================================
// FUNCIONES DE REVIEWS
// =======================================

/**
 * Obtener todas las reviews de una receta con información del usuario
 * @param {number} recipeId - ID de la receta
 * @returns {Promise} - Reviews con datos del usuario
 */
export const getRecipeReviews = async (recipeId) => {
  try {
    console.log('🔍 getRecipeReviews called with recipeId:', recipeId);
    
    // Método alternativo: Consulta manual con RPC si el JOIN automático falla
    const { data, error } = await supabase
      .rpc('get_recipe_reviews_with_profiles', { 
        recipe_id_param: recipeId 
      });

    console.log('📡 Supabase RPC response - data:', data, 'error:', error);

    // Si el RPC falla, intentar el método original
    if (error) {
      console.log('🔄 RPC failed, trying original method...');
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('recipe_reviews')
        .select(`
          *,
          profiles (
            full_name,
            role
          )
        `)
        .eq('recipe_id', recipeId)
        .order('created_at', { ascending: false });

      if (fallbackError) throw fallbackError;
      return { data: fallbackData, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error('❌ Error fetching recipe reviews:', err);
    return { data: null, error: err.message };
  }
};

/**
 * Crear una nueva review para una receta
 * @param {Object} reviewData - Datos de la review
 * @returns {Promise} - Review creada
 */
export const createRecipeReview = async (reviewData) => {
  try {
    // Verificar que el usuario esté autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Debes estar autenticado para dejar una valoración");
    }

    // Verificar si el usuario ya tiene una review para esta receta
    const { data: existingReview } = await supabase
      .from('recipe_reviews')
      .select('id')
      .eq('recipe_id', reviewData.recipe_id)
      .eq('user_id', user.id)
      .single();

    if (existingReview) {
      throw new Error("Ya has valorado esta receta anteriormente");
    }

    // Crear la nueva review
    const { data, error } = await supabase
      .from('recipe_reviews')
      .insert({
        recipe_id: reviewData.recipe_id,
        user_id: user.id,
        usefulness_rating: reviewData.usefulness_rating,
        comment: reviewData.comment || null,
        reason: reviewData.reason
      })
      .select(`
        *,
        profiles (
          full_name,
          role
        )
      `)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating recipe review:', err);
    return { data: null, error: err.message };
  }
};

/**
 * Obtener estadísticas de reviews de una receta
 * @param {number} recipeId - ID de la receta
 * @returns {Promise} - Estadísticas calculadas
 */
export const getRecipeStats = async (recipeId) => {
  try {
    console.log('📊 getRecipeStats called with recipeId:', recipeId);
    
    const { data: reviews, error } = await supabase
      .from('recipe_reviews')
      .select('usefulness_rating')
      .eq('recipe_id', recipeId);

    console.log('📡 Supabase stats response - reviews:', reviews, 'error:', error);

    if (error) throw error;

    if (!reviews || reviews.length === 0) {
      console.log('📈 No reviews found, returning empty stats');
      return {
        data: {
          totalReviews: 0,
          averageRating: 0,
          distribution: { 1: 0, 2: 0, 3: 0 },
          usefulnessPercentage: 0
        },
        error: null
      };
    }

    const totalReviews = reviews.length;
    const ratings = reviews.map(review => review.usefulness_rating);
    
    console.log('📊 Processing stats for', totalReviews, 'reviews with ratings:', ratings);
    
    // Promedio
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / totalReviews;
    
    // Distribución
    const distribution = {
      1: ratings.filter(r => r === 1).length,
      2: ratings.filter(r => r === 2).length,
      3: ratings.filter(r => r === 3).length
    };
    
    // Porcentaje de utilidad (rating 2 y 3)
    const usefulCount = ratings.filter(r => r >= 2).length;
    const usefulnessPercentage = Math.round((usefulCount / totalReviews) * 100);
    
    const statsData = {
      totalReviews,
      averageRating,
      distribution,
      usefulnessPercentage
    };
    
    console.log('✅ Stats calculated successfully:', statsData);
    
    return {
      data: statsData,
      error: null
    };
  } catch (err) {
    console.error('❌ Error calculating recipe stats:', err);
    return { data: null, error: err.message };
  }
};

/**
 * Verificar si un usuario ya ha valorado una receta
 * @param {number} recipeId - ID de la receta
 * @param {string} userId - ID del usuario (opcional, usa el actual si no se proporciona)
 * @returns {Promise} - Review existente o null
 */
export const getUserReviewForRecipe = async (recipeId, userId = null) => {
  try {
    let currentUserId = userId;
    
    if (!currentUserId) {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.log('🔍 getUserReviewForRecipe: No user authenticated');
        return { data: null, error: null }; // Usuario no autenticado
      }
      currentUserId = user.id;
    }

    console.log('🔍 getUserReviewForRecipe: Searching for review', { 
      recipeId, 
      userId: currentUserId 
    });

    const { data, error } = await supabase
      .from('recipe_reviews')
      .select('*')
      .eq('recipe_id', recipeId)
      .eq('user_id', currentUserId)
      .single();

    console.log('🔍 getUserReviewForRecipe: Query result', { 
      data, 
      error,
      errorCode: error?.code 
    });

    // Si no encuentra review, no es un error
    if (error && error.code === 'PGRST116') {
      console.log('✅ getUserReviewForRecipe: No review found (expected)');
      return { data: null, error: null };
    }

    if (error) {
      console.error('❌ getUserReviewForRecipe: Unexpected error', error);
      throw error;
    }

    console.log('✅ getUserReviewForRecipe: Review found', data);
    return { data, error: null };
  } catch (err) {
    console.error('❌ getUserReviewForRecipe: Exception caught', err);
    return { data: null, error: err.message };
  }
};

/**
 * Actualizar una review existente
 * @param {string} reviewId - ID de la review
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise} - Review actualizada
 */
export const updateRecipeReview = async (reviewId, updateData) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Debes estar autenticado para actualizar una valoración");
    }

    const { data, error } = await supabase
      .from('recipe_reviews')
      .update({
        usefulness_rating: updateData.usefulness_rating,
        comment: updateData.comment || null,
        reason: updateData.reason,
        updated_at: new Date().toISOString()
      })
      .eq('id', reviewId)
      .eq('user_id', user.id) // Solo permitir actualizar sus propias reviews
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating recipe review:', err);
    return { data: null, error: err.message };
  }
};

/**
 * Eliminar una review
 * @param {string} reviewId - ID de la review
 * @returns {Promise} - Confirmación de eliminación
 */
export const deleteRecipeReview = async (reviewId) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error("Debes estar autenticado para eliminar una valoración");
    }

    const { error } = await supabase
      .from('recipe_reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id); // Solo permitir eliminar sus propias reviews

    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    console.error('Error deleting recipe review:', err);
    return { success: false, error: err.message };
  }
};

// =======================================
// FUNCIONES DE ANALYTICS
// =======================================

/**
 * Trackear evento de review en analytics
 * @param {string} eventName - Nombre del evento
 * @param {Object} eventData - Datos del evento
 */
export const trackReviewEvent = (eventName, eventData) => {
  try {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', eventName, {
        ...eventData,
        timestamp: new Date().toISOString(),
        environment: import.meta.env.DEV ? 'development' : 'production'
      });
    }
  } catch (error) {
    console.error('Error tracking review event:', error);
  }
};

/**
 * Obtener reviews más recientes de todas las recetas (para dashboard)
 * @param {number} limit - Número máximo de reviews a obtener
 * @returns {Promise} - Reviews recientes
 */
export const getRecentReviews = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('recipe_reviews')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching recent reviews:', err);
    return { data: null, error: err.message };
  }
};

// =======================================
// EXPORTAR TODAS LAS FUNCIONES
// =======================================

export const recipeReviewsAPI = {
  getRecipeReviews,
  createRecipeReview,
  getRecipeStats,
  getUserReviewForRecipe,
  updateRecipeReview,
  deleteRecipeReview,
  trackReviewEvent,
  getRecentReviews
};