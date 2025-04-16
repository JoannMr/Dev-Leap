"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

// Tipo para los testimonios
type Testimonial = {
  id: number;
  nombre: string;
  cargo: string;
  empresa: string;
  contenido: string;
  imagen: string;
  valoracion: number;
};

export default function TestimonialsCarousel() {
  // Datos de los testimonios
  const testimonios: Testimonial[] = [
    {
      id: 1,
      nombre: "Laura Martínez",
      cargo: "CTO",
      empresa: "Innovatech Solutions",
      contenido: "El programa de formación en desarrollo web para nuestro equipo superó todas nuestras expectativas. La calidad del contenido y la metodología práctica permitió a nuestros desarrolladores implementar mejoras inmediatas en nuestros proyectos.",
      imagen: "/images/testimonials/laura.webp",
      valoracion: 5
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      cargo: "Director de RRHH",
      empresa: "Global Systems Inc.",
      contenido: "La formación en Data Science nos ha permitido transformar nuestra forma de trabajar con datos. Ahora todo nuestro equipo puede tomar decisiones basadas en información de calidad. La inversión ha tenido un ROI excepcional.",
      imagen: "/images/testimonials/carlos.webp",
      valoracion: 5
    },
    {
      id: 3,
      nombre: "Elena Sánchez",
      cargo: "Technology Lead",
      empresa: "Fintech Solutions",
      contenido: "Implementamos el programa de ciberseguridad y en menos de tres meses logramos mejorar significativamente nuestras defensas. El enfoque práctico y los laboratorios virtuales fueron clave para la rápida adopción por parte del equipo.",
      imagen: "/images/testimonials/elena.webp",
      valoracion: 4
    },
    {
      id: 4,
      nombre: "Javier Méndez",
      cargo: "CEO",
      empresa: "StartupHub",
      contenido: "Como startup tecnológica, necesitábamos que nuestro equipo se actualizara rápidamente en React y Node.js. El programa personalizado que nos diseñaron fue perfecto y nos permitió acelerar nuestro desarrollo de producto.",
      imagen: "/images/testimonials/javier.webp",
      valoracion: 5
    }
  ];

  // Estado para controlar el testimonio activo
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Función para cambiar al siguiente testimonio
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
  };

  // Función para cambiar al testimonio anterior
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Variantes de animación
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="testimonios" className="py-24 bg-gray-50">
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
              Testimonios
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Lo que nuestros clientes dicen
            </h2>
            <p className="text-xl text-gray-600">
              Empresas que ya han transformado sus equipos a través de nuestros programas
            </p>
          </motion.div>
        </div>

        {/* Carrusel de testimonios */}
        <div className="relative max-w-5xl mx-auto">
          {/* Controles de navegación */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-20 md:-translate-x-full">
            <motion.button 
              className="p-4 bg-white rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition-all"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-20 md:translate-x-full">
            <motion.button 
              className="p-4 bg-white rounded-full shadow-lg text-gray-700 hover:text-blue-600 hover:shadow-xl transition-all"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>

          {/* Testimonio */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl will-change-transform">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full will-change-transform"
                style={{ 
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Imagen del testimonio */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                    <div className="h-full flex flex-col justify-center p-10">
                      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                        <div className="w-full h-full bg-gray-300 rounded-full"></div>
                        {/* Aquí iría la imagen real, pero usamos un div placeholder */}
                        {/* <Image 
                          src={testimonios[activeIndex].imagen}
                          alt={testimonios[activeIndex].nombre}
                          fill
                          className="object-cover"
                        /> */}
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-1">{testimonios[activeIndex].nombre}</h3>
                      <p className="text-blue-200 mb-3">{testimonios[activeIndex].cargo}</p>
                      <p className="text-white/80 font-medium">{testimonios[activeIndex].empresa}</p>
                      
                      <div className="mt-6 flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonios[activeIndex].valoracion ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenido del testimonio */}
                  <div className="lg:w-2/3 bg-white p-10 lg:p-16 flex items-center">
                    <div>
                      <svg className="w-12 h-12 text-blue-100 mb-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                      <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6">
                        {testimonios[activeIndex].contenido}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Logos de clientes */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-8">Más de 500 empresas de todos los sectores confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {['Empresa A', 'Empresa B', 'Empresa C', 'Empresa D', 'Empresa E', 'Empresa F'].map((empresa, index) => (
              <motion.div 
                key={index}
                className="text-gray-400 opacity-60 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gray-200 w-32 h-12 rounded flex items-center justify-center">
                  <span className="font-medium">{empresa}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 