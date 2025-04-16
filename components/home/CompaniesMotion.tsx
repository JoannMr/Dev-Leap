"use client";
import { motion } from "framer-motion";

// Motion para CompaniesSection
export function CompaniesMotion() {
  const logos = [
    "/google.png",
    "/openai.png",
    "/seidor.png",
    "/Typeform.png",
    "/Figma.png",
    "/hp.png",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="px-4 mb-16"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text">
          Más de 100+ empresas han formado a sus empleados con DevLeap
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="mt-15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 items-center justify-items-center"
        >
          {logos.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Logo ${index}`}
              className="h-12 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}