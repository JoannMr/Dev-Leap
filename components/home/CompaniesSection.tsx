// components/CompaniesSection.tsx

import React from "react";

export default function CompaniesSection() {
  // Rutas de los logos (cámbialas a tus imágenes reales)
  const logos = [
    "/google.png",
    "/openai.png",
    "/seidor.png",
    "/Typeform.png",
    "/Figma.png",
    "/hp.png",
  ];

  return (
    <section className="px-4 mb-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 text-transparent bg-clip-text">
          Más de 100+ empresas han formado a sus empleados con DevLeap
        </h2>
        <div className="mt-15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 items-center justify-items-center">
          {logos.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Logo ${index}`}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
