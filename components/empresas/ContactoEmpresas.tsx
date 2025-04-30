"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiSend, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";
import { z } from "zod";

// Esquema de validación (debe coincidir con el del backend)
const formSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es demasiado largo"),
  empresa: z.string().min(2, "El nombre de la empresa debe tener al menos 2 caracteres").max(100, "El nombre de la empresa es demasiado largo"),
  email: z.string().email("Formato de email inválido"),
  telefono: z.string().optional().refine(
    (val) => !val || /^(\+?\d{1,3}[- ]?)?\d{9,15}$/.test(val), 
    { message: "Formato de teléfono inválido" }
  ),
  empleados: z.string().min(1, "Selecciona una opción"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(3000, "El mensaje es demasiado largo")
});

type FormErrors = {
  [key: string]: string;
};

export default function ContactoEmpresas() {
  // Estado para el formulario
  const [formState, setFormState] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    empleados: "",
    mensaje: ""
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Estado para el envío del formulario
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Marcar campo como tocado
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar el campo
    validateField(name, value);
  };

  // Validar un campo individual
  const validateField = (name: string, value: string) => {
    try {
      const fieldSchema = formSchema.shape[name as keyof typeof formSchema.shape];
      fieldSchema.parse(value);
      
      // Si no hay errores, eliminar mensaje de error del estado
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: err.errors[0].message
        }));
      }
    }
  };

  // Validar formulario completo
  const validateForm = () => {
    try {
      formSchema.parse(formState);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        err.errors.forEach(error => {
          if (error.path) {
            newErrors[error.path[0]] = error.message;
          }
        });
        setErrors(newErrors);
        
        // Marcar todos los campos como tocados para mostrar todos los errores
        const allTouched: {[key: string]: boolean} = {};
        Object.keys(formState).forEach(key => {
          allTouched[key] = true;
        });
        setTouched(allTouched);
      }
      return false;
    }
  };

  // Mostrar error para un campo específico
  const showError = (name: string) => {
    return touched[name] && errors[name];
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario antes de enviarlo
    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage(null);
    
    try {
      console.log("Enviando datos del formulario:", formState);
      
      // Añadir un token anti-CSRF (en un entorno real, esto vendría del servidor)
      const csrfToken = Math.random().toString(36).substring(2);
      
      // Envío real a la API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(formState),
      });
      
      console.log("Respuesta HTTP:", response.status, response.statusText);
      const data = await response.json();
      console.log("Datos de respuesta:", data);
      
      if (!response.ok) {
        const errorMsg = data.error || 'Error al enviar el mensaje';
        console.error("Error en la API:", errorMsg);
        throw new Error(errorMsg);
      }
      
      // Mostrar éxito
      toast.success("¡Formulario enviado con éxito!");
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          empleados: "",
          mensaje: ""
        });
        setTouched({});
      }, 3000);
    } catch (error) {
      console.error("Error completo:", error);
      setIsSubmitting(false);
      const errorMsg = error instanceof Error ? error.message : 'Error al enviar el mensaje';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Función para generar clases para un campo según su estado
  const getInputClasses = (fieldName: string) => {
    const baseClasses = "w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    
    if (showError(fieldName)) {
      return `${baseClasses} border-red-300 bg-red-50`;
    }
    
    return `${baseClasses} border-gray-300`;
  };

  return (
    <section id="contacto-empresas" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">
              Contacto
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Potencia las habilidades de tu equipo
            </h2>
            <p className="text-xl text-gray-600">
              Completa el formulario y nuestro equipo se pondrá en contacto contigo para diseñar un plan a medida
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
          {/* Información de contacto */}
          <motion.div 
            className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none text-white"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>
              <p className="mb-10 text-blue-100 max-w-md">
                Estamos disponibles para ayudarte a encontrar la mejor solución formativa para tu empresa. Contacta con nosotros por cualquiera de estos medios.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <FiMail className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Email</p>
                    <p className="font-medium">empresas@devleap.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <FiPhone className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Teléfono</p>
                    <p className="font-medium">+34 900 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-lg mr-4">
                    <FiMapPin className="text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Dirección</p>
                    <p className="font-medium">Paseo de la Castellana 95, Madrid</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 mt-auto">
                <h4 className="font-bold mb-2">¿Necesitas una respuesta urgente?</h4>
                <p className="text-blue-100 text-sm mb-4">Llámanos y te atenderemos inmediatamente</p>
                <motion.a 
                  href="tel:+34900123456"
                  className="inline-flex items-center px-5 py-2 bg-white text-blue-600 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Llamar ahora
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Formulario */}
          <motion.div 
            className="lg:w-3/5 bg-white p-8 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4">
                    <p className="font-medium">Error: {errorMessage}</p>
                    <p className="text-sm mt-1">Por favor, intenta nuevamente o contáctanos directamente por teléfono.</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formState.nombre}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(prev => ({ ...prev, nombre: true }))}
                      required
                      className={getInputClasses("nombre")}
                      maxLength={100}
                    />
                    {showError("nombre") && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" size={14} /> {errors.nombre}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-gray-700 font-medium mb-1">
                      Empresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formState.empresa}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(prev => ({ ...prev, empresa: true }))}
                      required
                      className={getInputClasses("empresa")}
                      maxLength={100}
                    />
                    {showError("empresa") && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" size={14} /> {errors.empresa}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                      Email profesional <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                      required
                      className={getInputClasses("email")}
                      maxLength={100}
                    />
                    {showError("email") && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" size={14} /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-gray-700 font-medium mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formState.telefono}
                      onChange={handleInputChange}
                      onBlur={() => setTouched(prev => ({ ...prev, telefono: true }))}
                      className={getInputClasses("telefono")}
                      placeholder="+34 600 000 000"
                    />
                    {showError("telefono") && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" size={14} /> {errors.telefono}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="empleados" className="block text-gray-700 font-medium mb-1">
                    Número de empleados <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="empleados"
                    name="empleados"
                    value={formState.empleados}
                    onChange={handleInputChange}
                    onBlur={() => setTouched(prev => ({ ...prev, empleados: true }))}
                    required
                    className={getInputClasses("empleados")}
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                  {showError("empleados") && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} /> {errors.empleados}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">
                    ¿Qué tipo de formación necesitas? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formState.mensaje}
                    onChange={handleInputChange}
                    onBlur={() => setTouched(prev => ({ ...prev, mensaje: true }))}
                    rows={4}
                    required
                    className={getInputClasses("mensaje")}
                    maxLength={3000}
                  ></textarea>
                  {showError("mensaje") && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} /> {errors.mensaje}
                    </p>
                  )}
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {formState.mensaje.length}/3000 caracteres
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 border-t border-gray-200 pt-4 mt-6">
                  <p>
                    <span className="text-red-500">*</span> Campos obligatorios
                  </p>
                  <p className="mt-2">
                    Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
                  </p>
                </div>
                
                <motion.button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center
                  ${Object.keys(errors).length > 0 ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
                  whileHover={Object.keys(errors).length === 0 ? { scale: 1.02 } : {}}
                  whileTap={Object.keys(errors).length === 0 ? { scale: 0.98 } : {}}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Solicitar información
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <FiCheck className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Gracias por ponerte en contacto con nosotros. Un asesor se pondrá en contacto contigo a la mayor brevedad posible.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 