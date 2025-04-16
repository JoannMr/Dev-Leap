"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const proyectos = [
  {
    img: "/images/aut.jpg",
    titulo: "Autenticación completa",
    descripcion: "Implementación de login, registro y recuperación de contraseña con Next.js",
    etiqueta: "REACT"
  },
  {
    img: "/images/Proyecto-2.png",
    titulo: "E-commerce responsive",
    descripcion: "Landing page de tienda online con animaciones avanzadas en CSS",
    etiqueta: "HTML/CSS"
  },
  {
    img: "/projects/dashboard-next.jpg",
    titulo: "Dashboard administrativo",
    descripcion: "Panel de control con estadísticas en tiempo real y gráficos",
    etiqueta: "NEXT.JS"
  },
  {
    img: "/images/tareas-del-equipo.webp",
    titulo: "App de gestión de tareas",
    descripcion: "Aplicación completa con autenticación, base de datos y drag & drop",
    etiqueta: "FULLSTACK"
  }
];

export default function ProjectsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-semibold text-lg">
            PROYECTOS REALES
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
            Construye tu portafolio
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Estos son algunos de los proyectos profesionales que crearás durante tu formación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-60 overflow-hidden">
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

                {/* Etiqueta */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {proyecto.etiqueta}
                  </span>
                </div>

                {/* Imagen */}
                <motion.div
                  className="w-full h-full" 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={proyecto.img}
                    alt={proyecto.titulo}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{proyecto.titulo}</h3>
                <p className="text-gray-600 mb-4">{proyecto.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
