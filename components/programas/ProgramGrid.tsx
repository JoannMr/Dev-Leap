"use client";
import React, { useState, useRef } from "react";
import { FaJs, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

// Tipos para TypeScript
type ProgramInfo = {
  nivel: string;
  duracion: string;
  proyectos: string[];
  tecnologias: string[];
  instructor: string;
  url: string;
};

type ProgramasInfoType = {
  [key: string]: ProgramInfo;
};

// Información extendida para cada programa
const programasInfo: ProgramasInfoType = {
  "JavaScript": {
    nivel: "Principiante",
    duracion: "8 semanas",
    proyectos: ["Aplicación de notas", "E-commerce", "Dashboard interactivo"],
    tecnologias: ["ES6+", "Async/Await", "DOM", "APIs REST"],
    instructor: "Ana Martínez",
    url: "/dashboard/courses?language=javascript"
  },
  "C#": {
    nivel: "Intermedio",
    duracion: "10 semanas",
    proyectos: ["Sistema de gestión", "Aplicación de escritorio", "API REST"],
    tecnologias: [".NET Core", "Entity Framework", "LINQ", "ASP.NET"],
    instructor: "Carlos Ruiz",
    url: "/dashboard/courses?language=csharp"
  },
  "HTML5": {
    nivel: "Principiante",
    duracion: "4 semanas",
    proyectos: ["Portfolio personal", "Landing page", "Blog"],
    tecnologias: ["Semántica HTML5", "Formularios", "Multimedia", "Local Storage"],
    instructor: "María López",
    url: "/dashboard/courses?language=html"
  },
  "CSS3": {
    nivel: "Principiante",
    duracion: "6 semanas",
    proyectos: ["Interfaces responsivas", "Animaciones avanzadas", "Layouts complejos"],
    tecnologias: ["Flexbox", "Grid", "CSS Variables", "Animaciones"],
    instructor: "Roberto García",
    url: "/dashboard/courses?language=css"
  },
  "Tailwind CSS": {
    nivel: "Intermedio",
    duracion: "5 semanas",
    proyectos: ["Dashboard admin", "Portfolio moderno", "Clone de Twitter"],
    tecnologias: ["Utility-first", "Responsive Design", "Dark Mode", "Plugins"],
    instructor: "Elena Sánchez",
    url: "/dashboard/courses?language=tailwind"
  },
  "Next.js": {
    nivel: "Avanzado",
    duracion: "9 semanas",
    proyectos: ["Aplicación full-stack", "Blog dinámico", "E-commerce"],
    tecnologias: ["Server Components", "App Router", "ISR", "API Routes"],
    instructor: "Javier Núñez",
    url: "/dashboard/courses?language=nextjs"
  },
};

// Tipo para nuestros programas
type Programa = {
  icon: React.ReactNode;
  nombre: string;
  descripcion: string;
  color: string;
  etiquetas: string[];
};

const programas: Programa[] = [
  { 
    icon: <FaJs size={48} />, 
    nombre: "JavaScript", 
    descripcion: "El lenguaje de la web moderna que potencia aplicaciones interactivas.",
    color: "from-yellow-400 to-yellow-500",
    etiquetas: ["Frontend", "AltaDemanda", "Certificado"] 
  },
  { 
    icon: <TbBrandCSharp size={48} />, 
    nombre: "C#", 
    descripcion: "Lenguaje poderoso para desarrollo de aplicaciones empresariales.",
    color: "from-green-500 to-green-600",
    etiquetas: ["Backend", "Certificado", "Microsoft"] 
  },
  { 
    icon: <FaHtml5 size={48} />, 
    nombre: "HTML5", 
    descripcion: "La base estructural para crear sitios web modernos y aplicaciones.",
    color: "from-orange-500 to-orange-600", 
    etiquetas: ["Frontend", "AltaDemanda", "Básico"] 
  },
  { 
    icon: <FaCss3Alt size={48} />, 
    nombre: "CSS3", 
    descripcion: "Estiliza tus proyectos con animaciones y diseños responsivos.",
    color: "from-blue-400 to-blue-500", 
    etiquetas: ["Diseño", "Frontend", "Certificado"] 
  },
  { 
    icon: <SiTailwindcss size={48} />, 
    nombre: "Tailwind CSS", 
    descripcion: "Framework de utilidades CSS para diseñar interfaces modernas y responsivas.",
    color: "from-teal-400 to-cyan-500", 
    etiquetas: ["Frontend", "Diseño", "Tendencia"] 
  },
  { 
    icon: <SiNextdotjs size={48} />, 
    nombre: "Next.js", 
    descripcion: "Framework React para aplicaciones web de alto rendimiento.",
    color: "from-black to-gray-800", 
    etiquetas: ["Framework", "React", "Certificado"] 
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export default function ProgramGrid() {
  // Estado para controlar qué tarjeta está expandida
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Función para alternar la expansión de una tarjeta
  const toggleCard = (nombre: string) => {
    if (expandedCard === nombre) {
      setExpandedCard(null);
    } else {
      setExpandedCard(nombre);
    }
  };

  return (
    <section id="programas-section" className="py-24 px-6 bg-gray-50">
      <motion.div 
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold text-lg">
          NUESTROS PROGRAMAS
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
          Tecnologías en tendencia
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Especialízate en las herramientas y lenguajes más demandados por las empresas líderes en tecnología.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {programas.map((prog, index) => (
          <div 
            key={index} 
            className="relative"
            ref={(el) => { cardsRef.current[prog.nombre] = el }}
          >
            <motion.div
              variants={item}
              className="rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              style={{ 
                minHeight: "320px" 
              }}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${prog.color}`}></div>
              <div className="p-8">
                <motion.div 
                  className={`text-white mb-6 w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-r ${prog.color} shadow-md`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {prog.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {prog.nombre}
                </h3>
                <p className="text-gray-600 mb-6">
                  {prog.descripcion}
                </p>
                <div className="flex flex-wrap gap-2">
                  {prog.etiquetas.map((et, i) => (
                    <span key={i} className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      #{et}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-500">{programasInfo[prog.nombre]?.duracion || "6 semanas"}</span>
                <motion.button 
                  className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center"
                  onClick={() => toggleCard(prog.nombre)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {expandedCard === prog.nombre ? "Ocultar detalles" : "Ver detalles"}
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: expandedCard === prog.nombre ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
            
            {/* Panel expandible con detalles adicionales - Posición absoluta */}
            <AnimatePresence>
              {expandedCard === prog.nombre && programasInfo[prog.nombre] && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-full left-0 right-0 z-20 mt-2 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-xl overflow-hidden"
                >
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-gray-800">Información del curso</h4>
                        <span className={`py-1 px-3 rounded-full text-xs font-medium bg-gradient-to-r ${prog.color} text-white`}>
                          {programasInfo[prog.nombre].nivel}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-gray-600 mb-2">Instructor</h5>
                          <p className="text-gray-800">{programasInfo[prog.nombre].instructor}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-600 mb-2">Duración</h5>
                          <p className="text-gray-800">{programasInfo[prog.nombre].duracion}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-gray-600 mb-2">Tecnologías</h5>
                      <div className="flex flex-wrap gap-2">
                        {programasInfo[prog.nombre].tecnologias.map((tech: string, i: number) => (
                          <span key={i} className="bg-blue-50 text-blue-600 text-xs py-1 px-2 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-semibold text-gray-600 mb-2">Proyectos</h5>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        {programasInfo[prog.nombre].proyectos.map((proyecto: string, i: number) => (
                          <li key={i}>{proyecto}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Botón condicional según autenticación */}
                    <div className="mt-6">
                      <SignedIn>
                        {/* Si está autenticado, redirige al curso específico */}
                        <Link href={programasInfo[prog.nombre].url}>
                          <motion.button
                            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Acceder al curso
                          </motion.button>
                        </Link>
                      </SignedIn>

                      <SignedOut>
                        {/* Si NO está autenticado, redirige a login */}
                        <Link href="/auth/login">
                          <motion.button
                            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="flex items-center justify-center">
                              Iniciar sesión para acceder
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </motion.button>
                        </Link>
                      </SignedOut>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
