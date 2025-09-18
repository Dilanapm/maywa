import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext";
import { supabase } from "../../../config/supabase";

const BookTable = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        product_type: '',
        delivery_city: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar autenticación
        if (!user) {
            setShowAuthPrompt(true);
            return;
        }

        // Validaciones básicas
        if (!formData.name.trim() || !formData.product_type.trim()) {
            alert('Por favor completa al menos tu nombre y el tipo de producto');
            return;
        }

        setIsSubmitting(true);

        try {
            // Crear el pedido en la base de datos
            const orderData = {
                user_id: user.id,
                customer_name: formData.name,
                customer_email: formData.email || user.email,
                product_type: formData.product_type,
                delivery_city: formData.delivery_city,
                message: formData.message,
                status: 'pending',
                total_amount: 0 // Se calculará después según el producto
            };

            const { data, error } = await supabase
                .from('orders')
                .insert([orderData])
                .select();

            if (error) throw error;

            alert('¡Pedido enviado exitosamente! Te contactaremos pronto.');
            
            // Limpiar formulario
            setFormData({
                name: '',
                email: '',
                product_type: '',
                delivery_city: '',
                message: ''
            });

        } catch (error) {
            console.error('Error al enviar pedido:', error);
            alert('Error al enviar el pedido. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };
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
            <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-8 mt-8 md:px-32 px-8">
                <div className="max-w-[635px] md:flex hidden flex-col items-start justify-center gap-6">
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Tu Nombre*" 
                            className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                            required
                        />
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Correo Electrónico" 
                            className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                        />
                    </div>
                    <div className="w-full h-[46px] flex items-center justify-center gap-4">
                        <input 
                            type="text" 
                            name="product_type"
                            value={formData.product_type}
                            onChange={handleInputChange}
                            placeholder="Cantidad o tipo de salsa*" 
                            className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                            required
                        />
                        <input 
                            type="text" 
                            name="delivery_city"
                            value={formData.delivery_city}
                            onChange={handleInputChange}
                            placeholder="Ciudad de entrega" 
                            className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                        />
                    </div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje adicional o requerimientos"
                        rows={4}
                        className="w-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white"
                    ></textarea>
                </div>

                {/* Formulario mobile */}
                <div className="w-full md:hidden flex flex-col items-start justify-center gap-4">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu Nombre*" 
                        className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                        required
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Correo Electrónico" 
                        className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                    />
                    <input 
                        type="text" 
                        name="product_type"
                        value={formData.product_type}
                        onChange={handleInputChange}
                        placeholder="Cantidad o tipo de salsa*" 
                        className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                        required
                    />
                    <input 
                        type="text" 
                        name="delivery_city"
                        value={formData.delivery_city}
                        onChange={handleInputChange}
                        placeholder="Ciudad de entrega" 
                        className="w-full h-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white" 
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Mensaje adicional o requerimientos"
                        rows={4}
                        className="w-full py-2 px-4 text-white bg-transparent outline-none border border-white placeholder-white"
                    ></textarea>
                </div>

                {/* Mensaje para usuarios no autenticados */}
                {!user && showAuthPrompt && (
                    <div className="bg-yellow-600 bg-opacity-20 border border-yellow-400 text-yellow-100 px-4 py-3 rounded-md max-w-[635px]">
                        <div className="flex items-center gap-3">
                            <FiUser className="text-yellow-400" />
                            <div>
                                <p className="font-semibold">Debes iniciar sesión para hacer un pedido</p>
                                <p className="text-sm">
                                    <button 
                                        type="button"
                                        onClick={handleLoginRedirect} 
                                        className="underline hover:text-white"
                                    >
                                        Haz clic aquí para iniciar sesión
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estado del usuario autenticado */}
                {user && (
                    <div className="bg-green-600 bg-opacity-20 border border-green-400 text-green-100 px-4 py-3 rounded-md max-w-[635px]">
                        <div className="flex items-center gap-3">
                            <FiUser className="text-green-400" />
                            <p className="text-sm">
                                Conectado como: <span className="font-semibold">{profile?.full_name || user.email}</span>
                            </p>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`min-w-[157px] min-h-[44px] bg-red-600 text-white font-roboto text-base font-bold px-6 py-2 rounded-md uppercase flex items-center gap-2 transition-all duration-300 ease-in-out ${
                        isSubmitting 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-transparent hover:text-red-600 hover:border hover:border-red-600 hover:scale-105 active:scale-95'
                    }`}
                >
                    <FiShoppingCart />
                    {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
                </button>
            </form>
        </div>
    );
};

export default BookTable;
