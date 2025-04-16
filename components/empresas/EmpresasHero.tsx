"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EmpresasHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 pt-20 pb-32">
      {/* Formas decorativas animadas */}
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div 
          className="absolute right-[10%] top-[15%] w-96 h-96 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute left-[5%] bottom-[10%] w-72 h-72 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid de fondo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 mb-6 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full uppercase tracking-wider">
                Soluciones corporativas
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Capacitación <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">tecnológica</span> para equipos empresariales
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Potencia el desarrollo de habilidades digitales en tu empresa con cursos personalizados que impulsan la productividad y la innovación.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <Link href="#contacto-empresas">
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Solicitar una demo
                </motion.button>
              </Link>
              <Link href="#soluciones">
                <motion.button 
                  className="px-8 py-4 bg-white/10 border border-gray-700 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explorar soluciones
                </motion.button>
              </Link>
            </motion.div>

            {/* Estadísticas */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start mt-12 pt-6 border-t border-gray-700/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="mr-12 mb-4">
                <p className="text-3xl font-bold text-white">+500</p>
                <p className="text-gray-400 text-sm">Empresas confían en nosotros</p>
              </div>
              <div className="mr-12 mb-4">
                <p className="text-3xl font-bold text-white">+25,000</p>
                <p className="text-gray-400 text-sm">Profesionales formados</p>
              </div>
              <div className="mb-4">
                <p className="text-3xl font-bold text-white">96%</p>
                <p className="text-gray-400 text-sm">Tasa de satisfacción</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Imagen/Ilustración */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-r from-blue-600/20 to-cyan-400/20 rounded-xl"
                animate={{ 
                  rotateZ: [0, 5, 0],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut" 
                }}
              />
              
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700">
                <div className="rounded-lg overflow-hidden">
                <video className="rounded-xl" autoPlay muted loop>
                  <source src="/videos/empresa.mp4" type="video/mp4" />
                </video>
                </div>

                {/* Tarjetas flotantes */}
                <motion.div 
                  className="absolute -top-10 -right-8 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <div className="bg-blue-500 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Productividad</p>
                    <p className="text-green-500 font-bold">+42%</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3"
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="bg-purple-500 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Equipos formados</p>
                    <p className="text-purple-500 font-bold">+1200</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Logos de empresas cliente */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <p className="text-gray-400 mb-8 font-light">Empresas que confían en nosotros</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {['Google', 'Microsoft', 'Amazon', 'IBM', 'Oracle'].map((empresa, index) => (
              <motion.div 
                key={index}
                className="text-gray-400 opacity-50 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl font-semibold">{empresa}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 