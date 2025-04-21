"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiTrendingUp, FiUsers, FiAward } from "react-icons/fi";
import SearchBarAnimated from "./SearchBar";

export default function CourseHero() {
  const stats = [
    { icon: <FiBookOpen className="w-5 h-5" />, label: "Cursos", value: "150+", color: "from-blue-400 to-indigo-600" },
    { icon: <FiTrendingUp className="w-5 h-5" />, label: "Actualizados", value: "Semanalmente", color: "from-purple-400 to-pink-600" },
    { icon: <FiUsers className="w-5 h-5" />, label: "Estudiantes", value: "10K+", color: "from-amber-400 to-orange-600" },
    { icon: <FiAward className="w-5 h-5" />, label: "Certificaciones", value: "Gratuitas", color: "from-emerald-400 to-teal-600" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl py-10 px-8 mb-12">
      {/* Formas decorativas */}
      <div className="absolute top-0 right-0 -mt-10 -mr-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 blur-2xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 blur-2xl opacity-70"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Contenido textual */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Descubre nuestros <span className="text-blue-600">cursos gratuitos</span> para desarrolladores
              </h1>
              <p className="text-gray-600 mb-8 md:text-lg">
                Accede a contenido de calidad creado por expertos en desarrollo web y mejora tus habilidades de programación.
              </p>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className={`mx-auto w-8 h-8 rounded-full mb-2 flex items-center justify-center bg-gradient-to-r ${stat.color} text-white`}>
                      {stat.icon}
                    </div>
                    <span className="block text-lg font-bold text-gray-800">{stat.value}</span>
                    <span className="block text-xs text-gray-500">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Componente de búsqueda animado */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <SearchBarAnimated />
                
                {/* Tendencias de búsqueda */}
                <div className="mt-6">
                  <p className="text-xs text-gray-500 mb-3">Tendencias:</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "JavaScript", "Python", "Java", "CSS"].map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 