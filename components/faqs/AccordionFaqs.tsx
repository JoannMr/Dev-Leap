"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";

// Tipos para categorías y FAQs
type FAQ = {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
};

// Datos de preguntas frecuentes por categorías
const faqsData: FAQ[] = [
  // Categoría: Programación
  {
    id: 1,
    pregunta: "¿Necesito experiencia previa en programación?",
    respuesta: "No, nuestros cursos están diseñados para todos los niveles. Para principiantes contamos con rutas de aprendizaje que comienzan desde cero, mientras que los estudiantes más avanzados pueden acceder directamente a contenidos intermedios o avanzados. Nuestra plataforma evalúa automáticamente tu nivel inicial y te recomienda el punto de partida ideal.",
    categoria: "programacion"
  },
  {
    id: 2,
    pregunta: "¿Qué lenguajes de programación puedo aprender en DevLeap?",
    respuesta: "Ofrecemos cursos completos en los lenguajes más demandados del mercado: JavaScript, Python, Java, C#, PHP, Ruby, TypeScript, Go y Rust. También cubrimos frameworks y tecnologías como React, Angular, Vue, Next.js, Node.js, Django y Laravel. Todos nuestros contenidos se actualizan regularmente para mantenerse al día con las últimas tendencias tecnológicas.",
    categoria: "programacion"
  },
  
  // Categoría: Cursos
  {
    id: 3,
    pregunta: "¿Los cursos de DevLeap son realmente gratuitos?",
    respuesta: "Sí, todos los cursos individuales en DevLeap son completamente gratuitos. Nuestra misión es democratizar el acceso a la educación en tecnología. El modelo de negocio se sustenta en los servicios premium para empresas que necesitan formación personalizada para sus equipos, pero los estudiantes individuales pueden acceder a todo el contenido sin coste alguno.",
    categoria: "cursos"
  },
  {
    id: 4,
    pregunta: "¿Cómo están estructurados los cursos?",
    respuesta: "Cada curso combina teoría con práctica siguiendo una metodología learning-by-doing. El contenido incluye vídeos explicativos, documentación interactiva, ejercicios prácticos, proyectos reales y evaluaciones periódicas. Los cursos están organizados en módulos progresivos que puedes completar a tu ritmo, con un sistema de gamificación que te motiva a seguir avanzando.",
    categoria: "cursos"
  },
  {
    id: 5,
    pregunta: "¿Cuáles son los recursos adicionales disponibles en cada curso?",
    respuesta: "Cada curso incluye ejemplos prácticos, ejercicios, proyectos y recursos descargables. También ofrecemos foros de discusión y sesiones de mentoría para los miembros activos de la comunidad.",
    categoria: "cursos"
  },
  {
    id: 6,
    pregunta: "¿Con qué frecuencia se actualizan los cursos?",
    respuesta: "Actualizamos nuestros cursos regularmente para mantenerlos al día con las últimas tecnologías y prácticas de la industria. Cuando se actualiza un curso, todos los usuarios tienen acceso inmediato a las nuevas versiones sin costo adicional.",
    categoria: "cursos"
  },
  {
    id: 7,
    pregunta: "¿Puedo obtener certificaciones por completar los cursos?",
    respuesta: "¡Sí! Ofrecemos certificados digitales de finalización para todos los cursos completados. Estos certificados pueden ser compartidos en LinkedIn y otras plataformas profesionales para mejorar tu perfil como desarrollador.",
    categoria: "cursos"
  },
  {
    id: 8,
    pregunta: "¿Necesito crear una cuenta para acceder a los cursos?",
    respuesta: "Sí, necesitas crear una cuenta gratuita para acceder a todos nuestros cursos. El registro es rápido y sencillo, y te permite guardar tu progreso, participar en la comunidad y recibir certificaciones al completar los cursos.",
    categoria: "cursos"
  },
  
  // Categoría: Pagos
  {
    id: 9,
    pregunta: "¿Qué servicios para empresas son de pago?",
    respuesta: "Para empresas ofrecemos: formación corporativa personalizada, desarrollo de itinerarios formativos a medida, mentorización individual para empleados, seguimiento y analítica de progreso, cursos específicos para tecnologías propietarias, y preparación para certificaciones oficiales. Estos servicios son de pago y se adaptan a las necesidades específicas de cada organización y su equipo técnico.",
    categoria: "pagos"
  },
  {
    id: 10,
    pregunta: "¿Cómo funciona la facturación para empresas?",
    respuesta: "Trabajamos con un modelo flexible según las necesidades de cada empresa. Ofrecemos suscripciones corporativas con acceso ilimitado para todos los empleados, paquetes de formación específicos por proyecto o departamento, y también servicios puntuales de consultoría educativa. Proporcionamos presupuestos personalizados tras una evaluación inicial de las necesidades formativas.",
    categoria: "pagos"
  },
  
  // Categoría: Comunidad
  {
    id: 11,
    pregunta: "¿Cómo puedo participar en la comunidad de DevLeap?",
    respuesta: "Al registrarte en la plataforma, obtienes acceso automático a nuestra comunidad a través de los canales de Discord y foros. Puedes participar en discusiones técnicas, hackathons virtuales, eventos de networking y proyectos colaborativos. También organizamos meetups presenciales en diferentes ciudades y webinars temáticos donde puedes interactuar con expertos y otros estudiantes.",
    categoria: "comunidad"
  },
  {
    id: 12,
    pregunta: "¿Puedo contribuir con contenido a DevLeap?",
    respuesta: "¡Absolutamente! Valoramos las contribuciones de la comunidad. Puedes proponer mejoras a los cursos existentes, crear tutoriales propios, resolver dudas de otros estudiantes o incluso convertirte en mentor. Tenemos un programa de colaboradores donde los miembros más activos reciben reconocimiento, acceso a recursos exclusivos y oportunidades de crecimiento profesional.",
    categoria: "comunidad"
  },
  
  // Categoría: Soporte
  {
    id: 13,
    pregunta: "¿Qué tipo de soporte reciben los usuarios gratuitos?",
    respuesta: "Los usuarios de la plataforma gratuita tienen acceso a: foros de la comunidad donde otros estudiantes y mentores voluntarios responden dudas, base de conocimientos y documentación extensa, herramientas de autodiagnóstico, chatbot de asistencia técnica y sesiones grupales periódicas de resolución de problemas. Este nivel de soporte es más que suficiente para completar con éxito todos los cursos.",
    categoria: "soporte"
  },
  {
    id: 14,
    pregunta: "¿Qué soporte adicional reciben las empresas?",
    respuesta: "Las empresas cuentan con un nivel de soporte premium que incluye: mentores dedicados con respuesta garantizada en menos de 4 horas, sesiones personalizadas de resolución de problemas, revisión de código y proyectos, acceso a expertos en tecnologías específicas, soporte técnico prioritario y un gestor de cuenta que supervisa el progreso de los equipos y optimiza la experiencia formativa.",
    categoria: "soporte"
  },
  
  // Categoría: Certificaciones
  {
    id: 15,
    pregunta: "¿Puedo obtener certificados gratuitos al completar los cursos?",
    respuesta: "Sí, al completar cualquier curso en DevLeap obtienes automáticamente un certificado digital que valida tus conocimientos y habilidades adquiridas. Estos certificados incluyen un código de verificación y pueden compartirse en plataformas como LinkedIn. Nuestros certificados son reconocidos por numerosas empresas del sector tecnológico por su rigor y enfoque práctico.",
    categoria: "certificaciones"
  },
  {
    id: 16,
    pregunta: "¿Qué certificaciones avanzadas están disponibles para empresas?",
    respuesta: "Para empresas ofrecemos preparación y certificación en rutas profesionales completas como 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer' o 'Cloud Architect'. También somos centro preparador para certificaciones oficiales de Microsoft, AWS, Google Cloud y otras plataformas. Las empresas pueden solicitar programas a medida que combinen estas certificaciones según las necesidades específicas de sus equipos.",
    categoria: "certificaciones"
  }
];

