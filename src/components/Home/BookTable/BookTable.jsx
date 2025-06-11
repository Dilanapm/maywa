import { FiShoppingCart } from "react-icons/fi";

const BookTable = () => {
    return (
        <div id="pedido" className="w-full h-fit md:py-24 py-8 bgBookTable">
            <div className="max-w-[700px] flex flex-col items-start justify-center gap-4 md:px-32 px-8">
                <div className="flex flex-col items-start justify-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-[10px] h-[10px] bg-red-600"></div>
                        <p className="font-roboto md:text-xl text-base font-bold leading-[32px] text-red-600 uppercase">Realiza tu Pedido</p>
                    </div>
                    <h5 className="font-bebas md:text-[62px] text-[40px] font-bold md:leading-[62px] leading-[48px] text-white uppercase">
                        Pide nuestras salsas artesanales
                    </h5>
                </div>
                <p className="font-roboto text-base font-normal leading-[24px] text-white">
                    Completa el formulario para realizar tu pedido personalizado, distribuir nuestras salsas o consultarnos sobre opciones especiales para eventos. Te responderemos lo antes posible.
                </p>
            </div>

            {/* Formulario grande */}
            <div className="flex flex-col items-start justify-center gap-8 mt-8 md:px-32 px-8">
                <div className="max-w-[635px] md:flex hidden flex-col items-start justify-center gap-6">
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input type="text" placeholder="Tu Nombre*" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                        <input type="email" placeholder="Correo Electrónico" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    </div>
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input type="text" placeholder="Cantidad o tipo de salsa" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                        <input type="text" placeholder="Ciudad de entrega" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    </div>
                    <textarea
                        placeholder="Mensaje adicional o requerimientos"
                        rows={4}
                        className="w-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white"
                    ></textarea>
                </div>

                {/* Formulario mobile */}
                <div className="w-full md:hidden flex flex-col items-start justify-center gap-4">
                    <input type="text" placeholder="Tu Nombre*" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    <input type="email" placeholder="Correo Electrónico" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    <input type="text" placeholder="Cantidad o tipo de salsa" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    <input type="text" placeholder="Ciudad de entrega" className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" />
                    <textarea
                        placeholder="Mensaje adicional o requerimientos"
                        rows={4}
                        className="w-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white"
                    ></textarea>
                </div>

                <button
                    className="min-w-[157px] min-h-[44px] bg-red-600 text-white font-roboto text-base font-bold px-6 py-2 rounded-md uppercase flex items-center gap-2 hover:bg-transparent hover:text-red-600 hover:border hover:border-red-600 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                    <FiShoppingCart />
                    Enviar Pedido
                </button>
            </div>
        </div>
    );
};

export default BookTable;
