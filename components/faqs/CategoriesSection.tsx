"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCode, FiBookOpen, FiCreditCard, FiUsers, FiHelpCircle, FiAward } from "react-icons/fi";

type Category = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export default function CategoriesSection() {
  // Manejar clic en categoría
  const handleCategoryClick = (categoryId: string) => {
    // Navigate to the FAQ section with the corresponding category
    window.location.href = `#${categoryId}-section`;
  };

  // Categorías de preguntas frecuentes
  const categories: Category[] = [
    {
      id: "programacion",
      title: "Programación",
      description: "Preguntas sobre cursos y metodología de enseñanza de programación",
      icon: <FiCode size={24} />,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "cursos",
      title: "Cursos y contenido",
      description: "Información sobre estructura, duración y metodología de los cursos",
      icon: <FiBookOpen size={24} />,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: "pagos",
      title: "Pagos y precios",
      description: "Dudas sobre opciones de pago, precios y financiación",
      icon: <FiCreditCard size={24} />,
      color: "from-green-400 to-green-600"
    },
    {
      id: "comunidad",
      title: "Comunidad",
      description: "Cómo unirte y participar en nuestra comunidad de desarrolladores",
      icon: <FiUsers size={24} />,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: "soporte",
      title: "Soporte",
      description: "Ayuda técnica y solución de problemas durante tu aprendizaje",
      icon: <FiHelpCircle size={24} />,
      color: "from-red-400 to-red-600"
    },
    {
      id: "certificaciones",
      title: "Certificaciones",
      description: "Información sobre certificaciones y reconocimiento de estudios",
      icon: <FiAward size={24} />,
      color: "from-cyan-400 to-cyan-600"
    }
  ];

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Variantes de animación para cada categoría
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explora por categorías
            </h2>
            <p className="text-lg text-gray-600">
              Selecciona la categoría que mejor se adapte a tu consulta para encontrar la respuesta más rápidamente
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer"
            >
              <motion.div 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full border border-gray-100"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${category.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg mb-4 bg-gradient-to-r ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            ¿No encuentras lo que buscas? Regístrate gratis y accede a todos nuestros cursos 100% gratuitos sin ningún coste.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 