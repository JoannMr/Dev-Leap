"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProcesoCTA() {
  // Pasos del proceso
  const pasos = [
    {
      numero: "01",
      titulo: "Análisis",
      descripcion: "Identificamos las necesidades formativas específicas de tu equipo y empresa.",
      color: "bg-blue-500"
    },
    {
      numero: "02",
      titulo: "Diseño",
      descripcion: "Creamos un programa formativo personalizado con objetivos claros y medibles.",
      color: "bg-cyan-500"
    },
    {
      numero: "03",
      titulo: "Implementación",
      descripcion: "Desplegamos la formación con metodologías adaptadas a tus equipos.",
      color: "bg-teal-500"
    },
    {
      numero: "04",
      titulo: "Seguimiento",
      descripcion: "Evaluamos resultados y ajustamos el programa para máximo impacto.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">
              Metodología
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Un proceso diseñado para el éxito
            </h2>
            <p className="text-xl text-gray-600">
              Implementamos formación tech que se traduce en resultados concretos para tu negocio
            </p>
          </motion.div>
        </div>

        {/* Timeline del proceso */}
        <div className="relative">
          {/* Línea temporal */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>

          {/* Pasos del proceso */}
          <div className="relative z-10">
            {pasos.map((paso, index) => (
              <motion.div 
                key={index}
                className={`mb-16 md:mb-0 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex flex-col md:flex-row items-center md:space-x-6">
                  {/* Para pantallas móviles o el lado izquierdo */}
                  <div className={`md:w-1/2 flex ${index % 2 !== 0 ? 'md:order-2 md:justify-start pl-6' : 'md:justify-end'}`}>
                    <div className={`inline-flex mb-4 md:mb-0 p-1 rounded-full ${paso.color}/10`}>
                      <motion.div 
                        className={`w-16 h-16 rounded-full ${paso.color} text-white flex items-center justify-center font-bold text-2xl`}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        {paso.numero}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Para el lado derecho en desktop */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{paso.titulo}</h3>
                      <p className="text-gray-600">{paso.descripcion}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <motion.div 
          className="mt-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-12 relative z-10">
            {/* Formas decorativas */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-blue-500 opacity-10 rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500 opacity-10 rounded-full"></div>
              <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-white opacity-5 rounded-lg rotate-12"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0 text-center md:text-left">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Comienza la transformación<br /> de tu equipo <span className="text-cyan-400">hoy mismo</span>
                </motion.h3>
                <motion.p 
                  className="text-gray-300 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Nuestros asesores pueden diseñar un plan formativo en menos de 48 horas
                </motion.p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all">
                  Agendar una llamada gratuita
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 