"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Hero() {
  // Función para hacer scroll a la sección de programas
  const scrollToProgramas = () => {
    const programasSection = document.getElementById('programas-section');
    if (programasSection) {
      programasSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="/videos/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl sm:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Programa
            </span>{" "}
            tu Futuro
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-white text-xl sm:text-2xl max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Domina las tecnologías que están transformando el mundo y conviértete en un desarrollador de élite
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            onClick={scrollToProgramas}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar programas
          </motion.button>
          
          {/* Botón condicional: si está autenticado va a cursos, si no, a registro */}
          <SignedIn>
            <Link href="/cursos">
              <motion.button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center">
                  Ir a mis cursos
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </SignedIn>
          
          <SignedOut>
            <Link href="/auth/register">
              <motion.button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center">
                  Comenzar ahora
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </Link>
          </SignedOut>
        </motion.div>
      </div>

      {/* Elementos decorativos flotantes */}
      <motion.div 
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-30"
        animate={{ 
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-30"
        animate={{ 
          y: [0, -40, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut" 
        }}
      />
    </section>
  );
}
