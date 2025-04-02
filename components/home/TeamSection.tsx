// components/TeamSection.tsx

import React from "react";
import Image from "next/image";

export default function TeamSection() {
  // Datos de ejemplo
  const teamMembers = [
    {
      id: 1,
      name: "ElTitoDry",
      avatar: "/images/eltitodry.jpg", // Ajusta la ruta de tu imagen
      description: "Soy un desarrollador full stack, pero mi verdadera pasión es el frontend. Disfruto creando interfaces modernas y atractivas, y siempre estoy en la búsqueda de nuevas tecnologías que me ayuden a mejorar mis proyectos. Además, soy un gran fan de la inteligencia artificial y me encanta explorar cómo esta puede transformar la experiencia digital.",
    },
    {
      id: 2,
      name: "DylanDev",
      avatar: "/images/dylan.jpg",
      description: "Experto en React y amante del diseño UI/UX minimalista.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          El equipo de DevLeap
        </h2>
        <p className="mt-2 text-gray-600">
          Conoce a las personas que hacen posible DevLeap
        </p>

        {/* Grid de miembros del equipo */}
        <div className="mt-8 grid gap-15 md:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              {/* Imagen circular */}
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              {/* Nombre */}
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              {/* Descripción */}
              <p className="text-base text-gray-600 mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
