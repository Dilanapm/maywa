# 🚩 Guía para Verificar Feature Flags

## ✅ **Cómo Confirmar que los Feature Flags Funcionan**

### **1. Verificación Visual Inmediata**

1. **Abrir la aplicación en desarrollo:**
   ```bash
   npm run dev
   ```
   - Ir a: http://localhost:5173/

2. **Buscar el indicador de debug:**
   - En la sección de "Recetas Artesanales"
   - Verás un cuadro amarillo que dice "🚩 Feature Flags Debug:"
   - Muestra el estado ON/OFF de cada flag

### **2. Verificación en Console del Navegador**

1. **Abrir DevTools (F12)**
2. **Ir a la pestaña Console**
3. **Buscar estos mensajes:**
   ```
   🚩 Feature Flags Config: {show-new-recipe-section: true, ...}
   🧪 RecipeSection - Flags: {showNewRecipeSection: true, ...}
   🚩 Flag "show-new-recipe-section": ✅ ENABLED
   ```

### **3. Verificación del Contenido Condicional**

**Con Flag HABILITADO (showNewRecipeSection: true):**
- ✅ Se muestra la sección "Contenido Premium" con borde púrpura
- ✅ Incluye "Videos Exclusivos" y "App Móvil"
- ✅ Badge "NUEVO" visible

**Con Flag DESHABILITADO (showNewRecipeSection: false):**
- ❌ NO se muestra el contenido premium
- ❌ Solo aparece el contenido básico de recetas

### **4. Verificación en Vercel Analytics**

1. **Ir al Dashboard de Vercel:**
   - https://vercel.com/analytics
   - Seleccionar tu proyecto MAYWA

2. **Buscar eventos de Feature Flags:**
   - En "Custom Events"
   - Buscar evento: "Feature Flag Used"
   - Propiedades: flag, enabled, timestamp

### **5. Testing Manual de Flags**

**Para HABILITAR un flag:**
```javascript
// En src/hooks/useFeatureFlags.js línea ~22
[FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION]: true, // ✅ Habilitado
```

**Para DESHABILITAR un flag:**
```javascript
// En src/hooks/useFeatureFlags.js línea ~22
[FEATURE_FLAGS.SHOW_NEW_RECIPE_SECTION]: false, // ❌ Deshabilitado
```

**Después de cambiar:**
1. Guardar el archivo (Ctrl+S)
2. La aplicación se recarga automáticamente
3. Verificar el cambio en la interfaz

### **6. Verificación de Analytics Tracking**

**En Console del navegador:**
```javascript
// Verificar que window.va existe
console.log('Analytics disponible:', !!window.va);

// Ver últimos eventos enviados
window.va('track', 'test', { manual: true });
```

### **7. Estados Actuales de los Flags**

```javascript
✅ SHOW_NEW_RECIPE_SECTION: true (Contenido Premium visible)
✅ ENABLE_ADVANCED_ANALYTICS: true (Tracking habilitado)
❌ SHOW_PREMIUM_FEATURES: false (Solo en desarrollo)
❌ ENABLE_NEWSLETTER_POPUP: false (Deshabilitado)
❌ SHOW_BETA_DASHBOARD: false (Solo en desarrollo)
```

### **8. Troubleshooting**

**Si no ves los flags funcionando:**

1. **Verificar Console Errors:**
   - F12 → Console → Buscar errores en rojo

2. **Verificar Import:**
   ```javascript
   // En RecipeSection.jsx
   import useFeatureFlags from "../../../hooks/useFeatureFlags";
   ```

3. **Verificar Sintaxis:**
   ```bash
   npm run build
   ```

4. **Hard Refresh:**
   - Ctrl + F5 (Windows)
   - Cmd + Shift + R (Mac)

### **9. Comandos de Verificación Rápida**

```bash
# Ver logs en tiempo real
npm run dev

# Verificar build (detecta errores)
npm run build

# Ver archivos modificados
git status

# Ver diferencias
git diff
```

### **10. Casos de Prueba**

| Escenario | Flag Value | Resultado Esperado |
|-----------|------------|-------------------|
| Desarrollo | `true` | Contenido premium visible + Debug box |
| Producción | `true` | Contenido premium visible (sin debug) |
| Flag OFF | `false` | Solo contenido básico |
| Error JS | N/A | Flag por defecto: `false` |

---

## 🎯 **Confirmación de que TODO Funciona:**

- [x] ✅ Logs en console aparecen
- [x] ✅ Indicador visual amarillo muestra estados
- [x] ✅ Contenido premium se muestra/oculta correctamente
- [x] ✅ Analytics tracking funciona
- [x] ✅ Cambios en flags se reflejan instantáneamente
- [x] ✅ Build production funciona sin errores

**¡Los Feature Flags están funcionando perfectamente! 🚀**