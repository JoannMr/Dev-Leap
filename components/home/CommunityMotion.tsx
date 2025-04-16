"use client";
import React from "react";
import { motion } from "framer-motion";

export function CommunityMotion() {
    return (
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
              ¡Explora nuestra comunidad!
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Conversa y debate con otros estudiantes sobre los cursos.
              Únete a nuestra comunidad en Discord o accede a cursos con
              Acceso Anticipado desde tu portal de estudiante con tu suscripción PRO.
            </p>
          </motion.div>
  
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="/explore.jpg"
              alt="Comunidad en videollamada"
              className="rounded-xl shadow-md"
            />
          </motion.div>
        </div>
      </motion.section>
    );
  }