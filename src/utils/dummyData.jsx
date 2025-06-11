
import { FiShoppingBag } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { LuBox } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Burger from "../assets/burger.png";
import Pizza from "../assets/pizza.png";
import FrenchFries from "../assets/french-fry.png";
import Chicken from "../assets/fried-shrimp.png";
import thumbnail from "../assets/majoyaba2.jpg";
import thumbnailTwo from "../assets/picantay2.jpg";
import thumbnailThree from "../assets/jino2.jpg";
import profile from "../assets/customter.png";
import profileTwo from "../assets/profile-two.jpg";
import profileThree from "../assets/profile-three.jpg";
import Majoyaba from '../assets/majoyaba2.jpg';
import Picantay from '../assets/picantay2.jpg';
import Maywasach from '../assets/sachets.jpg'
import Maywacombo from '../assets/maywacombo.png';
import QuinuaMiel from '../assets/jino2.jpg';
const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Productos", path: "#productos" },
  { name: "Sobre Nosotros", path: "#nosotros" },
  { name: "Pedidos", path: "#pedido" },
];


const buttonNames = [
  {
    id: 1,
    name: "Historia",
    title: "Sabores con identidad: la historia de MAYWA",

    description: "MAYWA nace de la fusión entre tradición andina y creatividad culinaria. Cada salsa representa una región, un ingrediente autóctono y una forma distinta de disfrutar la comida boliviana. Con ingredientes como el haba crocante, el locoto o la quinua picante, queremos llevar a tu mesa una experiencia auténtica.",
    // button: "Conócenos",
    target: "#nosotros",  // Este apunta a la sección actual (opcional)
    contact: "+591 712 576 16"
  },
  {
    id: 2,
    name: "Sabores",
    title: "Una experiencia que despierta los sentidos",
    description: "Desde la dulzura intensa de Jino Andino con miel y quinua picante, hasta la fuerza de Picantay con locoto e haba molida, cada una de nuestras salsas es una experiencia única. Majoyaba, con su haba crocante y toque de ají, aporta un sabor inolvidable para tus platos favoritos.",
    button: "Descubre los Sabores",
    target: "#productos",  // 👉 Esto es lo importante
    contact: "+591 712 576 16"
  },
  {
    id: 3,
    name: "Contacto",
    title: "Haz tu pedido y lleva MAYWA a tu hogar",
    description: "¿Tienes un evento? ¿Eres restaurante o tienda gourmet? Comunícate con nosotros para hacer pedidos personalizados, conocer puntos de venta o simplemente para descubrir cómo MAYWA puede transformar tus comidas diarias.",
    button: "Haz tu pedido",
    target: "#pedido",  // Puedes personalizar este ID
    contact: "+591 712 576 16"
  }
];

const aboutItems = [
  {
    id: 1,
    image: <LuBox className="text-red-600 text-[35px]" />,
    title: "Entrega Rápida",
    description: "En menos de 24 horas en La Paz"
  },
  {
    id: 2,
    image: <SlBadge className="text-red-600 text-[35px]" />,
    title: "Sabor Auténtico",
    description: "Recetas bolivianas con innovación"
  },
  {
    id: 3,
    image: <FiShoppingBag className="text-red-600 text-[35px]" />,
    title: "Pedidos Personalizados",
    description: "Presentación para eventos y negocios"
  }
];




const popularItemData = [
  {
    id: 1,
    title: "Majoyaba",
    description: "Salsa crocante de haba con ají suave",
    price: "Bs. 16.77",
    image: Majoyaba,
  },
  {
    id: 2,
    title: "Picantay",
    description: "Salsa picante de locoto con haba molida",
    price: "Bs. 16.77",
    image: Picantay,
  },
  {
    id: 3,
    title: "Jino Andino",
    description: "Salsa de quinua picante con un toque de miel",
    price: "Bs. 16.77",
    image: QuinuaMiel,
  },
  {
    id: 4,
    title: "Combo MAYWA",
    description: "Las 3 salsas en un solo pack promocional",
    price: "Bs. 45",
    image: Maywacombo,
  },
  {
    id: 5,
    title: "Salsas Individuales",
    description: "Presentación práctica de 50g para acompañar tus snacks o comidas",
    price: "Bs. 3.35",
    image: Maywasach,
  },

];

const socialIcons = [
  {
    icon: IoLogoFacebook,
  },
  {
    icon: FaXTwitter,
  },
  {
    icon: FaInstagram,
  },
  {
    icon: FaLinkedin,
  }
];

const footerInfo = [
  {
    icon: FaRegClock,
    title: "Opening Hours",
    info: "Monday - Sunday",
    description: "11:00 AM - 10:00 PM"
  },
  {
    icon: MdOutlineWifiCalling3,
    title: "Let's Talk",
    info: "Phone: 1-800-222-4545",
    description: "Fax: 1-800-222-4545"
  },
  {
    icon: IoMailOutline,
    title: "Book a Table",
    info: "Email: info@niomax.com",
    description: "Support: sales@niomax.com"
  },
  {
    icon: IoLocationOutline,
    title: "Our Address",
    info: "123 Anywhere, Any City, NY 12345",
    description: "New York, USA"
  }
]

const customerSayData = [
  {
    id: 1,
    profile: profile,
    name: "María Condori",
    location: "La Paz, Bolivia",
    quote: "La salsa Majoyaba es simplemente deliciosa, tiene el toque exacto de picante y ese sabor andino que me recuerda a mi infancia.",
    thumbnail: thumbnail,
  },
  {
    id: 2,
    profile: profileTwo,
    name: "Jorge Mamani",
    location: "El Alto, Bolivia",
    quote: "Probé la Picantay y fue una explosión de sabores. Ideal para acompañar mis empanadas de queso. ¡Totalmente recomendada!",
    thumbnail: thumbnailTwo,
  },
  {
    id: 3,
    profile: profileThree,
    name: "Natalia Quispe",
    location: "Cochabamba, Bolivia",
    quote: "La Jino Andino tiene un picante suave y un dulzor especial que combina perfecto con carnes. Una combinación de dioses.",
    thumbnail: thumbnailThree,
  },
];


export { navItems, buttonNames, aboutItems, popularItemData, socialIcons, footerInfo, customerSayData };
