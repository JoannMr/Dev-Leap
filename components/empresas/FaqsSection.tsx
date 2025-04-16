"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";

// Datos de las preguntas frecuentes
type FAQ = {
  id: number;
  pregunta: string;
  respuesta: string;
};

export default function FaqsSection() {
  // Estado para controlar qué pregunta está activa
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Lista de preguntas frecuentes
  const faqs: FAQ[] = [
    {
      id: 1,
      pregunta: "¿Cómo se personaliza la formación para nuestra empresa?",
      respuesta: "Realizamos un análisis previo de las necesidades formativas de tu equipo y las alineamos con los objetivos de negocio de tu empresa. Diseñamos un programa a medida que incluye contenidos teóricos y prácticos adaptados al nivel y conocimientos previos de tus empleados."
    },
    {
      id: 2,
      pregunta: "¿En qué formato se imparten las formaciones?",
      respuesta: "Ofrecemos formación en múltiples formatos: presencial en vuestras oficinas, online en directo con sesiones interactivas, formato híbrido o mediante plataforma e-learning con tutorización. Adaptamos la metodología según tus necesidades y la disponibilidad de tus equipos."
    },
    {
      id: 3,
      pregunta: "¿Cuál es la duración típica de los programas formativos?",
      respuesta: "La duración varía según la complejidad de la materia y los objetivos de aprendizaje. Ofrecemos desde talleres intensivos de 8-16 horas hasta programas completos de varios meses. Cada programa se estructura para maximizar la retención de conocimientos y su aplicación práctica."
    },
    {
      id: 4,
      pregunta: "¿Qué metodologías de aprendizaje utilizáis?",
      respuesta: "Utilizamos metodologías activas y participativas basadas en el modelo learning-by-doing. Combinamos teoría con ejercicios prácticos, proyectos reales, desafíos técnicos y mentorización. Incorporamos gamificación y herramientas colaborativas para maximizar el engagement y la transferencia de conocimiento."
    },
    {
      id: 5,
      pregunta: "¿Cómo se mide el impacto y efectividad de la formación?",
      respuesta: "Implementamos un sistema de evaluación continua durante todo el proceso formativo. Medimos el progreso mediante evaluaciones técnicas, proyectos prácticos y feedback 360º. Al finalizar, proporcionamos informes detallados sobre el desempeño y la evolución de cada participante, así como recomendaciones para consolidar el aprendizaje."
    },
    {
      id: 6,
      pregunta: "¿Ofrecéis certificaciones oficiales?",
      respuesta: "Sí, somos centro acreditado para diversas certificaciones técnicas internacionales como Microsoft, AWS, Google Cloud, Scrum.org, entre otras. Además, todos nuestros programas incluyen un certificado de aprovechamiento propio reconocido en el sector tecnológico."
    }
  ];

  // Función para alternar la visibilidad de una respuesta
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="preguntas-frecuentes" className="py-24 bg-white">
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
              FAQ
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las consultas más comunes sobre nuestros programas para empresas
            </p>
          </motion.div>
        </div>

        {/* Preguntas y respuestas */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.id}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.button
                className={`w-full text-left p-6 rounded-lg border flex justify-between items-center transition-all ${
                  activeIndex === index 
                    ? 'bg-blue-50 border-blue-200 shadow-md' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => toggleFaq(index)}
                whileHover={{ scale: activeIndex === index ? 1 : 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{faq.pregunta}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 ml-4 flex items-center justify-center rounded-full ${
                    activeIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <FiChevronDown />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-4 pb-6 text-gray-700 bg-white border border-t-0 border-gray-200 rounded-b-lg">
                      <p>{faq.respuesta}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA - Contacto para preguntas adicionales */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            ¿No encuentras la respuesta que buscas? Nuestro equipo de asesores educativos estará encantado de resolver todas tus dudas.
          </p>
          <motion.a
            href="#contacto-empresas"
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiMessageCircle className="text-blue-500" />
            Contactar con un asesor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 