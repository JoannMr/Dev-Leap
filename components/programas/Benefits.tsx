"use client";
import React from "react";
import { FaClock, FaSyncAlt, FaLaptopCode, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

const beneficios = [
  {
    icon: <FaClock className="text-blue-600 text-4xl" />,
    titulo: "Aprende a tu ritmo",
    descripcion: "Estudia cuando y donde quieras, sin horarios fijos"
  },
  {
    icon: <FaSyncAlt className="text-blue-600 text-4xl" />,
    titulo: "Contenido actualizado",
    descripcion: "Tecnologías y frameworks actualizados con las últimas versiones"
  },
  {
    icon: <FaLaptopCode className="text-blue-600 text-4xl" />,
    titulo: "Proyectos reales",
    descripcion: "Construye un portafolio profesional mientras aprendes"
  },
  {
    icon: <FaChalkboardTeacher className="text-blue-600 text-4xl" />,
    titulo: "Tutor personalizado",
    descripcion: "Asistencia directa de expertos en la industria"
  },
  {
    icon: <FaCertificate className="text-blue-600 text-4xl" />,
    titulo: "Certificación reconocida",
    descripcion: "Obtén un certificado avalado por empresas líderes"
  }
];

// Variantes para animaciones
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
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.5
    }
  }
};

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Formas decorativas */}
      <motion.div 
        className="absolute top-20 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-30"
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
        className="absolute bottom-20 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply blur-3xl opacity-30"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-semibold text-lg">
            CARACTERÍSTICAS DESTACADAS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-gray-800">
            ¿Por qué elegir DevLeap?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Ofrecemos una experiencia de aprendizaje integral con ventajas que nos diferencian
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {beneficios.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.titulo}</h3>
              <p className="text-gray-600">{item.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
