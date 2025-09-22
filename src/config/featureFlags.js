// Configuración de Feature Flags para Vercel
// Este archivo será usado por Vercel para gestionar los flags

export const featureFlagConfig = {
  // Mostrar nueva sección de recetas premium
  'show-new-recipe-section': {
    description: 'Muestra contenido premium en la sección de recetas',
    defaultValue: false,
    environments: {
      development: true,  // Habilitado en desarrollo para testing
      preview: false,     // Deshabilitado en preview
      production: false   // Deshabilitado en producción por defecto
    }
  },

  // Analytics avanzado
  'enable-advanced-analytics': {
    description: 'Habilita métricas avanzadas y tracking detallado',
    defaultValue: false,
    environments: {
      development: true,
      preview: true,
      production: false
    }
  },

  // Características premium
  'show-premium-features': {
    description: 'Muestra características premium como videos exclusivos',
    defaultValue: false,
    environments: {
      development: true,
      preview: false,
      production: false
    }
  },

  // Newsletter popup
  'enable-newsletter-popup': {
    description: 'Muestra popup de suscripción al newsletter',
    defaultValue: false,
    environments: {
      development: false,
      preview: true,
      production: false
    }
  },

  // Dashboard beta
  'show-beta-dashboard': {
    description: 'Muestra el nuevo dashboard en versión beta',
    defaultValue: false,
    environments: {
      development: true,
      preview: false,
      production: false
    }
  }
};

export default featureFlagConfig;