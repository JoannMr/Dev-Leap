"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCode, FiBookOpen, FiAward, FiUsers } from "react-icons/fi";
import Link from "next/link";

export default function FaqsHero() {
  // Array de características destacadas
  const features = [
    {
      icon: <FiCode size={18} />,
      text: "Cursos 100% gratuitos",
      color: "from-blue-500 to-green-500"
    },
    {
      icon: <FiBookOpen size={18} />,
      text: "Certificaciones incluidas",
      color: "from-blue-500 via-green-500 to-blue-500"
    },
    {
      icon: <FiAward size={18} />,
      text: "Proyectos reales",
      color: "from-green-400 via-teal-400 to-blue-500"
    },
    {
      icon: <FiUsers size={18} />,
      text: "Comunidad activa",
      color: "from-blue-500 to-green-500"
    }
  ];
  
  return (
    <section className="relative bg-gradient-to-b from-blue-900 to-green-900 overflow-hidden pt-32 pb-24">
      {/* Formas decorativas animadas */}
      <motion.div 
        className="absolute top-20 right-[5%] w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-green-400 blur-[100px] opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute left-[5%] bottom-20 w-64 h-64 rounded-full bg-gradient-to-r from-green-400 to-blue-400 blur-[80px] opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Grid puntos decorativos */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Aprende <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">gratis</span> con DevLeap
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Respuestas a las preguntas más frecuentes sobre nuestra plataforma de cursos gratuitos y servicios para empresas
            </motion.p>
          </motion.div>
          
          {/* Grid de características destacadas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-3 flex flex-col items-center justify-center hover:bg-white/15 transition-all"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2`}>
                    {feature.icon}
                  </div>
                  <span className="text-white text-xs font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Botón de llamada a la acción */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Link href="/auth/register">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    Registrarse Gratis 
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Forma ondulada inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[40px] md:h-[60px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
} 