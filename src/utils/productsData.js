// 🌶️ CATÁLOGO COMPLETO DE PRODUCTOS MAYWA
import MajoyabaImg from '../assets/majoyaba2.jpg';
import PicantayImg from '../assets/picantay2.jpg';
import JinoAndinoImg from '../assets/jino2.jpg';
import MaywaComboImg from '../assets/maywacombo.png';
import SalsasIndividualesImg from '../assets/sachets.jpg';

// Productos completos con toda la información
export const maywaProducts = [
  {
    id: 1,
    name: "Majoyaba",
    description: "Salsa crocante de haba con ají suave",
    longDescription: "Nuestra salsa estrella combina el sabor tradicional del haba crocante con un toque suave de ají. Perfecta para acompañar empanadas, snacks y comidas bolivianas.",
    price: 16.77,
    currency: "Bs.",
    image: MajoyabaImg,
    category: "individual",
    size: "100g",
    stock: 50,
    available: true,
    ingredients: [
      "Haba crocante",
      "Ají suave",
      "Especias andinas",
      "Sal marina",
      "Aceite vegetal"
    ],
    nutritionalInfo: {
      calories: "45 por porción (15g)",
      fat: "2.5g",
      sodium: "180mg",
      carbs: "4g",
      protein: "2g"
    },
    recommendations: [
      "Ideal para empanadas",
      "Perfecto con papas fritas",
      "Excelente con carnes a la parrilla"
    ],
    spiceLevel: 2, // 1-5 scale
    tags: ["tradicional", "suave", "crocante"]
  },
  {
    id: 2,
    name: "Picantay",
    description: "Salsa picante de locoto con haba molida",
    longDescription: "Para los amantes del picante intenso. Nuestra salsa Picantay combina el poder del locoto boliviano con haba molida finamente, creando una experiencia de sabor inolvidable.",
    price: 16.77,
    currency: "Bs.",
    image: PicantayImg,
    category: "individual",
    size: "100g", 
    stock: 45,
    available: true,
    ingredients: [
      "Locoto fresco",
      "Haba molida",
      "Especias picantes",
      "Vinagre de manzana",
      "Aceite de oliva"
    ],
    nutritionalInfo: {
      calories: "40 por porción (15g)",
      fat: "2g",
      sodium: "200mg",
      carbs: "5g",
      protein: "2.5g"
    },
    recommendations: [
      "Perfecto para anticuchos",
      "Ideal con choripán",
      "Excelente con pizza"
    ],
    spiceLevel: 4, // 1-5 scale
    tags: ["picante", "intenso", "locoto"]
  },
  {
    id: 3,
    name: "Jino Andino",
    description: "Salsa de quinua picante con un toque de miel",
    longDescription: "Una fusión única que representa lo mejor de los Andes. La quinua picante se combina con miel natural, creando un equilibrio perfecto entre dulce y picante.",
    price: 16.77,
    currency: "Bs.",
    image: JinoAndinoImg,
    category: "individual",
    size: "100g",
    stock: 40,
    available: true,
    ingredients: [
      "Quinua picante",
      "Miel natural de abeja",
      "Especias andinas",
      "Ají amarillo",
      "Aceite de coco"
    ],
    nutritionalInfo: {
      calories: "50 por porción (15g)",
      fat: "1.5g",
      sodium: "160mg",
      carbs: "8g",
      protein: "3g"
    },
    recommendations: [
      "Excelente con carnes rojas",
      "Perfecto para pollo a la parrilla",
      "Ideal con quesos maduros"
    ],
    spiceLevel: 3, // 1-5 scale
    tags: ["dulce", "picante", "quinua", "miel"]
  },
  {
    id: 4,
    name: "Combo MAYWA",
    description: "Las 3 salsas en un solo pack promocional",
    longDescription: "Descubre todos nuestros sabores con nuestro pack promocional. Incluye Majoyaba, Picantay y Jino Andino en presentación de 100g cada una.",
    price: 45.00,
    currency: "Bs.",
    image: MaywaComboImg,
    category: "combo",
    size: "3x100g",
    stock: 25,
    available: true,
    ingredients: [
      "1x Majoyaba 100g",
      "1x Picantay 100g", 
      "1x Jino Andino 100g"
    ],
    nutritionalInfo: {
      calories: "Varía según salsa",
      description: "Ver información individual de cada producto"
    },
    recommendations: [
      "Perfecto para eventos",
      "Ideal para regalar",
      "Excelente para probar todos los sabores"
    ],
    spiceLevel: "Variado", 
    tags: ["combo", "promocional", "variado", "ahorro"],
    discount: "10% de descuento vs compra individual"
  },
  {
    id: 5,
    name: "Salsas Individuales 50g",
    description: "Presentación práctica de 50g para acompañar tus snacks o comidas",
    longDescription: "Perfectas para llevar contigo o para eventos. Disponibles en los tres sabores: Majoyaba, Picantay y Jino Andino.",
    price: 3.35,
    currency: "Bs.",
    image: SalsasIndividualesImg,
    category: "individual",
    size: "50g",
    stock: 100,
    available: true,
    ingredients: [
      "Disponible en los 3 sabores",
      "Misma calidad, menor cantidad"
    ],
    nutritionalInfo: {
      calories: "Varía según sabor",
      description: "Mitad de las porciones de 100g"
    },
    recommendations: [
      "Ideal para eventos",
      "Perfecto para lunch boxes",
      "Excelente para probar sabores"
    ],
    spiceLevel: "Según sabor elegido",
    tags: ["individual", "práctico", "eventos", "económico"],
    minOrder: 5
  }
];

// Categorías de productos
export const productCategories = [
  {
    id: "individual",
    name: "Salsas Individuales",
    description: "Nuestras salsas en presentación estándar",
    icon: "🌶️"
  },
  {
    id: "combo",
    name: "Combos",
    description: "Packs promocionales con múltiples sabores",
    icon: "📦"
  },
  {
    id: "eventos",
    name: "Para Eventos",
    description: "Presentaciones especiales para eventos y restaurantes",
    icon: "🎉"
  }
];

// Información de entrega
export const deliveryInfo = {
  areas: [
    "La Paz (centro)",
    "Zona Sur",
    "El Alto",
    "Zona Norte"
  ],
  times: [
    { id: "mañana", label: "Mañana (8:00 - 12:00)", available: true },
    { id: "tarde", label: "Tarde (14:00 - 18:00)", available: true },
    { id: "noche", label: "Noche (19:00 - 21:00)", available: false }
  ],
  freeDelivery: {
    minimumOrder: 100,
    currency: "Bs."
  }
};

// Tipos de cliente
export const customerTypes = [
  {
    id: "particular",
    name: "Cliente Particular",
    description: "Compras para consumo personal/familiar",
    minOrder: 1
  },
  {
    id: "restaurante", 
    name: "Restaurante",
    description: "Compras para uso comercial en restaurantes",
    minOrder: 10,
    benefits: ["Descuentos por volumen", "Facturación empresarial"]
  },
  {
    id: "tienda",
    name: "Tienda Gourmet",
    description: "Compras para reventa en tiendas especializadas",
    minOrder: 20,
    benefits: ["Precios mayoristas", "Soporte de marketing"]
  },
  {
    id: "eventos",
    name: "Eventos",
    description: "Compras para eventos, catering, celebraciones",
    minOrder: 50,
    benefits: ["Presentaciones especiales", "Entrega programada"]
  }
];