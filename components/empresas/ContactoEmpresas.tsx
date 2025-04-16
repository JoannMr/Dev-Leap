"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiSend } from "react-icons/fi";

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

  // Estado para el envío del formulario
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulamos envío a API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reseteamos después de 3 segundos
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
      }, 3000);
    }, 1500);
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formState.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-gray-700 font-medium mb-1">Empresa</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formState.empresa}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email profesional</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-gray-700 font-medium mb-1">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formState.telefono}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="empleados" className="block text-gray-700 font-medium mb-1">Número de empleados</label>
                  <select
                    id="empleados"
                    name="empleados"
                    value={formState.empleados}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">¿Qué tipo de formación necesitas?</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formState.mensaje}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
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