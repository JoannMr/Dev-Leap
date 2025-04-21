"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiVideo, FiMessageCircle } from "react-icons/fi";

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fondo con gradiente y overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 z-0">
        <div className="absolute inset-0 opacity-20 w-screen h-full overflow-hidden">
          <svg
            width="150%"
            height="150%"
            viewBox="0 0 1500 1500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(1.3)"
              >
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="150%" height="150%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-[100px] opacity-30"
        animate={{ 
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply blur-[100px] opacity-30"
        animate={{ 
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut" 
        }}
      />

      {/* Contenido */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl">
        <motion.div 
          className="md:w-3/5 mb-10 md:mb-0 text-white text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Da el primer paso hacia<br /> 
            tu <span className="relative">
              <span className="relative z-10">futuro digital</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-3 bg-blue-400/30 -z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Únete a nuestra comunidad de más de 10,000 estudiantes que han transformado sus carreras a través de nuestros programas especializados.
          </motion.p>
        </motion.div>

        <motion.div
          className="md:w-2/5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl overflow-hidden">
            {/* Tarjeta principal */}
            <motion.div 
              className="p-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white text-2xl font-semibold mb-3">Explora tu camino</h3>
              <p className="text-white/80 mb-6">Elige la opción que mejor se adapte a tus objetivos profesionales</p>
              
              {/* Opciones con iconos y efectos */}
              <div className="space-y-4 space-x-2">
                <Link href="/programas">
                  <motion.div 
                    className="group flex items-center justify-between bg-white/15 hover:bg-white/25 p-4 rounded-lg border border-white/20 cursor-pointer transition-all"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-3 bg-blue-500 rounded-full">
                        <FiVideo className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Accede a los cursos</h4>
                        <p className="text-white/70 text-sm">Más de 50 cursos disponibles</p>
                      </div>
                    </div>
                    <motion.div 
                      className="text-white"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "mirror", 
                        duration: 1,
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                    >
                      <FiArrowRight />
                    </motion.div>
                  </motion.div>
                </Link>
                
                <Link href="/faqs">
                  <motion.div 
                    className="group flex items-center justify-between bg-white/15 hover:bg-white/25 p-4 rounded-lg border border-white/20 cursor-pointer transition-all"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-3 bg-green-500 rounded-full">
                        <FiMessageCircle className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Preguntas frecuentes</h4>
                        <p className="text-white/70 text-sm">Resuelve tus dudas rápidamente</p>
                      </div>
                    </div>
                    <motion.div 
                      className="text-white"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        repeatType: "mirror", 
                        duration: 1,
                        ease: "easeInOut",
                        repeatDelay: 2
                      }}
                    >
                      <FiArrowRight />
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
              
              {/* Contador animado */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r ${
                            i === 0 ? "from-blue-400 to-blue-500" :
                            i === 1 ? "from-green-400 to-green-500" :
                            i === 2 ? "from-blue-400 to-blue-500" :
                            "from-green-400 to-green-500"
                          }`}
                          initial={{ opacity: 0, scale: 0.5, x: -10 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          viewport={{ once: true }}
                        />
                      ))}
                    </div>
                    <div className="text-white text-sm">
                      <motion.div 
                        className="font-semibold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        viewport={{ once: true }}
                      >
                        +120 nuevos estudiantes
                      </motion.div>
                      <motion.div 
                        className="text-white/70"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        viewport={{ once: true }}
                      >
                        en la última semana
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
