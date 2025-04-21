"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Lista de proyectos destacados
const proyectos = [
  {
    id: 1,
    titulo: "E-commerce App",
    imagen: "/images/project1.webp",
    categoria: "JavaScript",
    nivel: "Intermedio"
  },
  {
    id: 2,
    titulo: "Admin Dashboard",
    imagen: "/images/project2.webp",
    categoria: "React & Tailwind",
    nivel: "Avanzado"
  },
  {
    id: 3,
    titulo: "API REST",
    imagen: "/images/project3.webp",
    categoria: "Node.js",
    nivel: "Intermedio"
  },
  {
    id: 4,
    titulo: "Social Network Clone",
    imagen: "/images/project4.webp",
    categoria: "Full Stack",
    nivel: "Avanzado"
  }
];

export default function ProjectsGallery() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold text-lg">
            PROYECTOS REALES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
            Lo que construirás
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Completa proyectos de nivel profesional que potenciarán tu portafolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              className="rounded-xl overflow-hidden shadow-lg group bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-white font-bold text-lg">{proyecto.titulo}</h3>
                  <div className="flex justify-between mt-1">
                    <span className="text-white/80 text-sm">{proyecto.categoria}</span>
                    <span className={`text-xs ${
                      proyecto.nivel === "Avanzado" 
                        ? "text-green-300" 
                        : proyecto.nivel === "Intermedio" 
                          ? "text-blue-300" 
                          : "text-yellow-300"
                    }`}>
                      {proyecto.nivel}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">Incluido en el programa</span>
                </div>
                <motion.button 
                  className="mt-3 w-full py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  whileTap={{ scale: 0.97 }}
                >
                  Ver detalles
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
