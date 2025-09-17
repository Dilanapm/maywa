# 🍽️ Maywa Restaurant Website

Sitio web del restaurante Maywa - Una experiencia gastronómica moderna con interfaz elegante para explorar nuestro menú y realizar reservas.

## 📋 Tabla de Contenidos
- [🚀 Inicio Rápido](#-inicio-rápido)
- [🛠️ Tecnologías](#️-tecnologías)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [💻 Comandos de Desarrollo](#-comandos-de-desarrollo)
- [🎨 Componentes Principales](#-componentes-principales)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Configuración](#-configuración)
- [🤝 Contribución](#-contribución)

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Git**

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Dilanapm/maywa.git
   cd maywa-project
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   - El proyecto se ejecutará en `http://localhost:5173`

## 🛠️ Tecnologías

- **React 18.3.1** - Biblioteca principal para la UI
- **Vite 5.4.10** - Herramienta de build y desarrollo
- **Tailwind CSS 3.4.14** - Framework de CSS utility-first
- **React Router DOM 6.27.0** - Enrutamiento
- **React Icons 5.5.0** - Librería de iconos
- **Splide.js** - Carrusel/slider de imágenes
- **ESLint** - Linting y calidad de código

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Hero/            # Componente hero principal
│   ├── Home/            # Componentes de la página principal
│   │   ├── About/       # Sección sobre nosotros
│   │   ├── BookTable/   # Reserva de mesas
│   │   ├── CustomerSay/ # Testimonios de clientes
│   │   └── PopularItem/ # Platos populares
│   ├── MaywaButton/     # Botón personalizado
│   └── shared/          # Componentes compartidos
│       ├── Footer/      # Pie de página
│       └── Header/      # Encabezado/navegación
├── layout/              # Layouts principales
├── router/              # Configuración de rutas
├── utils/               # Utilidades y datos dummy
└── assets/              # Imágenes y recursos estáticos
```

## 💻 Comandos de Desarrollo

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye para producción

# Preview
npm run preview      # Preview de la build de producción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código
```

## 🎨 Componentes Principales

### Header
- Navegación principal del sitio
- Logo de Maywa
- Menú responsive

### Hero
- Sección principal con imagen destacada
- Call-to-action principal

### About
- Información sobre el restaurante
- Historia y valores

### PopularItem
- Showcase de platos populares
- Cards de productos con imágenes

### BookTable
- Formulario de reservas
- Información de contacto

### CustomerSay
- Testimonios de clientes
- Carrusel de reseñas

### Footer
- Información de contacto
- Enlaces importantes
- Redes sociales

## 📱 Responsive Design

El proyecto está completamente optimizado para:
- 📱 **Mobile** (320px - 768px)
- 📊 **Tablet** (768px - 1024px)
- 🖥️ **Desktop** (1024px+)

Utiliza Tailwind CSS para un diseño responsive con breakpoints:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

## 🔧 Configuración

### Tailwind CSS
- Configurado en `tailwind.config.js`
- Colores personalizados del tema Maywa
- Componentes custom

### Vite
- Configuración en `vite.config.js`
- Hot reload activado
- Optimizaciones de build

### ESLint
- Reglas configuradas en `eslint.config.js`
- Estándares de React y hooks

## 🤝 Contribución

### ✅ Lista de verificación antes de empezar:

- [ ] Tienes acceso al repositorio
- [ ] Configuraste Git con tu nombre y email
- [ ] El proyecto corre correctamente en local (`npm run dev`)
- [ ] Tienes la última versión de `main`
- [ ] Sabes qué funcionalidad vas a desarrollar

### 🔄 Flujo de trabajo completo (OBLIGATORIO):

⚠️ **IMPORTANTE: NUNCA trabajar directamente en la rama `main`**

#### 1. **Preparar el entorno**
   ```bash
   # Asegurarse de estar en main y actualizado
   git checkout main
   git pull origin main
   ```

#### 2. **Crear una nueva rama**
   ```bash
   # Crear rama local desde main actualizado
   git checkout -b feature/nombre-de-la-funcionalidad
   
   # Ejemplos de nombres de rama:
   # git checkout -b feature/menu-interactivo
   # git checkout -b fix/boton-reserva
   # git checkout -b update/imagenes-hero
   ```

#### 3. **Crear rama remota**
   ```bash
   # Subir la rama al repositorio remoto
   git push -u origin feature/nombre-de-la-funcionalidad
   ```

#### 4. **Desarrollar y hacer commits**
   ```bash
   # Hacer cambios en el código
   git add .
   git commit -m "feat: descripción clara del cambio"
   
   # Subir cambios a la rama remota
   git push origin feature/nombre-de-la-funcionalidad
   ```

#### 5. **Mantener la rama actualizada**
   ```bash
   # Regularmente actualizar desde main
   git checkout main
   git pull origin main
   git checkout feature/nombre-de-la-funcionalidad
   git merge main
   
   # O usar rebase (recomendado)
   git rebase main
   ```

#### 6. **Crear Pull Request**
   - Ir a GitHub: `https://github.com/Dilanapm/maywa`
   - Crear Pull Request desde tu rama hacia `main`
   - Agregar descripción detallada de los cambios
   - Solicitar revisión del equipo
   - **NO hacer merge hasta recibir aprobación**

#### 7. **Después del merge**
   ```bash
   # Limpiar rama local
   git checkout main
   git pull origin main
   git branch -d feature/nombre-de-la-funcionalidad
   
   # Limpiar rama remota (opcional)
   git push origin --delete feature/nombre-de-la-funcionalidad
   ```

### 🚫 Reglas de Protección del Proyecto:

- ❌ **PROHIBIDO** hacer push directo a `main`
- ❌ **PROHIBIDO** hacer merge sin revisión
- ✅ **OBLIGATORIO** crear Pull Request para cualquier cambio
- ✅ **OBLIGATORIO** que al menos 1 persona revise el código
- ✅ **OBLIGATORIO** resolver conflictos antes del merge
- ✅ **OBLIGATORIO** probar localmente antes del push

### 🎯 Tipos de ramas recomendadas:

```bash
feature/nombre-funcionalidad    # Nuevas características
fix/descripcion-bug            # Corrección de errores
update/componente-modificado   # Actualizaciones
hotfix/solucion-urgente       # Correcciones urgentes
docs/actualizacion-docs       # Cambios en documentación
```

### Convenciones de código:
- Usar **PascalCase** para componentes
- Usar **camelCase** para funciones y variables
- Seguir las reglas de ESLint
- Comentar código complejo
- Mantener componentes pequeños y enfocados

### Estructura de commits:
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Documentación
- `style:` - Cambios de estilo
- `refactor:` - Refactorización
- `test:` - Pruebas

### 📋 Comandos Git útiles:

```bash
# Ver estado actual
git status

# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r

# Ver todas las ramas
git branch -a

# Cambiar de rama
git checkout nombre-rama

# Actualizar lista de ramas remotas
git fetch

# Ver historial de commits
git log --oneline

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Ver diferencias
git diff

# Ver archivos modificados
git diff --name-only
```

### 🆘 Comandos de emergencia:

```bash
# Si necesitas descartar cambios locales
git checkout -- archivo.js

# Si necesitas volver a un commit específico
git reset --hard commit-hash

# Si pusiste algo por error a main (contactar al team lead)
git revert commit-hash
```

## 📞 Contacto del Equipo

Para dudas o consultas sobre el desarrollo:
- **Repository:** [Maywa Project](https://github.com/Dilanapm/maywa)
- **Issues:** Reportar problemas en GitHub Issues

---

**¡Bienvenido al equipo de desarrollo de Maywa! 🎉**