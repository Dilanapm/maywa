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
    // Flags de producción - controlados por variables de entorno de Vercel
    [FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION]: 
      import.meta.env.VITE_FLAG_NEW_RECIPE_SECTION === 'true' || isDevelopment,
    
    [FEATURE_FLAGS.ENABLE_ADVANCED_ANALYTICS]: 
      import.meta.env.VITE_FLAG_ADVANCED_ANALYTICS !== 'false', // Por defecto habilitado
    
    [FEATURE_FLAGS.SHOW_PREMIUM_FEATURES]: 
      import.meta.env.VITE_FLAG_PREMIUM_FEATURES === 'true' || isDevelopment,
    
    [FEATURE_FLAGS.ENABLE_NEWSLETTER_POPUP]: 
      import.meta.env.VITE_FLAG_NEWSLETTER_POPUP === 'true',
    
    [FEATURE_FLAGS.SHOW_BETA_DASHBOARD]: 
      import.meta.env.VITE_FLAG_BETA_DASHBOARD === 'true' || isDevelopment
  };
};

// Hook personalizado para usar feature flags
export const useFeatureFlags = () => {
  const config = getFeatureFlagConfig();
  
  // 🐛 Debug logs solo en desarrollo
  if (import.meta.env.DEV) {
    console.log('🚩 Feature Flags Config:', config);
  }
  
  // Función para trackear el uso de feature flags en Analytics
  const trackFeatureFlag = (flagKey, enabled) => {
    // 🐛 Debug tracking solo en desarrollo
    if (import.meta.env.DEV) {
      console.log(`🚩 Flag "${flagKey}":`, enabled ? '✅ ENABLED' : '❌ DISABLED');
    }
    
    // 📊 Analytics tracking en todos los entornos
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'Feature Flag Used', {
        flag: flagKey,
        enabled: enabled,
        timestamp: new Date().toISOString(),
        environment: import.meta.env.DEV ? 'development' : 'production'
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