"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonios = [
  {
    id: 1,
    nombre: "Ana Martínez",
    edad: 28,
    rol: "Frontend Developer",
    empresa: "TechCore",
    texto: "DevLeap transformó mi carrera. Pasé de no saber programar a conseguir mi primer empleo como desarrolladora frontend en menos de 6 meses.",
    foto: "/images/cara-testimonio.avif"
  },
  {
    id: 2,
    nombre: "Carlos Gómez",
    edad: 32,
    rol: "Full Stack Developer",
    empresa: "Globant",
    texto: "La metodología de DevLeap es impresionante. Los proyectos prácticos me dieron la confianza y experiencia que necesitaba para conseguir un mejor empleo.",
    foto: "/images/cara-testimonio2.webp"
  },
  {
    id: 3,
    nombre: "Laura Sánchez",
    edad: 25,
    rol: "UI/UX Designer",
    empresa: "Accenture",
    texto: "Gracias a DevLeap pude combinar mis habilidades de diseño con el desarrollo web. Ahora trabajo en proyectos que realmente me apasionan.",
    foto: "/images/cara-testimonio3.webp"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonio = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
  };
  
  const prevTestimonio = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonios.length) % testimonios.length);
  };

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold text-lg">
            EXPERIENCIAS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
            Lo que dicen nuestros alumnos
      </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Historias reales de estudiantes que cambiaron su trayectoria profesional
          </p>
        </motion.div>

        {/* Testimonios con carousel */}
        <div className="relative">
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-30"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 20,
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply blur-3xl opacity-30"
            animate={{ 
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut" 
            }}
          />

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-10 shadow-lg relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-10"
              >
                <div className="md:w-1/3 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="relative h-60 w-60 rounded-full border-8 border-white shadow-xl overflow-hidden"
                  >
                    <Image
                      src={testimonios[currentIndex].foto}
                      alt={`Foto de ${testimonios[currentIndex].nombre}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </motion.div>
                </div>

                <div className="md:w-2/3">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-5 h-5 text-yellow-500 fill-current" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 italic mb-6">
                    {testimonios[currentIndex].texto}
                  </p>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonios[currentIndex].nombre}
                    </h3>
                    <p className="text-gray-600">
                      {testimonios[currentIndex].rol} en {testimonios[currentIndex].empresa}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="flex justify-between mt-10">
              <button 
                onClick={prevTestimonio}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonios.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonio}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
