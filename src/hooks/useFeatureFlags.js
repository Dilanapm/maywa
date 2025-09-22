// Hook personalizado para usar feature flags con Vercel Analytics
// Como el paquete @vercel/flags tiene limitaciones, usamos una implementación manual
// que se integra bien con Analytics

// Definir los feature flags disponibles
export const FEATURE_FLAGS = {
  SHOW_NEW_RECIPE_SECTION: 'show-new-recipe-section',
  ENABLE_ADVANCED_ANALYTICS: 'enable-advanced-analytics',
  SHOW_PREMIUM_FEATURES: 'show-premium-features',
  ENABLE_NEWSLETTER_POPUP: 'enable-newsletter-popup',
  SHOW_BETA_DASHBOARD: 'show-beta-dashboard'
};

// Configuración de flags - puede ser gestionada desde variables de entorno
const getFeatureFlagConfig = () => {
  // En desarrollo, habilitamos algunos flags para testing
  const isDevelopment = import.meta.env.DEV;
  
  return {
    [FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION]: isDevelopment || false,
    [FEATURE_FLAGS.ENABLE_ADVANCED_ANALYTICS]: true, // Siempre habilitado para Analytics
    [FEATURE_FLAGS.SHOW_PREMIUM_FEATURES]: isDevelopment || false,
    [FEATURE_FLAGS.ENABLE_NEWSLETTER_POPUP]: false,
    [FEATURE_FLAGS.SHOW_BETA_DASHBOARD]: isDevelopment || false
  };
};

// Hook personalizado para usar feature flags
export const useFeatureFlags = () => {
  const config = getFeatureFlagConfig();
  
  // Función para trackear el uso de feature flags en Analytics
  const trackFeatureFlag = (flagKey, enabled) => {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'Feature Flag Used', {
        flag: flagKey,
        enabled: enabled,
        timestamp: new Date().toISOString()
      });
    }
  };
  
  return {
    // Función helper para verificar si un flag está habilitado
    isEnabled: (flagKey) => {
      const enabled = config[flagKey] || false;
      trackFeatureFlag(flagKey, enabled);
      return enabled;
    },
    
    // Getter directo para cada flag
    get showNewRecipeSection() {
      const enabled = config[FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION];
      trackFeatureFlag(FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION, enabled);
      return enabled;
    },
    
    get enableAdvancedAnalytics() {
      const enabled = config[FEATURE_FLAGS.ENABLE_ADVANCED_ANALYTICS];
      trackFeatureFlag(FEATURE_FLAGS.ENABLE_ADVANCED_ANALYTICS, enabled);
      return enabled;
    },
    
    get showPremiumFeatures() {
      const enabled = config[FEATURE_FLAGS.SHOW_PREMIUM_FEATURES];
      trackFeatureFlag(FEATURE_FLAGS.SHOW_PREMIUM_FEATURES, enabled);
      return enabled;
    },
    
    get enableNewsletterPopup() {
      const enabled = config[FEATURE_FLAGS.ENABLE_NEWSLETTER_POPUP];
      trackFeatureFlag(FEATURE_FLAGS.ENABLE_NEWSLETTER_POPUP, enabled);
      return enabled;
    },
    
    get showBetaDashboard() {
      const enabled = config[FEATURE_FLAGS.SHOW_BETA_DASHBOARD];
      trackFeatureFlag(FEATURE_FLAGS.SHOW_BETA_DASHBOARD, enabled);
      return enabled;
    },
    
    // Acceso a toda la configuración
    config
  };
};

export default useFeatureFlags;