# 🚀 Configuración de Feature Flags en Vercel

## 📋 **PASOS PARA CONFIGURAR EN VERCEL:**

### **1. Acceder a Vercel Dashboard**
```
1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto MAYWA
3. Ir a: Settings → Environment Variables
```

### **2. Agregar Variables de Entorno**

**Agregar cada una de estas variables:**

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_FLAG_NEW_RECIPE_SECTION` | `true` | Production, Preview, Development |
| `VITE_FLAG_ADVANCED_ANALYTICS` | `true` | Production, Preview, Development |
| `VITE_FLAG_PREMIUM_FEATURES` | `false` | Production, Preview, Development |
| `VITE_FLAG_NEWSLETTER_POPUP` | `false` | Production, Preview, Development |
| `VITE_FLAG_BETA_DASHBOARD` | `false` | Production, Preview, Development |

### **3. Configuración Recomendada para Producción**

```bash
# ✅ ACTIVAR en Producción:
VITE_FLAG_NEW_RECIPE_SECTION=true     # Contenido premium visible
VITE_FLAG_ADVANCED_ANALYTICS=true     # Tracking completo

# ❌ DESACTIVAR en Producción:
VITE_FLAG_PREMIUM_FEATURES=false      # Features aún en desarrollo
VITE_FLAG_NEWSLETTER_POPUP=false      # Popup puede ser molesto
VITE_FLAG_BETA_DASHBOARD=false        # Dashboard aún no listo
```

### **4. Para Cada Variable en Vercel:**

```
1. Click "Add New" en Environment Variables
2. Name: VITE_FLAG_NEW_RECIPE_SECTION
3. Value: true
4. Environment: Seleccionar "Production", "Preview", "Development"
5. Click "Save"
6. Repetir para cada variable
```

### **5. Después de Configurar:**

```bash
# 1. Redeploy automático después de cambiar variables
# 2. O forzar redeploy:
git commit -m "feat: Configure feature flags for production"
git push origin main
```

---

## 🎛️ **Control Dinámico de Flags**

### **Ventajas de esta Configuración:**

- ✅ **Control desde Vercel:** Sin necesidad de código
- ✅ **Instant Toggle:** Cambio de valor → Redeploy automático
- ✅ **A/B Testing:** Activar/desactivar features por audiencias
- ✅ **Rollback Rápido:** Desactivar features con problemas
- ✅ **Múltiples Entornos:** Diferentes valores por ambiente

### **Casos de Uso:**

1. **Lanzamiento Gradual:**
   ```
   Semana 1: VITE_FLAG_NEW_RECIPE_SECTION=false
   Semana 2: VITE_FLAG_NEW_RECIPE_SECTION=true
   ```

2. **Emergencias:**
   ```
   Si hay problemas: Cambiar a 'false' en Vercel
   Redeploy automático en 30 segundos
   ```

3. **Testing:**
   ```
   Preview: true (para testing)
   Production: false (hasta validar)
   ```

---

## 🔍 **Verificación Post-Deploy**

### **En Desarrollo:**
- ✅ Debug box amarillo visible
- ✅ Console logs activos
- ✅ Todos los flags funcionando

### **En Producción:**
- ❌ Sin debug box (limpio)
- ❌ Sin console logs (optimizado)
- ✅ Analytics tracking activo
- ✅ Features controladas por Vercel

**¡Listo para producción! 🚀**