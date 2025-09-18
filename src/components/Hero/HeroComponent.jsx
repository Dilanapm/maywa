import heroImage from "../../assets/maywa_presentacion.jpg"; // Tu imagen con las botellas
import maywaLogo from "../../assets/maywa-logo.png"; // Tu logo redondo

const HeroComponent = () => {
  return (
    <div className="w-full h-full flex justify-center items-center md:py-20 py-8 md:px-32 px-8">
      <div className="w-full h-[649px] md:flex hidden">
        <div className="w-6/12 h-full flex justify-start items-center">
          <div className="max-w-[700px] flex flex-col justify-center items-start gap-6">
            <img src={maywaLogo} alt="MAYWA logo" className="w-24 h-24 mb-4" />
            <h1 className="text-6xl font-bold text-green-800 leading-tight font-serif">
              La esencia andina <br /> en cada gota
            </h1>
            <p className="text-lg text-green-900 max-w-md">
              Salsas artesanales bolivianas hechas con ingredientes auténticos: quinua, locoto, haba crocante y más.
            </p>
            <a
          href="#productos"
          className="bg-red-600 hover:bg-red-700 text-white hover:text-gray-200 px-6 py-3 mt-4 rounded-lg uppercase font-bold no-underline"
        >
          Ver productos
        </a>
            
          </div>
        </div>
        <div className="w-6/12 h-full relative flex justify-center items-center">
          <img src={heroImage} alt="Salsas MAYWA" className="w-full h-auto object-contain" />
        </div>
      </div>

      {/* Versión móvil */}
      <div className="w-full h-full flex flex-col justify-center items-center gap-10 md:hidden">
        <img src={maywaLogo} alt="MAYWA logo" className="w-20 h-20" />
        <h1 className="text-4xl font-bold text-green-800 text-center font-serif leading-snug">
          La esencia andina en cada gota
        </h1>
        <p className="text-center text-green-900 px-4">
          Salsas bolivianas únicas con sabores auténticos como quinua, locoto y miel.
        </p>
        <a
          href="#productos"
          className="bg-red-600 hover:bg-red-700 text-white hover:text-gray-200 px-6 py-3 rounded-lg uppercase font-bold inline-block"
        >
          Ver productos
        </a>

        <img src={heroImage} alt="Salsas MAYWA" className="w-full max-w-[300px] h-auto" />
      </div>
    </div>
  );
};

export default HeroComponent;