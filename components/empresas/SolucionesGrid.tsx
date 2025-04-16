"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiDatabase, FiLayers, FiSmartphone, FiShield, FiTrendingUp } from "react-icons/fi";

// Tipos de datos para nuestras soluciones
type Solucion = {
  id: number;
  titulo: string;
  descripcion: string;
  icon: React.ReactNode;
  color: string;
  caracteristicas: string[];
};

export default function SolucionesGrid() {
  // Estado para controlar qué solución está activa
  const [solucionActiva, setSolucionActiva] = useState<number>(1);

  // Datos de soluciones
  const soluciones: Solucion[] = [
    {
      id: 1,
      titulo: "Desarrollo Web",
      descripcion: "Capacitación especializada en las tecnologías web más demandadas por el mercado actual.",
      icon: <FiCode size={24} />,
      color: "from-blue-500 to-cyan-400",
      caracteristicas: [
        "HTML5, CSS3 y JavaScript avanzado",
        "Frameworks: React, Angular y Vue.js",
        "Backend con Node.js, Python y Java",
        "Arquitectura de aplicaciones web"
      ]
    },
    {
      id: 2,
      titulo: "Ciencia de Datos",
      descripcion: "Formación para equipos técnicos en análisis y visualización de datos para toma de decisiones.",
      icon: <FiDatabase size={24} />,
      color: "from-purple-500 to-pink-400",
      caracteristicas: [
        "Análisis de datos con Python y R",
        "Machine Learning y modelos predictivos",
        "Big Data y procesamiento distribuido",
        "Visualización de datos y Business Intelligence"
      ]
    },
    {
      id: 3,
      titulo: "Desarrollo Cloud",
      descripcion: "Programas para dominar las plataformas cloud más relevantes y arquitecturas modernas.",
      icon: <FiLayers size={24} />,
      color: "from-amber-400 to-orange-500",
      caracteristicas: [
        "AWS, Azure y Google Cloud",
        "Serverless y microservicios",
        "CI/CD y DevOps",
        "Kubernetes y contenedores"
      ]
    },
    {
      id: 4,
      titulo: "Desarrollo Móvil",
      descripcion: "Cursos intensivos de programación de aplicaciones móviles nativas e híbridas.",
      icon: <FiSmartphone size={24} />,
      color: "from-green-400 to-emerald-500",
      caracteristicas: [
        "React Native y Flutter",
        "Desarrollo nativo iOS y Android",
        "Arquitecturas y patrones móviles",
        "APIs y servicios backend para móviles"
      ]
    },
    {
      id: 5,
      titulo: "Ciberseguridad",
      descripcion: "Formación especializada en protección de sistemas y datos corporativos.",
      icon: <FiShield size={24} />,
      color: "from-red-500 to-rose-400",
      caracteristicas: [
        "Pentesting y ethical hacking",
        "Protección de infraestructuras críticas",
        "Gestión de vulnerabilidades",
        "Seguridad en aplicaciones y redes"
      ]
    },
    {
      id: 6,
      titulo: "Transformación Digital",
      descripcion: "Consultoría y formación para implementar cultura digital en la organización.",
      icon: <FiTrendingUp size={24} />,
      color: "from-indigo-500 to-violet-400",
      caracteristicas: [
        "Metodologías ágiles y Scrum",
        "Liderazgo digital",
        "Gestión del cambio",
        "Innovación y disrupciones tecnológicas"
      ]
    }
  ];

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="soluciones" className="py-24 bg-gray-50">
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
              Nuestras soluciones
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Programas de capacitación especializada
            </h2>
            <p className="text-xl text-gray-600">
              Soluciones tecnológicas diseñadas específicamente para cubrir las necesidades formativas de tu empresa
            </p>
          </motion.div>
        </div>
      
        {/* Grid de soluciones */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {soluciones.map((solucion) => (
            <motion.div 
              key={solucion.id}
              className={`
                bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all 
                border border-gray-100 cursor-pointer
                ${solucionActiva === solucion.id ? 'ring-2 ring-blue-500 transform scale-[1.02]' : ''}
              `}
              variants={itemVariants}
              onClick={() => setSolucionActiva(solucion.id)}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${solucion.color}`}></div>
              <div className="p-8">
                <div className={`mb-6 w-16 h-16 bg-gradient-to-r ${solucion.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                  {solucion.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{solucion.titulo}</h3>
                <p className="text-gray-600 mb-6">{solucion.descripcion}</p>
                
                {solucionActiva === solucion.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-2 mb-6">
                      {solucion.caracteristicas.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-gray-700"
                        >
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${solucion.color} mr-2`}></span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                <div className="pt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {solucionActiva === solucion.id ? 'Ver menos' : 'Ver detalles'}
                  </span>
                  
                  <motion.button 
                    className={`p-2 rounded-full bg-gradient-to-r ${solucion.color} text-white`}
                    whileHover={{ rotate: 90 }}
                    animate={{ rotate: solucionActiva === solucion.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-10 text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Buscas una solución personalizada?</h3>
              <p className="text-white/80 text-lg">
                Nuestro equipo de expertos puede diseñar un programa formativo adaptado a las necesidades específicas de tu empresa.
              </p>
            </div>
            <motion.button 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar propuesta
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 