"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiMail, FiBook, FiBell, FiCalendar } from "react-icons/fi";

const formSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido"),
  notifications: z.object({
    newCourses: z.boolean(),
    updates:    z.boolean(),
    events:     z.boolean(),
  }),
});

type FormData = z.infer<typeof formSchema>;

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function PromocionesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifications: { newCourses: true, updates: true, events: true },
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Llamada a nuestra API interna
      const res = await fetch("/api/promociones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          notifications: {
            newCourses: data.notifications.newCourses,
            updates:    data.notifications.updates,
            events:     data.notifications.events,
          },
        }),
      });
      const json = await res.json();
      
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Error al suscribir");
      }

      toast.success("¡Te has suscrito correctamente!");
      reset();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Hubo un error al suscribir");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Elementos decorativos */}
        <motion.div 
          className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-[100px] opacity-20 -z-10"
          animate={{ 
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply blur-[100px] opacity-20 -z-10"
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut" 
          }}
        />

        {/* Contenido principal */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={fadeInUp}
        >
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-8">
            <div className="absolute inset-0 opacity-20">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <pattern 
                  id="grid" 
                  width="10" 
                  height="10" 
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-3 relative z-10"
              variants={itemVariants}
            >
              Suscríbete a nuestras notificaciones
            </motion.h1>
            
            <motion.p 
              className="text-blue-100 text-lg max-w-2xl relative z-10"
              variants={itemVariants}
            >
              Mantente informado sobre nuevos cursos, actualizaciones y eventos exclusivos de DevLeap.
            </motion.p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Email con animación */}
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Preferencias con animaciones */}
              <motion.div 
                className="space-y-5 bg-gray-50 p-6 rounded-xl"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-xl font-semibold text-gray-800 mb-4 flex items-center"
                  variants={itemVariants}
                >
                  <FiBell className="mr-2 text-blue-600" />
                  Preferencias de notificación
                </motion.h2>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  variants={containerVariants}
                >
                  <motion.label 
                    className="flex items-start p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-all bg-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <input
                      type="checkbox"
                      {...register("notifications.newCourses")}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <FiBook className="text-blue-600 mr-2" />
                        <span className="font-medium text-gray-800">Nuevos cursos</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Recibe alertas cuando lancemos nuevos contenidos</p>
                    </div>
                  </motion.label>

                  <motion.label 
                    className="flex items-start p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-all bg-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <input
                      type="checkbox"
                      {...register("notifications.updates")}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <FiBell className="text-blue-600 mr-2" />
                        <span className="font-medium text-gray-800">Actualizaciones</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Mantente al día con mejoras de la plataforma</p>
                    </div>
                  </motion.label>

                  <motion.label 
                    className="flex items-start p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-all bg-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <input
                      type="checkbox"
                      {...register("notifications.events")}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <FiCalendar className="text-blue-600 mr-2" />
                        <span className="font-medium text-gray-800">Eventos</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Invitaciones a webinars y eventos en vivo</p>
                    </div>
                  </motion.label>
                </motion.div>
              </motion.div>

              {/* Botón con efectos */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </motion.div>
                  ) : (
                    "Suscribirse"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Información adicional */}
        <motion.div 
          className="mt-8 text-center text-gray-600 text-sm"
          variants={fadeInUp}
        >
          Podrás cancelar tu suscripción a nuestras notificaciones en cualquier momento.
          <br />
          Puedes leer nuestra <span className="text-blue-600 hover:underline cursor-pointer">Política de Privacidad</span>.
        </motion.div>
      </motion.div>
    </div>
  );
}