export default function AccordionFaqs() {
  // Estado para la categoría activa
  const [activeCategory, setActiveCategory] = useState<string>("programacion");
  // Estado para la pregunta activa
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Efecto para comprobar si hay un hash en la URL y cambiar la categoría activa
  useEffect(() => {
    // Función para manejar cambios en el hash
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        // Extraer el ID de categoría del hash (quitar "-section" del final)
        const categoryId = hash.replace('#', '').replace('-section', '');
        // Verificar si el ID coincide con alguna categoría
        const validCategories = ["programacion", "cursos", "pagos", "comunidad", "soporte", "certificaciones"];
        if (validCategories.includes(categoryId)) {
          setActiveCategory(categoryId);
        }
      }
    };

    // Verificar el hash al cargar inicialmente
    handleHashChange();

    // Añadir event listener para detectar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);

    // Limpieza del event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Filtrar FAQs por categoría
  const filteredFaqs = faqsData.filter(faq => faq.categoria === activeCategory);

  // Función para cambiar de categoría
  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(null); // Resetear pregunta activa al cambiar de categoría
    
    // Actualizar la URL con el hash sin recargar la página
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${category}-section`);
    }
  };

  // Función para alternar la visibilidad de una respuesta
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Lista de categorías
  const categories = [
    { id: "programacion", label: "Programación" },
    { id: "cursos", label: "Cursos y contenido" },
    { id: "pagos", label: "Pagos y precios" },
    { id: "comunidad", label: "Comunidad" },
    { id: "soporte", label: "Soporte" },
    { id: "certificaciones", label: "Certificaciones" }
  ];

  return (
    <section id="faqs-accordion" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra respuestas a las dudas más comunes sobre DevLeap
            </p>
          </motion.div>
        </div>

        {/* Tabs de categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <LayoutGroup id="categories">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                id={`${cat.id}-section`}
                onClick={() => changeCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-600 rounded-lg -z-10"
                    layoutId="activeCategoryBackground"
                  />
                )}
              </motion.button>
            ))}
          </LayoutGroup>
        </div>

        {/* Acordeón de preguntas */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredFaqs.map((faq, index) => (
                <motion.div 
                  key={faq.id}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.button
                    className={`w-full text-left p-6 rounded-lg border flex justify-between items-center transition-all ${
                      activeIndex === index 
                        ? 'bg-indigo-50 border-indigo-200 shadow-md' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
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
                        activeIndex === index ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-600'
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
                          <p className="leading-relaxed">{faq.respuesta}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA - Contacto para más preguntas */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            ¿No encuentras la respuesta que buscas? Regístrate gratis y accede a todos nuestros cursos. Para servicios empresariales, contáctanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Regístrate gratis
            </motion.a>
            <motion.a
              href="/empresas"
              className="inline-flex items-center gap-2 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiMessageCircle className="text-indigo-600" />
              Servicios para empresas
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 