// components/CommunitySection.tsx

import React from "react";

export default function CommunitySection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Columna de texto */}
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text">
            ¡Explora nuestra comunidad!
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Conversa y debate con otros estudiantes sobre los cursos. 
            Únete a nuestra comunidad en Discord o accede a cursos con 
            Acceso Anticipado desde tu portal de estudiante con tu suscripción PRO.
          </p>
        </div>

        {/* Columna de imagen */}
        <div className="md:w-1/2">
          <img
            src="/explore.jpg" 
            alt="Comunidad en videollamada"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
