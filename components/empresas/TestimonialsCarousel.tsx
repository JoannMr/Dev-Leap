"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
// Tipo para los testimonios
type Testimonial = {
  id: number;
  nombre: string;
  cargo: string;
  contenido: string;
  imagen: string;
  area: string;
};

export default function TestimonialsCarousel() {
  // Datos de los testimonios
  const testimonios: Testimonial[] = [
    {
      id: 1,
      nombre: "Laura Martínez",
      cargo: "CTO",
      contenido: "El programa de formación en desarrollo web para nuestro equipo superó todas nuestras expectativas. La calidad del contenido y la metodología práctica permitió a nuestros desarrolladores implementar mejoras inmediatas en nuestros proyectos.",
      imagen: "/images/cara-testimonio3.webp",
      area: "Desarrollo Web"
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      cargo: "Director de RRHH",
      contenido: "La formación en Data Science nos ha permitido transformar nuestra forma de trabajar con datos. Ahora todo nuestro equipo puede tomar decisiones basadas en información de calidad. La inversión ha tenido un ROI excepcional.",
      imagen: "/images/cara-testimonio2.webp",
      area: "Data Science"
    },
    {
      id: 3,
      nombre: "Elena Sánchez",
      cargo: "Technology Lead",
      contenido: "Implementamos el programa de ciberseguridad y en menos de tres meses logramos mejorar significativamente nuestras defensas. El enfoque práctico y los laboratorios virtuales fueron clave para la rápida adopción por parte del equipo.",
      imagen: "/images/cara-testimonio4.webp",
      area: "Ciberseguridad"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-48 -right-48 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -bottom-48 -left-48 bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold text-lg">
            CASOS DE ÉXITO
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
            Empresas que confían en nosotros
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre cómo ayudamos a las empresas a potenciar el talento de sus equipos
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Columna izquierda - Contenido */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-.883 0-1.68-.377-2.23-.98l-.548.548z" />
                      </svg>
                      <span className="font-medium">{testimonios[activeIndex].area}</span>
                    </div>
                    
                    <blockquote>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                        &ldquo;{testimonios[activeIndex].contenido}&rdquo;
                      </p>
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                          <Image
                            src={testimonios[activeIndex].imagen}
                            alt={`Foto de ${testimonios[activeIndex].nombre}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 56px, 56px"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-semibold text-lg">
                          {testimonios[activeIndex].nombre}
                        </h4>
                        <p className="text-gray-600">
                          {testimonios[activeIndex].cargo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha - Gráfico o imagen representativa */}
                  <div className="relative h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center p-8"
                      >
                        <div className="mb-4">
                          <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">+45%</p>
                          <p className="text-base text-gray-600">Mejora en productividad</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles de navegación */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-700 hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-2">
              {testimonios.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex 
                      ? 'w-8 bg-gradient-to-r from-blue-500 to-green-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-gray-700 hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Logos grid */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-medium">
              EMPRESAS QUE CONFÍAN EN NOSOTROS
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {['BBVA', 'Santander', 'Telefónica', 'Iberdrola'].map((empresa, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-md p-3 shadow-sm hover:shadow transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center h-16">
                  <span className="text-gray-600 text-sm font-medium">
                    {empresa}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 